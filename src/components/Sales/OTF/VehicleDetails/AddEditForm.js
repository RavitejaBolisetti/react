/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Space, Collapse, Typography, Divider } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FiEdit } from 'react-icons/fi';
import { PARAM_MASTER } from 'constants/paramMaster';
import { OptionServicesForm } from './OptionServicesForm';
import styles from 'components/common/Common.module.css';

import { DataTable } from 'utils/dataTable';
import { taxDetailsColumn, optionalServicesColumns } from './tableColumn';
import { ActiveText, dynamicExpandIcon } from 'utils/accordianExpandIcon';
const { Text } = Typography;

const { Option } = Select;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { activeKey, formData, onChange, ProductHierarchyData, setactiveKey, typeData, formActionType, setIsViewModeVisible } = props;
    const [form] = Form.useForm();

    const [isReadOnly, setIsReadOnly] = useState(false);
    const [openAccordian, setOpenAccordian] = useState();
    const [optionsServicesMapping, setoptionsServicesMapping] = useState([{}]);
    const disabledProp = { disabled: true };
    useEffect(() => {
        if (formActionType?.editMode && formData) {
            form.setFieldsValue({
                usageType: formData?.vehicleUsageType,
                model: formData?.model,
                modelCode: formData?.modelCode,
                availableStock: formData?.availableStock,
                vehicleAllocatedStatus: formData?.vehicleAllocationStatus,
                poNumber: formData?.ponumber,
                poDate: formData?.podate,
                poStatus: formData?.postatus,
                soNumber: formData?.sonumber,
                soStatus: formData?.sostatus,
                vinNumber: formData?.vinnumber,
                vehicleSellingPrice: formData?.vehicleSellingPrice,
                discountAmount: formData?.discountAmount,
                taxAmount: formData?.taxAmount,
                vehicleAmount: formData?.vehicleAmount,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };
    const addContactHandeler = (e) => {
        e.stopPropagation();
        form.resetFields();
        setOpenAccordian('3');
        setIsReadOnly(true);
    };
    const handleCancel = () => {
        setIsReadOnly(false);
    };
    const OptionServicesFormProps = {
        handleCancel,
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space size="middle" direction="vertical" className={styles.accordianContainer}>
                    <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={({ isActive }) => ActiveText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} activeKey={openAccordian}>
                        <Panel
                            header={
                                <div className={styles.alignUser}>
                                    <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                        Vehicle Information
                                    </Text>
                                </div>
                            }
                            key="1"
                        >
                            <Form autoComplete="off" layout="vertical" form={form}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Vehicle Usage Type" name="usageType" data-testid="usageType" rules={[validateRequiredSelectField('vehicle usage Type')]}>
                                            <Select placeholder="Select Vehicle Usage Type" allowClear options={typeData[PARAM_MASTER.VEHCL_TYPE.id]} fieldNames={{ label: 'value', value: 'key' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Model" name="model" data-testid="model">
                                            <Select placeholder="Select" allowClear options={ProductHierarchyData} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Model Code" name="modelCode" data-testid="vehicleVariant">
                                            <Input {...disabledProp} placeholder={preparePlaceholderText('Model Code')} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Available Stock" name="availableStock" data-testid="availableStock">
                                            <Input {...disabledProp} placeholder={preparePlaceholderText('Available Stock')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Vehicle Allocated Status" name="vehicleAllocatedStatus" data-testid="vehicleAllocatedStatus">
                                            <Input {...disabledProp} placeholder={preparePlaceholderText('Vehicle Allocated Status')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="PO Number" name="poNumber">
                                            <Input {...disabledProp} placeholder={preparePlaceholderText('PO Number')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="PO Date" name="poDate">
                                            <Input {...disabledProp} placeholder={preparePlaceholderText('PO Date')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="PO Status" name="poStatus">
                                            <Input {...disabledProp} placeholder={preparePlaceholderText('PO Status')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="SO Number" name="soNumber">
                                            <Input {...disabledProp} placeholder={preparePlaceholderText('SO Number')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="SO Status" name="soStatus">
                                            <Input {...disabledProp} placeholder={preparePlaceholderText('SO Status')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="VIN Number" name="vinNumber">
                                            <Input {...disabledProp} placeholder={preparePlaceholderText('VIN number')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Vehicle Selling Price" name="vehicleSellingPrice">
                                            <Input {...disabledProp} placeholder={preparePlaceholderText('Vehicle Selling Price')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Discount Amount" name="discountAmount">
                                            <Input placeholder={preparePlaceholderText('Discount Amount')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Tax Amount" name="taxAmount">
                                            <Input {...disabledProp} placeholder={preparePlaceholderText('Tax Amount')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Vehicle Amount" name="vehicleAmount">
                                            <Input {...disabledProp} placeholder={preparePlaceholderText('Vehicle Amount')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Panel>
                    </Collapse>
                    <Collapse onChange={() => handleCollapse(2)} expandIconPosition="end" expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian}>
                        <Panel
                            header={
                                <div className={styles.alignUser}>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                            Tax Details
                                        </Text>
                                    </Col>
                                </div>
                            }
                            key="2"
                        >
                            <Divider />

                            <DataTable tableColumn={taxDetailsColumn} tableData={formData['taxDetails']} removePagination={true} />
                        </Panel>
                    </Collapse>
                    <Collapse onChange={() => handleCollapse(3)} expandIconPosition="end" expandIcon={({ isActive }) => dynamicExpandIcon(isActive)} activeKey={openAccordian}>
                        <Panel
                            header={
                                <div className={styles.alignUser}>
                                    <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                            Optional Services
                                        </Text>
                                    </Col>
                                    <Col xs={24} sm={24} md={19} lg={19} xl={19}>
                                        <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly}>
                                            Add
                                        </Button>
                                    </Col>
                                </div>
                            }
                            key="3"
                        >
                            {isReadOnly && <OptionServicesForm {...OptionServicesFormProps} />}
                            <DataTable tableColumn={optionalServicesColumns} tableData={formData['optionalServices']} removePagination={true} />
                        </Panel>
                    </Collapse>
                </Space>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
