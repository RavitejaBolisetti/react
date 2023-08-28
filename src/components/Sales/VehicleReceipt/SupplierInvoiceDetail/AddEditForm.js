/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form, DatePicker, Card } from 'antd';

import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const AddEditFormMain = (props) => {
    const { formData, form, buttonData, setButtonData } = props;

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

    return (
        <Card className={styles.drawerCardView}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.supplierType} label="Supplier Type" name="supplierType">
                        <Input maxLength={10} placeholder={preparePlaceholderText('Supplier Type')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.supplierName} label="Supplier Name" name="supplierName">
                        <Input maxLength={10} placeholder={preparePlaceholderText('Supplier Name')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.supplierInvoiceNumber} name="supplierInvoiceNumber" label="Supplier Invoice No.">
                        <Input maxLength={10} placeholder={preparePlaceholderText('Supplier Invoice')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formattedCalendarDate(formData?.supplierInvoiceDate)} label="Supplier Invoice Date" name="supplierInvoiceDate">
                        <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.roadPermitNumber} label="Road Permit Number" name="roadPermitNumber">
                        <Input maxLength={10} placeholder={preparePlaceholderText('Road Permit No.')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formattedCalendarDate(formData?.actualDispatchDate)} name="actualDispatchDate" label="Actual Dispatch Date">
                        <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.totalInvoiceAmount} label="Total Invoice Amount" name="totalInvoiceAmount">
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Special Request')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.lorryReceiptNumber} label="Lorry Receipt No." name="lorryReceiptNumber">
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Lorry Receipt No.')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.transpoter} label="Transporter" name="transpoter">
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Transporter')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.supplierGstNumber} label="Supplier GST Number" name="supplierGstNumber">
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Supplier GST Number')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formattedCalendarDate(formData?.geoFencingDate)} name="geoFencingDate" label="GEO Fencing Date & Time">
                        <DatePicker format={dateFormat} disabled={true} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
