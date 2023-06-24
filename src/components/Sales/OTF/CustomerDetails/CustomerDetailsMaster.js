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
import { geoPincodeDataActions } from 'store/actions/data/geo/pincode';
import { OTFFormButton } from '../OTFFormButton';

import AddEditForm from './AddEditForm';
import { showGlobalNotification } from 'store/actions/notification';
import dayjs from 'dayjs';

import styles from 'components/common/Common.module.css';

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
            showGlobalNotification,

            listPinCodeShowLoading: geoPincodeDataActions.listShowLoading,
            fetchPincodeDetail: geoPincodeDataActions.fetchList,
        },
        dispatch
    ),
});

export const CustomerDetailsMain = (props) => {
    const { saveData, userId, isDataLoaded, fetchList, listShowLoading, customerFormData, showGlobalNotification } = props;
    const { isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, pincodeData, otfSearchSelected, formActionType, NEXT_EDIT_ACTION, handleButtonClick } = props;
    const { typeData } = props;
    const [form] = Form.useForm();
    const [billCstmForm] = Form.useForm();
    const [formData, setFormData] = useState('');
    const [otfData, setOtfData] = useState(otfSearchSelected);
    const [sameAsBookingCustomer, setSameAsBookingCustomer] = useState(false);
    const [showDataLoading, setShowDataLoading] = useState(false);

    useEffect(() => {
        if (userId && isDataLoaded && customerFormData) {
            setFormData(customerFormData);
        }
    }, [isDataLoaded, userId, customerFormData]);

    const selectedOTF = otfSearchSelected?.otfNumber;

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setShowDataLoading(false);
    };

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOTF,
            name: 'OTF Number',
        },
    ];

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const onFinish = () => {
        form.getFieldsValue();
        const data = { bookingCustomer: { ...form.getFieldsValue(), birthDate: dayjs(form.getFieldsValue().birthDate).format('YYYY-MM-DD'), otfNumber: otfData?.otfNumber, bookingAndBillingType: 'BOOKING', id: customerFormData.bookingCustomer.id, sameAsBookingCustomer: sameAsBookingCustomer }, billingCustomer: { ...billCstmForm.getFieldsValue(), birthDate: dayjs(billCstmForm.getFieldsValue()?.birthDate).format('YYYY-MM-DD'), otfNumber: otfData?.otfNumber, bookingAndBillingType: 'BILLING', id: customerFormData.billingCustomer.id, sameAsBookingCustomer: sameAsBookingCustomer } };
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

            handleButtonClick({ record: res?.data, buttonAction: NEXT_EDIT_ACTION });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
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
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const formProps = {
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
    };

    return (
        <div>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <AddEditForm {...formProps} />
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <OTFFormButton {...props} />
                </Col>
            </Row>
        </div>
    );
};

export const CustomerDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsMain);
