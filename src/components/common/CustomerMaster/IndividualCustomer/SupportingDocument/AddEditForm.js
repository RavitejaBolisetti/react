/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Input, message, Upload, Button, Empty, Card } from 'antd';

import { FiEye, FiTrash } from 'react-icons/fi';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import Svg from 'assets/images/Filter.svg';
import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { Dragger } = Upload;

const AddEditForm = (props) => {
    const { handleFormValueChange, typeData, userId, uploadDocumentFile, uploadedFile, setUploadedFile, listShowLoading, downloadFile, viewListShowLoading, setUploadedFileList, showGlobalNotification, viewDocument, handlePreview } = props;

    const [showStatus, setShowStatus] = useState('');

    const onDrop = (e) => {
        console.log('Dropped files', e.dataTransfer.files);
    };

    const onDownload = (file) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Your download will start soon' });

        handlePreview(file?.response);
        let a = document.createElement('a');

        a.href = `data:image/png;base64,${viewDocument?.base64}`;
        a.download = viewDocument?.fileName;
        a.click();
    };

    const uploadProps = {
        multiple: false,
        showUploadList: {
            showRemoveIcon: true,
            showDownloadIcon: true,
            removeIcon: <FiTrash />,
            downloadIcon: <FiEye onClick={(e) => onDownload(e)} style={{ color: '#ff3e5b' }} />,
            showProgress: true,
        },
        progress: { strokeWidth: 3, showInfo: true },
        onDrop,
        beforeUpload: (info) => {
            if (info?.type === 'image/png' || info?.type === 'image/jpeg' || info?.type === 'application/pdf') {
            } else {
                showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Upload Correct Format' });
                return false;
            }
        },
        onChange: (info) => {
            console.log(info, 'INFORMATION');
            handleFormValueChange();
            const { status } = info.file;
            setShowStatus(status);
        },
    };

    //${info.file.name}

    useEffect(() => {
        console.log('showStatus');
        if (showStatus === 'uploading') {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Uploading' });
        } else if (showStatus === 'done') {
            //setUploadedFile(info?.file?.response?.docId);
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Uploaded' });
        } else if (showStatus === 'error') {
            message.error(` file upload failed.`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showStatus]);

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

        uploadDocumentFile(requestData);
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
                    <Form.Item label="Document Type" name="documentTypeId" placeholder={preparePlaceholderSelect('document type')}>
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
                    <div className={styles.uploadContainer} style={{ opacity: '100' }}>
                        <Dragger
                            //  disabled={uploadedFile?.length > 0}
                            customRequest={handleUpload}
                            {...uploadProps}
                        >
                            <div>
                                <img src={Svg} alt="" />
                            </div>
                            <Empty
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
