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
                {/* <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <UploadUtil {...uploadProps} handleFormValueChange={handleFormValueChange} />
                    </Col>
                </Row> */}
            </>

            <Card>
                <Descriptions>
                    <Descriptions.Item label={'Document Name' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Required' || translateContent('amcRegistration.label.customerCategory')}>{'Yes' || checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'File Name' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={''}>
                        <Dragger className={styles.uploadDraggerStrip}>
                            <Space direction="vertical">
                                <div>
                                    <Title level={5}>{'Click or drop your file here to upload'}</Title>
                                </div>
                            </Space>
                        </Dragger>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
            <Card>
                <Descriptions>
                    <Descriptions.Item label={'Document Name' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Required' || translateContent('amcRegistration.label.customerCategory')}>{'No' || checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'File Name' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={''}>
                        <Dragger className={styles.uploadDraggerStrip}>
                            <Space direction="vertical">
                                <div>
                                    <Title level={5}>{'Click or drop your file here to upload'}</Title>
                                </div>
                            </Space>
                        </Dragger>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};

export default AddEditForm;
