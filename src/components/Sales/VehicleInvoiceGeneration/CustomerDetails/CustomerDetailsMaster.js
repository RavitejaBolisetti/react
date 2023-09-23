/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { Form } from 'antd';
import { AddEditForm, ViewDetail } from 'components/Sales/Common/CustomerDetails';

import styles from 'assets/sass/app.module.scss';

export const CustomerDetailsMain = (props) => {
    const { isLoading, isDataLoaded, formData, showGlobalNotification, onFinishFailed } = props;
    const { isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, pincodeData, formActionType, NEXT_ACTION, handleButtonClick } = props;
    const { typeData, selectedOrderId } = props;
    const { buttonData, setButtonData, formKey, onFinishCustom = undefined } = props;
    const [sameAsBookingCustomer, setSameAsBookingCustomer] = useState(false);

    const [form] = Form.useForm();
    const [billCstmForm] = Form.useForm();
    const [activeKey, setActiveKey] = useState([]);

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
            const data = { bookingCustomer: { ...values?.bookingCustomer, otfNumber: selectedOrderId, bookingAndBillingType: 'BOOKING', id: formData?.bookingCustomer?.id, sameAsBookingCustomer: sameAsBookingCustomer }, billingCustomer: { ...values?.billingCustomer, otfNumber: selectedOrderId, bookingAndBillingType: 'BILLING', id: formData?.billingCustomer?.id, sameAsBookingCustomer: sameAsBookingCustomer } };

            onFinishCustom({ key: formKey, values: data });
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setButtonData({ ...buttonData, formBtnActive: false });
        }
    };

    const formProps = {
        ...props,
        form,
        billCstmForm,
        formData,
        formActionType,
        onFinish,
        onFinishFailed,

        listPinCodeShowLoading,
        fetchPincodeDetail,
        isPinCodeLoading,
        pincodeData,
        typeData,
        isDataLoaded,
        isLoading,
        activeKey,
        setActiveKey,
        sameAsBookingCustomer,
        setSameAsBookingCustomer,
        showAgeGroup: false,
    };

    const viewProps = {
        formData,
        styles,
        isLoading,
        activeKey,
        setActiveKey,
        formActionType,
    };

    return formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} viewOnly={true} />;
};

export const CustomerDetailsMaster = CustomerDetailsMain;
