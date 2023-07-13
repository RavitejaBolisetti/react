/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Input, Upload, Button, Empty, Divider, Space, Collapse } from 'antd';

import { FiEye, FiTrash } from 'react-icons/fi';
// import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import Svg from 'assets/images/Filter.svg';
import { expandIcon } from 'utils/accordianExpandIcon';
import styles from 'components/common/Common.module.css';
import { ViewSupportingDocDetail } from './ViewSupportingDocDetail';
// import { ViewTechnicalDocDetail } from './ViewTechnicalDocDetail';
import { getNameFromKey } from 'utils/checkAndSetDefaultValue';

const { Panel } = Collapse;
const { Option } = Select;
const { Dragger } = Upload;

const AddEditForm = (props) => {
    const { setUploadedFileName, downloadFileFromList, deleteFileFromList, fileList, setFileList, handleFormValueChange, typeData, userId, uploadDocumentFile, setUploadedFile, listShowLoading, showGlobalNotification, setEmptyList } = props;
    const { form, supportingDocs, setSupportingDocs } = props;
    const { ...viewProps } = props;

    const [showStatus, setShowStatus] = useState('');
    const [activeKey, setactiveKey] = useState([1]);

    // const [uploadRules, setUploadRules] = useState([]);

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
        multiple: true,
        accept: 'image/png, image/jpeg, application/pdf',

        beforeUpload: () => {},
        showUploadList: {
            showRemoveIcon: true,
            showDownloadIcon: true,
            removeIcon: <FiTrash />,
            downloadIcon: <FiEye style={{ color: '#ff3e5b' }} />,
            showProgress: true,
        },
        progress: { strokeWidth: 3, showInfo: true },
        onDrop,
        onChange: (info) => {
            // if (info.file.status === 'removed') {
            //     setUploadRules([]);
            // }
            form.validateFields()
                .then((values) => {
                    let fileList = [...info.fileList];
                    // fileList = fileList.slice(-1);
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
            deleteFileFromList(info);
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
        // setUploadRules({ rules: [validateRequiredInputField('documentTitle')] });
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
        <Space style={{ display: 'flex' }} direction="vertical" size="middle" className={styles.accordianContainer}>
            <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                <Panel header="Supporting/Reference Documents" key="1">
                    {/* <Form layout="vertical" autoComplete="off" form={uploadForm} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={handleUpload}> */}
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Document Type" name="documentTypeCd" placeholder={preparePlaceholderSelect('document type')} validateTrigger={['handleUpload']}>
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
                            <Form.Item label="Document Name" name="documentTitle" validateTrigger={['handleUpload']}>
                                <Input placeholder={preparePlaceholderText('File Name')} allowClear />
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
                    {/* </Form> */}
                    <ViewSupportingDocDetail {...viewProps} />
                </Panel>
            </Collapse>
            <Collapse defaultActiveKey={['2']} bordered={false} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                <Panel header="Technical Documents" key="2">
                    <Divider className={styles.marT20} />
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            Coming Soon
                        </Col>
                        {/* <ViewTechnicalDocDetail {...viewProps} /> */}
                    </Row>
                </Panel>
            </Collapse>
        </Space>
    );
};

export default AddEditForm;
