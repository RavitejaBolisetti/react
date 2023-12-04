/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form, DatePicker, InputNumber, Select } from 'antd';

import { withDrawer } from 'components/withDrawer';
import { validateRequiredSelectField, validateOnlyPositiveNumber } from 'utils/validation';
import { convertCalenderDate } from 'utils/formatDateTime';
import { VehiclePurchaseOrderFormButton } from '../VehiclePurchaseOrderFormButton';
import { ViewDetail } from './ViewDetail';
import { disablePastDate } from 'utils/disableDate';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { PURCHASE_ORDER_TYPE_STATUS } from 'constants/PurchaseOrderTypeStatus';
import { translateContent } from 'utils/translateContent';
import { ProductModelTree } from 'components/common/productModalTree';

import styles from 'assets/sass/app.module.scss';
const { Option } = Select;
const { Search } = Input;
const AddEditFormMain = (props) => {
    const { productHierarchyDataArray, buttonData, setButtonData, formActionType, onFinish, getDealerlocation, setDealerLocation, dealerLocation } = props;
    const { form, formData, typeData, isReadOnly = true, modelCode, setModelCode } = props;
    const disabledProps = { disabled: isReadOnly };
    const [dealerFlag, setDealerFlag] = useState();

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    // const handleChangeOrderType = (value) => {
    //     if (value === 'CDLR') {
    //         setDealerFlag(value);
    //     } else {
    //         setDealerFlag();
    //     }
    // };
    useEffect(() => {
        if (formData?.orderTypeCode === 'CDLR') {
            setDealerFlag(formData?.orderTypeCode);
        }
    }, [formData]);

    const handleOnClear = (e) => {
        if (!e.target.value) {
            setDealerLocation(undefined);
        }
    };
    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };
    const handleSelectTreeClick = (value) => {
        setModelCode(value);
        form.setFieldValue('model', value);
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyDataArray,
        defaultParent: false,
        selectedTreeSelectKey: modelCode,
        handleSelectTreeClick,
        defaultValue: null,
        placeholder: preparePlaceholderSelect(translateContent('vehiclePurchaseOrder.label.modal')),
        name: 'model',
        labelName: 'Model Description',
    };

    return (
        <Form form={form} layout="vertical" autocomplete="off" colon="false" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {!formActionType?.viewMode ? (
                        <>
                            <Row gutter={20}>
                                {/* <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="orderTypeCode" label="Order Type" initialValue={formData?.orderTypeCode} rules={[validateRequiredSelectField('Order Type')]}>
                                        {customSelectBox({ data: typeData['PO_TYPE'], fieldNames: { key: 'key', value: 'value' }, onChange: handleChangeOrderType })}
                                    </Form.Item>
                                </Col> */}
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.orderType')} initialValue={formData?.orderTypeCode || PURCHASE_ORDER_TYPE_STATUS.AGAINSTSTOCK.key} name="orderTypeCode" rules={[validateRequiredSelectField(translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.validation.orderType'))]}>
                                        <Select placeholder="Select" {...selectProps} {...disabledProps}>
                                            {typeData['PO_TYPE']?.map((item) => (
                                                <Option value={item?.key}>{item?.value}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                {dealerFlag && (
                                    <>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item name="dealerParentCode" label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.dealerCode')} initialValue={formData?.dealerParentCode} rules={[validateRequiredSelectField(translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.validation.dealerCode'))]} validateTrigger={['onChange', 'onSearch']}>
                                                <Search maxLength={50} allowClear onSearch={getDealerlocation} onChange={handleOnClear} placeholder={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.placeholder.dealerCode')} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item initialValue={formData?.dealerLocation} name="dealerLocation" label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.dealerLocation')} rules={[validateRequiredSelectField(translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.validation.dealerLocation'))]}>
                                                {customSelectBox({ data: dealerLocation, fieldNames: { key: 'id', value: 'dealerLocationName' }, placeholder: preparePlaceholderSelect(translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.placeholder.dealerCode')) })}
                                            </Form.Item>
                                        </Col>
                                    </>
                                )}
                                {formActionType?.editMode && (
                                    <>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item name="purchaseOrderNumber" label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.purchaseOrderNumber')} initialValue={formData?.purchaseOrderNumber}>
                                                <Input maxLength={50} {...disabledProps} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item initialValue={convertCalenderDate(formData?.purchaseOrderDate ? formData?.purchaseOrderDate : new Date(), 'YYYY/MM/DD')} label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.purchaseOrderDate')} name="purchaseOrderDate">
                                                <DatePicker disabledDate={disablePastDate} {...disabledProps} format="YYYY-MM-DD" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item name="purchaseOrderStatus" label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.purchaseOrderStatus')} initialValue={formData?.purchaseOrderStatus}>
                                                <Input maxLength={50} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                    </>
                                )}
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <h3> {translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.heading.productDetails')} </h3>
                                </Col>
                                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                    {/* <Form.Item label={translateContent('commonModules.label.vehicleDetails.modelDescription')} name="model" data-testid="model">
                                        <TreeSelectField {...treeSelectFieldProps} />
                                    </Form.Item> */}

                                    <ProductModelTree {...treeSelectFieldProps} />
                                </Col>
                                {/* <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
                                    <Form.Item name="modelCode" label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.modelDescription')} initialValue={formData?.modelCode} rules={[validateRequiredSelectField(translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.validation.modelDescription'))]}>
                                        {customSelectBox({ data: productHierarchyList, fieldNames: { key: 'prodctCode', value: 'prodctShrtName' }, placeholder: preparePlaceholderSelect(translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.placeholder.modelDescription')) })}
                                    </Form.Item>
                                </Col> */}
                                <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
                                    <Form.Item name="quantity" label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.quantity')} initialValue={'1'} rules={[validateOnlyPositiveNumber('Quantity')]}>
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <>
                            <ViewDetail {...props} />
                        </>
                    )}
                </Col>
            </Row>
            <VehiclePurchaseOrderFormButton {...props} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
