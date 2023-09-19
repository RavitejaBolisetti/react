/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Button, Collapse, Typography, Divider } from 'antd';
import { validateRequiredSelectField, validateNumberWithTwoDecimalPlaces, validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
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

import TreeSelectField from 'components/common/TreeSelectField';

import { customSelectBox } from 'utils/customSelectBox';
import { prepareCaption } from 'utils/prepareCaption';
import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { productHierarchyData, toolTipContent, isProductDataLoading, handleFormValueChange, optionsServicesMapping, setoptionsServicesMapping, optionsServiceModified, setoptionsServiceModified, formData, openAccordian, isReadOnly, setIsReadOnly, setOpenAccordian, selectedOrderId, form, onErrorAction, showGlobalNotification, fetchList, userId, listShowLoading, saveData, onSuccessAction, typeData, formActionType, vehicleServiceData } = props;
    const { productModelCode, setProductModelCode } = props;

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

    const handleSelectTreeClick = (value) => {
        setProductModelCode(value);
        handleFormValueChange(true);
    };

    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyData,
        defaultParent: false,
        selectedTreeSelectKey: productModelCode,
        handleSelectTreeClick,
        defaultValue: null,
        placeholder: preparePlaceholderSelect('Model'),
        loading: isProductDataLoading,
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} activeKey={openAccordian} collapsible="icon">
                    <Panel header="Vehicle Information" key="1">
                        <Divider />
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item label="Model Description" name="model" data-testid="model">
                                    <TreeSelectField {...treeSelectFieldProps} />
                                </Form.Item>
                                {toolTipContent && productModelCode && <div className={styles.modelTooltip}>{addToolTip(toolTipContent, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}</div>}
                            </Col>

                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item label="Model Code" name="modelCode" data-testid="vehicleVariant" rules={[validateRequiredInputField('Model Code')]}>
                                    <Input {...disabledProp} placeholder={preparePlaceholderText('Model Code')} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider />

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Available Stock" name="availableStock" data-testid="availableStock">
                                    <Input {...disabledProp} placeholder={preparePlaceholderText('Available Stock')} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="PO Number" name="poNumber">
                                    <Input {...disabledProp} placeholder={preparePlaceholderText('PO Number')} />
                                </Form.Item>
                            </Col>

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
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                {prepareCaption('Price Information')}
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.saleType} name="saleType" label="Sale Type" rules={[validateRequiredSelectField('Sale Type')]}>
                                    {customSelectBox({ data: typeData['SALE_TYPE'] })}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.priceType} label="Price Type" name="priceType">
                                    {customSelectBox({ data: typeData['PRC_TYP'] })}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Vehicle Selling Price" name="vehicleSellingPrice">
                                    <Input {...disabledProp} placeholder={preparePlaceholderText('Vehicle Selling Price')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Vehicle Amount" name="vehicleAmount">
                                    <Input {...disabledProp} placeholder={preparePlaceholderText('Vehicle Amount')} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                {prepareCaption('Benefits')}
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Dealer Discount with TAX" name="discountAmount" rules={[validateNumberWithTwoDecimalPlaces('Dealer Discount with TAX')]}>
                                    <Input placeholder={preparePlaceholderText('Dealer Discount with TAX')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Consumer Scheme with TAX" name="taxAmount">
                                    <Input {...disabledProp} placeholder={preparePlaceholderText('Consumer Scheme with TAX')} />
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
                                    <Text strong>Optional Services</Text>
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
