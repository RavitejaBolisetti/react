/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, DatePicker, Card, Space, Collapse, Divider, Switch } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { expandIcon } from 'utils/accordianExpandIcon';
import { validateRequiredSelectField } from 'utils/validation';
import VehicleDetailsMaster from './VehicleDetails';

const { Panel } = Collapse;

const chessisNoList = [
    { key: 'VGDV9894', value: 'VGDV9894' },
    { key: 'VGDV9893', value: 'VGDV9893' },
    { key: 'VGDV9892', value: 'VGDV9892' },
    { key: 'VGDV9891', value: 'VGDV9891' },
];

const AddEditFormMain = (props) => {
    const { formData, onHandleSelect, formActionType } = props;
    const disabledProps = { disabled: true };
    const [openAccordian, setOpenAccordian] = useState(1);

    const handleCollapse = (key) => {
        setOpenAccordian(key);
    };

    const vehicleFormProps = {
        chessisNoList,
        formActionType,
    };

    return (
        <>
            <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={translateContent('overRiderClaim.heading.claimDetail') || translateContent('applicationMaster.text.applicationActions')} key="1">
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <Form.Item name="mnmInvoice No" label={translateContent('overRiderClaim.label.mandmInvoiceNo')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.mandmInvoiceNo'))} maxLength={50} disabled={!formActionType?.addMode} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="mnmInvoiceDate" label={translateContent('overRiderClaim.label.mandmInvoiceDate')} initialValue={formData?.financierName}>
                                <DatePicker placeholder={preparePlaceholderSelect(translateContent('overRiderClaim.placeholder.mandmInvoiceDate'))} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.dealerClaimAmount')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.dealerClaimAmount'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.approvedClaimAmount')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.approvedClaimAmount'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.gst')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.gst'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.gstAmount')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.gstAmount'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.totalClaimAmount')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.totalClaimAmount'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.creditNoteNo')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.creditNoteNo'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.creditNoteDate')} initialValue={formData?.invoiceNo}>
                                <DatePicker placeholder={preparePlaceholderSelect(translateContent('overRiderClaim.placeholder.creditNoteDate'))} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.creditNoteAmount')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.creditNoteAmount'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.tdsAmount')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.creditNoteAmount'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.debitNoteNo')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.debitNoteNo'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.debitNoteDate')} initialValue={formData?.invoiceNo}>
                                <DatePicker placeholder={preparePlaceholderSelect(translateContent('overRiderClaim.placeholder.debitNoteDate'))} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.debitNoteAmount')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.debitNoteAmount'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.irnNumber')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.irnNumber'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>{' '}
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.irnStatus')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.irnStatus'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>{' '}
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={translateContent('overRiderClaim.label.irnDesc')} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.irnDesc'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
            <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={translateContent('overRiderClaim.heading.vehicleDetail') || translateContent('applicationMaster.text.applicationActions')} key="1">
                    <Divider />
                    <VehicleDetailsMaster {...vehicleFormProps} />
                </Panel>
            </Collapse>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
