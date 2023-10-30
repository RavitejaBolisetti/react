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
                        <Form.Item initialValue={formData?.schemeType} label="Scheme Type" name="schemeType" rules={[validateRequiredSelectField('Scheme Type')]}>
                            {customSelectBox({ data: typeData['DLVR_AMC_SCH_TYP'], placeholder: preparePlaceholderText('Scheme Type'), fieldNames: { key: 'key', value: 'value' }, ...disableProps, onChange: handleAmcDescriptionData })}
                        </Form.Item>
                    </Col>
                )}
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.schemeDescription} label="Scheme Description" name="schemeDescription" rules={[validateRequiredSelectField('Scheme Description')]}>
                        {customSelectBox({ data: schemeDescriptionDatamain[openAccordian], fieldNames: { key: 'schemeDescription', value: 'schemeDescription' }, placeholder: preparePlaceholderText('Scheme Description'), onChange: handleChange, ...disableProps })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.saleType} label="Sale Type" name="saleType" rules={[validateRequiredInputField('Sale Type')]}>
                        {customSelectBox({ data: typeData['DLVR_SALE_TYP'], placeholder: preparePlaceholderText('Sale Type'), ...disableProps })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.schemeAmount} label="Scheme Amount (With Tax)" name="schemeAmount">
                        <Input placeholder={preparePlaceholderText('scheme amount')} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.employeeCode} label="Employee Name" name="employeeCode">
                        {customSelectBox({ data: relationshipManagerData, fieldNames: { key: 'key', value: 'value' }, placeholder: preparePlaceholderSelect('Relationship Manager'), ...disableProps })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.manager} label="Manager" name="manager">
                        <Input placeholder={preparePlaceholderText('manager')} disabled={true} />
                    </Form.Item>
                </Col>
                <Form.Item hidden name="schemeCode">
                    <Input />
                </Form.Item>
                <Form.Item value={true} initialValue={true} hidden name="mappedInDelivery">
                    <Input />
                </Form.Item>
            </Row>
            {!formActionType?.viewMode &&
                (!registerDisabled?.[openAccordian] ? (
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Button className={styles.marB20} type="primary" onClick={() => onSingleFormFinish(formKey, addOnForm)}>
                                {!formData ? 'Register' : 'Save'}
                            </Button>
                            {formData && Object?.values(formData)?.length && (
                                <Button onClick={() => handleCancelRegister(disableKey)} className={styles.marL20} danger>
                                    Cancel
                                </Button>
                            )}
                        </Col>
                    </Row>
                ) : (
                    <Row gutter={20} justify="start">
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Button onClick={() => handleEditRegister(disableKey)} className={styles.marB20} type="primary">
                                Edit
                            </Button>
                        </Col>
                    </Row>
                ))}
        </>
    );
};

export default CommonForm;
