/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';

import { bindActionCreators } from 'redux';
import { otfCustomerDetailsAction } from 'store/actions/data/otf/customerDetails';
import { customerDetailsIndividualDataActions } from 'store/actions/data/customerMaster/customerDetailsIndividual';
import { geoPinCodeDataActions } from 'store/actions/data/geo/pincodes';
import { showGlobalNotification } from 'store/actions/notification';
import { BASE_URL_VEHICLE_CUSTOMER_COMMON_DETAIL as customURL } from 'constants/routingApi';
import dayjs from 'dayjs';
import { AddEditForm, ViewDetail } from 'components/Sales/Common/CustomerDetails';
import { translateContent } from 'utils/translateContent';
import { convertDateTimedayjs } from 'utils/formatDateTime';
import { withSpinner } from 'components/withSpinner';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state, props) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                OtfCustomerDetails: { isLoaded: isDataLoaded = false, isLoading, isLoadingOnSave, data: customerFormData = {} },
            },
            Geo: {
                Pincode: { isLoaded: isPinCodeDataLoaded = false, isLoading: isPinCodeLoading, data: pincodeData },
            },
            ConfigurableParameterEditing: { isLoaded: isTypeDataLoaded = false, isTypeDataLoading, filteredListData: typeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        isLoading,
        showSpinner: !props?.formActionType?.viewMode,
        isLoadingOnSave,
        customerFormData,
        isPinCodeDataLoaded,
        isPinCodeLoading,
        pincodeData,
        isTypeDataLoaded,
        isTypeDataLoading,
        typeData: typeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            listShowLoading: otfCustomerDetailsAction.listShowLoading,
            fetchList: otfCustomerDetailsAction.fetchList,
            saveData: otfCustomerDetailsAction.saveData,
            resetData: otfCustomerDetailsAction.reset,
            saveFormShowLoading: otfCustomerDetailsAction.saveFormShowLoading,
            showGlobalNotification,

            listPinCodeShowLoading: geoPinCodeDataActions.listShowLoading,
            fetchPincodeDetail: geoPinCodeDataActions.fetchList,
            fetchCustomerDetailData: customerDetailsIndividualDataActions.fetchData,
        },
        dispatch
    ),
});

