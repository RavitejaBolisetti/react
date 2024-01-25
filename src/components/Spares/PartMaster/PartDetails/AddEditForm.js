/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Checkbox, Card, Collapse, Divider, Switch } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { expandIcon } from 'utils/accordianExpandIcon';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, onHandleSelect, handleOnChange } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: true };
    const [openAccordian, setOpenAccordian] = useState(1);
    const { TextArea } = Input;
    const partNumberSource = [
        {
            key: '1',
            value: 'Dealer–Consumable',
        },
        {
            key: '2',
            value: 'Dealer–Nonconsumable',
        },
        {
            key: '3',
            value: 'M&M ',
        },
        {
            key: '4',
            value: 'Maximile & Maxicare',
        },
    ];
    const partType = [
        {
            key: '2',
            value: 'Part Type 1',
        },
        {
            key: '3',
            value: 'Part Type 2',
        },
    ];

    const partCategory = [
        { key: '1', value: 'Maximile Grease' },
        { key: '2', value: 'Maxiclean' },
        { key: '3', value: 'Maximile Oil' },
        { key: '4', value: 'Maxicare Products' },
        { key: '5', value: 'Maximile Coolant' },
    ];

    const salesOrg = [{ key: '1', value: 'Mahindra & Mahindra Ltd.' }];
    
    const productDivision = [
        { key: '1', value: 'Spares Product Division 1' },
        { key: '2', value: 'Spares Product Division 2' },
        { key: '3', value: 'Spares Product Division 3' },
    ];

    const issueIndicator = [
        { key: '1', value: 'Issue Indicator  1' },
        { key: '2', value: 'Issue Indicator  2' },
        { key: '3', value: 'Issue Indicator  3' },
    ];
    const warrantyIndicator = [
        { key: '1', value: 'Yes' },
        { key: '2', value: 'No' },
    ];

    const vendor = [
        { key: '1', value: 'Vendor Dealer 1' },
        { key: '2', value: 'Vendor Dealer 2' },
        { key: '2', value: 'Vendor Dealer 3' },
    ];
    const brand = [
        { key: '1', value: 'Brand Level Part 1' },
        { key: '2', value: 'Brand Level Part 2' },
        { key: '2', value: 'Brand Level Part 3' },
    ];

    const handleCollapse = (key) => {
        setOpenAccordian(key);
    };

    return (
        <Card>
            <Row gutter={20}>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.partNumber')} rules={[validateRequiredInputField(translateContent('partMaster.validation.partNumber'))]} name="partNumber">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.partNumber'))} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.partDescription')} rules={[validateRequiredInputField(translateContent('partMaster.validation.partDescription'))]} name="partDescription">
                        <TextArea placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.partDescription'))} maxLength={300} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.partNumberSource')} name="partNumberSource" rules={[validateRequiredSelectField(translateContent('partMaster.validation.partNumberSource'))]}>
                        {customSelectBox({ data: partNumberSource, placeholder: preparePlaceholderSelect(translateContent('partMaster.label.partNumberSource')) })}
                    </Form.Item>
                </Col>
                  <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.partType')} name="partType" rules={[validateRequiredInputField(translateContent('partMaster.validation.partType'))]}>
                        {customSelectBox({ data: partType, placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.partType')), onChange: onHandleSelect })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.partCategory')}  name="partCategory" rules={[validateRequiredInputField(translateContent('partMaster.validation.partCategory'))]}>
                        {customSelectBox({ data: partCategory, placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.partCategory')), onChange: onHandleSelect })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.alternatePartNo')} rules={[validateRequiredInputField(translateContent('partMaster.validation.alternatePartNo'))]} name="alternatePartNo">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.alternatePartNo'))} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.salesOrg')}>
                        {customSelectBox({ data: salesOrg, placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.salesOrg')), onChange: onHandleSelect })}</Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.productDivision')} name="productDivision" rules={[validateRequiredInputField(translateContent('partMaster.validation.productDivision'))]}>
                        {customSelectBox({ data: productDivision, placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.productDivision')), onChange: onHandleSelect })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.issueIndicator')} name="issueIndicator"  rules={[validateRequiredInputField(translateContent('partMaster.validation.issueIndicator'))]}>
                        {customSelectBox({ data: issueIndicator, placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.issueIndicator')), onChange: onHandleSelect })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.warrantyIndicator')}>{customSelectBox({ data: warrantyIndicator, placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.warrantyIndicator')), onChange: onHandleSelect })}</Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.vendor')}>
                        {customSelectBox({ data: vendor, placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.vendor')), onChange: onHandleSelect })}</Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.brand')}>
                        {customSelectBox({ data: brand, placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.brand')), onChange: onHandleSelect })}</Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.unitofMeasure')}>
                        {customSelectBox({ placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.unitofMeasure')), onChange: onHandleSelect })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.skuWiseKLQty')} rules={[validateRequiredInputField(translateContent('partMaster.validation.skuWiseKLQty'))]} name="skuWiseKLQty">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.skuWiseKLQty'))} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item name="allowDecimalQty" label={translateContent('partMaster.placeholder.allowDecimalQty')} valuePropName="checked">
                        <Checkbox onClick={handleOnChange}></Checkbox>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.minPackQty')} rules={[validateRequiredInputField(translateContent('partMaster.validation.minPackQty'))]} name="minPackQty">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.minPackQty'))} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.minOrderQty')} rules={[validateRequiredInputField(translateContent('partMaster.validation.minOrderQty'))]} name="minOrderQty">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.minOrderQty'))} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.qtyPerVehicle')} name="qtyPerVehicle">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.qtyPerVehicle'))} maxLength={50} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
