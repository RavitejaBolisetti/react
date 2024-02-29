/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Card, Col, Form, Collapse, Divider, Space, Input, DatePicker } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';

import { convertDateToCalender } from 'utils/formatDateTime';
import { customSelectBox } from 'utils/customSelectBox';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';

import OtfDetailsForm from './OtfDetailsForm';
import { translateContent } from 'utils/translateContent';
const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, invoiceDetailForm } = props;
    const { activeKey, setActiveKey } = props;

    useEffect(() => {
        if (formData) {
            invoiceDetailForm?.setFieldsValue({
                formData: formData,
                bookingCustomer: { ...formData?.bookingCustomer, birthDate: convertDateToCalender(formData?.bookingCustomer?.birthDate) },
                billingCustomer: { ...formData?.billingCustomer, birthDate: convertDateToCalender(formData?.billingCustomer?.birthDate) },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                    <Card style={{ backgroundColor: '#f2f2f2' }}>
                        <Row gutter={20}>
                            {/* <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Payment Number">
                                        <Input value={'INV24D010228'} placeholder="" disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Paymnet Date">
                                        <DatePicker format={dateFormat} placeholder="Paymnet Date" style={{ display: 'auto', width: '100%' }} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Payment Status">{customSelectBox({ placeholder: 'Payment Status' })}</Form.Item>
                                </Col> */}
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Payment Mode">{customSelectBox({ placeholder: 'Payment Mode' })}</Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Paid Amount">
                                    <Input placeholder="Paid Amount" />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="DD/Cheque No">
                                    <Input placeholder="DD/Cheque No" />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="DD/Cheque Date">
                                    <DatePicker format={dateFormat} placeholder="DD/Cheque Date" style={{ display: 'auto', width: '100%' }} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Bank Name">
                                    <Input placeholder="Bank Name" />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Bank Location">
                                    <Input placeholder="Bank Location" />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Total Paid Amount">
                                    <Input placeholder="Total Paid Amount" disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Total Write Off Amount">
                                    <Input placeholder="Total Write Off Amount" disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Total Apportioned Amount">
                                    <Input placeholder="Total Apportioned Amount" disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Total Balance Amount">
                                    <Input placeholder="Total Balance Amount" disabled={true} />
                                </Form.Item>
                            </Col>
                            {/* <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Cancel Date">
                                        <DatePicker format={dateFormat} placeholder="Cancel Date" style={{ display: 'auto', width: '100%' }} disabled={true} />
                                    </Form.Item>
                                </Col> */}
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                                <Form.Item label="Remarks">
                                    <TextArea maxLength={300} value={formData?.controlDescription} placeholder="Remarks" showCount />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* <DrawerFormButton {...buttonProps} /> */}
                    </Card>
                </Space>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
