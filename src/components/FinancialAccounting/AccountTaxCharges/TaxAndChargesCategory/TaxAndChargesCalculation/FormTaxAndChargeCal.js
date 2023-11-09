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
import { translateContent } from 'utils/translateContent';

function FormProductAttribute(props) {
    const { taxChargeCalForm, taxCharges, addTaxChargeCal, formEdit, editForm, handleCodeFunction, handleDescriptionChange, mainFomEdit, dropdownItems, stateData, saleData, taxCategory, isTaxCategoryCodeLoading } = props;

    const fieldNames = { key: 'taxCode', value: 'taxCode' };

    return (
        <>
            <Form form={formEdit ? editForm : taxChargeCalForm} id="myForm" autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('taxChargeCatagory.label.state')} initialValue={taxCategory?.stateCode} name="stateCode" rules={[validateRequiredSelectField(translateContent('taxChargeCatagory.label.state'))]}>
                            {customSelectBox({ disabled: mainFomEdit, data: stateData, fieldNames: { key: 'gstStateCode', value: 'name' }, placeholder: preparePlaceholderSelect(translateContent('taxChargeCatagory.label.state')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('taxChargeCatagory.label.saleType')} initialValue={taxCategory?.saleType} name="saleType" rules={[validateRequiredSelectField(translateContent('taxChargeCatagory.label.saleType'))]}>
                            {customSelectBox({ disabled: mainFomEdit, data: saleData, placeholder: preparePlaceholderSelect(translateContent('taxChargeCatagory.label.saleType')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('taxChargeCatagory.label.tax/ChargeType')} name="chargeType" rules={[validateRequiredSelectField(translateContent('taxChargeCatagory.placeholder.taxType'))]}>
                            {customSelectBox({ disabled: mainFomEdit, data: taxCharges, fieldNames: { key: 'taxType', value: 'taxDescription' }, placeholder: preparePlaceholderSelect(translateContent('taxChargeCatagory.placeholder.taxType')), onChange: handleCodeFunction })}
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label={translateContent('taxChargeCatagory.label.tax/chargeCode')} name="chargeCode" initialValue={props?.code} rules={[validateRequiredSelectField(translateContent('taxChargeCatagory.placeholder.taxCode'))]}>
                            <Select options={dropdownItems} disabled={mainFomEdit} fieldNames={fieldNames} placeholder={preparePlaceholderSelect(translateContent('taxChargeCatagory.placeholder.taxCode'))} onChange={handleDescriptionChange} loading={isTaxCategoryCodeLoading} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item labelAlign="left" name="chargeDescription" label={translateContent('taxChargeCatagory.label.description')} rules={[validateRequiredInputField(translateContent('taxChargeCatagory.label.description'))]} initialValue={props?.chargeDescription}>
                            <Input placeholder={preparePlaceholderText(translateContent('taxChargeCatagory.label.description'))} disabled />
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
                                {translateContent('global.drawerTitle.add')}
                            </Button>
                        </Col>
                    )}
                </Row>
            </Form>
        </>
    );
}

export default FormProductAttribute;
