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
import { translateContent } from 'utils/translateContent';
import { TbRefresh } from 'react-icons/tb';
// import { STATUS } from 'constants/modelVariant';
// import { RevisedModelDetailMaster } from 'components/Sales/OTF/ChangeModelVariant/RevisedModelDetail/RevisedModelDetailMaster';

const { Text } = Typography;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { isProductDataLoading, productHierarchyData, toolTipContent, setRevisedModelInformation, handleFormValueChange, optionalServices, setOptionalServices, formData, isReadOnly, setIsReadOnly, setOpenAccordian, selectedOrderId, form, onErrorAction, showGlobalNotification, fetchList, userId, listShowLoading, saveData, onSuccessAction, typeData, vehicleServiceData, setOpenVehilceModelChange } = props;
    const { handleOtfSoMappingHistory, activeKey, onChange, formActionType, filterVehicleData, handleVehicleDetailChange, viewOnly, showPrintDiscount = false, isOTFModule } = props;

    const [optionForm] = Form.useForm();
    const [confirmRequest, setConfirmRequest] = useState();
    const [editingOptionalData, setEditingOptionalData] = useState({});
    const disabledProp = { disabled: true };

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({
                ...formData,
                poDate: formData?.poDate ? dayjs(formData?.poDate?.substr(0, 10)).format('DD/MM/YYYY') : undefined,
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
        setEditingOptionalData,
        editingOptionalData,
    };

    const handleSelectTreeClick = (value) => {
        setConfirmRequest({
            isVisible: true,
            titleOverride: translateContent('commonModules.heading.confirmation'),
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
            submitText: translateContent('global.yesNo.yes'),
            text: translateContent('commonModules.validation.modelChangeConfirmation'),
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
        placeholder: preparePlaceholderSelect(translateContent('commonModules.label.vehicleDetails.modelDescription')),
        loading: !viewOnly ? isProductDataLoading : false,
        treeDisabled: true,
    };

    const [timer, setTimer] = useState(null);

    const onDiscountAmountChange = (e) => {
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            handleVehicleDetailChange({ ...filterVehicleData, discountAmount: e?.target?.value });
        }, 500);
        setTimer(newTimer);
    };

    const handleChangeModel = () => {
        setOpenVehilceModelChange(true);
        setRevisedModelInformation({ ...toolTipContent });
    };

    // const isReviedModelPending = formData?.revisedModel && [STATUS?.PENDING?.key, STATUS?.REJECTED?.key]?.includes(formData?.sapStatusResponseCode);

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" collapsible="icon">
                        <Panel
                            header={
                                <Row type="flex" align="middle">
                                    <Text strong> {translateContent('commonModules.label.vehicleDetails.vehicleInformation')}</Text>
                                    <Button onClick={handleOtfSoMappingHistory} type="link">
                                        {translateContent('global.buttons.bookingMappingHistory')}
                                    </Button>
                                </Row>
                            }
                            key="1"
                        >
                            <Divider />
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.modelDescription')} name="model" data-testid="model">
                                        <TreeSelectField {...treeSelectFieldProps} />
                                    </Form.Item>
                                    {toolTipContent && <div className={styles.modelTooltip}>{addToolTip(toolTipContent, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}</div>}
                                </Col>

                                <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.oemModelCode')} name="oemModelCode" data-testid="vehicleVariant" rules={[validateRequiredInputField(translateContent('commonModules.label.vehicleDetails.oemModelCode'))]}>
                                        <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.oemModelCode'))} />
                                    </Form.Item>
                                    <Form.Item initialValue={formData?.modelCode} name="modelCode" hidden />
                                </Col>

                                {formData?.otfStatus === OTF_STATUS?.BOOKED.key && (
                                    <Col xs={24} sm={24} md={3} lg={3} xl={3} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button onClick={handleChangeModel} type="link" icon={<TbRefresh className={styles.marT10} size={18} />} style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                            Change
                                        </Button>
                                    </Col>
                                )}
                            </Row>
                            <Divider />
                            {/* {isReviedModelPending ? (
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <RevisedModelDetailMaster {...props} />
                                    </Col>
                                </Row>
                            ) : (
                                <Divider />
                            )} */}
                            <Row gutter={20}>
                                {isOTFModule && (
                                    <>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('commonModules.label.vehicleDetails.availableStock')} name="availableStock" data-testid="availableStock">
                                                <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.availableStock'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('commonModules.label.vehicleDetails.poNumber')} name="poNumber">
                                                <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.poNumber'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('commonModules.label.vehicleDetails.poDate')} name="poDate">
                                                <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.poDate'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('commonModules.label.vehicleDetails.poStatus')} name="poStatus">
                                                {customSelectBox({ data: typeData?.PO_STATS, disabled: true })}
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('commonModules.label.vehicleDetails.soNumber')} name="soNumber">
                                                <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.soNumber'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('commonModules.label.vehicleDetails.soStatus')} name="soStatus">
                                                <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.soStatus'))} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                            <Form.Item label={translateContent('commonModules.label.vehicleDetails.sapResonseRemarks')} name="sapResonseRemarks">
                                                <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.sapResonseRemarks'))} />
                                            </Form.Item>
                                        </Col>
                                    </>
                                )}

                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.vin')} name="vinNumber">
                                        <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.vin'))} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.vehicleUsageType')} name="vehicleUsageType">
                                        {customSelectBox({ data: typeData?.VEHCL_TYPE, onChange: (value) => handleVehicleDetailChange({ ...filterVehicleData, vehicleUsageType: value }) })}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    {prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.priceInformation'))}
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.saleType} name="saleType" label={translateContent('commonModules.label.vehicleDetails.saleType')} rules={[validateRequiredSelectField('Sale Type')]}>
                                        {customSelectBox({ data: typeData['SALE_TYPE'], onChange: (value) => handleVehicleDetailChange({ ...filterVehicleData, saleType: value }) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.priceType} label={translateContent('commonModules.label.vehicleDetails.priceType')} name="priceType">
                                        {customSelectBox({ data: typeData['PRC_TYP'], onChange: (value) => handleVehicleDetailChange({ ...filterVehicleData, priceType: value }) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.vehicleSellingPrice')} name="vehicleSellingPrice">
                                        <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.vehicleSellingPrice'))} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.vehicleAmount')} name="vehicleAmount">
                                        <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.vehicleAmount'))} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.tcsAmount')} name="tcsAmount">
                                        <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.tcsAmount'))} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    {prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.benefit'))}
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item
                                        label={translateContent('commonModules.label.vehicleDetails.dealerDiscountWithTax')}
                                        name="discountAmount"
                                        rules={[
                                            validateNumberWithTwoDecimalPlaces(translateContent('commonModules.label.vehicleDetails.dealerDiscountWithTax')),
                                            {
                                                validator: () => compareAmountValidator(form.getFieldValue('vehicleSellingPrice'), form.getFieldValue('discountAmount'), 'Discount'),
                                            },
                                        ]}
                                    >
                                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.dealerDiscountWithTax'))} onChange={onDiscountAmountChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.consumerSchemeWithTax')} name="consumerSchemeWithTax">
                                        <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.consumerSchemeWithTax'))} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.corporateSchemeWithTax')} name="corporateSchemeWithTax">
                                        <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.corporateSchemeWithTax'))} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.mnmNonCashBenefitAmountWithTax')} name="mnmNonCashBenefitsWithTAX">
                                        <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.mnmNonCashBenefitAmountWithTax'))} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('commonModules.label.vehicleDetails.fameSubsidyAmount')} name="fameSubsidyAmount">
                                        <Input {...disabledProp} placeholder={preparePlaceholderText(translateContent('commonModules.label.vehicleDetails.fameSubsidyAmount'), true, false)} />
                                    </Form.Item>
                                </Col>
                                {showPrintDiscount && (
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formActionType?.editMode ? (formData?.printDiscount === 'Y' ? true : false) : false} labelAlign="left" wrapperCol={{ span: 24 }} name="printDiscount" label={translateContent('commonModules.label.vehicleDetails.printDiscount')}>
                                            <Switch checkedChildren={translateContent('global.yesNo.yes')} unCheckedChildren={translateContent('global.yesNo.no')} onChange={(checked) => (checked ? 'Y' : 'N')} />
                                        </Form.Item>
                                    </Col>
                                )}
                            </Row>
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" collapsible="icon">
                        <Panel header={translateContent('vehicleInvoiceGeneration.heading.collapse.taxDetails')} key="2">
                            <Divider />
                            <DataTable tableColumn={taxDetailsColumn()} tableData={formData['taxDetails']} pagination={false} />
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end" collapsible="icon">
                        <Panel
                            header={
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Text strong>{translateContent('vehicleInvoiceGeneration.heading.collapse.optionalService')}</Text>
                                        <Button className={styles.marL10} onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly}>
                                            {translateContent('global.buttons.add')}
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
