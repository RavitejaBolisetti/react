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
    const { isLoading, isDataLoaded, formData } = props;
    const { isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, pincodeData, formActionType } = props;
    const { typeData } = props;
    const { activeKey, setActiveKey } = props;
    const [sameAsBookingCustomer, setSameAsBookingCustomer] = useState(false);

    const [form] = Form.useForm();
    const [billCstmForm] = Form.useForm();

    const formProps = {
        ...props,
        form,
        billCstmForm,
        formData,
        formActionType,
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
    };

    const viewProps = {
        formData,
        styles,
        isLoading,
        activeKey,
        setActiveKey,
        formActionType,
        showAgeGroup: false,
        typeData,
    };

    return formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} viewOnly={true} />;
};

export const CustomerDetailsMaster = CustomerDetailsMain;
