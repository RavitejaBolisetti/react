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

import styles from 'assets/sass/app.module.scss';

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

    // const handleSave = () => {};

    // const onFinishFailed = () => {};

    return (
        <Card className={styles.drawerCardView}>
            {/* <Form form={partyDetailForm} id="myAdd" onFinish={handleSave} autoComplete="off" layout="vertical" onFinishFailed={onFinishFailed}> */}
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.partySegment} label="Party Segment" name="partySegment" rules={[validateRequiredSelectField('Party Segment')]}>
                        <Select {...selectProps} placeholder={preparePlaceholderSelect('Party Segment')} onChange={handleCustomer} disabled={!formActionType?.addMode}>
                            {partySegmentType?.map((item) => (
                                <Option key={'dv' + item.key} value={item.key}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.partyId} label="Party ID" name="partyId" rules={[validateRequiredSelectField('Party ID')]}>
                        {formActionType?.addMode ? <Search allowClear onChange={handleChange} onSearch={handleSearch} placeholder={preparePlaceholderText('party id')} disabled={!formActionType?.addMode} /> : <Input placeholder={preparePlaceholderText('party id')} disabled={true} />}
                    </Form.Item>
                </Col>
            </Row>
            {formData && (
                <>
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.partyName} label="Party Name" name="partyName">
                                {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText('party name')} disabled={true} />}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.address} label="Address" name="address">
                                {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText('address')} disabled={true} />}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.city} label="City" name="city">
                                {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText('city')} disabled={true} />}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.state} label="State" name="state">
                                {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText('state')} disabled={true} />}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.mobileNumber} label="Phone" name="mobileNumber">
                                {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText('phone')} disabled={true} />}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.mitraType} label="Mitra Type" name="mitraType">
                                {isLoading ? checkAndSetDefaultValue('-', isLoading) : <Input placeholder={preparePlaceholderText('mitra type')} disabled={true} />}
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}

            {/* {RenderCustomerForm(partySegment)} */}
            {/* </Form> */}
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
