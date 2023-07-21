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

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
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
    const { isReadOnly } = props;
    const [optionForm] = Form.useForm();
    const [tableForm] = Form.useForm();

    const [isRead, setIsRead] = useState(false);
    const [customer, setCustomer] = useState(false);
    const [activeKey, setActiveKey] = useState([1]);
    const [isEditing, setisEditing] = useState(false);
    const [identification, setidentification] = useState('');
    const [MakeOptions, setMakeOptions] = useState([
        {
            value: '1',
            label: 'Year',
        },
        {
            value: '2',
            label: 'Month',
        },
        {
            value: '3',
            label: 'WeekDays',
        },
    ]);
    const [serviceNameOptions, setserviceNameOptions] = useState([
        {
            value: '1',
            label: 'Not Identified',
        },
        {
            value: '2',
            label: 'Closed',
        },
        {
            value: '3',
            label: 'Identified',
        },
    ]);

    const MakefieldNames = { label: 'label', value: 'value' };
    const serviceNames = { label: 'label', value: 'value' };

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
    const handleCanceler = () => {
        setIsReadOnly(false);
    };
    const handleSelect = (value, selectObj, labelName) => {
        if (!value) return;
        switch (labelName) {
            case 'Item': {
                optionForm.setFieldsValue({
                    serviceNameValue: selectObj?.label,
                });
                tableForm.setFieldsValue({
                    serviceNameValue: selectObj?.label,
                });
                break;
            }
            case 'make': {
                optionForm.setFieldsValue({
                    makeValue: selectObj?.label,
                });
                tableForm.setFieldsValue({
                    makeValue: selectObj?.label,
                });
                break;
            }
            default: {
                break;
            }
        }
    };

    const OptionServicesFormProps = {
        typeData,
        handleCancel: handleCanceler,
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
        serviceNameOptions,
        setserviceNameOptions,
        MakeOptions,
        setMakeOptions,
        MakefieldNames,
        serviceNames,
        handleSelect,
    };

    const disabledProps = { disabled: isReadOnly };

    const handleEdit = ({ record, index }) => {
        console.log('record', record, index);
        tableForm.setFieldsValue({
            serviceName: record?.serviceName ?? '',
            make: record?.make ?? '',
            amount: record?.amount ?? '',
            serviceNameValue: record?.serviceNameValue ?? '',
            makeValue: record?.makeValue ?? '',
        });
        setidentification(index);
        setisEditing(true);
    };
    const handleTableCancel = ({ record, index }) => {
        setisEditing(false);
        setidentification('');
        tableForm.resetFields();
    };
    const handleSave = ({ record, index }) => {
        tableForm
            .validateFields()
            .then(() => {
                const UpdateValues = tableForm.getFieldsValue();
                const data = { ...UpdateValues, serviceName: UpdateValues?.serviceNameValue, make: UpdateValues?.makeValue, id: '' };

                setidentification('');
                setisEditing(false);
                const newarr = [...optionsServiceModified];
                newarr[index] = data;
                console.log('newarr', UpdateValues, newarr);

                setoptionsServiceModified(newarr);
                tableForm.resetFields();
            })
            .catch((err) => {});
    };
    const handleDelete = ({ record, index }) => {
        setoptionsServiceModified(optionsServiceModified.filter((element, i) => i !== index));
    };
    const renderFormItems = (props) => {
        const { handleEdit, identification, isEditing, viewMode = false, handleSave, handleCancel, renderFormItems, dataIndex, Index, text } = props;
        const FormItemReturn = isEditing && identification === Index;
        console.log('FormItemReturn', FormItemReturn, text, dataIndex);
        switch (dataIndex) {
            case 'serviceName': {
                if (FormItemReturn && !viewMode) {
                    return (
                        <>
                            <Form.Item name="serviceName" rules={[validateRequiredSelectField('Item')]}>
                                <Select onChange={(codeValue, serviceObject) => handleSelect(codeValue, serviceObject, 'Item')} allowClear placeholder={preparePlaceholderSelect('item')} options={serviceNameOptions} fieldNames={serviceNames} />
                            </Form.Item>
                            <Form.Item name="serviceNameValue" hidden></Form.Item>
                        </>
                    );
                } else {
                    return text;
                }
                break;
            }
            case 'make': {
                if (FormItemReturn && !viewMode) {
                    return (
                        <>
                            <Form.Item name="make" rules={[validateRequiredInputField('Make')]}>
                                <Select onChange={(codeValue, makeObject) => handleSelect(codeValue, makeObject, 'make')} allowClear placeholder={preparePlaceholderSelect('Make')} fieldNames={MakefieldNames} options={MakeOptions} />
                            </Form.Item>
                            <Form.Item name="makeValue" hidden></Form.Item>
                        </>
                    );
                } else {
                    return text;
                }
                break;
            }
            case 'amount': {
                if (FormItemReturn && !viewMode) {
                    return (
                        <Form.Item name="amount" rules={[validateRequiredInputField('Srl no'), validationFieldLetterAndNumber('Srl no')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Srl no')} />
                        </Form.Item>
                    );
                } else {
                    return text;
                }
                break;
            }
            default: {
                return text;
            }
        }
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
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('model ')} {...disabledProps} />
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
                                <Form autoComplete="off" layout="vertical" form={tableForm}>
                                    <DataTable tableColumn={tableColumn({ handleEdit, identification, isEditing, handleCancel: handleTableCancel, renderFormItems, handleSave, handleDelete })} tableData={optionsServiceModified} pagination={false} />
                                </Form>
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
