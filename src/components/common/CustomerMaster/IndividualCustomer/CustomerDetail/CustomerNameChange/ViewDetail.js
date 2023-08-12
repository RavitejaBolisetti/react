/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Typography, Descriptions, Divider, Card, Collapse, Tag, Col, Row, Space, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BiTimeFive } from 'react-icons/bi';
import { FiDownload } from 'react-icons/fi';
import { BiLockAlt } from 'react-icons/bi';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { STATUS } from '../statusConstant';
import { CustomerNameChangeHistory } from './CustomerNameChangeHistory';
import { nameChangeRequestDataActions } from 'store/actions/data/customerMaster/individual/nameChangeRequest/nameChangeRequest';
import { RejectionModal } from '../RejectionModal';
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
    const { styles, formData, isLoading, typeData, saveNameChangeData, listShowLoading, selectedCustomerId, downloadFileFromButton, userId, onViewHistoryChange, isHistoryVisible, changeHistoryClose } = props;
    const { activeKey, setActiveKey } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [visibility, setVisibility] = useState(true);

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

    const nameViewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 4, lg: 4, xl: 4, xxl: 4 },
    };

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
        setActiveKey(1);
    };

    const onStatusChange = (value) => {
        const data = { id: formData?.pendingNameChangeRequest?.id || '', customerCode: selectedCustomerId, rejectionRemark: 'Name change request', actionStatus: value };
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Customer name change request approved successfully' });
            if (res?.data?.actionStatus === 'Rejected') setStatus(STATUS?.REJECTED?.title);
            else setStatus(STATUS?.APPROVED?.title);

            setActiveKey([]);
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
            <div className={styles.cardInsideBox}>
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Text style={{ fontSize: '16px' }} strong>
                            Customer Name
                        </Text>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        {status === STATUS?.REJECTED?.title ? (
                            <Tag style={{ textAlign: 'right' }} color="error">
                                Rejected
                            </Tag>
                        ) : status === STATUS?.APPROVED?.title ? (
                            <Tag style={{ textAlign: 'right' }} color="success">
                                Approved
                            </Tag>
                        ) : formData?.pendingNameChangeRequest !== null ? (
                            <Tag style={{ textAlign: 'right' }} color="warning">
                                Pending for Approval
                            </Tag>
                        ) : null}
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'right' }}>
                        <Button type="link" onClick={onViewHistoryChange} icon={<BiTimeFive />}>
                            View History
                        </Button>
                    </Col>
                </Row>
                <Divider />
                <Collapse
                    expandIcon={expandIcon}
                    activeKey={activeKey}
                    onChange={(value) => {
                        setActiveKey(value);
                    }}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <>
                                <Row type="flex" justify="space-between" align="middle" size="large">
                                    <Row type="flex" justify="space-around" align="middle">
                                        <Text>
                                            {getCodeValue(typeData?.TITLE, formData?.titleCode)}&nbsp;
                                            {(formData?.firstName || '') + ' ' + (formData?.middleName || '') + ' ' + (formData?.lastName || '')}hfhfhf
                                        </Text>
                                    </Row>
                                </Row>
                            </>
                        }
                        key={1}
                    >
                        <Descriptions {...nameViewProps}>
                            <Descriptions.Item label="Title">{checkAndSetDefaultValue(getCodeValue(typeData?.TITLE, formData?.titleCode))}</Descriptions.Item>
                            <Descriptions.Item label="First Name">{checkAndSetDefaultValue(formData?.firstName)}</Descriptions.Item>
                            <Descriptions.Item label="Middle Name">{checkAndSetDefaultValue(formData?.middleName)}</Descriptions.Item>
                            <Descriptions.Item label="Last Name">{checkAndSetDefaultValue(formData?.lastName)}</Descriptions.Item>
                        </Descriptions>

                        {formData?.supportingDocuments?.map((item) => (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Card className={styles.viewDocumentStrip} key={item?.documentId} title={item?.documentName} extra={<FiDownload />} onClick={downloadFileFromButton}></Card>
                                </Col>
                            </Row>
                        ))}
                        {formData?.pendingNameChangeRequest !== null && visibility && (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Button type="primary" className={styles.marR20} onClick={onApprovedHandle}>
                                        Approved
                                    </Button>
                                    <Button className={styles.marB20} onClick={onRejectionHandled} danger>
                                        Rejected
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Panel>
                </Collapse>
            </div>
            <RejectionModal {...modalProps} />
        </>
    );
};

export const ViewDetail = connect(mapStateToProps, mapDispatchToProps)(ViewDetailMain);
