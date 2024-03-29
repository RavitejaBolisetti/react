/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Collapse, Form, Divider } from 'antd';

import { expandIcon } from 'utils/accordianExpandIcon';
import CommonForm from './CommonForm';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, setRegisterDisabled, registerDisabled, shieldForm, rsaForm, amcForm, formActionType, openAccordian, setOpenAccordian, onSingleFormFinish, schemeDescriptionData, handleEmployeeSearch, handleOnChange, muiltipleFormData, handleAmcDescriptionData, employeeData } = props;

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };
    const handleEditRegister = (key) => {
        setRegisterDisabled((prev) => ({ ...prev, [key]: false }));
    };
    const handleCancelRegister = (key) => {
        setRegisterDisabled((prev) => ({ ...prev, [key]: true }));
    };
    const commonFormProps = {
        ...props,
        formActionType,
        openAccordian,
        onSingleFormFinish,
        schemeDescriptionData,
        handleEmployeeSearch,
        handleOnChange,
        registerDisabled,
        handleEditRegister,
        handleCancelRegister,
        muiltipleFormData,
        handleAmcDescriptionData,
        relationshipManagerData: employeeData?.[openAccordian],
    };
    const shieldInfoProps = { formData: formData?.sheildRequest, addOnForm: shieldForm, isReadOnly: registerDisabled[openAccordian] };
    const rsaProps = { formData: formData?.rsaRequest, addOnForm: rsaForm, isReadOnly: registerDisabled[openAccordian] };
    const amcProps = { formData: formData?.amcRequest, addOnForm: amcForm, isReadOnly: registerDisabled[openAccordian] };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse onChange={() => handleCollapse('Shield')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end" collapsible="icon">
                    <Panel header={translateContent('vehicleDeliveryNote.addOnDetails.heading.shieldInfo')} key="Shield">
                        <Divider />
                        <Form layout="vertical" autoComplete="off" form={shieldForm}>
                            <CommonForm {...commonFormProps} {...shieldInfoProps} formKey={'sheildRequest'} disableKey={'Shield'} />
                        </Form>
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('RSA')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end" collapsible="icon">
                    <Panel header={translateContent('vehicleDeliveryNote.addOnDetails.heading.rsa')} key="RSA">
                        <Divider />
                        <Form layout="vertical" autoComplete="off" form={rsaForm}>
                            <CommonForm {...commonFormProps} {...rsaProps} formKey={'rsaRequest'} disableKey={'RSA'} />
                        </Form>
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('AMC')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end" collapsible="icon">
                    <Panel header={translateContent('vehicleDeliveryNote.addOnDetails.heading.amc')} key="AMC">
                        <Divider />
                        <Form layout="vertical" autoComplete="off" form={amcForm}>
                            <CommonForm {...commonFormProps} {...amcProps} formKey={'amcRequest'} disableKey={'AMC'} />
                        </Form>
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
