/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Typography, Descriptions, Divider, Card, Collapse, Tag, Col, Row, Modal, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BiTimeFive } from 'react-icons/bi';
import { FiDownload } from 'react-icons/fi';
import { BiLockAlt } from 'react-icons/bi';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { STATUS } from '../statusConstant';
import { nameChangeRequestDataActions } from 'store/actions/data/customerMaster/individual/nameChangeRequest/nameChangeRequest';
import { RejectionModal } from '../RejectionModal';
import { showGlobalNotification } from 'store/actions/notification';

const { Text } = Typography;
const { Panel } = Collapse;
const { confirm } = Modal;

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
    const { styles, formData, typeData, saveNameChangeData, listShowLoading, selectedCustomerId, downloadFileFromButton, userId, onViewHistoryChange, setRefreshCustomerList } = props;
    const { activeKey, setActiveKey } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState('');

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onCloseActionOnContinue = () => {
        onStatusChange('Rejected');
        setIsModalOpen(false);
    };

    const handleReject = () => {
        setIsModalOpen(true);
    };

    const nameViewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 4, lg: 4, xl: 4, xxl: 4 },
    };

    const modalProps = {
        isVisible: isModalOpen,
        icon: <BiLockAlt />,
        titleOverride: 'Rejection Note',
        closable: false,
        onCloseAction: handleCancel,
        onCloseActionOnContinue,
    };

    const onStatusChange = (value) => {
        const data = { id: formData?.customerNameChangeRequest?.id || '', customerCode: selectedCustomerId, rejectionRemark: 'Name change request', actionStatus: value };
        const onSuccess = (res) => {
            setRefreshCustomerList(true);
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Customer name change request approved successfully' });
            if (res?.data?.actionStatus === 'Rejected') {
                setStatus(STATUS?.REJECTED?.title);
            } else {
                setStatus(STATUS?.APPROVED?.title);
            }
            setActiveKey([]);
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

    const handleApprove = () => {
        confirm({
            title: 'Confirmation',
            icon: false,
            content: 'Do you want to approved request?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            wrapClassName: styles.confirmModal,
            centered: true,
            closable: true,
            onOk() {
                onStatusChange(STATUS?.APPROVED?.title);
            },
        });
    };

    const canApproveNameChangeRequest = true;
    const customerNameChangeRequest = formData?.customerNameChangeRequest;
    return (
        <>
            <div className={styles.cardInsideBox}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.verticallyCentered}>
                        <Text style={{ fontSize: '16px' }} strong>
                            Customer Name
                        </Text>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Button type="link" onClick={onViewHistoryChange} icon={<BiTimeFive />} className={styles.verticallyCenteredAndAlignRight}>
                            View History
                        </Button>
                    </Col>
                </Row>
                <Divider />
                {customerNameChangeRequest && (
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
                                <Row>
                                    <Col xs={24} sm={24} md={18} lg={20} xl={20}>
                                        <Typography>
                                            {getCodeValue(typeData?.TITLE, customerNameChangeRequest?.titleCode)}&nbsp;
                                            {(customerNameChangeRequest?.firstName || '') + ' ' + (customerNameChangeRequest?.middleName || '') + ' ' + (customerNameChangeRequest?.lastName || '')}
                                        </Typography>
                                        <Text type="secondary" style={{ fontSize: '12px', fontWeight: 'normal' }}>
                                            Current Name
                                        </Text>{' '}
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={4} xl={4} className={styles.verticallyCentered}>
                                        {status === STATUS?.REJECTED?.title ? <Tag color="error">Rejected</Tag> : status === STATUS?.APPROVED?.title ? <Tag color="success">Approved</Tag> : <Tag color="warning">Pending for Approval</Tag>}
                                    </Col>
                                </Row>
                            }
                            key={1}
                        >
                            <Descriptions {...nameViewProps} style={{ padding: '10px' }}>
                                <Descriptions.Item label="Title">{checkAndSetDefaultValue(getCodeValue(typeData?.TITLE, customerNameChangeRequest?.titleCode))}</Descriptions.Item>
                                <Descriptions.Item label="First Name">{checkAndSetDefaultValue(customerNameChangeRequest?.firstName)}</Descriptions.Item>
                                <Descriptions.Item label="Middle Name">{checkAndSetDefaultValue(customerNameChangeRequest?.middleName)}</Descriptions.Item>
                                <Descriptions.Item label="Last Name">{checkAndSetDefaultValue(customerNameChangeRequest?.lastName)}</Descriptions.Item>
                            </Descriptions>

                            {customerNameChangeRequest?.supportingDocuments?.map((item) => (
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Card className={styles.viewDocumentStrip} key={item?.documentId} title={item?.documentName} extra={<FiDownload />} onClick={downloadFileFromButton}></Card>
                                    </Col>
                                </Row>
                            ))}
                            {canApproveNameChangeRequest && customerNameChangeRequest !== null && (
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Button type="primary" className={styles.marR20} onClick={handleApprove}>
                                            Approved
                                        </Button>
                                        <Button className={styles.marB20} onClick={handleReject} danger>
                                            Rejected
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                        </Panel>
                    </Collapse>
                )}
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
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Typography>
                                        {getCodeValue(typeData?.TITLE, formData?.titleCode)}&nbsp;
                                        {(formData?.firstName || '') + ' ' + (formData?.middleName || '') + ' ' + (formData?.lastName || '')}
                                    </Typography>
                                    {customerNameChangeRequest && (
                                        <Text type="secondary" style={{ fontSize: '12px', fontWeight: 'normal' }}>
                                            Previous Name
                                        </Text>
                                    )}
                                </Col>
                            </Row>
                        }
                        key={2}
                    >
                        <Descriptions {...nameViewProps} style={{ padding: '10px' }}>
                            <Descriptions.Item label="Title">{checkAndSetDefaultValue(getCodeValue(typeData?.TITLE, formData?.titleCode))}</Descriptions.Item>
                            <Descriptions.Item label="First Name">{checkAndSetDefaultValue(formData?.firstName)}</Descriptions.Item>
                            <Descriptions.Item label="Middle Name">{checkAndSetDefaultValue(formData?.middleName)}</Descriptions.Item>
                            <Descriptions.Item label="Last Name">{checkAndSetDefaultValue(formData?.lastName)}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
            </div>
            <RejectionModal {...modalProps} />
        </>
    );
};

export const ViewDetail = connect(mapStateToProps, mapDispatchToProps)(ViewDetailMain);
