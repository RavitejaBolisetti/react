/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Input, Upload, Button, Empty, Divider, Space, Collapse } from 'antd';

import { FiDownload, FiTrash } from 'react-icons/fi';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import Svg from 'assets/images/Filter.svg';
import { expandIcon } from 'utils/accordianExpandIcon';
import styles from 'components/common/Common.module.css';
import { ViewSupportingDocDetail } from './ViewSupportingDocDetail';
import { ViewTechnicalDocDetail } from './ViewTechnicalDocDetail';
import { getNameFromKey } from 'utils/checkAndSetDefaultValue';

const { Panel } = Collapse;
const { Option } = Select;
const { Dragger } = Upload;

const AddEditForm = (props) => {
    const { setUploadedFileName, downloadFileFromList, formActionType, deleteFileFromList, fileList, setFileList, handleFormValueChange, typeData, userId, uploadDocumentFile, setUploadedFile, listShowLoading, showGlobalNotification, setEmptyList, documentTypeRule, setDocumentTypeRule, documentTitleRule, setDocumentTitleRule } = props;
    const { form, supportingDocs, setSupportingDocs } = props;
    const { ...viewProps } = props;

    const [showStatus, setShowStatus] = useState('');
    const [activeKey, setactiveKey] = useState([1]);

    const onDrop = (e) => {};

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const uploadProps = {
        multiple: false,
        accept: 'image/png, image/jpeg, application/pdf',

        beforeUpload: () => {
            setDocumentTypeRule({ rules: [validateRequiredSelectField('documentType')] });
            setDocumentTitleRule({ rules: [validateRequiredInputField('documentTitle')] });
        },
        showUploadList: {
            showRemoveIcon: true,
            showDownloadIcon: true,
            removeIcon: <FiTrash />,
            downloadIcon: <FiDownload style={{ color: '#ff3e5b' }} />,
            showProgress: true,
        },
        progress: { strokeWidth: 3, showInfo: true },
        onDrop,
        onChange: (info) => {
            form.validateFields()
                .then((values) => {
                    deleteFileFromList(info);
                    let fileList = [...info.fileList];
                    fileList = fileList.slice(-1);
                    setFileList(fileList);
                    handleFormValueChange();
                    const { status } = info.file;
                    setShowStatus(info.file);

                    if (status === 'done') {
                        setUploadedFile(info?.file?.response?.docId);
                        setUploadedFileName(info?.file?.response?.documentName);
                        let supportingDocList = [
                            ...supportingDocs,
                            {
                                id: '',
                                documentId: info?.file?.response?.docId,
                                documentTitle: form.getFieldValue('documentTitle'),
                                documentTypeCd: form.getFieldValue('documentTypeCd'),
                                documentTypeName: getNameFromKey(typeData, form.getFieldValue('documentTypeCd')),
                            },
                        ];
                        setSupportingDocs(supportingDocList);
                        form.resetFields();
                        setDocumentTypeRule({ rules: [] });
                        setDocumentTitleRule({ rules: [] });
                    }
                })
                .catch((err) => {
                    return;
                });
        },
        onDownload: (info) => {
            downloadFileFromList(info);
        },
        onRemove: (info) => {
            setDocumentTypeRule({ rules: [] });
            setDocumentTitleRule({ rules: [] });
            deleteFileFromList(info);
        },
    };

    useEffect(() => {
        if (showStatus.status === 'done') {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'File uploaded successfully' });
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

    const handleDocumentType = () => {
        setDocumentTypeRule({ rules: [] });
    };

    const handleDocumentTitle = () => {
        setDocumentTitleRule({ rules: [] });
    };

    return (
        <Space style={{ display: 'flex' }} direction="vertical" size="middle" className={styles.accordianContainer}>
            <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                <Panel header="Supporting/Reference Documents" key="1">
                    {!formActionType?.viewMode && (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item {...documentTypeRule} label="Document Type" name="documentTypeCd" placeholder={preparePlaceholderSelect('document type')} validateTrigger={['onChange']}>
                                        <Select className={styles.headerSelectField} loading={!(typeData?.length !== 0)} placeholder="Select" {...selectProps} onChange={handleDocumentType}>
                                            {typeData?.map((item) => (
                                                <Option key={item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} className={`${styles.inputWrapper} ${styles.allowsection}`}>
                                    <Form.Item {...documentTitleRule} label="Document Name" name="documentTitle" validateTrigger={['onChange']}>
                                        <Input placeholder={preparePlaceholderText('File Name')} onChange={handleDocumentTitle} allowClear />
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
                        </>
                    )}
                    <ViewSupportingDocDetail {...viewProps} />
                </Panel>
            </Collapse>
            <Collapse defaultActiveKey={['2']} bordered={false} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                <Panel header="Technical Documents" key="2">
                    <Divider />
                    <Row gutter={16}>
                        <ViewTechnicalDocDetail {...viewProps} />
                    </Row>
                </Panel>
            </Collapse>
        </Space>
    );
};

export default AddEditForm;
