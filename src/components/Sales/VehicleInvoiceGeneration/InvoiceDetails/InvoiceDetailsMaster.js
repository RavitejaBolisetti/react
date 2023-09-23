/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';

import { CustomerDetailsMaster } from 'components/Sales/VehicleInvoiceGeneration/CustomerDetails';

import styles from 'assets/sass/app.module.scss';

const InvoiceDetailsMasterBase = (props) => {
    const { typeData, selectedOrder, fetchInvoiceDetail, listShowLoading, vehicleInvoiceMasterData, selectedOrderId } = props;
    const { userId, buttonData, setButtonData, showGlobalNotification, section, isDataLoaded, isLoading, invoiceDetailForm } = props;
    const { form, formActionType, selectedOtfNumber, setSelectedOtfNumber } = props;
    const { FormActionButton, requestPayload, setRequestPayload, handleButtonClick, NEXT_ACTION, handleBookingNumberSearch } = props;

    const [activeKey, setActiveKey] = useState([]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (userId && selectedOrder?.invoiceNumber) {
            const onSuccessAction = () => {
                setButtonData({ ...buttonData, formBtnActive: true });
            };
            const extraParams = [
                {
                    key: 'invoiceNumber',
                    title: 'invoiceNumber',
                    value: selectedOrder?.invoiceNumber,
                    name: 'Invoice Number',
                },
            ];
            fetchInvoiceDetail({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrder?.invoiceNumber]);

    const handleChange = (e) => {
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinish = (values) => {
        const { otfDetailsRequest, ...bookingAndBillingCustomerDto } = values;
        if (!Object?.keys(bookingAndBillingCustomerDto)?.length) {
            setRequestPayload({ ...requestPayload, invoiceDetails: { otfDetailsRequest, bookingAndBillingCustomerDto: { ...requestPayload?.invoiceDetails?.bookingAndBillingCustomerDto } } });
        } else {
            setRequestPayload({ ...requestPayload });
        }
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
        isLoading,
        setActiveKey,
        activeKey,
        selectedOtfNumber,
        setSelectedOtfNumber,
        wrapForm: false,
        handleBookingNumberSearch,
        selectedOrderId,
    };

    const viewProps = {
        typeData,
        formActionType,
        styles,
        isLoading,
        wrapForm: false,
        selectedOrderId,
    };
    console.log('Hello',vehicleInvoiceMasterData)
    return (
        <Form layout="vertical" autoComplete="off" form={invoiceDetailForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? (
                        <>
                            <ViewDetail {...viewProps} formData={vehicleInvoiceMasterData?.invoiceDetails?.otfDetailsRequest} />
                            <CustomerDetailsMaster {...viewProps} formData={vehicleInvoiceMasterData?.invoiceDetails?.bookingAndBillingCustomerDto} />
                        </>
                    ) : (
                        <>
                            <AddEditForm {...formProps} formData={vehicleInvoiceMasterData?.invoiceDetails?.otfDetailsRequest} />
                            <CustomerDetailsMaster {...formProps} formData={vehicleInvoiceMasterData?.invoiceDetails?.bookingAndBillingCustomerDto} />
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

export const InvoiceDetailsMaster = InvoiceDetailsMasterBase;
