/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import ViewDetail from './ViewDetail';

import styles from 'assets/sass/app.module.scss';
import { formattedCalendarDate } from 'utils/formatDateTime';

const RequestDetailsMasterBase = (props) => {
    const { typeData, vehicleInvoiceMasterData, selectedOrderId } = props;
    const { userId, buttonData, setButtonData, section, isDataLoaded, isLoading, invoiceDetailForm } = props;
    const { selectedAMC, formActionType, handleCancelRequest, selectedOtfNumber, setSelectedOtfNumber } = props;

    const { form, FormActionButton, requestPayload, setRequestPayload, handleButtonClick, NEXT_ACTION, handleBookingNumberSearch, CustomerForm, showGlobalNotification, salesConsultantLovData } = props;

    const [activeKey, setActiveKey] = useState([3]);
    const handleChange = (e) => {
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinish = (values) => {
        // const { otfDetailsRequest, ...bookingAndBillingCustomerDto } = values;
        // if (!Object?.keys(bookingAndBillingCustomerDto)?.length) {
        //     if (!requestPayload?.invoiceDetails?.bookingAndBillingCustomerDto?.billingCustomer) {
        //         showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Please provide billing customer details' });
        //         setActiveKey([3, 2]);
        //         return false;
        //     } else if (!requestPayload?.invoiceDetails?.bookingAndBillingCustomerDto?.bookingCustomer) {
        //         showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Please provide booking customer details' });
        //         setActiveKey([3, 1]);
        //         return false;
        //     } else setRequestPayload({ ...requestPayload, invoiceDetails: { otfDetailsRequest, bookingAndBillingCustomerDto: { ...requestPayload?.invoiceDetails?.bookingAndBillingCustomerDto } } });
        // } else {
        //     setRequestPayload({ ...requestPayload, invoiceDetails: { otfDetailsRequest, bookingAndBillingCustomerDto: CustomerForm.getFieldsValue() } });
        // }
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinishFailed = () => {};

    const viewProps = {
        selectedAMC,
        typeData,
        formActionType,
        styles,
        isLoading,
        wrapForm: false,
        handleCancelRequest,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>

                    {formActionType?.viewMode && <ViewDetail {...viewProps} formData={[requestPayload?.amcRequestDetails]} />}
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

const RequestDetailsMaster = RequestDetailsMasterBase;
export default RequestDetailsMaster;
