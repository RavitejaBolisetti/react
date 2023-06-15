import React from 'react';
import { Row, Col, Form, Select, Input, message, Upload, Button } from 'antd';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import Svg from 'assets/images/Filter.svg';


const { Option } = Select;
const { Dragger } = Upload;

const AddEditForm = () => {
    const [form] = Form.useForm();

    const uploadProps = {
        name: 'file',
        multiple: true,
        action: '',
        uploadTitle: 'Upload Your Profile Picture',
        uploadDescription: 'File type should be .png and .jpg and max file size to be 5MB',
        uploadBtnName: 'Upload File',
        onChange(info) {
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Form form={form} layout="vertical">
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Document Type" name="documentType">
                        <Select placeholder={preparePlaceholderSelect('Document Type')} allowClear>
                            <Option value="documentType">documentType</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="File Name" name="fileName">
                        <Input placeholder={preparePlaceholderText('File Name')} allowClear />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon" style={{ textAlign: 'center',color :'pink' }}>
                            <img src={Svg} alt="" />
                        </p>

                        <p className="ant-upload-text" style={{ textAlign: 'center', fontWeight: '500', fontSize: '14px', lineHeight: '23px', color: '#0B0B0C' }}>
                            Click or drop your file here to upload the signed and <br />
                            scanned customer form.
                        </p>

                        <p className="ant-upload-text" style={{ textAlign: 'center', fontWeight: '400', fontSize: '12px', lineHeight: '23px', color: '#0B0B0C' }}>
                            File type should be png, jpg or pdf and max file size to be 5Mb
                        </p>
                        <Button danger>Upload File</Button>
                    </Dragger>
                </Col>
            </Row>
        </Form>
    );
};

export default AddEditForm;