export const CustomerDetailsMain = (props) => {
    const { resetData, saveData, isLoading, userId, isDataLoaded, fetchList, listShowLoading, saveFormShowLoading, customerFormData, showGlobalNotification } = props;
    const { isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, pincodeData, formActionType, NEXT_ACTION, handleButtonClick, section, fetchCustomerDetailData } = props;
    const { typeData, selectedRecordId } = props;
    const { buttonData, setButtonData, formKey, onFinishCustom = undefined, FormActionButton, StatusBar } = props;

    const [form] = Form.useForm();
    const [billCstmForm] = Form.useForm();
    const [formData, setFormData] = useState('');
    const [sameAsBookingCustomer, setSameAsBookingCustomer] = useState(false);
    const [activeKey, setActiveKey] = useState([]);

    useEffect(() => {
        if (userId && customerFormData) {
            setFormData(customerFormData);
            setButtonData({ ...buttonData, formBtnActive: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, customerFormData]);

    useEffect(() => {
        return () => {
            setFormData();
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };

    const extraParams = [
        {
            key: 'otfId',
            value: selectedRecordId,
        },
    ];

    useEffect(() => {
        if (userId && selectedRecordId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    const onFinish = (values) => {
        let data;
        if (!values?.bookingCustomer?.customerId && !formData?.bookingCustomer?.customerId) {
            showGlobalNotification({ message: translateContent('commonModules.validation.mandatoryBookingCustomer') });
            setActiveKey([...activeKey, !values?.bookingCustomer?.customerId ? 1 : '']);
            return false;
        } else if (!values?.billingCustomer?.customerId && activeKey.includes(2)) {
            showGlobalNotification({ message: translateContent('commonModules.validation.mandatoryBillingCustomer') });
            setActiveKey([...activeKey, !values?.billingCustomer?.customerId ? 2 : '']);
            return false;
        } else {
            if (!values?.bookingCustomer?.customerId && formData?.bookingCustomer?.customerId) {
                data = { otfId: selectedRecordId, bookingCustomer: { ...formData?.bookingCustomer, birthDate: convertDateTimedayjs(formData?.bookingCustomer?.birthDate, 'YYYY-MM-DD HH:mm:ss', 'NA'), otfId: selectedRecordId }, billingCustomer: { ...values?.billingCustomer, birthDate: convertDateTimedayjs(values?.billingCustomer?.birthDate, 'YYYY-MM-DD HH:mm:ss', 'NA'), otfId: selectedRecordId, bookingAndBillingType: 'BILLING', id: customerFormData?.billingCustomer?.id, sameAsBookingCustomer: sameAsBookingCustomer } };
            } else if (!values?.billingCustomer?.customerId && formData?.billingCustomer?.customerId) {
                data = {
                    otfId: selectedRecordId,
                    bookingCustomer: { ...values?.bookingCustomer, birthDate: convertDateTimedayjs(values?.bookingCustomer?.birthDate, 'YYYY-MM-DD HH:mm:ss', 'NA'), otfId: selectedRecordId, bookingAndBillingType: 'BOOKING', id: customerFormData?.bookingCustomer?.id },
                    billingCustomer: { ...formData?.billingCustomer, birthDate: convertDateTimedayjs(formData?.billingCustomer?.birthDate, 'YYYY-MM-DD HH:mm:ss', 'NA'), otfId: selectedRecordId, bookingAndBillingType: 'BILLING', id: customerFormData?.billingCustomer?.id, sameAsBookingCustomer: formData?.billingCustomer?.sameAsBookingCustomer },
                };
            } else {
                data = {
                    otfId: selectedRecordId,
                    bookingCustomer: { ...values?.bookingCustomer, birthDate: convertDateTimedayjs(values?.bookingCustomer?.birthDate, 'YYYY-MM-DD HH:mm:ss', 'NA'), otfId: selectedRecordId, bookingAndBillingType: 'BOOKING', id: customerFormData?.bookingCustomer?.id, sameAsBookingCustomer: sameAsBookingCustomer },
                    billingCustomer: { ...values?.billingCustomer, birthDate: convertDateTimedayjs(values?.billingCustomer?.birthDate, 'YYYY-MM-DD HH:mm:ss', 'NA'), otfId: selectedRecordId, bookingAndBillingType: 'BILLING', id: customerFormData?.billingCustomer?.id, sameAsBookingCustomer: sameAsBookingCustomer },
                };
            }

            if (onFinishCustom) {
                onFinishCustom({ key: formKey, values: data });
                handleButtonClick({ buttonAction: NEXT_ACTION });
                setButtonData({ ...buttonData, formBtnActive: false });
            } else {
                const onSuccess = (res) => {
                    showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
                    fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, onError, extraParams });
                    handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION, onSave: true });
                };

                const onError = (message) => {
                    showGlobalNotification({ message });
                };

                const requestData = {
                    data: data,
                    method: 'put',
                    setIsLoading: saveFormShowLoading,
                    userId,
                    onError,
                    onSuccess,
                };
                saveData(requestData);
            }
        }
    };

    const fnSetData = (data, type) => {
        if (data?.customerId) {
            const extraParams = [
                {
                    key: 'customerId',
                    title: 'customerId',
                    value: data?.customerId,
                    name: 'Customer ID',
                },
            ];
            fetchCustomerDetailData({
                customURL,
                setIsLoading: () => {},
                extraParams,
                userId,
                onSuccessAction: (response) => {
                    setFormData({ ...formData, [type]: { ...response?.data, birthDate: response?.data?.dateOfBirth, gstin: response?.data?.gstin, panNo: response?.data?.pan } });
                    setButtonData({ ...buttonData, formBtnActive: true });
                },
                onErrorAction,
            });
        }
    };

    const formProps = {
        ...props,
        form,
        billCstmForm,
        customerFormData,
        formData,
        formActionType,
        onFinish,

        listPinCodeShowLoading,
        fetchPincodeDetail,
        isPinCodeLoading,
        pincodeData,
        typeData,
        sameAsBookingCustomer,
        setSameAsBookingCustomer,
        isDataLoaded,
        isLoading,
        activeKey,
        setActiveKey,
        fnSetData,
    };

    const viewProps = {
        typeData,
        formData,
        styles,
        isLoading,
        activeKey,
        setActiveKey,
        formActionType,
    };

    const handleFormValueChange = (val) => {
        let isInitial2 = Object.keys(val?.billingCustomer || {});
        let isInitial = val?.[0]?.name?.includes('sameAsBookingCustomer') || isInitial2?.includes('sameAsBookingCustomer');
        setButtonData({ ...buttonData, formBtnActive: true });
        if ((isInitial && !sameAsBookingCustomer) || (!isInitial && sameAsBookingCustomer)) {
            let bookingCustomer = form.getFieldsValue()?.bookingCustomer;
            const data = { ...bookingCustomer, birthDate: bookingCustomer?.birthDate ? dayjs(bookingCustomer?.birthDate) : null };
            form?.setFieldsValue({ billingCustomer: { ...data }, bookingCustomer: { ...data } });
        }
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

export const CustomerDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(withSpinner(CustomerDetailsMain));
