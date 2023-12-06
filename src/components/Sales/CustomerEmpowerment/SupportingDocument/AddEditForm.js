/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Card, Descriptions, Button, Space, Typography,Upload } from 'antd';

import { UploadUtil } from 'utils/Upload';
import { translateContent } from 'utils/translateContent';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import styles from 'assets/sass/app.module.scss';

const { Text, Title } = Typography;
const { Dragger } = Upload;

const AddEditForm = (uploadProps) => {
    const { mandatoryFields, handleClearChange, formData, isLoading } = uploadProps;

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    return (
        <>

            <Card>
                <Descriptions
                >
                    <Descriptions.Item label={'Document Name' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Required' || translateContent('amcRegistration.label.customerCategory')}>{'Yes'||checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'File Name' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={''}>
                        <Dragger
                        className={styles.uploadDraggerStrip}
                         >
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
                <Descriptions
                >
                    <Descriptions.Item label={'Document Name' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Required' || translateContent('amcRegistration.label.customerCategory')}>{'No'||checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'File Name' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={''}>
                        <Dragger
                        className={styles.uploadDraggerStrip}
                         >
                            <Space direction="vertical">
                                <div>
                                    <Title level={5}>{'Click or drop your file here to upload'}</Title>
                                </div>
                              
                            </Space>
                        </Dragger>
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            {/* <UploadUtil {...uploadProps} /> */}
        </>
    );
};

export default AddEditForm;
