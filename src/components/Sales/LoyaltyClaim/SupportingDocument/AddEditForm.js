/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Card, Descriptions, Button, Space, Typography,Upload, Input } from 'antd';

import { UploadUtil } from 'utils/Upload';
import { translateContent } from 'utils/translateContent';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import styles from 'assets/sass/app.module.scss';

const { Text, Title } = Typography;
const { Dragger } = Upload;

const AddEditForm = (uploadProps) => {
    const { mandatoryFields, handleClearChange, formData, isLoading, handleFormValueChange } = uploadProps;

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    return (
        <>

<>
                            {/* <Row gutter={16}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('vehicleDetail.documents.label.documentType')} name="documentTypeCd" rules={mandatoryFields ? [validateRequiredSelectField(translateContent('vehicleDetail.documents.label.documentType'))] : ''} placeholder={preparePlaceholderSelect('document type')}>
                                        <Select loading={!(typeData?.length !== 0)} onChange={handleClearChange} placeholder="Select" {...selectProps}>
                                            {typeData?.map((item) => (
                                                <Option key={item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('vehicleDetail.documents.label.documentName')} name="documentTitle" rules={mandatoryFields ? [validateRequiredInputField(translateContent('vehicleDetail.documents.label.documentName'))] : ''}>
                                        <Input onChange={handleClearChange} placeholder={preparePlaceholderText(translateContent('vehicleDetail.documents.label.documentName'))} allowClear />
                                    </Form.Item>
                                </Col>
                            </Row> */}
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <UploadUtil {...uploadProps} handleFormValueChange={handleFormValueChange} />
                                </Col>
                            </Row>
                        </>

            {/* <UploadUtil {...uploadProps} /> */}
        </>
    );
};

export default AddEditForm;
