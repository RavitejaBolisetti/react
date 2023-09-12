/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, DatePicker, Input, Divider } from 'antd';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';

const { Search } = Input;

const OtfDetailsForm = (props) => {
    const { formData, formName, invoiceDetailForm, otfFormData, typeData, selectedOtfNumber, setSelectedOtfNumber } = props;

    useEffect(() => {
        if (otfFormData) {
            invoiceDetailForm?.setFieldsValue({
                [formName]: {
                    ...otfFormData,
                    otfDate: formattedCalendarDate(otfFormData?.otfDate),
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otfFormData]);

    const handleChange = (value) => {
        setSelectedOtfNumber(value);
    };

    return (
        <>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={otfFormData?.otfNumber} label="Booking Number" name={[formName, 'otfNumber']} rules={[validateRequiredSelectField('Booking Number')]}>
                        <Search maxLength={50} placeholder={preparePlaceholderText('Booking Number')} onSearch={handleChange} allowClear />
                    </Form.Item>
                </Col>
            </Row>
            {selectedOtfNumber && (
                <>
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={otfFormData?.otfDate} label="OTF Date" name={[formName, 'otfDate']}>
                                <DatePicker format={dateFormat} placeholder={preparePlaceholderText('otf date')} style={{ display: 'auto', width: '100%' }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={otfFormData?.darNumber} label="DAR Number" name={[formName, 'darNumber']}>
                                <Input placeholder={preparePlaceholderText('DAR Number')} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={otfFormData?.saleType} label="Sales Type" name={[formName, 'saleType']}>
                                {customSelectBox({ data: typeData?.[PARAM_MASTER.SALE_TYPE.id], placeholder: preparePlaceholderSelect('Sales Type') })}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={otfFormData?.priceType} label="Price Type" name={[formName, 'priceType']}>
                                {customSelectBox({ data: typeData?.[PARAM_MASTER.PRC_TYP.id], placeholder: preparePlaceholderSelect('Sales Type') })}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={otfFormData?.taxCalculationType} label="Tax Calculation" name={[formName, 'taxCalculationType']}>
                                {customSelectBox({ data: typeData?.[PARAM_MASTER.TAX_CALCLTN_TYPE.id], placeholder: preparePlaceholderSelect('Tax Calculation') })}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={otfFormData?.taxPayableOnReverseCharges} label="Tax Payable On Reverse Charges?" name={[formName, 'taxPayableOnReverseCharges']}>
                                {customSelectBox({ data: typeData?.[PARAM_MASTER.RFRL.id], placeholder: preparePlaceholderSelect('Tax Payable On Reverse Charges') })}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={otfFormData?.saleConsultant} label="Sales Consultant Name" name={[formName, 'saleConsultant']}>
                                <Input placeholder={preparePlaceholderText('Sales Consultant Name')} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={otfFormData?.mitraType} label="Influence/Mitra Type" name={[formName, 'mitraType']}>
                                <Input placeholder={preparePlaceholderText('Influence/Mitra Type')} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={otfFormData?.mitraName} label="Influence/Mitra Name" name={[formName, 'mitraName']}>
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
