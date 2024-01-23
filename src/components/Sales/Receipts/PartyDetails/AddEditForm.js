/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, Card, Divider, Select } from 'antd';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

const { Search } = Input;
const { Option } = Select;

export const AddEditForm = (props) => {
    const { setRequestPayload, requestPayload } = props;
    const { buttonData, setButtonData, partySegmentType, setPartySegment, handleChange, handleSearch, partyDetailForm, formActionType } = props;
    const { isLoading } = props;
    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    const handleCustomer = (value) => {
        partyDetailForm.resetFields();
        setRequestPayload({ ...requestPayload, partyDetails: {} });
        if (value) {
            setPartySegment(value);
            setButtonData({ ...buttonData, formBtnActive: false });
            partyDetailForm.setFieldValue('partySegment', value);
        }
    };

    return (
        <Card>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('receipts.label.partyDetails.partySegment')} name="partySegment" rules={[validateRequiredSelectField(translateContent('receipts.label.partyDetails.partySegment'))]}>
                        <Select {...selectProps} placeholder={preparePlaceholderSelect(translateContent('receipts.placeholder.partySegment'))} onChange={handleCustomer} disabled={!formActionType?.addMode}>
                            {partySegmentType?.map((item) => (
                                <Option key={'dv' + item.key} value={item.key}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('receipts.label.partyDetails.partyId')} name="partyId" rules={[validateRequiredSelectField(translateContent('receipts.label.partyDetails.partyId'))]}>
                        {formActionType?.addMode ? <Search allowClear onChange={handleChange} onSearch={(partyId) => handleSearch(partyId, partyDetailForm.getFieldValue('partySegment'))} placeholder={preparePlaceholderText(translateContent('receipts.placeholder.partyId'))} disabled={!formActionType?.addMode} /> : <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.partyId'))} disabled={true} />}
                    </Form.Item>
                </Col>
            </Row>

            <Divider />
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('receipts.label.partyDetails.partyName')} name="partyName">
                        {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.partyName'))} disabled={true} />}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('receipts.label.partyDetails.address')} name="address">
                        {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.address'))} disabled={true} />}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('receipts.label.partyDetails.city')} name="city">
                        {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.city'))} disabled={true} />}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('receipts.label.partyDetails.state')} name="state">
                        {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.state'))} disabled={true} />}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('receipts.label.partyDetails.phone')} name="mobileNumber">
                        {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.phone'))} disabled={true} />}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('receipts.label.partyDetails.mitraType')} name="mitraType">
                        {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.mitraType'))} disabled={true} />}
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};
