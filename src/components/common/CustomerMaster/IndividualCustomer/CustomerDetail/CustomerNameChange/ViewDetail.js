/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Card, Row, Col, Form, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FiDownload } from 'react-icons/fi';

import { nameChangeRequestDataActions } from 'store/actions/data/customerMaster/individual/nameChangeRequest/nameChangeRequest';
import { showGlobalNotification } from 'store/actions/notification';

import { STATUS } from '../statusConstant';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import { getCodeValue } from 'utils/getCodeValue';

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
    const { styles, userId, selectedCustomerId, formData, typeData, downloadFileFromButton, customerNameList, showGlobalNotification, setRefreshCustomerList, saveNameChangeData, listShowLoading } = props;
    const { setRefreshData, showApproveNameChangeRequestBtn = false } = props;

    const [confirmRequest, setConfirmRequest] = useState();
    const onCloseAction = () => {
        setConfirmRequest({
            ...confirmRequest,
            isVisible: false,
        });
    };

    const onStatusChange = (values) => {
        const data = { id: formData?.customerNameChangeRequest?.id || '', customerCode: selectedCustomerId, rejectionRemark: values?.rejectionRemark, actionStatus: values?.status };

        const onSuccess = (res) => {
            setConfirmRequest({
                isVisible: false,
            });
            setRefreshCustomerList(true);
            setRefreshData(true);
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Customer name change request updated successfully' });
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

    const handleRequest = (type) => {
        if (type === STATUS?.APPROVED?.key) {
            setConfirmRequest({
                isVisible: true,
                titleOverride: 'Approve Name',
                closable: true,
                icon: false,
                onCloseAction,
                onSubmitAction: () => onStatusChange({ status: STATUS?.APPROVED?.title }),
                submitText: 'Yes, Approve',
                text: 'Are you sure want to approve the changes within the current name?',
            });
        } else if (type === STATUS?.REJECTED?.key) {
            setConfirmRequest({
                isVisible: true,
                titleOverride: 'Reject Name',
                closable: true,
                icon: false,
                onCloseAction,
                onSubmitAction: (values) => onStatusChange({ ...values, status: STATUS?.REJECTED?.title }),
                submitText: 'Yes, Reject',
                showField: true,
            });
        }
    };

    const canApproveNameChangeRequest = true;
    return (
        <>
            {canApproveNameChangeRequest && showApproveNameChangeRequestBtn && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                        <Form.Item label="Title">{checkAndSetDefaultValue(getCodeValue(typeData?.TITLE, customerNameList?.titleCode))}</Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                        <Form.Item label="First Name">{checkAndSetDefaultValue(customerNameList?.firstName)}</Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Form.Item label="Middle Name">{checkAndSetDefaultValue(customerNameList?.middleName)}</Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                        <Form.Item label="Last Name">{checkAndSetDefaultValue(customerNameList?.lastName)}</Form.Item>
                    </Col>
                </Row>
            )}
            {canApproveNameChangeRequest && !showApproveNameChangeRequestBtn && (
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
            )}
            {canApproveNameChangeRequest && showApproveNameChangeRequestBtn && formData?.customerNameChangeRequest?.supportingDocuments?.map((item) => (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Card className={styles.viewDocumentStrip} key={item?.documentId} title={item?.documentName} extra={<FiDownload />} data-testid="download" onClick={() => downloadFileFromButton(item)}></Card>
                    </Col>
                </Row>
            ))}
            {canApproveNameChangeRequest && showApproveNameChangeRequestBtn && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Button type="primary" className={styles.marR20} onClick={() => handleRequest(STATUS?.APPROVED?.key)}>
                            Approve
                        </Button>
                        <Button danger className={styles.marB20} onClick={() => handleRequest(STATUS?.REJECTED?.key)}>
                            Reject
                        </Button>
                    </Col>
                </Row>
            )}
            <ConfirmationModal {...confirmRequest} />
        </>
    );
};

export const ViewDetail = connect(mapStateToProps, mapDispatchToProps)(ViewDetailMain);
