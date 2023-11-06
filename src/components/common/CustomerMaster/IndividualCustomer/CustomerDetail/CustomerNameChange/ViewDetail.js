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
import { LANGUAGE_EN } from 'language/en';
import { translateContent } from 'utils/translateContent';

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
        REJECT_TITLE: 'Reject Name',
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
    const { setRefreshData, showApproveNameChangeRequestBtn = false, REJECT_TITLE } = props;
    let actionData = formData?.customerNameChangeRequest?.workFlowDetails?.allowedActions;

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
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: 'Customer name change request updated successfully' });
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
        setConfirmRequest({
            isVisible: true,
            titleOverride: STATUS?.APPROVED?.key === type ? LANGUAGE_EN.GENERAL.APPROVE_CONFIRMATION.TITLE : REJECT_TITLE,
            closable: true,
            icon: false,
            onCloseAction,
            onSubmitAction: (values) => onStatusChange({ ...values, status: type }),
            submitText: STATUS?.APPROVED?.key === type ? 'Yes, Approve' : 'Yes, Reject',
            text: STATUS?.APPROVED?.key === type && LANGUAGE_EN.GENERAL.APPROVE_CONFIRMATION.MESSAGE,
            showField: STATUS?.REJECTED?.key === type,
        });
    };

    const canApproveNameChangeRequest = true;
    return (
        <>
            {canApproveNameChangeRequest && showApproveNameChangeRequestBtn && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                        <Form.Item label={translateContent('customerMaster.label.title')}>{checkAndSetDefaultValue(getCodeValue(typeData?.TITLE, customerNameList?.titleCode))}</Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                        <Form.Item label={translateContent('customerMaster.label.firstName')}>{checkAndSetDefaultValue(customerNameList?.firstName)}</Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Form.Item label={translateContent('customerMaster.label.middleName')}>{checkAndSetDefaultValue(customerNameList?.middleName)}</Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                        <Form.Item label={translateContent('customerMaster.label.lastName')}>{checkAndSetDefaultValue(customerNameList?.lastName)}</Form.Item>
                    </Col>
                </Row>
            )}
            {canApproveNameChangeRequest && !showApproveNameChangeRequestBtn && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                        <Form.Item label={translateContent('customerMaster.label.title')}>{checkAndSetDefaultValue(getCodeValue(typeData?.TITLE, formData?.titleCode))}</Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                        <Form.Item label={translateContent('customerMaster.label.firstName')}>{checkAndSetDefaultValue(formData?.firstName)}</Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Form.Item label={translateContent('customerMaster.label.middleName')}>{checkAndSetDefaultValue(formData?.middleName)}</Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                        <Form.Item label={translateContent('customerMaster.label.lastName')}>{checkAndSetDefaultValue(formData?.lastName)}</Form.Item>
                    </Col>
                </Row>
            )}
            {canApproveNameChangeRequest &&
                showApproveNameChangeRequestBtn &&
                formData?.customerNameChangeRequest?.supportingDocuments?.map((item) => (
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Card className={styles.viewDocumentStrip} key={item?.documentId} title={item?.documentName} extra={<FiDownload />} data-testid="download" onClick={() => downloadFileFromButton(item)}></Card>
                        </Col>
                    </Row>
                ))}
            {canApproveNameChangeRequest && showApproveNameChangeRequestBtn && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.marB20}>
                        {actionData?.map((i) => {
                            return (
                                <Button key={STATUS?.APPROVED.id} type={i?.actionName === STATUS?.APPROVED?.title ? 'primary' : undefined} danger={i?.actionName === STATUS?.REJECTED?.title} className={styles.marR20} onClick={() => handleRequest(i?.actionCode)}>
                                    {i?.actionName}
                                </Button>
                            );
                        })}
                    </Col>
                </Row>
            )}
            <ConfirmationModal {...confirmRequest} />
        </>
    );
};

export const ViewDetail = connect(mapStateToProps, mapDispatchToProps)(ViewDetailMain);
