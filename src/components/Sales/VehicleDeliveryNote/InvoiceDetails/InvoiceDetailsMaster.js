/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';
import { bindActionCreators } from 'redux';

import { invoiceDetailDataActions } from 'store/actions/data/vehicleDeliveryNote/invoiceDetails';
import { relationshipManagerDataActions } from 'store/actions/data/vehicleDeliveryNote/relationshipManager';
import { showGlobalNotification } from 'store/actions/notification';

import { VehicleDeliveryNoteFormButton } from '../VehicleDeliveryNoteFormButton';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleDeliveryNote: {
                InvoiceDetails: { isLoaded, isLoading, data: invoiceData = [] },
                RelationshipManager: { isLoaded: isRelationshipManagerLoaded = false, isloading: isRelationshipManagerLoading, data: relationshipManagerData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Insurance Details';

    let returnValue = {
        userId,
        isLoaded,
        invoiceData,
        isLoading,
        moduleTitle,
        isRelationshipManagerLoaded,
        isRelationshipManagerLoading,
        relationshipManagerData,
        typeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchRelationshipManger: relationshipManagerDataActions.fetchList,
            listRelationshipMangerShowLoading: relationshipManagerDataActions.listShowLoading,

            fetchList: invoiceDetailDataActions.fetchList,
            saveData: invoiceDetailDataActions.saveData,
            resetData: invoiceDetailDataActions.reset,
            listShowLoading: invoiceDetailDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const InvoiceDetailsMasterBase = (props) => {
    const { fetchList, userId, listShowLoading, relationshipManagerData, invoiceData, isRelationshipManagerLoaded, setFormActionType, fetchRelationshipManger, listRelationshipMangerShowLoading, isLoading } = props;

    const { typeData, form, selectedOrderId, selectedOrder, formActionType, handleFormValueChange, handleButtonClick, NEXT_ACTION, section } = props;

    const [isFormVisible, setIsFormVisible] = useState(false);
    console.log('🚀 ~ file: InvoiceDetailsMaster.js:28 ~ mapStateToProps ~ relationshipManagerData:', relationshipManagerData);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const [formData, setFormData] = useState();

    // useEffect(() => {
    //     if (invoiceData) {
    //         form.setFieldsValue({ ...invoiceData, doDate: convertDateToCalender(invoiceData?.doDate) });
    //         setFormData({ ...invoiceData, doDate: convertDateToCalender(invoiceData?.doDate) });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [invoiceData]);

    // useEffect(() => {
    //     return () => {
    //         setFormData();
    //         resetData();
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const extraParams = [
        {
            key: 'invoiceNumber',
            title: 'invoiceNumber',
            value: selectedOrder?.invoiceId,
            name: 'Invoice Number',
        },
    ];

    useEffect(() => {
        if (userId && selectedOrder?.invoiceId) {
            fetchList({ setIsLoading: listShowLoading, extraParams, onErrorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrder?.invoiceId]);

    useEffect(() => {
        if (userId && !isRelationshipManagerLoaded) {
            fetchRelationshipManger({ setIsLoading: listRelationshipMangerShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isRelationshipManagerLoaded]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification(message);
    };

    const onFinish = (values) => {
        const data = { ...values, id: invoiceData?.id, otfNumber: selectedOrderId, doDate: values?.doDate };

        // const onSuccess = (res) => {
        //     form.resetFields();
        //     showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
        //     fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, onErrorAction, userId });
        //     handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        // };

        // const requestData = {
        //     data: data,
        //     method: invoiceData?.id ? 'put' : 'post',
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
        formData: invoiceData,
        // invoiceData,
        formActionType,
        setFormActionType,
        fetchList,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        isRelationshipManagerLoaded,
        fetchRelationshipManger,
        listRelationshipMangerShowLoading,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        handleButtonClick,
        selectedOrder,
        selectedOrderId,
    };

    const viewProps = {
        formData: invoiceData,
        styles,
        isLoading,
        typeData,
        selectedOrder,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>

                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleDeliveryNoteFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const InvoiceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(InvoiceDetailsMasterBase);
