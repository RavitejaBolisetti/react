/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Button, Col, Input, Form } from 'antd';

import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const CommonForm = ({ formData, typeData, formKey = 'Shield', addOnForm, openAccordian, formActionType, onSingleFormFinish, registerDisabled, relationshipManagerData, schemeDescriptionDatamain, isReadOnly = false, handleEditRegister, handleCancelRegister, disableKey, muiltipleFormData, handleAmcDescriptionData }) => {
    const disableProps = { disabled: isReadOnly };
    const handleChange = (values) => {
        const code = openAccordian && schemeDescriptionDatamain.hasOwnProperty(openAccordian) && schemeDescriptionDatamain[openAccordian]?.find((item) => item?.schemeDescription === values);
        if (code) {
            addOnForm.setFieldValue('schemeCode', code?.id);
            addOnForm.setFieldValue('schemeAmount', code?.schemeAmount);
        }
    };

    return (
        <>
            <Row gutter={20}>
                {openAccordian === 'AMC' && (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.schemeType} label={translateContent('vehicleDeliveryNote.addOnDetails.label.schemeType')} name="schemeType" rules={[validateRequiredSelectField(translateContent('vehicleDeliveryNote.addOnDetails.label.schemeType'))]}>
                            {customSelectBox({ data: typeData['DLVR_AMC_SCH_TYP'], placeholder: preparePlaceholderText(translateContent('vehicleDeliveryNote.addOnDetails.label.schemeType')), fieldNames: { key: 'key', value: 'value' }, ...disableProps, onChange: handleAmcDescriptionData })}
                        </Form.Item>
                    </Col>
                )}
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.schemeDescription} label={translateContent('vehicleDeliveryNote.addOnDetails.label.schemeDescription')} name="schemeDescription" rules={[validateRequiredSelectField('vehicleDeliveryNote.addOnDetails.label.schemeDescription')]}>
                        {customSelectBox({ data: schemeDescriptionDatamain[openAccordian], fieldNames: { key: 'schemeDescription', value: 'schemeDescription' }, placeholder: preparePlaceholderText(translateContent('vehicleDeliveryNote.addOnDetails.label.schemeDescription')), onChange: handleChange, ...disableProps })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.saleType} label={translateContent('vehicleDeliveryNote.addOnDetails.label.saleType')} name="saleType" rules={[validateRequiredInputField(translateContent('vehicleDeliveryNote.addOnDetails.label.saleType'))]}>
                        {customSelectBox({ data: typeData['DLVR_SALE_TYP'], placeholder: preparePlaceholderText(translateContent('vehicleDeliveryNote.addOnDetails.label.saleType')), ...disableProps })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.schemeAmount} label={translateContent('vehicleDeliveryNote.addOnDetails.label.schemeAmount')} name="schemeAmount">
                        <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.addOnDetails.label.schemeAmount'))} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.employeeCode} label={translateContent('vehicleDeliveryNote.addOnDetails.label.employeeName')} name="employeeCode">
                        {customSelectBox({ data: relationshipManagerData, fieldNames: { key: 'key', value: 'value' }, placeholder: preparePlaceholderSelect(translateContent('vehicleDeliveryNote.addOnDetails.label.employeeName')), ...disableProps })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.manager} label={translateContent('vehicleDeliveryNote.addOnDetails.label.manager')} name="manager">
                        <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.addOnDetails.label.manager'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Form.Item hidden name="schemeCode" />
                <Form.Item value={true} initialValue={true} hidden name="mappedInDelivery" />
            </Row>
            {!formActionType?.viewMode &&
                (!registerDisabled?.[openAccordian] ? (
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Button className={styles.marB20} type="primary" onClick={() => onSingleFormFinish(formKey, addOnForm)}>
                                {!formData ? translateContent('global.buttons.register') : translateContent('global.buttons.save')}
                            </Button>
                            {formData && Object?.values(formData)?.length && (
                                <Button onClick={() => handleCancelRegister(disableKey)} className={styles.marL20} danger>
                                    {translateContent('global.buttons.cancel')}
                                </Button>
                            )}
                        </Col>
                    </Row>
                ) : (
                    <Row gutter={20} justify="start">
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Button onClick={() => handleEditRegister(disableKey)} className={styles.marB20} type="primary">
                                {translateContent('global.buttons.edit')}
                            </Button>
                        </Col>
                    </Row>
                ))}
        </>
    );
};

export default CommonForm;
