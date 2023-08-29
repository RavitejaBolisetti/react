/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';
import { bindActionCreators } from 'redux';

import { otfFinanceDetailDataActions } from 'store/actions/data/otf/financeDetail';
import { financeLovDataActions } from 'store/actions/data/otf/financeLov';
import { showGlobalNotification } from 'store/actions/notification';

import { VehicleInvoiceFormButton } from '../VehicleInvoiceFormButton';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                FinanceDetail: { isLoaded, isLoading, data: financeData = [] },
                FinanceLov: { isLoaded: isFinanceLovDataLoaded = false, isloading: isFinanceLovLoading, data: FinanceLovData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Insurance Details';

    let returnValue = {
        userId,
        isLoaded,
        financeData,
        isLoading,
        moduleTitle,

        isFinanceLovDataLoaded,
        isFinanceLovLoading,
        FinanceLovData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchFinanceLovList: financeLovDataActions.fetchList,
            listFinanceLovShowLoading: financeLovDataActions.listShowLoading,

            fetchList: otfFinanceDetailDataActions.fetchList,
            saveData: otfFinanceDetailDataActions.saveData,
            resetData: otfFinanceDetailDataActions.reset,
            listShowLoading: otfFinanceDetailDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const InsuranceDetailsMasterBase = (props) => {
    const { fetchList, financeData, isFinanceLovDataLoaded, setFormActionType, isFinanceLovLoading, FinanceLovData, fetchFinanceLovList, listFinanceLovShowLoading, isLoading } = props;

    const { typeData, form, selectedOrderId, formActionType, handleFormValueChange, handleButtonClick, NEXT_ACTION } = props;

    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const [formData, setFormData] = useState();

    // useEffect(() => {
    //     if (financeData) {
    //         form.setFieldsValue({ ...financeData, doDate: convertDateToCalender(financeData?.doDate) });
    //         setFormData({ ...financeData, doDate: convertDateToCalender(financeData?.doDate) });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [financeData]);

    // useEffect(() => {
    //     return () => {
    //         setFormData();
    //         resetData();
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // const extraParams = [
    //     {
    //         key: 'otfNumber',
    //         title: 'otfNumber',
    //         value: selectedOrderId,
    //         name: 'OTF Number',
    //     },
    // ];

    // useEffect(() => {
    //     if (userId && selectedOrderId) {
    //         fetchList({ setIsLoading: listShowLoading, extraParams, onErrorAction, userId });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, selectedOrderId]);

    // useEffect(() => {
    //     if (userId && !isFinanceLovDataLoaded) {
    //         fetchFinanceLovList({ setIsLoading: listFinanceLovShowLoading, userId });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, isFinanceLovDataLoaded]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification(message);
    };

    const onFinish = (values) => {
        const data = { ...values, id: financeData?.id, otfNumber: selectedOrderId, doDate: values?.doDate };

        // const onSuccess = (res) => {
        //     form.resetFields();
        //     showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
        //     fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, onErrorAction, userId });
        //     handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        // };

        // const requestData = {
        //     data: data,
        //     method: financeData?.id ? 'put' : 'post',
        //     setIsLoading: listShowLoading,
        //     userId,
        //     onError: onErrorAction,
        //     onSuccess,
        // };

        // saveData(requestData);
    };

    const onFinishFailed = () => {};

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const formProps = {
        ...props,
        typeData,
        form,
        formData,
        formActionType,
        setFormActionType,
        fetchList,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        isFinanceLovDataLoaded,
        isFinanceLovLoading,
        FinanceLovData,
        fetchFinanceLovList,
        listFinanceLovShowLoading,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const viewProps = {
        formData,
        styles,
        isLoading,
        FinanceLovData,
        typeData,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{/* {section?.title} */}Insurance Details</h2>
                        </Col>
                    </Row>

                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleInvoiceFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const InsuranceDetailsMaster = connect(null, null)(InsuranceDetailsMasterBase);
