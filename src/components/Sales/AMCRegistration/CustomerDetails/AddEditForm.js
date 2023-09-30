/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, DatePicker, Input, Divider, Card, Space } from 'antd';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';
import { prepareCaption } from 'utils/prepareCaption';
import { getCodeValue } from 'utils/getCodeValue';
import styles from 'assets/sass/app.module.scss';

const { Search } = Input;
const { TextArea } = Input;

const CustomerDetailsForm = (props) => {
    const { formName, invoiceDetailForm, formData, typeData, selectedOtfNumber, handleBookingNumberSearch, handleEmployeeNameSearch, isVehicleInvoiceDataLoading, handleBookingChange, salesConsultantLovData } = props;

    useEffect(() => {
        if (formData) {
            invoiceDetailForm?.setFieldsValue({
                [formName]: {
                    ...formData,
                    otfNumber: formData?.bookingNumber || formData?.otfNumber,
                    orderDate: formattedCalendarDate(formData?.orderDate),
                    saleConsultantName: getCodeValue(salesConsultantLovData, formData?.saleConsultant),
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.customerId} label="Customer ID" name="customerId">
                                            <Search placeholder={preparePlaceholderText('Customer ID')} allowClear />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.customerName} label="Customer Name" name="customerName">
                                            <Input placeholder={preparePlaceholderText('Customer Name')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.address} label="Address" name="customerAddress">
                                            <Input placeholder={preparePlaceholderText('Address')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="State" name="state">
                                            <Input placeholder={preparePlaceholderText('State')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="City" name="customerCity">
                                            <Input placeholder={preparePlaceholderText('City')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="District" name="district">
                                            <Input placeholder={preparePlaceholderText('District')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Tehsil" name="tehsil">
                                            <Input placeholder={preparePlaceholderText('Tehsil')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Locality" name="locality">
                                            <Input placeholder={preparePlaceholderText('Locality')} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Pincode" name="pinCode">
                                            <Input placeholder={preparePlaceholderText('pincode')} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.mobile} label="Mobile" name="customerPhoneNumber">
                                            <Input placeholder={preparePlaceholderText('Mobile')} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="GSTIN" name="gstin">
                                            <Input placeholder={preparePlaceholderText('GSTIN')} disabled={true} />
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

export default CustomerDetailsForm;
