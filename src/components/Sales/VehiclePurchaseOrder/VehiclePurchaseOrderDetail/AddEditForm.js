/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form, DatePicker, InputNumber } from 'antd';

import { withDrawer } from 'components/withDrawer';
import { validateRequiredSelectField, validateOnlyPositiveNumber } from 'utils/validation';
import { convertCalenderDate } from 'utils/formatDateTime';
import { VehiclePurchaseOrderFormButton } from '../VehiclePurchaseOrderFormButton';
import { ViewDetail } from './ViewDetail';
import { disablePastDate } from 'utils/disableDate';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';

const { Search } = Input;
const AddEditFormMain = (props) => {
    const { buttonData, setButtonData, formActionType, onFinish, onFinishFailed, productHierarchyList, getDealerlocation, setDealerLocation, dealerLocation } = props;
    const { form, formData, typeData, isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };
    const [dealerFlag, setDealerFlag] = useState();

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleChangeOrderType = (value) => {
        if (value === 'CDLR') {
            setDealerFlag(value);
        } else {
            setDealerFlag();
        }
    };
    useEffect(() => {
        if (formData?.orderTypeCode === 'CDLR') {
            setDealerFlag(formData?.orderTypeCode);
        }
    }, [formData]);

    const handleOnClear = (e) => {
        if (!e.target.value) {
            // form.resetFields();
            setDealerLocation(undefined);
        }
    };

    return (
        <Form form={form} layout="vertical" autocomplete="off" colon="false" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {!formActionType?.viewMode ? (
                        <>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="orderTypeCode" label="Order Type" initialValue={formData?.orderTypeCode} rules={[validateRequiredSelectField('Order Type')]}>
                                        {customSelectBox({ data: typeData['PO_TYPE'], fieldNames: { key: 'key', value: 'value' }, onChange: handleChangeOrderType })}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                {dealerFlag && (
                                    <>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item name="dealerParentCode" label="Dealer Code" initialValue={formData?.dealerParentCode} rules={[validateRequiredSelectField('Dealer Code')]} validateTrigger={['onChange', 'onSearch']}>
                                                <Search maxLength={50} allowClear onSearch={getDealerlocation} onChange={handleOnClear} placeholder="Enter Dealer Code" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item initialValue={formData?.dealerLocation} name="dealerLocation" label="Dealer Location" rules={[validateRequiredSelectField('Dealer Location')]}>
                                                {customSelectBox({ data: dealerLocation, fieldNames: { key: 'id', value: 'dealerLocationName' }, placeholder: preparePlaceholderSelect('Location') })}
                                            </Form.Item>
                                        </Col>
                                    </>
                                )}
                                {formActionType?.editMode && (
                                    <>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item name="purchaseOrderNumber" label="Purchase Order Number" initialValue={formData?.purchaseOrderNumber}>
                                                <Input maxLength={50} {...disabledProps} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item initialValue={convertCalenderDate(formData?.purchaseOrderDate ? formData?.purchaseOrderDate : new Date(), 'YYYY/MM/DD')} label="Purchase Order Date" name="purchaseOrderDate">
                                                <DatePicker disabledDate={disablePastDate} {...disabledProps} format="YYYY-MM-DD" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item name="purchaseOrderStatus" label="Purchase Order Status" initialValue={formData?.purchaseOrderStatus}>
                                                <Input maxLength={50} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                    </>
                                )}
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <h3> Product Details </h3>
                                </Col>
                                <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
                                    <Form.Item name="modelCode" label="Model Description" initialValue={formData?.modelCode} rules={[validateRequiredSelectField('Model')]}>
                                        {customSelectBox({ data: productHierarchyList, fieldNames: { key: 'prodctCode', value: 'prodctShrtName' }, placeholder: preparePlaceholderSelect('Model Code') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
                                    <Form.Item name="quantity" label="Quantity" initialValue={'1'} rules={[validateOnlyPositiveNumber('Quantity')]}>
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
