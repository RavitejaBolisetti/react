/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Form, Select, Input, Divider, Collapse } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';

import styles from 'assets/sass/app.module.scss';

import { ViewSupportingDocDetail } from './ViewSupportingDocDetail';
import { ViewTechnicalDocDetail } from './ViewTechnicalDocDetail';
import { UploadUtil } from 'utils/Upload';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;
const { Option } = Select;

const AddEditForm = (props) => {
    const { formActionType, handleFormValueChange, typeData, handleClearChange } = props;
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
            <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" collapsible="icon">
                <Panel header={translateContent('vehicleDetail.documents.heading.moduleTitle')} key="1">
                    <Divider />
                    {!formActionType?.viewMode && (
                        <>
                            <Row gutter={16}>
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
                <Panel header={translateContent('vehicleDetail.documents.heading.technicalDocuments')} key="2">
                    <Divider />
                    <ViewTechnicalDocDetail {...viewProps} />
                </Panel>
            </Collapse>
        </>
    );
};

export default AddEditForm;
