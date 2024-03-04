/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';
import { bindActionCreators } from 'redux';

import { AddEditForm, ViewDetail } from 'components/Sales/Common/FinananceDetails';

import { otfFinanceDetailDataActions } from 'store/actions/data/otf/financeDetail';
import { financeLovDataActions } from 'store/actions/data/otf/financeLov';
import { showGlobalNotification } from 'store/actions/notification';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { convertDateToCalender } from 'utils/formatDateTime';

import { translateContent } from 'utils/translateContent';
import { withSpinner } from 'components/withSpinner';
import styles from 'assets/sass/app.module.scss';
const mapStateToProps = (state, props) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                FinanceDetail: { isLoaded, isLoading, isLoadingOnSave, data: financeData = [] },
                FinanceLov: { isLoaded: isFinanceLovDataLoaded = false, isloading: isFinanceLovLoading, data: FinanceLovData = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isLoaded,
        financeData,
        isLoading,
        isLoadingOnSave,
        showSpinner: !props?.formActionType?.viewMode,
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
            saveFormShowLoading: otfFinanceDetailDataActions.saveFormShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const FinananceDetailsMasterBase = (props) => {
    const { saveData, resetData, fetchList, userId, listShowLoading, saveFormShowLoading, financeData, isFinanceLovDataLoaded, setFormActionType, isFinanceLovLoading, FinanceLovData, fetchFinanceLovList, listFinanceLovShowLoading, section, isLoading } = props;
    const { typeData, form, selectedRecordId, formActionType, handleFormValueChange, handleButtonClick, NEXT_ACTION } = props;
    const { formKey, onFinishCustom = undefined, FormActionButton, StatusBar, pageType } = props;

    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const [formData, setFormData] = useState();

    useEffect(() => {
        if (financeData) {
            form.setFieldsValue({ ...financeData, doDate: convertDateToCalender(financeData?.doDate) });
            setFormData({ ...financeData, doDate: convertDateToCalender(financeData?.doDate) });
            setButtonData({ ...buttonData, formBtnActive: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [financeData]);

    useEffect(() => {
        return () => {
            setFormData();
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const extraParams = [
        {
            key: 'otfId',
            value: selectedRecordId,
        },
    ];

    useEffect(() => {
        if (userId && selectedRecordId) {
            fetchList({ setIsLoading: listShowLoading, extraParams, onErrorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    useEffect(() => {
        if (userId && !isFinanceLovDataLoaded) {
            fetchFinanceLovList({ setIsLoading: listFinanceLovShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isFinanceLovDataLoaded]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        // showGlobalNotification(message);
    };

    const onFinish = (values) => {
        const recordId = financeData?.id || '';
        const data = { ...values, id: recordId, otfId: selectedRecordId, doDate: values?.doDate };

        if (onFinishCustom) {
            onFinishCustom({ key: formKey, values: data });
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setButtonData({ ...buttonData, formBtnActive: false });
        } else {
            const onSuccess = (res) => {
                form.resetFields();
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, onErrorAction, userId });
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION, onSave: true });
            };

            const requestData = {
                data: data,
                method: financeData?.id ? 'put' : 'post',
                setIsLoading: saveFormShowLoading,
                userId,
                onError: onErrorAction,
                onSuccess,
            };

            saveData(requestData);
        }
    };

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
        setFormData,
        formActionType,
        setFormActionType,
        fetchList,
        onFinish,
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
        pageType,
    };

    const viewProps = {
        formData,
        styles,
        isLoading,
        FinanceLovData,
        typeData,
        pageType,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            {StatusBar && <StatusBar status={props?.selectedOrder?.orderStatus} />}
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

const FinananceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(withSpinner(FinananceDetailsMasterBase));
export default FinananceDetailsMaster;
