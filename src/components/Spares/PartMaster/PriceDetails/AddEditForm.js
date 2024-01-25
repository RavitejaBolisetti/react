/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Card, Descriptions, Button, Space, Typography, Upload, Input } from 'antd';

import { UploadUtil } from 'utils/Upload';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { translateContent } from 'utils/translateContent';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import styles from 'assets/sass/app.module.scss';

const { Text, Title } = Typography;
//const { Dragger } = Upload;
const materialPricingGroup = [
    {
        key: '1',
        value: 'Material Pricing Group 1',
    },
    {
        key: '2',
        value: 'Material Pricing Group 2',
    },
    {
        key: '3',
        value: 'M&Material Pricing Group 3 ',
    },
 
];

const AddEditFormMain = (props) => {
    const { mandatoryFields, handleClearChange, formData, isLoading, handleFormValueChange, onHandleSelect, handleOnChange } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };
    
    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    return (
        <>
                {/* <Card> */}
            <Row gutter={20}>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item  label={(translateContent('partMaster.label.materialPricingGroup'))}  rules={[validateRequiredInputField(translateContent('partMaster.validation.materialPricingGroup'))]} name="materialPricingGroup">
                        {customSelectBox({ data: materialPricingGroup, placeholder:preparePlaceholderSelect(translateContent('partMaster.placeholder.materialPricingGroup')), onChange: onHandleSelect })}
                    </Form.Item>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={(translateContent('partMaster.label.hsnCode'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.hsnCode'))]} name="hsnCode">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.hsnCode'))} maxLength={50} />
                    </Form.Item>
                </Col>
              
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={(translateContent('partMaster.label.taxCategory'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.taxCategory'))]}  name="taxCategory">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.taxCategory'))} maxLength={50} {...disabledProps} /> 
                    </Form.Item>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item  label={(translateContent('partMaster.label.accountCategory'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.accountCategory'))]} name="accountCategory">
                        {customSelectBox({placeholder:preparePlaceholderSelect(translateContent('partMaster.placeholder.accountCategory')), onChange: onHandleSelect })}
                    </Form.Item>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={(translateContent('partMaster.label.purchasePriceGNDP'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.purchasePriceGNDP'))]} name="purchasePriceGNDP">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.purchasePriceGNDP'))} maxLength={50} />
                    </Form.Item>
                </Col>
              
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={(translateContent('partMaster.label.mrp'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.mrp'))]} name="mrp">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.mrp'))} maxLength={50} />
                    </Form.Item>
                </Col>


                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={(translateContent('partMaster.label.sellingPrice'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.sellingPrice'))]} name="sellingPrice">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.sellingPrice'))} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={(translateContent('partMaster.label.latestLandedCost'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.latestLandedCost'))]} >
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.latestLandedCost'))} maxLength={50} {...disabledProps} /> 
                    </Form.Item>
                </Col>
                </Row>
                 {/* </Card> */}
                
           
        </>
    );
};


export const AddEditForm = AddEditFormMain;
