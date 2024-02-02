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
import { YES_NO_FLAG } from '../../../../constants/yesNoFlag';
import { translateContent } from 'utils/translateContent';

const { Search } = Input;

const OtfDetailsForm = (props) => {
    const { formName, invoiceDetailForm, formData, typeData, selectedOtfNumber, handleBookingNumberSearch, isVehicleInvoiceDataLoading, handleBookingChange, salesConsultantLovData } = props;

    useEffect(() => {
        if (formData) {
            invoiceDetailForm?.setFieldsValue({
                [formName]: {
                    ...formData,
                    otfNumber: formData?.bookingNumber || formData?.otfNumber,
                    taxCalculationType: formData?.taxCalculationType || 'AD',
                    taxPayableOnReverseCharges: formData?.taxPayableOnReverseCharges || YES_NO_FLAG?.NO?.key,
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
                    <Form.Item label={translateContent('commonModules.label.bookingDetails.bookingNumber')} name={[formName, 'otfNumber']} rules={[validateRequiredInputField(translateContent('commonModules.label.bookingDetails.bookingNumber'))]}>
                        <Search maxLength={50} placeholder={preparePlaceholderText('Booking Number')} loading={isVehicleInvoiceDataLoading} onSearch={(value) => handleBookingNumberSearch(value)} allowClear onChange={handleBookingChange} />
                    </Form.Item>
                </Col>
            </Row>
            {selectedOtfNumber && (
                <>
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.priceInformation'))}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label={translateContent('commonModules.label.bookingDetails.bookingDate')} name={[formName, 'orderDate']}>
                                <DatePicker format={dateFormat} placeholder={preparePlaceholderText('booking date')} style={{ display: 'auto', width: '100%' }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.taxCalculationType} label={translateContent('commonModules.label.bookingDetails.taxCalculation')} name={[formName, 'taxCalculationType']} rules={[validateRequiredSelectField(translateContent('commonModules.label.bookingDetails.taxCalculation'))]}>
                                {customSelectBox({ data: typeData?.[PARAM_MASTER.TAX_CALCLTN_TYPE.id], placeholder: preparePlaceholderSelect('Tax Calculation') })}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.taxPayableOnReverseCharges} label={translateContent('commonModules.label.bookingDetails.taxPayableOnReverseCharges')} name={[formName, 'taxPayableOnReverseCharges']} rules={[validateRequiredSelectField(translateContent('commonModules.label.bookingDetails.taxPayableOnReverseCharges'))]}>
                                {customSelectBox({ data: typeData?.[PARAM_MASTER.RFRL.id], placeholder: preparePlaceholderSelect('Tax Payable On Reverse Charges') })}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.salesDetails'))}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.saleConsultant} label={translateContent('commonModules.label.bookingDetails.salesConsultantName')} name={[formName, 'saleConsultantName']}>
                                <Input placeholder={preparePlaceholderText('Sales Consultant Name')} disabled={true} />
                            </Form.Item>
                            <Form.Item hidden name={[formName, 'saleConsultant']} />
                            <Form.Item hidden name={[formName, 'otfId']} />
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.mitraType} label={translateContent('commonModules.label.bookingDetails.influenceMitratype')} name={[formName, 'mitraType']}>
                                <Input placeholder={preparePlaceholderText('Influencer/Mitra Type')} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={formData?.mitraName} label={translateContent('commonModules.label.bookingDetails.influenceMitraName')} name={[formName, 'mitraName']}>
                                <Input placeholder={preparePlaceholderText('Influencer/Mitra Name')} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default OtfDetailsForm;
