/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import ViewDetail from './ViewDetail';
import AddEditForm from './AddEditForm';

import styles from 'assets/sass/app.module.scss';
import { formattedCalendarDate } from 'utils/formatDateTime';

const AMCRegistrationDetailsMasterBase = (props) => {
    const { typeData, vehicleInvoiceMasterData, selectedOrderId } = props;
    const { userId, buttonData, setButtonData, section, isDataLoaded, isLoading, form } = props;
    const { formActionType, selectedOtfNumber, setSelectedOtfNumber, handleFormValueChange } = props;

    const { FormActionButton, requestPayload, setRequestPayload, handleButtonClick, NEXT_ACTION, handleBookingNumberSearch, CustomerForm, showGlobalNotification, salesConsultantLovData } = props;

    const [registrationForm] = Form.useForm();
    const [schemeForm] = Form.useForm();
    const [activeKey, setActiveKey] = useState([3]);

    useEffect(() => {
        console.log(requestPayload);
        if (requestPayload) {
            registrationForm.setFieldsValue({ ...requestPayload?.amcRegistration });
            schemeForm.setFieldsValue({ ...requestPayload?.amcSchemeDetails });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestPayload]);

    useEffect(() => {
        if (selectedOtfNumber) {
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOtfNumber]);

    const handleChange = (e) => {
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const handleEmployeeNameSearch = () => {
        registrationForm.setFieldsValue({ managerName: 'Rajendra Prasad' });
    };
    const handleSchemeDescriptionChange = () => {
        schemeForm.setFieldsValue({ schemeCode: '5678', schemeBasicAmount: '1000', schemeTaxAmount: '5000' });
    };

    const onFinish = () => {
        setRequestPayload({ ...requestPayload, amcRegistration: registrationForm.getFieldsValue(), amcSchemeDetails: schemeForm.getFieldsValue() });

        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
        schemeForm,
        registrationForm,
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
        handleEmployeeNameSearch,
        handleSchemeDescriptionChange,
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

const AMCRegistrationDetailsMaster = AMCRegistrationDetailsMasterBase;
export default AMCRegistrationDetailsMaster;
