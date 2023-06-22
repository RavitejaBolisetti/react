/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Input, message, Upload, Button, Empty, Card } from 'antd';

import { FiEye, FiTrash } from 'react-icons/fi';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { Dragger } = Upload;

const AddEditForm = (props) => {
    const { typeData, userId,setUploadedFile, uploadFile, listShowLoading } = props;


    const onDrop = (e) => {
        console.log('Dropped files', e.dataTransfer.files);
    };

    const uploadProps = {
        showUploadList: {
            showRemoveIcon: true,
            showDownloadIcon: true,
            previewIcon: <FiEye onClick={(e) => console.log(e, 'custom removeIcon event')} />,
            removeIcon: <FiTrash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
            showProgress: true,
        },
        progress: { strokeWidth: 3, showInfo: true },

        onDrop,
        onChange: (info, event) => {
            const { status } = info.file;

            console.log('event', event);
            if (status === 'uploading') {
                console.log(' uploading info.file.loaded', info.file.loaded);
                console.log(' uploading info.file.total', info.file.total);
                console.log(' uploading info.file.percent', info.file.percent);
            } else if (status === 'done') {
                setUploadedFile(info?.file?.response?.docId);
                message.success(`${info.file.name} file uploaded successfully.`);
                console.log('done info.file.loaded', info.file.loaded);
                console.log('done info.file.total', info.file.total);
                console.log('done info.file.total', info.file.total);
                console.log('done info.file.percent', info.file.percent);
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
        <Card>
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
                <div className={styles.uploadContainer} >
                        <Dragger customRequest={handleUpload}  {...uploadProps}>
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
        </Card>
    );
};

export default AddEditForm;
