/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Collapse, Form, Typography, Upload, message, Row, Col, Space, Select, Input, DatePicker, Checkbox, Divider, Card } from 'antd';
import Svg from 'assets/images/Filter.svg';
import { FiDownload } from 'react-icons/fi';
import { PlusOutlined } from '@ant-design/icons';
import { DataTable } from 'utils/dataTable';
import { addToolTip } from 'utils/customMenuLink';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { expandIconWithText, dynamicExpandIcon } from 'utils/accordianExpandIcon';

import { validateAadhar, validateDrivingLicenseNo, validateGSTIN, validateRequiredInputField, validateRequiredSelectField, validatePanField, validateVoterId, validatFacebookProfileUrl, validatYoutubeProfileUrl, validattwitterProfileUrl, validatInstagramProfileUrl } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { disableFutureDate } from 'utils/disableDate';
import { expandIcon } from 'utils/accordianExpandIcon';
import { AggregatesForm } from './aggregateForm';
import { tableColumn } from './tableCoulmn';

import styles from 'components/common/Common.module.css';
// import ViewImageUtils from '../../Common/ViewImageUtils';

const { Panel } = Collapse;
const { Text } = Typography;

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

const AddEditFormMain = (props) => {
    const { formData, setIsReadOnly, userId, form, uploadDocumentFile, viewDocument, setUploadedFile, handleOnClickCustomerForm, listDocumentShowLoading, isViewDocumentLoading, setUploadedFiles, uploadConsentDocumentFile, setOpenAccordian, typeData, showGlobalNotification, optionsServicesMapping, setoptionsServicesMapping, fetchList, listShowLoading, saveData, onSuccessAction, selectedOrderId, onErrorAction, optionsServiceModified, setoptionsServiceModified, handleFormValueChange, openAccordian, tooltTipText } = props;
    const { isReadOnly = false } = props;
    const [optionForm] = Form.useForm();

    const [isRead, setIsRead] = useState(false);
    const [customer, setCustomer] = useState(false);
    const [activeKey, setActiveKey] = useState([1]);

    useEffect(() => {
        setCustomer(formData?.customerCategory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.customerCategory]);

    useEffect(() => {
        form.setFieldsValue({
            ...formData,
        });
        form.setFieldsValue({
            companyName: formData?.authorityDetails?.companyName,
            postion: formData?.authorityDetails?.postion,
            personName: formData?.authorityDetails?.personName,
            remarks: formData?.authorityDetails?.remarks,
            vehicleDeploymentDetails: formData?.vehicleDeploymentDetails,
            dateOfBirth: formData?.dateOfBirth ? dayjs(formData?.dateOfBirth) : null,
        });
        if (formData?.martialStatus === 'S') {
            setIsRead(true);
        } else {
            setIsRead(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const onCustomerCategoryChange = (values) => {
        setCustomer(values);
    };

    const handleOnChange = (e) => {
        const values = e;
        if (values === 'S') {
            setIsRead(true);
            form.setFieldsValue({
                weddingAnniversary: null,
            });
        } else {
            setIsRead(false);
        }
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };

    const onDrop = (e) => {
        // console.log('Dropped files', e.dataTransfer.files);
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        action: '',
        progress: { strokeWidth: 10 },
        success: { percent: 100 },
        onDrop,
        onChange: (info, event) => {
            const { status } = info.file;
            if (status === 'uploading') {
            } else if (status === 'done') {
                setUploadedFile(info?.file?.response?.docId);
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const uploadConsentProps = {
        name: 'file',
        multiple: false,
        action: '',
        progress: { strokeWidth: 10 },
        success: { percent: 100 },
        onDrop,
        onChange: (info, event) => {
            const { status } = info.file;
            if (status === 'uploading') {
            } else if (status === 'done') {
                setUploadedFiles(info?.file?.response?.docId);
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const handleCollapse = (key) => {
        if (key !== 3 && isReadOnly) {
            setIsReadOnly(false);
        }
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleUpload = (options) => {
        const { file, onSuccess, onError } = options;

        const data = new FormData();
        data.append('applicationId', 'app');
        data.append('file', file);

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listDocumentShowLoading,
            userId,
            onError,
            onSuccess,
        };

        uploadDocumentFile(requestData);
    };
    const addContactHandeler = (e) => {
        optionForm.resetFields();
        setOpenAccordian('3');
        setIsReadOnly(true);
    };

    const handleUploads = (options) => {
        const { file, onSuccess, onError } = options;

        const data = new FormData();
        data.append('applicationId', 'app');
        data.append('file', file);

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listDocumentShowLoading,
            userId,
            onError,
            onSuccess,
        };

        uploadConsentDocumentFile(requestData);
    };

    const ImageProps = {
        viewDocument,
        handleUpload,
        uploadProps,
        formData,
    };
    const handleCancel = () => {
        setIsReadOnly(false);
    };

    const OptionServicesFormProps = {
        typeData,
        handleCancel,
        optionForm,
        optionsServicesMapping,
        setoptionsServicesMapping,
        showGlobalNotification,
        fetchList,
        userId,
        listShowLoading,
        saveData,
        onSuccessAction,
        selectedOrderId,
        onErrorAction,
        formData,
        setOpenAccordian,
        addContactHandeler,
        optionsServiceModified,
        setoptionsServiceModified,
        handleFormValueChange,
    };

    const disabledProps = { disabled: isReadOnly };
    const handleEdit = (record) => {
        console.log('record', record);
    };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space direction="vertical" size="small" className={styles.accordianContainer}>
                        <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian}>
                            <Panel header="Product Attribute Details" key="1">
                                <Divider />

                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Product Division" name="productdivision">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('product division')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Model Group" name="modelgrp">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('model group')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Model Family" name="modelfamily">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('model familiy')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Model Variant" name="modelvariant">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('model variant')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.modelTooltip}>
                                        {addToolTip(tooltTipText, 'bottom', '#D3EDFE', styles.toolTip)(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}

                                        <Form.Item label="Model" name="model">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('model ')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Manufacturer Invoice Date" name="invoicedate">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('manufacturer invoice date')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Manufacturer Warrenty Start Date" name="startdate">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('manufacturer start date')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>

                        <Collapse onChange={() => handleCollapse(2)} expandIconPosition="end" expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian}>
                            <Panel header="Connected Vehicle" key="2">
                                <Divider />
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="TCU ID" name="tcuid">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('tcu id')} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="E-Sim No" name="simno">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('Sim no.')} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="E-Sim Status" name="simstatus">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('Sim status')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Preffered Mobile No 1" name="mobileone">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('mobile no')} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Preffered Mobile No 2" name="mobiletwo">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('mobile no')} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="KYC Status" name="status">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('kyc status')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                        <Collapse onChange={() => handleCollapse(3)} expandIconPosition="end" expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian}>
                            <Panel
                                header={
                                    <Row>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                Aggregates
                                            </Text>
                                            <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly}>
                                                Add
                                            </Button>
                                        </Col>
                                    </Row>
                                }
                                key="3"
                            >
                                {isReadOnly && <AggregatesForm {...OptionServicesFormProps} />}
                                <DataTable tableColumn={tableColumn(handleEdit)} tableData={optionsServiceModified} removePagination={true} />
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
