/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'assets/sass/app.module.scss';
import { geoPinCodeDataActions } from 'store/actions/data/geo/pincodes';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                InsuranceDetail: { isLoaded: isDataLoaded = false, isLoading, data: insuranceData = [] },
            },
            Geo: {
                Pincode: { isLoaded: isPinCodeDataLoaded = false, isLoading: isPinCodeLoading, data: pincodeData },
            },
        },
    } = state;
    const moduleTitle = 'Insurance Details';

    let returnValue = {
        userId,
        isDataLoaded,
        insuranceData,
        isLoading,
        moduleTitle,
        isPinCodeDataLoaded,
        isPinCodeLoading,
        pincodeData: pincodeData?.pinCodeDetails,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            listPinCodeShowLoading: geoPinCodeDataActions.listShowLoading,
            fetchPincodeDetail: geoPinCodeDataActions.fetchList,
            resetPincodeData: geoPinCodeDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const InstallationAddressDetailsMasterBase = (props) => {
    const { insuranceData, onCloseAction, fetchList, formActionType, crmCustomerVehicleData, fetchPincodeDetail, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;
    const { form, selectedOrderId, handleFormValueChange, section, isLoading, NEXT_ACTION, handleButtonClick, onFinishFailed, saveData } = props;
    const { buttonData, setButtonData, formKey, onFinishCustom = undefined, FormActionButton, pageType } = props;
    const { insuranceCompanies, pincodeData } = props;
    const [formData, setFormData] = useState();

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'Booking Number',
        },
    ];

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const viewProps = {
        styles,
        onCloseAction,
        formData,
        isLoading,
        pageType,
        insuranceCompanies,
    };

    const formProps = {
        ...props,
        pincodeData,
        form,
        fetchList,
        userId,
        isDataLoaded,
        isLoading,
        formData,
        pageType,
        insuranceCompanies,
        onSuccessAction,
        onErrorAction,
        fetchPincodeDetail,
        crmCustomerVehicleData,
    };

    const myProps = {
        ...props,
    };

    const onFinish = (values) => {
        const recordId = insuranceData?.id || '';
        const data = { ...values, id: recordId, otfNumber: selectedOrderId };
        if (onFinishCustom) {
            onFinishCustom({ key: formKey, values: data });
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setButtonData({ ...buttonData, formBtnActive: false });
        } else {
            const onSuccess = (res) => {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
            };

            const onError = (message) => {
                // showGlobalNotification({ message });
            };

            const requestData = {
                data: data,
                method: insuranceData?.id ? 'put' : 'post',
                setIsLoading: listShowLoading,
                userId,
                onError,
                onSuccess,
            };

            saveData(requestData);
        }
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} onValuesChange={handleFormValueChange}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? (
                        <>
                            <ViewDetail {...viewProps} />
                        </>
                    ) : (
                        <>
                            <AddEditForm {...formProps} />
                        </>
                    )}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const InstallationAddressDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(InstallationAddressDetailsMasterBase);
