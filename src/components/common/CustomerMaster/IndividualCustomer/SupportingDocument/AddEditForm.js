import React from 'react';
import { Row, Col, Form, Select, Input, message, Upload, Button, Empty } from 'antd';

import { FiEye, FiTrash } from 'react-icons/fi';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { Dragger } = Upload;

// const uploadProps = {
//     name: 'file',
//     multiple: true,
//     action: '',
//     uploadTitle: 'Upload Your Profile Picture',
//     uploadDescription: 'File type should be .png and .jpg and max file size to be 5MB',
//     uploadBtnName: 'Upload File',
//     onChange(info) {
//         const { status } = info.file;
//         if (status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully.`);
//         } else if (status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     },

// };

const AddEditForm = () => {
    const [form] = Form.useForm();

    const showUploadList = {
        showRemoveIcon: false,
        showPreviewIcon: true,
        showDownloadIcon:true,
        previewIcon: <FiTrash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
        // removeIcon: <FiTrash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
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
                    <div className={styles.uploadDragger}>
                        <Dragger showUploadList={showUploadList}>
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
