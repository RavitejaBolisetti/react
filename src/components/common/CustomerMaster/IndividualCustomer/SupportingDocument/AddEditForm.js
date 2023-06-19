import React from 'react';
import { Row, Col, Form, Select, Input, message, Upload, Button, Empty } from 'antd';

import { FiEye, FiTrash } from 'react-icons/fi';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { Dragger } = Upload;

const AddEditForm = (props) => {
    const { typeData, userId, onFinish, onFinishFailed, setUploadedFile, uploadFile, listShowLoading, showGlobalNotification } = props;
    const [form] = Form.useForm();

    showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'File uploaded successfuly' });

    const onDrop = (e) => {
        console.log('Dropped files', e.dataTransfer.files);
    };

    const showUploadList = {
        showRemoveIcon: true,
        showPreviewIcon: true,
        showDownloadIcon: false,
        previewIcon: <FiEye onClick={(e) => console.log(e, 'custom removeIcon event')} />,
        removeIcon: <FiTrash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
    };

    const uploadProps = {
        onDrop,
        showUploadList,
        onChange: (info) => {
            const { status } = info.file;

            if (status !== 'uploading') {
                setUploadedFile(info?.file?.response?.data?.docId);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const handleUpload = (options) => {
        const { file, onSuccess, onError } = options;

        const data = new FormData();
        data.append('applicationId', 'app');
        data.append('file', file);
       
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        uploadFile(requestData);
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
                        <Select className={styles.headerSelectField} loading={!(typeData?.length !== 0)} placeholder="Select" {...selectProps}>
                            {typeData?.map((item) => (
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
