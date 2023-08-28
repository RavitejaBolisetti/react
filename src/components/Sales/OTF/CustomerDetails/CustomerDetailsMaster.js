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
import { geoPinCodeDataActions } from 'store/actions/data/geo/pincodes';
import { showGlobalNotification } from 'store/actions/notification';

import { OTFStatusBar } from '../utils/OTFStatusBar';
import { OTFFormButton } from '../OTFFormButton';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';

import dayjs from 'dayjs';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                OtfCustomerDetails: { isLoaded: isDataLoaded = false, isLoading, data: customerFormData = {} },
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

    const moduleTitle = 'Customer Details';

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        isLoading,
        customerFormData,
        isPinCodeDataLoaded,
        isPinCodeLoading,
        pincodeData,

        isTypeDataLoaded,
        isTypeDataLoading,
        typeData: typeData,

        moduleTitle,
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
            showGlobalNotification,

            listPinCodeShowLoading: geoPinCodeDataActions.listShowLoading,
            fetchPincodeDetail: geoPinCodeDataActions.fetchList,
        },
        dispatch
    ),
});

export const CustomerDetailsMain = (props) => {
    const { resetData, saveData, isLoading, userId, isDataLoaded, fetchList, listShowLoading, customerFormData, showGlobalNotification, onFinishFailed } = props;
    const { isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, pincodeData, formActionType, NEXT_ACTION, handleButtonClick, section } = props;
    const { setButtonData, buttonData, typeData, selectedOrderId } = props;
    const [form] = Form.useForm();
    const [billCstmForm] = Form.useForm();
    const [formData, setFormData] = useState('');
    const [sameAsBookingCustomer, setSameAsBookingCustomer] = useState(false);
    const [activeKey, setActiveKey] = useState([]);

    useEffect(() => {
        if (userId && customerFormData) {
            setFormData(customerFormData);
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
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'OTF Number',
        },
    ];

    useEffect(() => {
        if (userId && selectedOrderId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    const onFinish = (values) => {
        if (!values?.bookingCustomer?.customerId) {
            showGlobalNotification({ message: 'Please provide booking customer' });
            setActiveKey([...activeKey, !values?.bookingCustomer?.customerId ? 1 : '']);
            return false;
        } else if (!values?.billingCustomer?.customerId) {
            showGlobalNotification({ message: 'Please provide billing customer' });
            setActiveKey([...activeKey, !values?.billingCustomer?.customerId ? 2 : '']);
            return false;
        } else {
            form.getFieldsValue();
            const data = { bookingCustomer: { ...values?.bookingCustomer, otfNumber: selectedOrderId, bookingAndBillingType: 'BOOKING', id: customerFormData?.bookingCustomer?.id, sameAsBookingCustomer: sameAsBookingCustomer }, billingCustomer: { ...values?.billingCustomer, otfNumber: selectedOrderId, bookingAndBillingType: 'BILLING', id: customerFormData?.billingCustomer?.id, sameAsBookingCustomer: sameAsBookingCustomer } };
            const onSuccess = (res) => {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, onError, extraParams });
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            };

            const onError = (message) => {
                // showGlobalNotification({ message });
            };

            const requestData = {
                data: data,
                method: 'put',
                setIsLoading: listShowLoading,
                userId,
                onError,
                onSuccess,
            };
            saveData(requestData);
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
        onFinishFailed,

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
    };

    const viewProps = {
        formData,
        styles,
        isLoading,
        activeKey,
        setActiveKey,
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
        if (sameAsBookingCustomer) {
            let bookingCustomer = form.getFieldsValue()?.bookingCustomer;
            form?.setFieldsValue({ billingCustomer: { ...bookingCustomer } });
        }
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <OTFStatusBar status={props?.selectedOrder?.orderStatus} />
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <OTFFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const CustomerDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsMain);
