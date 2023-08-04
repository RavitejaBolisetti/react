/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Input, Card } from 'antd';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import { UploadUtil } from 'utils/Upload';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditForm = (uploadProps) => {
    const { typeData, mandatoryFields } = uploadProps;

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        // className: styles.headerSelectField,
    };

    return (
        <>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Document Type" name="documentTypeId" rules={mandatoryFields ? [validateRequiredInputField('document type')] : ''} placeholder={preparePlaceholderSelect('document type')}>
                        <Select loading={!(typeData?.length !== 0)} placeholder="Select" {...selectProps}>
                            {typeData?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="File Name" name="documentName" rules={mandatoryFields ? [validateRequiredInputField('file name')] : ''}>
                        <Input placeholder={preparePlaceholderText('File Name')} allowClear />
                    </Form.Item>
                </Col>
            </Row>
            <UploadUtil {...uploadProps} />
        </>
    );
};

export default AddEditForm;
