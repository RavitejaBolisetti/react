/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Collapse, Typography, Divider } from 'antd';
import { validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined } from '@ant-design/icons';
import { FiEdit } from 'react-icons/fi';
import { PARAM_MASTER } from 'constants/paramMaster';
import { OptionServicesForm } from './optionServicesForm';
import dayjs from 'dayjs';

import { DataTable } from 'utils/dataTable';
import { taxDetailsColumn, optionalServicesColumns } from './tableColumn';
import { expandIcon, expandIconWithText } from 'utils/accordianExpandIcon';
import { addToolTip } from 'utils/customMenuLink';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { getCodeValue } from 'utils/getCodeValue';
import { VEHICLE_TYPE } from 'constants/VehicleType';

import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';

const { Text } = Typography;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { toolTipContent, isVehicleLovDataLoading, handleFormValueChange, onHandleSelect, optionsServicesMapping, setoptionsServicesMapping, optionsServiceModified, setoptionsServiceModified, formData, openAccordian, isReadOnly, setIsReadOnly, setOpenAccordian, selectedOrderId, form, onErrorAction, showGlobalNotification, fetchList, userId, listShowLoading, saveData, onSuccessAction, ProductHierarchyData, typeData, formActionType, vehicleServiceData } = props;
    const [optionForm] = Form.useForm();
    const findUsageType = (usage) => {
        const foundVal = typeData[PARAM_MASTER.VEHCL_TYPE.id]?.find((element, index) => element?.value === usage);
        return foundVal?.key;
    };

    const disabledProp = { disabled: true };
    useEffect(() => {
        if (formActionType?.editMode && formData) {
            form.setFieldsValue({
                ...formData,
                poDate: dayjs(formData?.poDate?.substr(0, 10)).format('DD/MM/YYYY'),
                vehicleUsageType: findUsageType(formData?.vehicleUsageType),
                vehicleAllocatedStatus: getCodeValue(VEHICLE_TYPE, formData?.vehicleAllocatedStatus, 'title'),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleCollapse = (key) => {
        if (key !== 3 && isReadOnly) {
            setIsReadOnly(false);
        }
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const addContactHandeler = (e) => {
        optionForm.resetFields();
        setOpenAccordian('3');
        setIsReadOnly(true);
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
        vehicleServiceData,
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} activeKey={openAccordian} collapsible="icon">
                    <Panel header="Vehicle Information" key="1">
                        <Divider />
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Vehicle Usage Type" name="vehicleUsageType" data-testid="usageType">
                                    <Select placeholder="Select Vehicle Usage Type" allowClear options={typeData['VEHCL_TYPE']} fieldNames={{ label: 'value', value: 'key' }} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Model" name="model" data-testid="model" rules={[validateRequiredSelectField('Model')]}>
                                    <Select loading={isVehicleLovDataLoading} onSelect={onHandleSelect} placeholder="Select" allowClear options={ProductHierarchyData} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                </Form.Item>
                                {toolTipContent && form.getFieldValue('model') && <div className={styles.modelTooltip}>{addToolTip(toolTipContent, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}</div>}
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
                                    {customSelectBox({ data: typeData?.PO_STATS, disabled: true })}
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
                                <Form.Item label="Discount Amount" name="discountAmount" rules={[validateNumberWithTwoDecimalPlaces('Discount Amount')]}>
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
                    </Panel>
                </Collapse>
                <Collapse onChange={() => handleCollapse(2)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                    <Panel header="Tax Details" key="2">
                        <Divider />
                        <DataTable tableColumn={taxDetailsColumn()} tableData={formData['taxDetails']} pagination={false} />
                    </Panel>
                </Collapse>
                <Collapse onChange={() => handleCollapse(3)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                    <Panel
                        header={
                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Text strong>Other Charges</Text>
                                    <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly}>
                                        Add
                                    </Button>
                                </Col>
                            </Row>
                        }
                        key="3"
                    >
                        {isReadOnly && (
                            <>
                                <Divider />
                                <OptionServicesForm {...OptionServicesFormProps} />
                            </>
                        )}
                        <DataTable tableColumn={optionalServicesColumns()} tableData={optionsServiceModified} pagination={false} />
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
