/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Button } from 'antd';

import { bindActionCreators } from 'redux';
import { otfCustomerDetailsAction } from 'store/actions/data/otf/customerDetails';
import { geoPincodeDataActions } from 'store/actions/data/geo/pincode';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { PARAM_MASTER } from 'constants/paramMaster';
import { OTFFormButton } from '../OTFFormButton';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

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
    const { isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, pincodeData, otfSearchSelected, formActionType, setFormActionType } = props;
    const { isTypeDataLoaded, typeData, fetchConfigList, listConfigShowLoading } = props;
    const [form] = Form.useForm();
    const [billCstmForm] = Form.useForm();
    const [formData, setFormData] = useState('');
    const [otfData, setOtfData] = useState(otfSearchSelected);
    const [sameAsBookingCustomer, setSameAsBookingCustomer] = useState(false);
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [showDataLoading, setShowDataLoading] = useState(false);
    const [refershData, setRefershData] = useState(false);
    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
    const NEXT_ACTION = FROM_ACTION_TYPE?.NEXT;
console.log("formActionType",formActionType)
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
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        //setRefershData(false);
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
        const data = { bookingCustomer: { ...form.getFieldsValue(), birthDate: dayjs(form.getFieldsValue().birthDate).format('YYYY-MM-DD'), otfNumber: otfData?.otfNumber, bookingAndBillingType: 'BOOKING', id: customerFormData.bookingCustomer.id, sameAsBookingCustomer:sameAsBookingCustomer }, billingCustomer: { ...billCstmForm.getFieldsValue(), birthDate: dayjs(billCstmForm.getFieldsValue()?.birthDate).format('YYYY-MM-DD'), otfNumber: otfData?.otfNumber, bookingAndBillingType: 'BILLING', id: customerFormData.billingCustomer.id, sameAsBookingCustomer:sameAsBookingCustomer} };
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        };

        const onError = (message) => {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottomRight' });
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
    const handleButtonClick = ({ record = null, buttonAction, formVisible = false }) => {
        //form.resetFields();
        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION || buttonAction === NEXT_ACTION });
        //setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        //setIsFormVisible(true);
        //setOtfSearchSelected(record);
        //if (buttonAction === NEXT_ACTION) {
            //onst section = Object.values(sectionName)?.find((i) => i.id > currentSection);
            //section && setCurrentSection(section?.id);
        //}

        //if (buttonAction === VIEW_ACTION || !formVisible) {
            //setSelectedOrder(record);
            //record && setSelectedOrderId(record?.otfNumber);
            //defaultSection && setCurrentSection(defaultSection);
        //}
    };

    
    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add New ';
        }
    }, [formActionType]);

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
        handleButtonClick,
        typeData,
        sameAsBookingCustomer, 
        setSameAsBookingCustomer,
    };

    return (
        <div >
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
