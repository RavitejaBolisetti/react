/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form, DatePicker, Card, Select } from 'antd';
import { translateContent } from 'utils/translateContent';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { CardSkeleton } from 'components/common/Skeleton';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { isLoading, formData, form, buttonData, setButtonData, supplierTypeData } = props;

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    useEffect(() => {
        setButtonData({ ...buttonData, formBtnActive: true });
        form.setFieldsValue({
            ...formData,
        });
        form.setFieldsValue({
            supplierInvoiceDate: formattedCalendarDate(formData?.supplierInvoiceDate),
            actualDispatchDate: formattedCalendarDate(formData?.actualDispatchDate),
            geoFencingDate: formattedCalendarDate(formData?.geoFencingDate),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return !isLoading ? (
        <Card>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.supplierType} label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.supplierType')} name="supplierType">
                        <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps} disabled={true}>
                            {supplierTypeData?.map((item) => (
                                <Option key={'dv' + item.key} value={item.key}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                        {/* <Input maxLength={10} placeholder={preparePlaceholderText('Supplier Type')} disabled={true} /> */}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.supplierName} label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.supplierName')} name="supplierName">
                        <Input maxLength={10} placeholder={preparePlaceholderText('Supplier Name')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.supplierInvoiceNumber} name="supplierInvoiceNumber" label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.supplierInvoiceNumber')}>
                        <Input maxLength={10} placeholder={preparePlaceholderText('Supplier Invoice')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formattedCalendarDate(formData?.supplierInvoiceDate)} label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.supplierInvoiceDate')} name="supplierInvoiceDate">
                        <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.roadPermitNumber} label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.roadPermitNumber')} name="roadPermitNumber">
                        <Input maxLength={10} placeholder={preparePlaceholderText('Road Permit No.')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formattedCalendarDate(formData?.actualDispatchDate)} name="actualDispatchDate" label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.actualDispatchDate')}>
                        <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.totalInvoiceAmount} label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.totalInvoiceAmount')} name="totalInvoiceAmount">
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Special Request')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.lorryReceiptNumber} label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.lorryReceiptNumber')} name="lorryReceiptNumber">
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Lorry Receipt No.')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.transpoter} label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.transporter')} name="transpoter">
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Transporter')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.supplierGstNumber} label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.supplierGstNumber')} name="supplierGstNumber">
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Supplier GST Number')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formattedCalendarDate(formData?.geoFencingDate)} name="geoFencingDate" label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.geoFencingDateAndTime')}>
                        <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    ) : (
        <CardSkeleton title={false} contentHeight={350} />
    );
};

export const AddEditForm = AddEditFormMain;
