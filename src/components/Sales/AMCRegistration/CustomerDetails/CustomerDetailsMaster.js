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
import AddEditForm from './AddEditForm';
import { BASE_URL_VEHICLE_CUSTOMER_COMMON_DETAIL as customURL } from 'constants/routingApi';

// import AddeditForm from './AddeditForm';

const CustomerDetailsMasterBase = (props) => {
    const { typeData, vehicleInvoiceMasterData, selectedOrderId } = props;
    const { userId, buttonData, setButtonData, section, isDataLoaded, isLoading, invoiceDetailForm } = props;
    const { form, fetchCustomerList, formActionType, selectedOtfNumber, setSelectedOtfNumber, handleFormValueChange } = props;

    const { FormActionButton, requestPayload, setRequestPayload, handleButtonClick, NEXT_ACTION, handleBookingNumberSearch, CustomerForm, showGlobalNotification, salesConsultantLovData } = props;

    const [activeKey, setActiveKey] = useState([3]);

    const handleCustomerSearch = () => {
        const extraParams = [
            {
                key: 'customerId',
                title: 'customerId',
                value: form.getFieldValue('customerId'),
                name: 'Customer ID',
            },
        ];
        fetchCustomerList({
            customURL,
            setIsLoading: () => {},
            extraParams,
            userId,
            onSuccessAction: (response) => {
                form.setFieldsValue({ ...response?.data });
            },
            onErrorAction: () => {},
        });
    };

    const handleChange = (e) => {
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinish = () => {
        setRequestPayload({ ...requestPayload, customerDetails: form.getFieldsValue() });
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
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
        styles,
        handleCustomerSearch,
    };

    const viewProps = {
        formData: requestPayload,
        typeData,
        formActionType,
        styles,
        isLoading,
        wrapForm: false,
        selectedOrderId,
        salesConsultantLovData,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                    <FormActionButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

const CustomerDetailsMaster = CustomerDetailsMasterBase;
export default CustomerDetailsMaster;
