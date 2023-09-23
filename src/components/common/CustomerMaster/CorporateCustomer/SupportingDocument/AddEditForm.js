/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Input, Upload, Button, Empty, Card } from 'antd';

import { FiEye, FiTrash } from 'react-icons/fi';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import Svg from 'assets/images/Filter.svg';

import styles from 'assets/sass/app.module.scss';

const { Option } = Select;
const { Dragger } = Upload;

const AddEditForm = (props) => {
    const { setUploadedFileName, downloadFileFromList, fileList, setFileList, handleFormValueChange, typeData, userId, uploadDocumentFile, setUploadedFile, listShowLoading, showGlobalNotification, setEmptyList } = props;

    const [showStatus, setShowStatus] = useState('');

    const onDrop = (e) => {};

    const uploadProps = {
        multiple: false,
        accept: 'image/png, image/jpeg, application/pdf',

        showUploadList: {
            showRemoveIcon: true,
            showDownloadIcon: true,
            removeIcon: <FiTrash />,
            downloadIcon: <FiEye onClick={() => downloadFileFromList()} style={{ color: '#ff3e5b' }} />,
            showProgress: true,
        },
        progress: { strokeWidth: 3, showInfo: true },
        onDrop,
        onChange: (info) => {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            setFileList(fileList);
            handleFormValueChange();
            const { status } = info.file;
            setShowStatus(info.file);
            if (status === 'done') {
                setUploadedFile(info?.file?.response?.docId);
                setUploadedFileName(info?.file?.response?.documentName);
            }
        },
    };

    useEffect(() => {
        if (showStatus.status === 'done') {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: `${showStatus.name + ' file uploaded successfully'}` });
        } else if (showStatus.status === 'error') {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Error' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showStatus]);

    const handleUpload = (options) => {
        const { file, onSuccess, onError } = options;
        setEmptyList(true);

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
                        <Dragger fileList={fileList} customRequest={handleUpload} {...uploadProps}>
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
