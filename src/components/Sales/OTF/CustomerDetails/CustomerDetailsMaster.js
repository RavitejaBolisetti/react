/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'antd';

import { bindActionCreators } from 'redux';
import { otfCustomerDetailsAction } from 'store/actions/data/otf/customerDetails';
import { geoPincodeDataActions } from 'store/actions/data/geo/pincode';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { PARAM_MASTER } from 'constants/paramMaster';

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

            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,
        },
        dispatch
    ),
});

export const CustomerDetailsMain = (props) => {
    const { saveData, userId, isDataLoaded, fetchList, listShowLoading, customerFormData, showGlobalNotification, isLoading } = props;
    const { isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, pincodeData, otfSearchSelected } = props;
    const { isTypeDataLoaded, typeData, fetchConfigList, listConfigShowLoading } = props;
    const [form] = Form.useForm();
    const [billCstmForm] = Form.useForm();
    const [formData, setFormData] = useState('');
    const [edit, setEdit] = useState(false);

    const [showDataLoading, setShowDataLoading] = useState(false);
    const [refershData, setRefershData] = useState(false);

    useEffect(() => {
        if (userId && isDataLoaded && customerFormData) {
            setFormData(customerFormData);
        }
    }, [isDataLoaded, userId, customerFormData]);

    useEffect(() => {
        if (!isTypeDataLoaded && userId) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CUST_TYPE.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isTypeDataLoaded]);

    const selectedOTF = otfSearchSelected?.otfNumber;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
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
        const data = { bookingCustomer: { ...form.getFieldsValue(), birthDate: dayjs(form.getFieldsValue().birthDate).format('YYYY-MM-DD'), otfNumber: selectedOTF, bookingAndBillingType: 'BOOKING', id: customerFormData.bookingCustomer.id, customerId: 'CUS001' }, billingCustomer: { ...billCstmForm.getFieldsValue(), birthDate: dayjs(billCstmForm.getFieldsValue()?.birthDate).format('YYYY-MM-DD'), otfNumber: selectedOTF, bookingAndBillingType: 'BILLING', id: customerFormData.billingCustomer.id, customerId: 'CUS001' } };
        const onSuccess = (res) => {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
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
        edit,
        form,
        billCstmForm,
        customerFormData,
        formData,

        onFinish,
        onFinishFailed,

        listPinCodeShowLoading,
        fetchPincodeDetail,
        isPinCodeLoading,
        pincodeData,

        typeData,
    };

    const handleClick = () => {
        setEdit(!edit);
    };

    return (
        <div className={styles.drawerCustomerMaster}>
            <AddEditForm {...formProps} />
            <Button onClick={handleClick}>Edit</Button>
        </div>
    );
};

export const CustomerDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsMain);
