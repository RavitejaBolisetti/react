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
import { vinNumberNoteDataActions } from 'store/actions/data/vehicleDeliveryNote/challanVinNumber';
import { showGlobalNotification } from 'store/actions/notification';
import { formattedCalendarDate, convertDate } from 'utils/formatDateTime';

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
                VinNumberSearch: { isLoaded: vinNumberDataLoaded = false, isloading: vinNumberDataLoading, data: vinData = [] },
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
        vinNumberDataLoaded,
        vinNumberDataLoading,
        vinData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchvinNumber: vinNumberNoteDataActions.fetchList,
            listvinNumberShowLoading: vinNumberNoteDataActions.listShowLoading,

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
    const { fetchList, userId, vinData, listvinNumberShowLoading, fetchvinNumber, listShowLoading, relationshipManagerData, invoiceData, isRelationshipManagerLoaded, setFormActionType, fetchRelationshipManger, listRelationshipMangerShowLoading, isLoading } = props;

    const { typeData, form, selectedOrderId, selectedInvoiceId, requestPayload, setRequestPayload, soldByDealer, formActionType, handleFormValueChange, handleButtonClick, NEXT_ACTION, section, resetData } = props;
    // console.log('INVOICE', requestPayload);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const [formData, setFormData] = useState();
    const [invoiceNoValue, setInvoiceNoValue] = useState();

    useEffect(() => {
        if (invoiceData && selectedInvoiceId) {
            form.setFieldsValue({ ...invoiceData, invoiceDate: formattedCalendarDate(invoiceData?.invoiceDate), customerPromiseDate: formattedCalendarDate(invoiceData?.customerPromiseDate) });
            setFormData({ ...invoiceData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceData]);

    useEffect(() => {
        return () => {
            setFormData();
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const extraParams = [
        {
            key: 'invoiceNumber',
            title: 'invoiceNumber',
            value: selectedInvoiceId,
            name: 'Invoice Number',
        },
    ];

    useEffect(() => {
        if (userId && selectedInvoiceId) {
            fetchList({ setIsLoading: listShowLoading, extraParams, onErrorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedInvoiceId]);

    useEffect(() => {
        if (userId) {
            fetchRelationshipManger({ setIsLoading: listRelationshipMangerShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const handleOnChange = (e) => {
        form.setFieldsValue({
            engineNumber: '',
        });
        setInvoiceNoValue(e.target.value);
    };

    const handleInvoiceNoSearch = (val) => {
        console.log("🚀 ~ file: InvoiceDetailsMaster.js:139 ~ handleInvoiceNoSearch ~ val:", val)
        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };
        const onErrorAction = (message) => {
            showGlobalNotification({ message });
        };
        const searchParams = [
            {
                key: 'vin',
                title: 'vin',
                value: invoiceNoValue || val,
                name: 'Vin Number',
            },
        ];
        fetchvinNumber({ setIsLoading: listvinNumberShowLoading, userId, extraParams: searchParams, onSuccessAction, onErrorAction });
    };

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification(message);
    };

    const onFinish = (values) => {
        const invoiceDetailsRequest = { ...values };
        setRequestPayload({ ...requestPayload, deliveryNoteInvoiveDetails: { ...invoiceDetailsRequest, invoiceDate: convertDate(invoiceData?.invoiceDate), customerPromiseDate: convertDate(invoiceData?.customerPromiseDate) } });
        delete invoiceDetailsRequest?.deliveryNoteFor;
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
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
        soldByDealer,
        selectedOrderId,
        handleInvoiceNoSearch,
        handleOnChange,
        invoiceNoValue,
        vinData,
        relationshipManagerData,
    };

    const viewProps = {
        formData: invoiceData,
        styles,
        isLoading,
        typeData,
        soldByDealer,
        handleInvoiceNoSearch,
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
