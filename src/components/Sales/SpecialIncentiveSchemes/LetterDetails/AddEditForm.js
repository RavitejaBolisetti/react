/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Card, Descriptions, Button, Space, Typography, Upload, Input } from 'antd';

import { UploadUtil } from 'utils/Upload';
import { translateContent } from 'utils/translateContent';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import styles from 'assets/sass/app.module.scss';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { Text, Title } = Typography;
const { Dragger } = Upload;
const { Option } = Select;
const { TextArea } = Input;

const AddEditForm = (uploadProps) => {
    const { mandatoryFields, pushIndicator, typeData, handleClearChange, formData, isLoading, handleFormValueChange } = uploadProps;

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
    };

    return !pushIndicator ? (
        <>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                    <Form.Item initialValue={formData?.address} label={'Remarks' || translateContent('dealerCompany.label.companyAddress')} name="remarks" rules={[validateRequiredInputField('Remarks')]}>
                        <TextArea placeholder={translateContent('Remarks')} showCount />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label={'Dealer' || translateContent('vehicleDetail.documents.label.documentType')} name="dealer" rules={[validateRequiredSelectField(translateContent('Dealer'))]} placeholder={preparePlaceholderSelect('Dealer')}>
                        <Select onChange={handleClearChange} placeholder="Select" {...selectProps}>
                            {typeData?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <UploadUtil {...uploadProps} handleFormValueChange={handleFormValueChange} />
                </Col>
            </Row>
        </>
    ) : (
        <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Button className={styles.marB20} type="primary">
                    Send Scheme Letters
                </Button>
            </Col>
        </Row>
    );
};

export default AddEditForm;
