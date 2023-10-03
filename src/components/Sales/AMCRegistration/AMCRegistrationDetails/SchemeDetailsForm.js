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

const SchemeDetailsForm = (props) => {
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
        <Row gutter={16}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <Form.Item initialValue={formData?.saleType} label="AMC Type" name="amcType" rules={[validateRequiredSelectField('AMC Type')]}>
                    {customSelectBox({ data: typeData?.[PARAM_MASTER.TAX_CALCLTN_TYPE.id], placeholder: preparePlaceholderSelect('AMC Type') })}
                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <Form.Item label="Scheme Description" name="schemeDescription" rules={[validateRequiredSelectField('Scheme Description')]}>
                    {customSelectBox({ data: typeData?.[PARAM_MASTER.TAX_CALCLTN_TYPE.id], placeholder: preparePlaceholderSelect('Scheme Description') })}
                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <Form.Item label="Scheme Code" name="schemeCode" rules={[validateRequiredInputField('Scheme Code')]}>
                    <Input disabled maxLength={50} placeholder={preparePlaceholderText('Scheme Code')} />
                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <Form.Item label="Scheme Basic Amount" name="schemeBasicAmount" rules={[validateRequiredInputField('Scheme Basic Amount')]}>
                    <Input disabled maxLength={50} placeholder={preparePlaceholderText('Scheme Basic Amount')} />
                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <Form.Item label="Scheme Discount" name="schemeDiscount" rules={[validateRequiredInputField('Scheme Discount')]}>
                    <Input maxLength={50} placeholder={preparePlaceholderText('Scheme Discount')} />
                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <Form.Item label="Scheme Tax Amount" name="schemeTaxAmount" rules={[validateRequiredInputField('Scheme Tax Amount')]}>
                    <Input disabled maxLength={50} placeholder={preparePlaceholderText('Scheme Tax Amount')} />
                </Form.Item>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <Form.Item label="Scheme End Date" name="schemeEndDate">
                    <DatePicker disabled maxLength={50} placeholder={preparePlaceholderText('Scheme End Date')} />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default SchemeDetailsForm;
