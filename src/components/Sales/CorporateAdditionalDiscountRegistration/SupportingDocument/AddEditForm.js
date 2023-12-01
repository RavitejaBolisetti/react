/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Card, Descriptions, Button, Space, Typography,Upload, Input } from 'antd';

import { validateRequiredInputField } from 'utils/validation';
import { UploadUtil } from 'utils/Upload';
import { translateContent } from 'utils/translateContent';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import styles from 'assets/sass/app.module.scss';
import { UploadBoxIcon } from 'Icons';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const { Text, Title } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const AddEditForm = (uploadProps) => {
    const { mandatoryFields, handleClearChange, formData, isLoading ,typeData} = uploadProps;

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    const typedataTemp = [
        {
            key: 1,
            value: 'Purchase Order Copy',
        },
        {
            key: 2,
            value: 'Latest salary slip or bonafied certificate fron HRD/Admin of company',
        },
        {
            key: 3,
            value: 'Employee ID Copy',
        },
        {
            key: 4,
            value: 'Copy of corporate advantage card',
        },
        {
            key: 5,
            value: "Copy on Corporate / BPO Vendor's letter head confirming buyers identity",
        },
    ];

    return (
        <>
                   <>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('customerMaster.label.documentType')} name="documentTypeId" rules={mandatoryFields ? [validateRequiredInputField(translateContent('customerMaster.validation.documentType'))] : ''} placeholder={translateContent('customerMaster.placeholder.documentType')}>
                        <Select loading={!(typeData?.length !== 0)} onChange={handleClearChange} placeholder={translateContent('global.placeholder.select')} {...selectProps}>
                            {typeData?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('customerMaster.label.fileName')} name="documentName" rules={mandatoryFields ? [validateRequiredInputField(translateContent('customerMaster.validation.fileName'))] : ''}>
                        <Input onChange={handleClearChange} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.fileName'))} allowClear />
                    </Form.Item>
                </Col> */}
            </Row>
            <UploadUtil {...uploadProps} />
        </>
        </>
    );
};

export default AddEditForm;
