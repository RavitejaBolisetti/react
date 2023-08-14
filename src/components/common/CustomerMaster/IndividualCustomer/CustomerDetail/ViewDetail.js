/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Typography, Descriptions, Divider, Card, Collapse, Tag, Col, Row, Button, Form } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BiTimeFive } from 'react-icons/bi';
import { FiDownload } from 'react-icons/fi';
import { BiLockAlt } from 'react-icons/bi';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { STATUS } from './statusConstant';
import { NameChangeHistory } from './NameChangeHistory';
import { nameChangeRequestDataActions } from 'store/actions/data/customerMaster/individual/nameChangeRequest/nameChangeRequest';
import { RejectionModal } from './RejectionModal';
import { showGlobalNotification } from 'store/actions/notification';

const { Text } = Typography;
const { Panel } = Collapse;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                NameChangeRequest: { isLoaded: isDataLoaded = false, isLoading, data },
            },
        },
    } = state;

    let returnValue = {
        userId,
        data,
        isDataLoaded,
        isLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            saveNameChangeData: nameChangeRequestDataActions.saveData,
            listShowNameChangeLoading: nameChangeRequestDataActions.listShowLoading,
        },
        dispatch
    ),
});

const ViewDetailMain = (props) => {
    const { styles, formData, isLoading, typeData, corporateLovData, saveNameChangeData, listShowLoading, selectedCustomerId, downloadFileFromButton, userId, onViewHistoryChange, isHistoryVisible, changeHistoryClose, activeKey, setactiveKey } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [visibility, setVisibility] = useState(true);

    const findListedNonListed = () => {
        if (checkAndSetDefaultValue(getCodeValue(typeData?.CORP_TYPE, formData?.corporateType), isLoading) === 'Non-Listed') {
            return formData?.corporateName;
        } else {
            return checkAndSetDefaultValue(getCodeValue(corporateLovData, formData?.corporateName), isLoading);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onCloseActionOnContinue = () => {
        onStatusChange('Rejected');
        setIsModalOpen(false);
    };

    const onRejectionHandled = () => {
        setIsModalOpen(true);
    };

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    // const nameViewProps = {
    //     bordered: false,
    //     colon: false,
    //     layout: 'vertical',
    //     column: { xs: 1, sm: 4, lg: 4, xl: 4, xxl: 4 },
    // };

    const changeHistoryProps = {
        isVisible: isHistoryVisible,
        onCloseAction: changeHistoryClose,
        selectedCustomerId,
        downloadFileFromButton,
    };

    const modalProps = {
        isVisible: isModalOpen,
        icon: <BiLockAlt />,
        titleOverride: 'Rejection Note',
        closable: false,
        onCloseAction: handleCancel,
        onCloseActionOnContinue,
    };

    const onCollapseChange = (value) => {
        setactiveKey(1);
    };
    const onStatusChange = (value) => {
        const data = { id: formData?.pendingNameChangeRequest?.id || '', customerCode: selectedCustomerId, rejectionRemark: 'Name change request', actionStatus: value };
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Customer name change request approved successfully' });
            if (res?.data?.actionStatus === 'Rejected') setStatus(STATUS?.REJECTED?.title);
            else setStatus(STATUS?.APPROVED?.title);

            setactiveKey([]);
            setVisibility(false);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveNameChangeData(requestData);
    };
    const onApprovedHandle = () => {
        onStatusChange(STATUS?.APPROVED?.title);
    };
    return (
        <>
            <div className={styles?.viewDrawerContainer}>
                <Card header="Customer Information">
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Mobile Number">{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Customer Type">{checkAndSetDefaultValue(getCodeValue(typeData?.CUST_TYPE, formData?.customerType), isLoading)}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <div className={styles?.cardInsideBox}>
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles?.verticallyCentered}>
                                <Text style={{ fontSize: '16px' }} strong>
                                    Customer Name
                                </Text>
                                {status === STATUS?.REJECTED?.title ? <Tag color="error">Rejected</Tag> : status === STATUS?.APPROVED?.title ? <Tag color="success">Approved</Tag> : formData?.pendingNameChangeRequest !== null ? <Tag color="warning">Pending for Approval</Tag> : null}
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles?.buttonsGroupRight}>
                                <Button type="link" className={styles?.verticallyCentered} onClick={onViewHistoryChange} icon={<BiTimeFive />}>
                                    View History
                                </Button>
                            </Col>
                        </Row>
                        <Divider className={styles?.marT20} />
                        <Collapse expandIcon={expandIcon} activeKey={activeKey} expandIconPosition="end" onChange={() => onCollapseChange(1)}>
                            <Panel
                                header={
                                    <>
                                        <Row type="flex" justify="space-between" align="middle" size="large">
                                            <Row type="flex" justify="space-around" align="middle">
                                                <Text>
                                                    {getCodeValue(typeData?.TITLE, formData?.titleCode)}&nbsp;
                                                    {(formData?.firstName || '') + ' ' + (formData?.middleName || '') + ' ' + (formData?.lastName || '')}
                                                </Text>
                                            </Row>
                                        </Row>
                                    </>
                                }
                                key={1}
                            >
                                <Divider />
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                        <Form.Item label="Title">{checkAndSetDefaultValue(getCodeValue(typeData?.TITLE, formData?.titleCode))}</Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                        <Form.Item label="First Name">{checkAndSetDefaultValue(formData?.firstName)}</Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                        <Form.Item label="Middle Name">{checkAndSetDefaultValue(formData?.middleName)}</Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                        <Form.Item label="Last Name">{checkAndSetDefaultValue(formData?.lastName)}</Form.Item>
                                    </Col>
                                </Row>
                                {/* <Descriptions {...nameViewProps}>
                                    <Descriptions.Item label="Title">{checkAndSetDefaultValue(getCodeValue(typeData?.TITLE, formData?.titleCode))}</Descriptions.Item>
                                    <Descriptions.Item label="First Name">{checkAndSetDefaultValue(formData?.firstName)}</Descriptions.Item>
                                    <Descriptions.Item label="Middle Name">{checkAndSetDefaultValue(formData?.middleName)}</Descriptions.Item>
                                    <Descriptions.Item label="Last Name">{checkAndSetDefaultValue(formData?.lastName)}</Descriptions.Item>
                                </Descriptions> */}

                                {formData?.supportingDocuments?.map((item) => (
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Card className={styles?.viewDocumentStrip} key={item?.documentId} title={item?.documentName} extra={<FiDownload />} onClick={downloadFileFromButton}></Card>
                                        </Col>
                                    </Row>
                                ))}
                                {formData?.pendingNameChangeRequest !== null && visibility && (
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button type="primary" className={styles?.marR20} onClick={onApprovedHandle}>
                                                Approved
                                            </Button>
                                            <Button className={styles?.marB20} onClick={onRejectionHandled} danger>
                                                Rejected
                                            </Button>
                                        </Col>
                                    </Row>
                                )}
                            </Panel>
                        </Collapse>
                    </div>
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Email Id">{checkAndSetDefaultValue(formData?.emailId)}</Descriptions.Item>
                        <Descriptions.Item label="Do you want to contact over whatsapp?" className={formData?.whatsappCommunicationIndicator ? styles.yesText : styles?.noText}>
                            {checkAndSetDefaultValue(formData?.whatsappCommunicationIndicator ? 'Yes' : 'No')}
                        </Descriptions.Item>
                        <Descriptions />
                        <Descriptions.Item label="Want to use Mobile no as whatsapp no?" className={formData?.mobileNumberAsWhatsappNumber ? styles.yesText : styles?.noText}>
                            {checkAndSetDefaultValue(formData?.mobileNumberAsWhatsappNumber ? 'Yes' : 'No')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Whatsapp Number">{checkAndSetDefaultValue(formData?.whatsAppNumber)}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Corporate Type">{checkAndSetDefaultValue(getCodeValue(typeData?.CORP_TYPE, formData?.corporateType), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Corporate Name">{findListedNonListed()}</Descriptions.Item>
                        {formData?.corporateCode && <Descriptions.Item label="Corporate Code">{checkAndSetDefaultValue(formData?.corporateCode)}</Descriptions.Item>}
                        <Descriptions.Item label="Corporate Category">{checkAndSetDefaultValue(getCodeValue(typeData?.CORP_CATE, formData?.corporateCategory), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Membership Type">{checkAndSetDefaultValue(getCodeValue(typeData?.MEM_TYPE, formData?.membershipType), isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>

            <NameChangeHistory {...changeHistoryProps} />
            <RejectionModal {...modalProps} />
        </>
    );
};

export const ViewDetail = connect(mapStateToProps, mapDispatchToProps)(ViewDetailMain);
