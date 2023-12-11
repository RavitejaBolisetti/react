/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form, Card, Divider, Select } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredSelectField } from 'utils/validation';
import { translateContent } from 'utils/translateContent';
const { Search } = Input;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, buttonData, setButtonData, partySegmentType, setPartySegment, handleChange, handleSearch, partyDetailForm, formActionType } = props;
    const { isLoading } = props;
    useEffect(() => {
        partyDetailForm.setFieldsValue({
            ...formData,
        });
        partyDetailForm.setFieldsValue({
            partyName: formData?.partyName ?? formData?.customerName,
            address: formData?.address,
            city: formData?.city,
            state: formData?.state,
            mobileNumber: formData?.mobileNumber,
            mitraType: formData?.mitraType,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    const handleCustomer = (value) => {
        setPartySegment(value);
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    return (
        <Card>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.requestId} label={translateContent('claimEmpowerment.label.empowerDetails.requestId')} name="requestId" rules={[validateRequiredSelectField(translateContent('claimEmpowerment.label.empowerDetails.requestId'))]}>
                        <Select {...selectProps} placeholder={preparePlaceholderSelect(translateContent('claimEmpowerment.placeholder.requestId'))} onChange={handleCustomer} disabled={!formActionType?.addMode}>
                            {partySegmentType?.map((item) => (
                                <Option key={'dv' + item.key} value={item.key}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.requestDate} label={translateContent('claimEmpowerment.label.empowerDetails.requestDate')} name="requestDate" rules={[validateRequiredSelectField(translateContent('claimEmpowerment.label.empowerDetails.requestDate'))]}>
                        {formActionType?.addMode ? <Search allowClear onChange={handleChange} onSearch={handleSearch} placeholder={preparePlaceholderText(translateContent('claimEmpowerment.placeholder.requestDate'))} disabled={!formActionType?.addMode} /> : <Input placeholder={preparePlaceholderText(translateContent('claimEmpowerment.placeholder.requestDate'))} disabled={true} />}
                    </Form.Item>
                </Col>
            </Row>
            {formData && (
                <>
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.requestStatus} label={translateContent('claimEmpowerment.label.empowerDetails.requestStatus')} name="requestStatus">
                                {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('claimEmpowerment.placeholder.requestStatus'))} disabled={true} />}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.address} label={translateContent('receipts.label.partyDetails.address')}name="address">
                                {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.address'))} disabled={true} />}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.city} label={translateContent('receipts.label.partyDetails.city')} name="city">
                                {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.city'))} disabled={true} />}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.state} label={translateContent('receipts.label.partyDetails.state')} name="state">
                                {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.state'))} disabled={true} />}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.mobileNumber} label={translateContent('receipts.label.partyDetails.phone')} name="mobileNumber">
                                {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.phone'))} disabled={true} />}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.mitraType} label={translateContent('receipts.label.partyDetails.mitraType')} name="mitraType">
                                {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.mitraType'))} disabled={true} />}
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
