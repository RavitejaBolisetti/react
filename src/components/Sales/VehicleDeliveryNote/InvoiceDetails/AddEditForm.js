/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Card, DatePicker, Space } from 'antd';

import { disableFutureDate } from 'utils/disableDate';
import { dateFormat, formatDateToCalenderDate } from 'utils/formatDateTime';
import { validateNumberWithTwoDecimalPlaces, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';

const { TextArea, Search } = Input;
const AddEditFormMain = (props) => {
    const { formData, relationshipManagerData, typeData, form, selectedOrder } = props;

    useEffect(() => {
        if (selectedOrder?.vehicleSoldByDealer) {
            form.setFieldsValue({
                deliveryNoteFor: 'Vehicle Sold By Dealer',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrder]);

    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.deliveryNoteFor} label="Delivery Note For" name="deliveryNoteFor">
                                            <Input placeholder={preparePlaceholderText('Delivery Note For')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.invoiceNumber} label="Invoice No." name="invoiceNumber" rules={[validateRequiredInputField('invoice no')]}>
                                            <Input placeholder={preparePlaceholderText('Invoice No.')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formatDateToCalenderDate(formData?.invoiceDate)} label="Invoice Date" name="invoiceDate">
                                            <DatePicker format={dateFormat} disabledDate={disableFutureDate} placeholder={preparePlaceholderSelect('Invoice Date')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.engineNumber} label="Engine No." name="engineNumber" rules={[validateNumberWithTwoDecimalPlaces('Engine No.')]}>
                                            <Input placeholder={preparePlaceholderText('Engine No.')} maxLength={10} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.chassisNumber} label="Chassis No." name="chassisNumber" rules={[validateNumberWithTwoDecimalPlaces('Chassis No.')]}>
                                            <Input placeholder={preparePlaceholderText('Chassis No.')} maxLength={10} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.relationShipManager} label="Relationship Manager" name="relationShipManager">
                                            {customSelectBox({ data: relationshipManagerData, placeholder: preparePlaceholderSelect('Relationship Manager') })}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.customerPromiseDate} label="Customer Provided Date" name="customerPromiseDate">
                                            <DatePicker format={dateFormat} disabledDate={disableFutureDate} placeholder={preparePlaceholderSelect('Customer Provided Date')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.reasonForDelay} label="Reasons For Delay" name="reasonForDelay" rules={[validateRequiredSelectField('reasons for delay')]}>
                                            {customSelectBox({ data: typeData['DLVR_DLY_RSN'], placeholder: preparePlaceholderSelect('Reasons For Delay') })}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item label="Remark For Delay" name="reasonForDelayRemarks" initialValue={formData?.reasonForDelayRemarks}>
                                            <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('Remark For Delay')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
