/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Button, Collapse, Typography, Divider, Switch } from 'antd';
import { validateRequiredSelectField, validateNumberWithTwoDecimalPlaces, validateRequiredInputField, compareAmountValidator } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined } from '@ant-design/icons';
import { PARAM_MASTER } from 'constants/paramMaster';
import { OptionServicesForm } from './optionServicesForm';
import dayjs from 'dayjs';

import { DataTable } from 'utils/dataTable';
import { taxDetailsColumn, optionalServicesColumns } from './tableColumn';
import { expandIcon } from 'utils/accordianExpandIcon';
import { addToolTip } from 'utils/customMenuLink';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { getCodeValue } from 'utils/getCodeValue';
import { VEHICLE_TYPE } from 'constants/VehicleType';

import TreeSelectField from 'components/common/TreeSelectField';

import { customSelectBox } from 'utils/customSelectBox';
import { prepareCaption } from 'utils/prepareCaption';
import styles from 'assets/sass/app.module.scss';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import { EDIT_ACTION, DELETE_ACTION } from 'utils/btnVisiblity';
import { OTF_STATUS } from 'constants/OTFStatus';

const { Text } = Typography;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { isProductDataLoading, productHierarchyData, toolTipContent, handleFormValueChange, optionalServices, setOptionalServices, formData, orderStatus, isReadOnly, setIsReadOnly, setOpenAccordian, selectedOrderId, form, onErrorAction, showGlobalNotification, fetchList, userId, listShowLoading, saveData, onSuccessAction, typeData, vehicleServiceData } = props;
    const { activeKey, onChange, formActionType, filterVehicleData, handleVehicleDetailChange, viewOnly, showPrintDiscount = false, isOTFModule } = props;

    const [optionForm] = Form.useForm();
    const [confirmRequest, setConfirmRequest] = useState();
    const [editingOptionalData, setEditingOptionalData] = useState({});

    const findUsageType = (usage) => {
        const foundVal = typeData[PARAM_MASTER.VEHCL_TYPE.id]?.find((element, index) => element?.value === usage);
        return foundVal?.key;
    };

    const disabledProp = { disabled: true };
    useEffect(() => {
        if (formData) {
            form.setFieldsValue({
                ...formData,
                poDate: formData?.poDate ? dayjs(formData?.poDate?.substr(0, 10)).format('DD/MM/YYYY') : undefined,
                vehicleUsageType: findUsageType(formData?.vehicleUsageType),
                vehicleAllocatedStatus: getCodeValue(VEHICLE_TYPE, formData?.vehicleAllocatedStatus, 'title'),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const addContactHandeler = (e) => {
        optionForm.resetFields();
        !activeKey.includes(3) && onChange(3);
        setIsReadOnly(true);
    };

    const handleButtonClick = ({ record, buttonAction }) => {
        handleFormValueChange();
        switch (buttonAction) {
            case EDIT_ACTION:
                addContactHandeler();
                optionForm.setFieldsValue({ ...record });
                setEditingOptionalData(record);
                break;
            case DELETE_ACTION:
                setOptionalServices((prev) => {
                    let updatedVal = [...prev];
                    const index = updatedVal?.findIndex((i) => i?.serviceName === record?.serviceName);
                    const data = updatedVal?.[index];
                    if (data?.id) {
                        updatedVal?.splice(index, 1, { ...record, status: false });
                    } else {
                        updatedVal?.splice(index, 1);
                    }
                    return updatedVal;
                });
                setEditingOptionalData({});
                break;
            default:
                break;
        }
    };

    const handleCancel = () => {
        setIsReadOnly(false);
    };

    const OptionServicesFormProps = {
        typeData,
        handleCancel,
        optionForm,
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
        optionalServices,
        setOptionalServices,
        handleFormValueChange,
        vehicleServiceData,
        editingOptionalData,
        setEditingOptionalData,
    };

    const handleSelectTreeClick = (value) => {
        setConfirmRequest({
            isVisible: true,
            titleOverride: 'Confirmation',
            closable: true,
            icon: false,
            onCloseAction: () => {
                setConfirmRequest({
                    ...confirmRequest,
                    isVisible: false,
                });
            },
            onSubmitAction: () => {
                const finalData = { ...filterVehicleData, productModelCode: value };
                handleVehicleDetailChange(finalData);
                handleFormValueChange(true);
                setConfirmRequest({
                    ...confirmRequest,
                    isVisible: false,
                });
            },
            submitText: 'Yes',
            text: 'If you proceed with model change, the price will be calculated as per the selected model. Do you wish to continue?',
        });
    };

    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyData,
        defaultParent: false,
        selectedTreeSelectKey: formData?.model,
        handleSelectTreeClick,
        treeExpandedKeys: [formData?.model],
        placeholder: preparePlaceholderSelect('Model'),
        loading: !viewOnly ? isProductDataLoading : false,
        treeDisabled: orderStatus === OTF_STATUS.BOOKED.key ? false : true,
    };

    const [timer, setTimer] = useState(null);

    const onDiscountAmountChange = (e) => {
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            handleVehicleDetailChange({ ...filterVehicleData, discountAmount: e?.target?.value });
        }, 500);
        setTimer(newTimer);
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" collapsible="icon">
                        <Panel header="Vehicle Information" key="1">
                            <Divider />
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                    <Form.Item label="Model Description" name="model" data-testid="model">
                                        <TreeSelectField {...treeSelectFieldProps} />
                                    </Form.Item>
                                    {toolTipContent && <div className={styles.modelTooltip}>{addToolTip(toolTipContent, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}</div>}
                                </Col>

                                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                    <Form.Item label="Model Code" name="modelCode" data-testid="vehicleVariant" rules={[validateRequiredInputField('Model Code')]}>
                                        <Input {...disabledProp} placeholder={preparePlaceholderText('Model Code')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider />

                            <Row gutter={20}>
                                {isOTFModule && (
                                    <>
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
                                    </>
                                )}

                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label="VIN" name="vinNumber">
                                        <Input {...disabledProp} placeholder={preparePlaceholderText('VIN')} />
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
                                        {customSelectBox({ data: typeData['SALE_TYPE'], onChange: (value) => handleVehicleDetailChange({ ...filterVehicleData, saleType: value }) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.priceType} label="Price Type" name="priceType">
                                        {customSelectBox({ data: typeData['PRC_TYP'], onChange: (value) => handleVehicleDetailChange({ ...filterVehicleData, priceType: value }) })}
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
                                    <Form.Item
                                        label="Dealer Discount with TAX"
                                        name="discountAmount"
                                        rules={[
                                            validateNumberWithTwoDecimalPlaces('Dealer Discount with TAX'),
                                            {
                                                validator: () => compareAmountValidator(form.getFieldValue('vehicleSellingPrice'), form.getFieldValue('discountAmount'), 'Discount'),
                                            },
                                        ]}
                                    >
                                        <Input placeholder={preparePlaceholderText('Dealer Discount with TAX')} onChange={onDiscountAmountChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label="Consumer Scheme with TAX" name="taxAmount">
                                        <Input {...disabledProp} placeholder={preparePlaceholderText('Consumer Scheme with TAX')} />
                                    </Form.Item>
                                </Col>
                                {showPrintDiscount && (
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formActionType?.editMode ? (formData?.printDiscount === 'Y' ? true : false) : false} labelAlign="left" wrapperCol={{ span: 24 }} name="printDiscount" label="Print Discount?">
                                            <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={(checked) => (checked ? 'Y' : 'N')} />
                                        </Form.Item>
                                    </Col>
                                )}
                            </Row>
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" collapsible="icon">
                        <Panel header="Tax Details" key="2">
                            <Divider />
                            <DataTable tableColumn={taxDetailsColumn()} tableData={formData['taxDetails']} pagination={false} />
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end" collapsible="icon">
                        <Panel
                            header={
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Text strong>Optional Services</Text>
                                        <Button className={styles.marL10} onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly}>
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
                            <DataTable tableColumn={optionalServicesColumns({ handleButtonClick, formActionType })} tableData={optionalServices?.filter((i) => i?.status)} pagination={false} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <ConfirmationModal {...confirmRequest} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
