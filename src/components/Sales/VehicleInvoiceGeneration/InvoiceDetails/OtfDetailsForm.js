/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, Select, DatePicker, Input, Collapse, Divider } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';
import { validateRequiredSelectField, validateRequiredInputField, validationNumber } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';

const { TextArea, Search } = Input;
const { Panel } = Collapse;
const { Option } = Select;
const OtfDetailsForm = (props) => {
    const { receiptData, openAccordian, handleCollapse, otfNumber, setOtfNumber, setReceipt, formActionType } = props;

    useEffect(() => {
        if (receiptData?.receiptType) {
            setReceipt(receiptData?.receiptType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiptData?.receiptType]);

    const handleChange = (value) => {
        setOtfNumber(value);
    };

    return (
        <>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={receiptData?.receiptType} label="OTF Number" name="otfNumber" rules={[validateRequiredSelectField('OTF Number'), validationNumber('OTF Number')]}>
                        <Search maxLength={50} placeholder={preparePlaceholderText('OTF Number')} onSearch={handleChange} allowClear />
                    </Form.Item>
                </Col>
            </Row>
            {otfNumber && (
                <>
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={receiptData?.totalApportionAmount} label="OTF Date" name="otfDate">
                                <DatePicker format={dateFormat} placeholder={preparePlaceholderText('otf date')} style={{ display: 'auto', width: '100%' }} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={receiptData?.totalReceivedAmount} label="DAR Number" name="darNumber">
                                <Input placeholder={preparePlaceholderText('DAR Number')} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={receiptData?.totalWriteOffAmount} label="Sales Type" name="salesType">
                                {customSelectBox({ placeholder: preparePlaceholderSelect('sale type') })}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={receiptData?.totalWriteOffAmount} label="Price Type" name="priceType">
                                {customSelectBox({ placeholder: preparePlaceholderSelect('price type') })}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={receiptData?.totalReceivedAmount} label="Tax Calculation" name="taxCalculation">
                                <Input placeholder={preparePlaceholderText('Tax Calculation')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={receiptData?.totalReceivedAmount} label="Tax Payable On Reverse Charges?" name="taxPayable">
                                <Input placeholder={preparePlaceholderText('Tax Payable On Reverse Charges')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={receiptData?.totalWriteOffAmount} label="Sales Consultant Name" name="consultantName">
                                <Input placeholder={preparePlaceholderText('Influence/Mitra Type')} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={receiptData?.totalReceivedAmount} label="Influence/Mitra Type" name="mitraType">
                                <Input placeholder={preparePlaceholderText('Influence/Mitra Type')} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item initialValue={receiptData?.totalReceivedAmount} label="Influence/Mitra Name" name="mitraName">
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
