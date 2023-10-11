/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form, Col, Row, Button, Select } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import styles from 'assets/sass/app.module.scss';
import { PlusOutlined } from '@ant-design/icons';

function FormProductAttribute(props) {
    const { taxChargeCalForm, taxCharges, addTaxChargeCal, formEdit, editForm, handleCodeFunction, handleDescriptionChange, mainFomEdit, dropdownItems, stateData, saleData, taxCategory, isTaxCategoryCodeLoading } = props;

    const fieldNames = { key: 'taxCode', value: 'taxCode' };

    return (
        <>
            <Form form={formEdit ? editForm : taxChargeCalForm} id="myForm" autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="State" initialValue={taxCategory?.stateCode} name="stateCode" rules={[validateRequiredSelectField('State')]}>
                            {customSelectBox({ disabled: mainFomEdit, data: stateData, fieldNames: { key: 'gstStateCode', value: 'name' }, placeholder: preparePlaceholderSelect('State') })}
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Sale Type" initialValue={taxCategory?.saleType} name="saleType" rules={[validateRequiredSelectField('Sale Type')]}>
                            {customSelectBox({ disabled: mainFomEdit, data: saleData, placeholder: preparePlaceholderSelect('Sale Type') })}
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Tax/Charge Type" name="chargeType" rules={[validateRequiredSelectField('Tax Charge')]}>
                            {customSelectBox({ disabled: mainFomEdit, data: taxCharges, fieldNames: { key: 'taxType', value: 'taxDescription' }, placeholder: preparePlaceholderSelect('Tax Charge'), onChange: handleCodeFunction })}
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Tax/Charge Code" name="chargeCode" initialValue={props?.code} rules={[validateRequiredSelectField('Tax Code')]}>
                            <Select options={dropdownItems} disabled={mainFomEdit} fieldNames={fieldNames} placeholder={preparePlaceholderSelect('Tax Code')} onChange={handleDescriptionChange} loading={isTaxCategoryCodeLoading} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item labelAlign="left" name="chargeDescription" label="Description" rules={[validateRequiredInputField('Description')]} initialValue={props?.chargeDescription}>
                            <Input placeholder={preparePlaceholderText('Description')} disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item name="internalId" label="Internal Id" />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item name="taxMasterId" label="taxMasterId" />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                        <Form.Item name="id" label="Id" />
                    </Col>
                    {!props?.internalId && (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                            <Button
                                disabled={formEdit}
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    addTaxChargeCal();
                                }}
                            >
                                Add
                            </Button>
                        </Col>
                    )}
                </Row>
            </Form>
        </>
    );
}

export default FormProductAttribute;
