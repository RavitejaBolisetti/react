/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Form, Select, Input, Divider, Space, Collapse } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';
import styles from 'components/common/Common.module.css';
import { ViewSupportingDocDetail } from './ViewSupportingDocDetail';
import { ViewTechnicalDocDetail } from './ViewTechnicalDocDetail';
import { UploadUtil } from 'utils/Upload';

const { Panel } = Collapse;
const { Option } = Select;

const AddEditForm = (props) => {
    const { formActionType, handleFormValueChange, typeData } = props;
    const { uploadProps, mandatoryFields } = props;
    const { ...viewProps } = props;

    const [activeKey, setactiveKey] = useState([1]);

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    return (
        <>
            <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                <Panel header="Supporting/Reference Documents" key="1">
                    {!formActionType?.viewMode && (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item label="Document Type" name="documentTypeCd" rules={mandatoryFields ? [validateRequiredSelectField('document type')] : ''} placeholder={preparePlaceholderSelect('document type')}>
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
                                    <Form.Item label="Document Name" name="documentTitle" rules={mandatoryFields ? [validateRequiredInputField('document name')] : ''}>
                                        <Input placeholder={preparePlaceholderText('File Name')} allowClear />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <UploadUtil {...uploadProps} handleFormValueChange={handleFormValueChange} />
                                </Col>
                            </Row>
                        </>
                    )}
                    <ViewSupportingDocDetail {...viewProps} />
                </Panel>
            </Collapse>
            <Collapse defaultActiveKey={['2']} bordered={false} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                <Panel header="Technical Documents" key="2">
                    <Divider />
                    <Row gutter={16}>
                        <ViewTechnicalDocDetail {...viewProps} />
                    </Row>
                </Panel>
            </Collapse>
        </>
    );
};

export default AddEditForm;
