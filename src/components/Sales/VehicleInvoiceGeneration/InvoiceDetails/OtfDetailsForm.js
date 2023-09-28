/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, DatePicker, Input, Divider } from 'antd';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';
import { prepareCaption } from 'utils/prepareCaption';
import { getCodeValue } from 'utils/getCodeValue';

const { Search } = Input;

const OtfDetailsForm = (props) => {
    const { formName, invoiceDetailForm, formData, typeData, selectedOtfNumber, handleBookingNumberSearch, isVehicleInvoiceDataLoading, handleBookingChange, salesConsultantLovData } = props;

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
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Booking Number" name={[formName, 'otfNumber']} rules={[validateRequiredInputField('Booking Number')]}>
                        <Search maxLength={50} placeholder={preparePlaceholderText('Booking Number')} loading={isVehicleInvoiceDataLoading} onSearch={(value) => handleBookingNumberSearch(value)} allowClear onChange={handleBookingChange} />
                    </Form.Item>
                </Col>
            </Row>
            {selectedOtfNumber && (
                <>
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {prepareCaption('Price Information')}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Booking Date" name={[formName, 'orderDate']}>
                                <DatePicker format={dateFormat} placeholder={preparePlaceholderText('booking date')} style={{ display: 'auto', width: '100%' }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.taxCalculationType} label="Tax Calculation" name={[formName, 'taxCalculationType']} rules={[validateRequiredSelectField('Tax Calculation')]}>
                                {customSelectBox({ data: typeData?.[PARAM_MASTER.TAX_CALCLTN_TYPE.id], placeholder: preparePlaceholderSelect('Tax Calculation') })}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.taxPayableOnReverseCharges} label="Tax Payable On Reverse Charges?" name={[formName, 'taxPayableOnReverseCharges']} rules={[validateRequiredSelectField('Tax Payable On Reverse Charges')]}>
                                {customSelectBox({ data: typeData?.[PARAM_MASTER.RFRL.id], placeholder: preparePlaceholderSelect('Tax Payable On Reverse Charges') })}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {prepareCaption('Sales Details')}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.saleConsultant} label="Sales Consultant Name" name={[formName, 'saleConsultantName']}>
                                <Input placeholder={preparePlaceholderText('Sales Consultant Name')} disabled={true} />
                            </Form.Item>
                            <Form.Item hidden name={[formName, 'saleConsultant']} />
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.mitraType} label="Influence/Mitra Type" name={[formName, 'mitraType']}>
                                <Input placeholder={preparePlaceholderText('Influence/Mitra Type')} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.mitraName} label="Influence/Mitra Name" name={[formName, 'mitraName']}>
                                <Input placeholder={preparePlaceholderText('Influence/Mitra Name')} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default OtfDetailsForm;
