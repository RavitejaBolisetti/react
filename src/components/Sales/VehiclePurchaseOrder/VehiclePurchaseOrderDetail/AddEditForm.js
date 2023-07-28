/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form, Select, Card, Descriptions, DatePicker, InputNumber } from 'antd';
import { convertDateTime } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';
import { preparePlaceholderText, preparePlaceholderSelect, preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { validateRequiredSelectField, validateOnlyPositiveNumber, validationNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { checkAndSetDefaultValue, getStatus } from 'utils/checkAndSetDefaultValue';
import { PARAM_MASTER } from 'constants/paramMaster';
import { VehiclePurchaseOrderFormButton } from '../VehiclePurchaseOrderFormButton';
import { convertCalenderDate } from 'utils/formatDateTime';
import { ViewDetail } from './ViewDetail';

import { disablePastDate } from 'utils/disableDate';
import { convertDateToCalender } from 'utils/formatDateTime';
const { TextArea, Search } = Input;

const AddEditFormMain = (props) => {
    // const { formData, otfData, selectedOrder, fieldNames, onFinishOTFCancellation } = props;
    const { handleButtonClick, buttonData, setButtonData, userId, listShowLoading, showGlobalNotification, formActionType, onFinish, onFinishFailed } = props;
    const { form, formData, typeData, isReadOnly = true, onSearch } = props;
    const disabledProps = { disabled: isReadOnly };
console.log('props==>',props);
    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
   

    const isLoading = false;
    return (
        <Form form={form} layout="vertical" autocomplete="off" colon="false" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {!formActionType?.viewMode ? (
                        <>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="orderType" label="Order Type" initialValue={formData?.orderType} rules={[validateRequiredSelectField('Order Type')]}>
                                        <Select placeholder="Select Order Type" allowClear options={typeData['CTC_TYP']} fieldNames={{ label: 'value', value: 'key' }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="dealerName" label="Dealer Name" initialValue={formData?.dealerName}>
                                        <Search style={{ width: '100%' }} maxLength={35} allowClear type="text" onSearch={onSearch} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="dealerLocation" label="Dealer Location" initialValue={formData?.dealerLocation}>
                                        <Input maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="purchaseOrderNumber" label="Purchase Order Number" initialValue={formData?.purchaseOrderNumber}>
                                        <Input maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={convertCalenderDate(formData?.purchaseOrderDate, 'YYYY/MM/DD')} label="Purchase Order Date" name="purchaseOrderDate">
                                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="purchaseOrderStatus" label="Purchase Order Status" initialValue={formData?.purchaseOrderStatus}>
                                        <Input maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <h3> Product Details </h3>
                                </Col>
                                <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
                                    <Form.Item name="model" label="Model" initialValue={formData?.model} rules={[validateRequiredSelectField('Model')]}>
                                        <Select placeholder="Select" showSearch allowClear options={typeData['CTC_TYP']} fieldNames={{ label: 'value', value: 'key' }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
                                    <Form.Item name="quantity" label="Quantity" initialValue={formData?.quantity} rules={[validateOnlyPositiveNumber('Quantity')]}>
                                        <InputNumber defaultValue={0} />
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
