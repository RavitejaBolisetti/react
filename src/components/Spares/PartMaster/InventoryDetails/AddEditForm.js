/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Card, Descriptions, Button, Checkbox, Typography, Upload, Input } from 'antd';

import { UploadUtil } from 'utils/Upload';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import styles from 'assets/sass/app.module.scss';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { Text, Title } = Typography;
const { Dragger } = Upload;

const AddEditFormMain = (props) => {
    const { formData, onHandleSelect, handleOnChange } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: true };
    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };
    const hml = [
        {
            key: '1',
            value: 'High',
        },
        {
            key: '2',
            value: 'Medium',
        },
        {
            key: '3',
            value: 'Low',
        },
    ];

    const rIS = [
        {
            key: '1',
            value: 'Regular Class',
        },
        {
            key: '2',
            value: 'Irregular Class',
        },
        {
            key: '3',
            value: 'Sporadic',
        },
    ];

    const fieldNames = { key: 'key', value: 'value' };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item name="includeinAutoIndent" label={translateContent('partMaster.placeholder.includeinAutoIndent')} valuePropName="checked">
                        <Checkbox onClick={handleOnChange}></Checkbox>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.minimumLevel')}>
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.minimumLevel'))} maxLength={50} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.maximumLevel')}>
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.maximumLevel'))} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.reOrderLevel')}>
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.reOrderLevel'))} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.safetyStock')}>
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.safetyStock'))} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.reservationQty')}>
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.reservationQty'))} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.aBC1C2')} name="aBC1C2" rules={[validateRequiredInputField(translateContent('partMaster.placeholder.aBC1C2'))]}>
                        {customSelectBox({ data: [], fieldNames: fieldNames, placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.aBC1C2')), onChange: onHandleSelect })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.hml')} rules={[validateRequiredInputField(translateContent('partMaster.validation.hml'))]}>
                        {customSelectBox({ data: hml, fieldNames, placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.hml')), onChange: onHandleSelect })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.rIS')}>{customSelectBox({ data: rIS, fieldNames, placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.rIS')), onChange: onHandleSelect })}</Form.Item>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item name="seasonalPart" label={translateContent('partMaster.placeholder.seasonalPart')} valuePropName="checked">
                        <Checkbox onClick={handleOnChange}></Checkbox>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.seasonFromMonth')}>
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.seasonFromMonth'))} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.seasonToMonth')}>
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.seasonToMonth'))} maxLength={50} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.movementClass')}>
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.movementClass'))} maxLength={50} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.targetSettingGroup')}>
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.targetSettingGroup'))} maxLength={50} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item name="deadstock" label={translateContent('partMaster.placeholder.deadstock')} valuePropName="checked">
                        <Checkbox onClick={handleOnChange}></Checkbox>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item name="includeforAuction" label={translateContent('partMaster.placeholder.includeforAuction')} valuePropName="checked">
                        <Checkbox onClick={handleOnChange}></Checkbox>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};


export default AddEditFormMain;
