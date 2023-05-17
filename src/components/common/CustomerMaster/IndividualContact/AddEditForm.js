import { Button, Collapse, Form, Typography, Upload, message, Row, Col, Space, Select, Input, Switch, DatePicker } from 'antd';
import { useState } from 'react';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import Svg from 'assets/images/Filter.svg';

import style from '../../Common.module.css';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { Panel } = Collapse;
const { Option } = Select;
const { Text } = Typography;
const { Dragger } = Upload;

const uploadProps = {
    name: 'file',
    multiple: true,
    action: '',
    onChange(info) {
        const { status } = info.file;
        //   if (status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        //   }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    // onDrop(e) {
    //   console.log('Dropped files', e.dataTransfer.files);
    // },
};

const title = [
    { key: 'Mr', name: 'Mr.' },
    { key: 'Mrs', name: 'Mrs.' },
];

const gender = [
    { key: 'Male', name: 'Male' },
    { key: 'Female', name: 'Female' },
    { key: 'Transgender', name: 'Transgender' },
];

const AddEditForm = (props) => {
    const { isReadOnly = false } = props;
    const [openAccordian, setOpenAccordian] = useState('');
    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const disabledProps = { disabled: isReadOnly };
    return (
        <>
            <Form autoComplete="off">
                <Space  direction="vertical">
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Dragger
                                {...uploadProps}
                                style={{
                                    margin: '1.5rem 0 0 0',
                                    background: '#F2F2F2',
                                    border: '1px dashed #B5B5B5',
                                    borderRadius: '6px',
                                    minHeight: '172px',
                                    padding: '1rem 0 0 0',
                                }}
                            >
                                <p className="ant-upload-drag-icon" style={{ textAlign: 'center' }}>
                                    <img src={Svg} alt="" />
                                </p>
                                <p className="ant-upload-text" style={{ textAlign: 'center', fontWeight: '600', fontSize: '18px', lineHeight: '23px', color: '#0B0B0C' }}>
                                    Upload Your Profile Picture
                                </p>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ textAlign: 'center' }}>
                                        {/* <Upload {...uploadProps}> */}
                                        <Button danger>Upload File</Button>
                                        {/* </Upload> */}
                                    </Col>
                                </Row>
                            </Dragger>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Purpose of Contact" name="title" rules={[validateRequiredSelectField('Title')]}>
                                <Select intialValue={'Select'} placeholder={preparePlaceholderSelect('Title')} {...disabledProps}>
                                    {title?.map((item) => (
                                        <Option value={item.key}>{item.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="First Name" name="" rules={[validateRequiredSelectField('First Name')]}>
                                <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('first name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Middle Name" name="">
                                <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('Middle name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Last Name" name="">
                                <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('last name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Mobile Number" name="" rules={[validateRequiredSelectField('Mobile Number')]}>
                                <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('mobile number')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Want to use Mobile no as whatsapp no?" name="">
                                <Switch value={null} checkedChildren="Yes" unCheckedChildren="No" defaultChecked={false} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Whatsapp Number" name="" rules={[validateRequiredSelectField('Last Name')]}>
                                <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('last name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Do you want to contacted over whatsapp?" name="">
                                <Switch value={null} checkedChildren="Yes" unCheckedChildren="No" defaultChecked={false} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Email ID" name="">
                                <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('email id')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Date of Birth" name="" rules={[validateRequiredInputField('Number')]}>
                                <DatePicker format="DD-MM-YYYY" style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Gender" name="">
                                <Select value={null} placeholder={preparePlaceholderSelect('gender')} {...disabledProps}>
                                    <Option></Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Form.Item label="Whatsapp Number" name="" rules={[validateRequiredSelectField('Last Name')]}>
                            <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('last name')} {...disabledProps} />
                        </Form.Item>
                    </Row>
                </Space>
            </Form>
        </>
    );
};

export default AddEditForm;
