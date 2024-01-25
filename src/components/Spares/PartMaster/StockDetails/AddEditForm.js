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
const { Dragger } = Upload;


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
            <>
                <Row gutter={16}>
                            
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={(translateContent('partMaster.label.inventoryType'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.inventoryType'))]} name="inventoryType">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.inventoryType'))} maxLength={50} {...disabledProps} /> 
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={(translateContent('partMaster.label.onHandStock'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.onHandStock'))]} name="onHandStock">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.onHandStock'))} maxLength={50} {...disabledProps} /> 
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={(translateContent('partMaster.label.stockValue'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.stockValue'))]} name="stockValue">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.stockValue'))} maxLength={50} {...disabledProps} /> 
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={(translateContent('partMaster.label.allocatedStock'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.allocatedStock'))]} name="allocatedStock">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.allocatedStock'))} maxLength={50} {...disabledProps} /> 
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={(translateContent('partMaster.label.backOrderQty'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.backOrderQty'))]} name="backOrderQty">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.backOrderQty'))} maxLength={50} {...disabledProps} /> 
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={(translateContent('partMaster.label.wipOrderQty'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.wipOrderQty'))]} name="wipOrderQty">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.wipOrderQty'))} maxLength={50} {...disabledProps} /> 
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label={(translateContent('partMaster.label.inTransitQty'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.inTransitQty'))]} name="inTransitQty">
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.inTransitQty'))} maxLength={50} {...disabledProps} /> 
                    </Form.Item>
                </Col>
                            </Row> 
                      </>

          
          
        </>
    );
};

export const AddEditForm = AddEditFormMain;

