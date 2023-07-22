/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Input, Form, Col, Row, Button } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'components/common/Common.module.css';

function FormProductAttribute(props) {
    const { taxChargeCalForm, isVisible, taxCharge, addTaxChargeCal, formEdit, editForm, taxChargeCategoryCodeData, handleCodeFunction, changeValue, setChangeValue } = props;

    const handleDescriptionChange = (taxCode) => {
        setChangeValue(taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.taxDescription);
        formEdit ? editForm.setFieldValue('taxDescription', taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.taxDescription) : taxChargeCalForm.setFieldValue('taxDescription', taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.taxDescription);
    };

    return (
        <Form form={formEdit ? editForm : taxChargeCalForm} id="myForm" autoComplete="off" layout="vertical">
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Tax/Charge Type" name="taxChargeTypeCode" rules={[validateRequiredSelectField('Tax Charge')]}>
                        {customSelectBox({ data: taxCharge, fieldNames: { key: 'taxType', value: 'taxDescription' }, placeholder: preparePlaceholderSelect('Tax Charge'), onChange: handleCodeFunction })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Tax/Charge Code" name="taxChargeCode" initialValue={props?.code} rules={[validateRequiredSelectField('Tax Code')]}>
                        {customSelectBox({ data: taxChargeCategoryCodeData, fieldNames: { key: 'taxCode', value: 'taxCode' }, placeholder: preparePlaceholderSelect('Tax Code'), onChange: handleDescriptionChange })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item labelAlign="left" name="taxDescription" label="Description" rules={[validateRequiredInputField('Description')]} initialValue={props?.value}>
                        <Input placeholder={preparePlaceholderText('Description')} className={styles.inputBox} disabled />
                    </Form.Item>
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item name="internalId" label="Internal Id" />
                </Col>
                {!formEdit && (
                    <Row xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Button type="primary" danger style={{ margin: '0 0 0 12px' }} onClick={() => addTaxChargeCal()}>
                            Add
                        </Button>
                    </Row>
                )}
            </Row>
        </Form>
    );
}

export default FormProductAttribute;
