import React, { useState, useRef, useEffect } from 'react';

import { Col, Checkbox, Divider, Row, Button, Form, Input, Radio, Select, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// import styles from '../../../Common.module.css';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validationFieldLetteNumberandPeriod, validateRequiredSelectField, validateAlphanumericWithSpace } from 'utils/validation';

const { Option } = Select;
const { Search } = Input;
let index = 0;
const { TextArea } = Input;

// const addressType = [
//     { key: 'office', name: 'Office' },
//     { key: 'residence', name: 'Residence' },
//     { key: 'permanent', name: 'Permanent' },
//     { key: 'other', name: 'Other' },
// ];

const AddEditForm = (props) => {
    const { isReadOnly = false, onFinish, form, onCloseAction, isViewModeVisible, styles } = props;

    const disabledProps = { disabled: isReadOnly };
    const [items, setItems] = useState(['Type Data', 'Type Data1']);
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
            <Form form={form} id="myAdd" onFinish={onFinish} autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Scheme Type" name="schemeType" rules={[validateRequiredSelectField('Scheme Type')]}>
                            <Select
                                onChange={handleOther}
                                placeholder={preparePlaceholderSelect('scheme Type')}
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Space
                                            style={{
                                                padding: '0 8px 4px',
                                            }}
                                        ></Space>
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
                        <Form.Item label="Scheme Catagory" name="schemecatagory" rules={[validateRequiredInputField('scheme catagory')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('scheme catagory')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Scheme Amount" name="schemeamount">
                            <Input maxLength={50} placeholder={preparePlaceholderText('scheme amount')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Valid From" name="validfrom" rules={[validateRequiredSelectField('date')]}>
                            <Input suffix={<SearchOutlined />} placeholder="Search" />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Valid To" name="validto" rules={[validateRequiredSelectField('date')]}>
                            <Input suffix={<SearchOutlined />} placeholder="Search" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item label="Description" name="description">
                            <TextArea rows={2} maxLength={250} placeholder={preparePlaceholderText('description')} />
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

export default AddEditForm;
