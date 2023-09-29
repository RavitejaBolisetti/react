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
import { enginNumberDataActions } from 'store/actions/data/vehicleDeliveryNote/challanEngineNumber';
import { showGlobalNotification } from 'store/actions/notification';
import { formattedCalendarDate, convertDate } from 'utils/formatDateTime';

import { VehicleDeliveryNoteFormButton } from '../VehicleDeliveryNoteFormButton';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import styles from 'assets/sass/app.module.scss';
import { invoiceDetailsDataActions } from 'store/actions/data/vehicleDeliveryNote/challanInvoice';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleDeliveryNote: {
                InvoiceDetails: { isLoaded, isLoading, data: invoiceData = [] },
                RelationshipManager: { isLoaded: isRelationshipManagerLoaded = false, isloading: isRelationshipManagerLoading, data: relationshipManagerData = [] },
                VinNumberSearch: { isLoaded: vinNumberDataLoaded = false, isloading: vinNumberDataLoading, data: vinData = [] },
                EngineNumber: { isLoaded: engineNumberDataLoaded = false, isloading: engineNumberLoading, data: engineNumberData = [] },
                InvoiceDetailChallan: { isLoaded: challanInvoiceDetailsDataLoaded = false, isloading: challanInvoiceDetailsLoading, data: challanInvoiceDetail = [] },
            },
        },
    } = state;

    const moduleTitle = 'Insurance Details';

    let returnValue = {
        userId,
        isLoaded,
        // invoiceData,
        isLoading,
        moduleTitle,
        isRelationshipManagerLoaded,
        isRelationshipManagerLoading,
        relationshipManagerData,
        typeData,
        vinNumberDataLoaded,
        vinNumberDataLoading,
        vinData,
        engineNumberDataLoaded,
        engineNumberLoading,
        engineNumberData,

        challanInvoiceDetailsDataLoaded,
        challanInvoiceDetailsLoading,
        challanInvoiceDetail,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchvinNumber: vinNumberNoteDataActions.fetchList,
            listvinNumberShowLoading: vinNumberNoteDataActions.listShowLoading,

            fetchInvoiceChallan: invoiceDetailsDataActions.fetchList,
            listChallanInvoiceShowLoading: invoiceDetailsDataActions.listShowLoading,

            fetchEngineNumber: enginNumberDataActions.fetchList,
            listEngineNumberShowLoading: enginNumberDataActions.listShowLoading,

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
    const { fetchList, userId, vinData, listvinNumberShowLoading, fetchEngineNumber, listEngineNumberShowLoading, fetchvinNumber, listShowLoading, relationshipManagerData, invoiceData, isRelationshipManagerLoaded, setFormActionType, fetchRelationshipManger, listRelationshipMangerShowLoading, isLoading, record } = props;

    const { typeData, form, selectedOrderId, selectedInvoiceId, requestPayload, setRequestPayload, soldByDealer, formActionType, handleFormValueChange, handleButtonClick, NEXT_ACTION, section, resetData, engineNumberData, chassisNoValue, setChassisNoValue, challanInvoiceDetailsDataLoaded, challanInvoiceDetailsLoading, challanInvoiceDetail, fetchInvoiceChallan, listChallanInvoiceShowLoading } = props;
    const { buttonData, setButtonData } = props;
    const [isFormVisible, setIsFormVisible] = useState(false);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const [formData, setFormData] = useState();

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };
    console.log('invoiceDatainvoiceData', invoiceData, buttonData);
    useEffect(() => {
        if (invoiceData && soldByDealer) {
            form.setFieldsValue({ ...invoiceData, invoiceDate: formattedCalendarDate(invoiceData?.invoiceDate), customerPromiseDate: formattedCalendarDate(invoiceData?.customerPromiseDate) });
            setFormData({ ...invoiceData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceData, section]);
    useEffect(() => {
        setButtonData({ ...buttonData, formBtnActive: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section]);

    // const extraParams = [
    //     {
    //         key: 'invoiceNumber',
    //         title: 'invoiceNumber',
    //         value: selectedInvoiceId,
    //         name: 'Invoice Number',
    //     },
    // ];

    // useEffect(() => {
    //     if (userId && selectedInvoiceId && soldByDealer) {
    //         fetchList({ setIsLoading: listShowLoading, extraParams, userId });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, selectedInvoiceId, soldByDealer]);

    // useEffect(() => {
    //     if (userId && selectedInvoiceId && !soldByDealer) {
    //         const challanExtraParams = [
    //             {
    //                 key: 'invoiceNumber',
    //                 title: 'invoiceNumber',
    //                 value: selectedInvoiceId,
    //                 name: 'Invoice Number',
    //             },
    //             {
    //                 key: 'deliveryNoteId',
    //                 title: 'deliveryNoteId',
    //                 value: record?.vehicleDeliveryNote,
    //                 name: 'Delivery Note',
    //             },
    //         ];
    //         fetchInvoiceChallan({ setIsLoading: listChallanInvoiceShowLoading, extraParams: challanExtraParams, userId });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, selectedInvoiceId, soldByDealer]);

    // useEffect(() => {
    //     if (challanInvoiceDetailsDataLoaded && challanInvoiceDetail && !soldByDealer) {
    //         setFormData({ ...challanInvoiceDetail });
    //         setChassisNoValue(challanInvoiceDetail?.chassisNumber);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [challanInvoiceDetail, soldByDealer]);

    useEffect(() => {
        const extraParams = [
            {
                key: 'allEmployee',
                title: 'allEmployee',
                value: 'ALL',
                name: 'All Employees',
            },
        ];
        if (userId && soldByDealer) {
            fetchRelationshipManger({ setIsLoading: listRelationshipMangerShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, soldByDealer]);

    const handleOnChange = (e) => {
        form.setFieldsValue({
            engineNumber: '',
        });
        setChassisNoValue(e.target.value);
    };

    const handleChassisNoSearch = (val) => {
        if (!val) return;

        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };
        const searchParams = [
            {
                key: 'chassisNumber',
                title: 'chassisNumber',
                value: val || chassisNoValue,
                name: 'Chassis Number',
            },
        ];
        fetchvinNumber({ setIsLoading: listvinNumberShowLoading, userId, extraParams: searchParams, onSuccessAction, onErrorAction });
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
    };

    const formProps = {
        ...props,
        typeData,
        form,
        formData,
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
        handleChassisNoSearch,
        handleOnChange,
        chassisNoValue,
        vinData,
        relationshipManagerData,
        fetchEngineNumber,
        listEngineNumberShowLoading,
        engineNumberData,
        userId,
    };

    const viewProps = {
        formData,
        styles,
        isLoading,
        typeData,
        soldByDealer,
        handleChassisNoSearch,
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
                    <VehicleDeliveryNoteFormButton {...formProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const InvoiceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(InvoiceDetailsMasterBase);
