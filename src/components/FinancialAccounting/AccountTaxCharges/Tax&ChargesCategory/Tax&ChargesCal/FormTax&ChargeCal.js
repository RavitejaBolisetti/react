/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Input, Form, Col, Row, Button, Select } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, duplicateProductValidator } from 'utils/validation';
import styles from 'components/common/Common.module.css';

function FormProductAttribute(props) {
    const { taxChargeCalForm, isVisible, taxCharge, taxCode, addTaxChargeCal, formEdit, editForm, taxChargeCalList } = props;
    const [changeValue, setChangeValue] = useState(null);

    const fieldNames = { label: 'title', value: 'key' };

    const onChange = (val) => {
        let newFormData = formEdit ? editForm?.getFieldsValue() : taxChargeCalForm?.getFieldsValue();
        setChangeValue(newFormData);
    };

    const onTaxCodeChange = (val) => {
        formEdit ? editForm?.setFieldsValue({ description: val?.title }) : taxChargeCalForm.setFieldsValue({ description: val?.title });
    };

    return (
        <Form form={formEdit ? editForm : taxChargeCalForm} id="myForm" autoComplete="off" layout="vertical">
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        label="Tax Charge"
                        name="taxCharge"
                        rules={[
                            validateRequiredSelectField('Tax Charge'),
                            //{ validator: () => duplicateProductValidator(changeValue, taxChargeCalList) }
                        ]}
                    >
                        <Select
                            getPopupContainer={(triggerNode) => triggerNode.parentElement}
                            placeholder={preparePlaceholderSelect('Tax Charge')}
                            style={{
                                width: '100%',
                            }}
                            options={taxCharge}
                            fieldNames={fieldNames}
                            allowClear
                            labelInValue
                            onChange={onChange}
                            key={taxCharge?.key}
                            value={taxCharge?.key}
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        label="Tax Code"
                        name="taxCode"
                        initialValue={props?.code}
                        rules={[
                            validateRequiredSelectField('Tax Code'),
                            // { validator: () => duplicateProductValidator(changeValue, taxChargeCalList) }
                        ]}
                    >
                        <Select
                            getPopupContainer={(triggerNode) => triggerNode.parentElement}
                            placeholder={preparePlaceholderSelect('Tax Code')}
                            style={{
                                width: '100%',
                            }}
                            options={taxCode}
                            fieldNames={fieldNames}
                            allowClear
                            labelInValue
                            onChange={onTaxCodeChange}
                            key={taxCode?.key}
                            value={taxCode?.key}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item labelAlign="left" name="description" label="Description" rules={[validateRequiredInputField('Description')]} initialValue={props?.value}>
                        <Input placeholder={preparePlaceholderText('Description')} className={styles.inputBox} />
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
