import React, { useState, useRef } from 'react';

import { Row, Col, Checkbox, Button, Form, Input, Select, Space } from 'antd';

import { SearchOutlined } from '@ant-design/icons';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validateAlphanumericWithSpace, validatePincodeField } from 'utils/validation';

let index = 0;

const AddEditForm = (props) => {
    const { isReadOnly = false, onFinish, form, setShowAddEditForm, setIsEditing } = props;

    const [items, setItems] = useState(['Office', 'Residence', 'Permanent', 'Other']);
    const [name, setName] = useState('');

    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const handleOther = (key) => {
        // setIsOther(key === 4);
    };

    const handleCancelFormEdit = () => {
        setIsEditing(false);
        setShowAddEditForm(false);
    };

    return (
        <>
            <Form form={form} id="myAdd" onFinish={onFinish} autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Address Type" name="addressType" rules={[validateRequiredSelectField('Address Type')]}>
                            <Select
                                onChange={handleOther}
                                placeholder={preparePlaceholderSelect('address Type')}
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Space
                                            style={{
                                                padding: '0 8px 4px',
                                            }}
                                        >
                                            <Input placeholder="enter type" ref={inputRef} value={name} onChange={onNameChange} allowClear />
                                        </Space>
                                    </>
                                )}
                                options={items.map((item) => ({
                                    label: item,
                                    value: item,
                                }))}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Address Line 1" name="address" rules={[validateRequiredInputField('address Line 1'), validateAlphanumericWithSpace('application name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('address Line 1')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Address Line 2" name="address2">
                            <Input maxLength={50} placeholder={preparePlaceholderText('address Line 2')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Pincode" name="pincode" rules={[validatePincodeField('pincode')]}>
                            <Input suffix={<SearchOutlined />} placeholder="Search" />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Tehsil" name="tehsil">
                            <Input maxLength={50} placeholder={preparePlaceholderText('tehsil')} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="City" name="city">
                            <Input maxLength={50} placeholder={preparePlaceholderText('city')} disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="District" name="district">
                            <Input maxLength={50} placeholder={preparePlaceholderText('district')} disabled={true} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="State" name="state">
                            <Input maxLength={50} placeholder={preparePlaceholderText('state')} disabled={true} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Contact Name" name="contactpersonName">
                            <Input maxLength={50} placeholder={preparePlaceholderText('contact name')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Contact Mobile" name="contactmobilenumber">
                            <Input maxLength={50} placeholder={preparePlaceholderText('contact name')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item valuePropName="checked" name="defaultaddress">
                            <Checkbox>Mark As Default</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <br></br>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Space>
                            <Button form="myAdd" key="submit" htmlType="submit" type="primary">
                                Save
                            </Button>
                            <Button onClick={handleCancelFormEdit} ghost type="primary">
                                Cancel
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default AddEditForm;