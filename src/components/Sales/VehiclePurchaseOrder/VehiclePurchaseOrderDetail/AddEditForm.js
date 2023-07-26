/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, Select, DatePicker, Card, Input } from 'antd';

import { convertCalenderDate } from 'utils/formatDateTime';

import { validateRequiredSelectField } from 'utils/validation';
import { disablePastDate } from 'utils/disableDate';
import { convertDateToCalender } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';
const { Search } = Input;
const AddEditFormMain = (props) => {
    const {
        form,
        formData,
        typeData,
        isReadOnly = true,
        isCustomerLoading,
        onSearch,
    } = props;
    const disabledProps = { disabled: isReadOnly };

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({ ...formData, mnfcWarrEndDate: convertDateToCalender(formData?.mnfcWarrEndDate), deliveryDate: convertDateToCalender(formData?.deliveryDate), saleDate: convertDateToCalender(formData?.saleDate), nextServiceDueDate: convertDateToCalender(formData?.nextServiceDueDate), pucExpiryDate: convertDateToCalender(formData?.pucExpiryDate), insuranceExpiryDate: convertDateToCalender(formData?.insuranceExpiryDate) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);
    
 
    return ( <>
        <Card className={styles.drawerCardView}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.orderType} rules={[validateRequiredSelectField('Order Type')]} name="orderType" label="Order Type">
                            <Select placeholder="Select" showSearch allowClear options={typeData['CTC_TYP']} fieldNames={{ label: 'value', value: 'key' }} />
                        </Form.Item>
                </Col>               
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.uniqueSearchInput}>
                    <Form.Item name="dealerName" label="Dealer Name" initialValue={formData?.dealerName} >
                        <Search loading={isCustomerLoading} style={{ width: '100%' }} maxLength={35} allowClear type="text" onSearch={onSearch} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="dealerLocation" label="Dealer Location" initialValue={formData?.dealerLocation}>
                        <Input maxLength={50} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.uniqueSearchInput}>
                    <Form.Item name="purchaseOrderNumber" label="Purchase Order Number" initialValue={formData?.purchaseOrderNumber}>
                    <Search loading={isCustomerLoading} style={{ width: '100%' }} maxLength={35} allowClear type="text" onSearch={onSearch} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.purchaseOrderDate, 'YYYY/MM/DD')} label="Purchase Order Date" name="purchaseOrderDate">
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD"  style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>               
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="purchaseOrderStatus" label="Purchase Order Status" initialValue={formData?.purchaseOrderStatus}>
                        <Input maxLength={50} {...disabledProps} />
                    </Form.Item>
                </Col>              
                                              
            </Row>  
                 
        </Card>
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <h3> Product Details </h3>
            </Col>
        </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
