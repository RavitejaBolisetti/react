import React, { useState, useRef, useEffect } from 'react';

import { Col, Checkbox, Divider, Row, Button, Form, Input, Radio, Select, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import styles from '../../Common.module.css';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validationFieldLetteNumberandPeriod, validateRequiredSelectField, validateAlphanumericWithSpace } from 'utils/validation';

const { Option } = Select;
const { Search } = Input;
let index = 0;

const AddEditFormMain = ({ form }) => {
    const [items, setItems] = useState(['Office', 'Residence', 'Permanent', 'Other']);
    const [name, setName] = useState('');
    const [isOther, setIsOther] = useState(false);

    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleReset = () => {
        form.resetFields();
    };

    const handleOther = (key) => {
        setIsOther(key === 4);
    };

    return (
        <>
            <Form form={form} id="myAdd" autoComplete="off" layout="vertical">
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
                        <Form.Item label="Address Line 1" name="addressLine1" rules={[validateRequiredInputField('address Line 1'), validateAlphanumericWithSpace('application name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('address Line 1')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Address Line 2" name="addressLine2">
                            <Input maxLength={50} placeholder={preparePlaceholderText('address Line 2')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Pincode" name="pincode" rules={[validateRequiredSelectField('pincode')]}>
                            <Input suffix={<SearchOutlined/>} placeholder="Search" />
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
                        <Form.Item label="Contact Name" name="contactName">
                            <Input maxLength={50} placeholder={preparePlaceholderText('contact name')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Contact Mobile" name="contactMobile">
                            <Input maxLength={50} placeholder={preparePlaceholderText('contact name')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Checkbox>Mark as Default</Checkbox>
                    </Col>
                </Row>
                <br></br>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Space>
                            <Button form="myAdd" key="submit" htmlType="submit" type="primary">
                                Save
                            </Button>
                            <Button onClick={handleReset} ghost type="primary">
                                Reset
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
