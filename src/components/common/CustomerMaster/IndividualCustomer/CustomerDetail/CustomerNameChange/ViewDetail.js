/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Card, Row, Col, Form, Modal, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FiDownload } from 'react-icons/fi';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { BiLockAlt } from 'react-icons/bi';

import { nameChangeRequestDataActions } from 'store/actions/data/customerMaster/individual/nameChangeRequest/nameChangeRequest';
import { showGlobalNotification } from 'store/actions/notification';

import { RejectNameChangeRequest } from './RejectNameChangeRequest';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { STATUS } from '../statusConstant';

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
            showGlobalNotification,
        },
        dispatch
    ),
});

const ViewDetailMain = (props) => {
    const { styles, userId, selectedCustomerId, formData, typeData, downloadFileFromButton, showGlobalNotification, setRefreshCustomerList, saveNameChangeData, listShowLoading } = props;
    const { setActiveKey } = props;
    const { setRefreshData, showApproveNameChangeRequestBtn = false } = props;

    const [isModalOpen, setModelOpen] = useState(false);

    const onCloseAction = () => {
        setModelOpen(false);
    };

    const handleReject = () => {
        setModelOpen(true);
    };

    const onStatusChange = (values) => {
        const data = { id: formData?.customerNameChangeRequest?.id || '', customerCode: selectedCustomerId, rejectionRemark: values?.rejectionRemark, actionStatus: values?.status };
        const onSuccess = (res) => {
            setRefreshCustomerList(true);
            setRefreshData(true);
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Customer name change request updated successfully' });
            if (res?.data?.actionStatus === 'Rejected') {
                // setStatus(STATUS?.REJECTED?.title);
                setModelOpen(false);
            } else {
                // setStatus(STATUS?.APPROVED?.title);
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
            icon: <ExclamationCircleOutlined size={22} className={styles.confirmModalIcon} />,
            content: 'Do you want to approve this request?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            wrapClassName: styles.confirmModal,
            centered: true,
            closable: true,
            onOk: () => {
                onStatusChange({ status: STATUS?.APPROVED?.title });
            },
        });
    };

    const modalProps = {
        isVisible: isModalOpen,
        icon: <BiLockAlt />,
        titleOverride: 'Rejection Note',
        closable: false,
        onCloseAction,
        onContinueAction: (values) => onStatusChange({ ...values, status: STATUS?.REJECTED?.title }),
    };

    const canApproveNameChangeRequest = true;
    return (
        <>
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
            {formData?.customerNameChangeRequest?.supportingDocuments?.map((item) => (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Card className={styles.viewDocumentStrip} key={item?.documentId} title={item?.documentName} extra={<FiDownload />} data-testid="download" onClick={() => downloadFileFromButton(item)}></Card>
                    </Col>
                </Row>
            ))}
            {canApproveNameChangeRequest && showApproveNameChangeRequestBtn && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Button type="primary" className={styles.marR20} onClick={handleApprove}>
                            Approve
                        </Button>
                        <Button className={styles.marB20} onClick={handleReject} danger>
                            Reject
                        </Button>
                    </Col>
                </Row>
            )}
            <RejectNameChangeRequest {...modalProps} />
        </>
    );
};

export const ViewDetail = connect(mapStateToProps, mapDispatchToProps)(ViewDetailMain);
