/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, DatePicker, Card } from 'antd';

import { convertCalenderDate } from 'utils/formatDateTime';

import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { disablePastDate } from 'utils/disableDate';

import styles from 'components/common/Common.module.css';

const AddEditFormMain = (props) => {
    const { formData, typeData } = props;

    return (
        <Card className={styles.drawerCardView}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.initialPromiseDeliveryDate, 'YYYY/MM/DD')} label="Initial Promise Delivery Date" name="initialPromiseDeliveryDate" rules={[validateRequiredInputField('Initial Promise Delivery Date')]}>
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.custExpectedDeliveryDate, 'YYYY/MM/DD')} label="Cust. Expected Delivery Date" name="custExpectedDeliveryDate">
                        <DatePicker disabledDate={disablePastDate} format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.saleType} name="saleType" label="Sale Type">
                        <Select placeholder="Select" showSearch allowClear options={typeData['SALE_TYP']} fieldNames={{ label: 'value', value: 'key' }} rules={[validateRequiredSelectField('Sale Type')]} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
