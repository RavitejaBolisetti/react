import React from 'react';
import { Row, Col, Form, Select, Input, message, Upload, Button, Empty } from 'antd';

import { FiEye, FiTrash } from 'react-icons/fi';

import { withAuthToken } from 'utils/withAuthToken';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from 'components/common/Common.module.css';

import axios from 'axios';

const { Option } = Select;
const { Dragger } = Upload;

const AddEditForm = (props) => {
    const { typeData, userId, token, accessToken, onFinish, onFinishFailed, setDocId } = props;

    const [form] = Form.useForm();

    const AuthStr = 'Bearer '.concat(token);
    const headers = { Authorization: AuthStr, userId, accessToken, deviceType: 'W', deviceId: '' };

    const uploadProps = {
        // name: 'file',
        multiple: false,
        // action: 'https://apidev.mahindradealerrise.com/common/document/upload',
        // // headers: headers,
        // // data: { applicationId: 'app' },
        // uploadTitle: 'Upload Your Profile Picture',
        // uploadDescription: 'File type should be .png and .jpg and max file size to be 5MB',
        // uploadBtnName: 'Upload File',
        onChange(info) {
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        showUploadList: {
            showRemoveIcon: true,
            showPreviewIcon: true,
            showDownloadIcon: false,
            previewIcon: <FiEye onClick={(e) => console.log(e, 'custom removeIcon event')} />,
            removeIcon: <FiTrash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
        },
    };

    const handleUpload = (options) => {
        const { file, onSuccess, onError } = options;
        // const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('applicationId', 'app');
        formData.append('file', file);

        const config = {
            headers: headers,
        };
        axios
            .post('https://apidev.mahindradealerrise.com/common/document/upload', formData, config)
            .then((response) => {
                console.log('response', response.data.data.docId);
                setDocId(response.data.data.docId)
                onSuccess(response.data);
            })
            .catch((error) => {
                onError(error);
            });

        // xhr.open('POST', 'https://apidev.mahindradealerrise.com/common/document/upload', true);
        // xhr.onload = () => {
        //     if (xhr.status === 200) {
        //         onSuccess(xhr.response);
        //     } else {
        //         onError(xhr);
        //     }
        // };
        // xhr.setRequestHeader('X-Requested-With', '');

        // xhr.setRequestHeader('Authorization', AuthStr);
        // xhr.setRequestHeader('userId', userId);
        // xhr.setRequestHeader('accessToken', token);
        // xhr.setRequestHeader('deviceType', 'W');
        // xhr.setRequestHeader('deviceId', '');
        // xhr.setRequestHeader(headers);
        // xhr.send(formData);
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    return (
        <Form form={form} autoComplete="off" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Document Type" name="documentTypeId" placeholder={preparePlaceholderSelect('document type')} rules={[validateRequiredSelectField('document type')]}>
                        <Select className={styles.headerSelectField} loading={!(typeData?.CUST_FILES?.length !== 0)} placeholder="Select" {...selectProps}>
                            {typeData?.CUST_FILES?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="File Name" name="documentName">
                        <Input placeholder={preparePlaceholderText('File Name')} rules={[validateRequiredInputField('fileName')]} allowClear />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.uploadDragger}>
                        <Dragger customRequest={handleUpload} {...uploadProps}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 100,
                                }}
                                description={
                                    <>
                                        <span>
                                            Click or drop your file here to upload the signed and <br />
                                            scanned customer form.
                                        </span>
                                        <span>
                                            <br />
                                            File type should be png, jpg or pdf and max file size to be 5Mb
                                        </span>
                                    </>
                                }
                            />

                            <Button type="primary">Upload File</Button>
                        </Dragger>
                    </div>
                </Col>
            </Row>
            <Button htmlType="submit" type="primary">
                Submit
            </Button>
        </Form>
    );
};

export default AddEditForm;
