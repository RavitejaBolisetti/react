/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Col, Input, Form, Row, Select, Space, Divider, Card } from 'antd';
import { validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { useEffect } from 'react';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { configurableTypedata , formData,form} = props;
    useEffect(() => {
        form.setFieldsValue({
            ...formData,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
            <Card style={{ backgroundColor: '#F2F2F2' }}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.mobileNumber} label="Mobile Number" name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField('mobile number')]}>
                            <Input placeholder={preparePlaceholderText('mobile number')} maxLength={10} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.customerType} label="Customer Type" name="customerType" data-testid="customerType" rules={[validateRequiredSelectField('customer Type')]}>
                            <Select placeholder="Select" disabled={false} loading={false} allowClear fieldNames={{ label: 'value', value: 'value' }} options={configurableTypedata['CUST_TYPE']}></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.companyName} label="Company Name" name="companyName" data-testid="companyName" rules={[validateRequiredInputField('company name')]}>
                            <Input placeholder={preparePlaceholderText('company name')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.parentCompanyCode} label="Parent Company Code" name="parentCompanyCode" data-testid="parentCode" rules={[validateRequiredInputField('parent company code')]}>
                            <Input placeholder={preparePlaceholderText('parent company code')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.parentCompanyName} label="Parent Company Name" name="parentCompanyName" data-testid="parentName">
                            <Input placeholder={preparePlaceholderText('parent company name')} disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.corporateType} label="Corporate Type" name="corporateType" data-testid="corporateType">
                            <Select placeholder="Select" disabled={false} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['CORP_TYPE']}></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.corporateName} label="Corporate Name" name="corporateName" data-testid="corporateName">
                            <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                <Option value="corporateName">Corporate ABC</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.corporateCode} label="Corporate Code" name="corporateCode" data-testid="corporate code">
                            <Input placeholder={preparePlaceholderText('parent company name')} disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.corporateCategory} label="Corporate Category" name="corporateCategory" data-testid="corporateCategory">
                            <Select placeholder="Select" disabled={false} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['CORP_CATE']}></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.membershipType} label="Membership Type" name="membershipType" data-testid="membershipType" rules={[validateRequiredSelectField('membership type')]}>
                            <Select placeholder="Select" disabled={false} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['MEM_TYPE']}></Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </Space>
    );
};

export const AddEditForm = AddEditFormMain;
