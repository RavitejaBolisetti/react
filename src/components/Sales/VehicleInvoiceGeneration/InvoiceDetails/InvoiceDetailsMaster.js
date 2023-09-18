/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { partyDetailDataActions } from 'store/actions/data/receipt/partyDetails';
import { showGlobalNotification } from 'store/actions/notification';
import { CustomerDetailsMaster } from 'components/Sales/Common/CustomerDetails';
import { vehicleInvoiceDetailDataActions } from 'store/actions/data/invoiceGeneration/vehicleInvoiceDetail';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            VehicleInvoiceGeneration: {
                VehicleInvoiceDetail: { isLoaded: isVehicleInvoiceDataLoaded = false, isLoading: isVehicleInvoiceDataLoading, data: vehicleInvoiceData = [] },
            },
            Receipt: {
                PartyDetails: { isLoaded: isDataLoaded = false, isLoading, data: partyDetailData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Party Details';

    let returnValue = {
        userId,
        partyDetailData,
        isDataLoaded,
        isLoading,
        moduleTitle,
        isVehicleInvoiceDataLoaded,
        isVehicleInvoiceDataLoading,
        vehicleInvoiceData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCustomerDetail: partyDetailDataActions.fetchList,
            fetchInvoiceDetail: vehicleInvoiceDetailDataActions.fetchList,
            fetchPartyDetail: partyDetailDataActions.fetchList,
            resetData: partyDetailDataActions.reset,
            listShowLoading: partyDetailDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const InvoiceDetailsMasterBase = (props) => {
    const { typeData, otfData, selectedOrder, fetchInvoiceDetail, listShowLoading, vehicleInvoiceMasterData } = props;
    const { userId, buttonData, setButtonData, showGlobalNotification, section, isDataLoaded, isLoading, invoiceDetailForm } = props;
    const { form, formActionType, handleFormValueChange, selectedOtfNumber, setSelectedOtfNumber } = props;
    const { FormActionButton, requestPayload, setRequestPayload, handleButtonClick, NEXT_ACTION, handleBookingNumberSearch } = props;

    const [activeKey, setActiveKey] = useState([]);
    const { formData, setFormData } = useState();

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        setFormData(setFormData?.otfDetailsRequest);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleInvoiceMasterData]);

    useEffect(() => {
        if (userId && selectedOrder?.invoiceNumber) {
            const extraParams = [
                {
                    key: 'invoiceNumber',
                    title: 'invoiceNumber',
                    value: selectedOrder?.invoiceNumber,
                    name: 'Invoice Number',
                },
            ];
            fetchInvoiceDetail({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrder?.invoiceNumber]);

    const handleChange = (e) => {
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinish = (values) => {
        const { otfDetailsRequest, ...bookingAndBillingCustomerDto } = values;
        setRequestPayload({ ...requestPayload, invoiceDetails: { otfDetailsRequest, bookingAndBillingCustomerDto: { ...bookingAndBillingCustomerDto } } });
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
        formName: 'otfDetailsRequest',
        form,
        typeData,
        handleChange,
        formActionType,
        userId,
        isDataLoaded,
        otfFormData: formData?.otfDetailsRequest,

        isLoading,
        setActiveKey,
        activeKey,
        selectedOtfNumber,
        setSelectedOtfNumber,
        wrapForm: false,
        handleBookingNumberSearch,
    };

    const viewProps = {
        typeData,
        formData: formData?.otfDetailsRequest,
        formActionType,
        styles,
        isLoading,
        wrapForm: false,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={invoiceDetailForm} onValuesChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? (
                        <>
                            <ViewDetail {...viewProps} />
                            <CustomerDetailsMaster {...viewProps} />
                        </>
                    ) : (
                        <>
                            <AddEditForm {...formProps} />
                            <CustomerDetailsMaster {...formProps} />
                        </>
                    )}
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

export const InvoiceDetailsMaster = connect(null, null)(InvoiceDetailsMasterBase);
