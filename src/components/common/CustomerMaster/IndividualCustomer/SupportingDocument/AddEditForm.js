import React from 'react';
import { Row, Col, Form, Select, Input, message, Upload, Button, Empty } from 'antd';

import { FiEye, FiTrash } from 'react-icons/fi';

import { withAuthToken } from 'utils/withAuthToken';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

// import { getAuthToken, getAuthAccessToken, getUserId } from '../store/state/auth';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { Dragger } = Upload;

const AddEditForm = (props) => {
    const { typeData, userId, accessToken, token } = props;

    const [form] = Form.useForm();
    var accessTokenObj = JSON.parse(localStorage.getItem('Token:'));

    // const token = getAuthToken(getState());
    // const userId = getUserId(getState());
    // const accessToken = getAuthAccessToken(getState());

    const uploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://apidev.mahindradealerrise.com/common/document/upload',
        headers: {
            userId,
            accessToken,
            token,
        },
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
        showUploadList: {
            showRemoveIcon: true,
            showPreviewIcon: true,
            showDownloadIcon: false,
            previewIcon: <FiEye onClick={(e) => console.log(e, 'custom removeIcon event')} />,
            removeIcon: <FiTrash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
        },
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    return (
        <Form form={form} layout="vertical">
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Document Type" name="documentType" placeholder={preparePlaceholderSelect('document type')} rules={[validateRequiredSelectField('document type')]}>
                        <Select className={styles.headerSelectField} loading={!(typeData?.CUST_FILES?.length !== 0)} placeholder="Select" {...selectProps}>
                            {typeData?.CUST_FILES?.map((item) => (
                                <Option key={'cust' + item?.value} value={item?.value}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="File Name" name="fileName">
                        <Input placeholder={preparePlaceholderText('File Name')} rules={[validateRequiredInputField('fileName')]} allowClear />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.uploadDragger}>
                        <Dragger {...uploadProps}>
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
        </Form>
    );
};

export default AddEditForm;
