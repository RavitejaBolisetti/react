/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { Col, Input, Form, Row, Card, DatePicker, Space, Select } from 'antd';

import { disableFutureDate, disableFieldsOnFutureDate } from 'utils/disableDate';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';
import { translateContent } from 'utils/translateContent';
import { REASON_FOR_DELAY } from '../constants';

const { TextArea } = Input;
const AddEditFormMain = (props) => {
    const { formData, relationshipManagerData, typeData, form, soldByDealer, handleRelationShipManagerChange, setButtonData } = props;
    const { vinData, getChallanDetails } = props;

    const [reasonForDelayRules, setReasonForDelayRules] = useState([]);

    useEffect(() => {
        if (formData && Object?.keys(formData)?.length > 0) {
            if (formData?.invoiceDate && formData?.customerPromiseDate && soldByDealer) {
                if (!disableFieldsOnFutureDate(dayjs(formData?.customerPromiseDate))) {
                    setButtonData((prev) => ({ ...prev, formBtnActive: true }));
                } else {
                    setButtonData((prev) => ({ ...prev, formBtnActive: false }));
                }
                form.setFieldsValue({ ...formData, invoiceDate: formattedCalendarDate(formData?.invoiceDate), customerPromiseDate: formattedCalendarDate(formData?.customerPromiseDate) });
            } else if (!soldByDealer) form.setFieldsValue({ ...formData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleSelectVinNo = (value, ValueObj) => {
        if (value && ValueObj?.engineNumber) {
            form.setFieldsValue({
                engineNumber: ValueObj?.engineNumber,
            });
            setButtonData((prev) => ({ ...prev, formBtnActive: true }));
            getChallanDetails(value, ValueObj?.engineNumber);
        } else {
            setButtonData((prev) => ({ ...prev, formBtnActive: false }));
        }
    };
    const handleReasonChange = (value) => {
        if (!value) {
            setReasonForDelayRules([]);
        } else {
            if (value !== REASON_FOR_DELAY?.OTHER?.key) {
                setReasonForDelayRules([]);
                return;
            }
            setReasonForDelayRules([validateRequiredInputField('vehicleDeliveryNote.invoiceDetails.label.reasonForDelayRemarks')]);
        }
    };
    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.deliveryNoteFor} label={translateContent('vehicleDeliveryNote.invoiceDetails.label.deliveryNoteFor')} name="deliveryNoteFor">
                                            <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.invoiceDetails.label.deliveryNoteFor'))} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    {soldByDealer && (
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formData?.invoiceNumber} label={translateContent('vehicleDeliveryNote.invoiceDetails.label.invoiceNumber')} name="invoiceNumber">
                                                <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.invoiceDetails.label.invoiceNumber'))} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                    )}
                                    {soldByDealer && (
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('vehicleDeliveryNote.invoiceDetails.label.invoiceDate')} name="invoiceDate">
                                                <DatePicker format={dateFormat} disabledDate={disableFutureDate} placeholder={preparePlaceholderSelect(translateContent('vehicleDeliveryNote.invoiceDetails.label.invoiceDate'))} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                    )}
                                    {!soldByDealer && (
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formData?.chassisNumber} label={translateContent('vehicleDeliveryNote.invoiceDetails.label.vin')} name="chassisNumber">
                                                <Select showSearch options={(vinData?.length && vinData) || []} fieldNames={{ label: 'chassisNumber', value: 'chassisNumber' }} placeholder={preparePlaceholderSelect(translateContent('vehicleDeliveryNote.invoiceDetails.label.vin'))} onSelect={(value, valueObj) => handleSelectVinNo(value, valueObj)} optionFilterProp="chassisNumber" />
                                            </Form.Item>
                                        </Col>
                                    )}

                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.engineNumber} label={translateContent('vehicleDeliveryNote.invoiceDetails.label.engineNumber')} name="engineNumber">
                                            <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.invoiceDetails.label.engineNumber'))} maxLength={10} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    {soldByDealer && (
                                        <>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.chassisNumber} label={translateContent('vehicleDeliveryNote.invoiceDetails.label.chassisNumber')} name="chassisNumber">
                                                    <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.invoiceDetails.label.chassisNumber'))} maxLength={10} disabled={true} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.relationShipManager} label={translateContent('vehicleDeliveryNote.invoiceDetails.label.relationShipManager')} name="relationShipManager">
                                                    {customSelectBox({ data: relationshipManagerData, fieldNames: { key: 'key', value: 'value' }, placeholder: preparePlaceholderSelect(translateContent('vehicleDeliveryNote.invoiceDetails.label.relationShipManager')), onChange: handleRelationShipManagerChange })}
                                                </Form.Item>
                                                <Form.Item hidden initialValue={formData?.relationShipManagerCode} label="Relationship Manager Code" name="relationShipManagerCode">
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                        </>
                                    )}
                                </Row>

                                <Row gutter={20}>
                                    {soldByDealer && (
                                        <>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formattedCalendarDate(formData?.customerPromiseDate)} label={translateContent('vehicleDeliveryNote.invoiceDetails.label.customerPromiseDate')} name="customerPromiseDate">
                                                    <DatePicker format={dateFormat} placeholder={preparePlaceholderSelect(translateContent('vehicleDeliveryNote.invoiceDetails.label.customerPromiseDate'))} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                            {formData?.customerPromiseDate && disableFieldsOnFutureDate(dayjs(formData?.customerPromiseDate)) && (
                                                <>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                        <Form.Item initialValue={formData?.reasonForDelay} label={translateContent('vehicleDeliveryNote.invoiceDetails.label.reasonForDelay')} name="reasonForDelay" rules={[validateRequiredSelectField(translateContent('vehicleDeliveryNote.invoiceDetails.label.reasonForDelay'))]}>
                                                            {customSelectBox({ data: typeData['DLVR_DLY_RSN'], placeholder: preparePlaceholderSelect(translateContent('vehicleDeliveryNote.invoiceDetails.label.reasonForDelay')), onChange: handleReasonChange })}
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                        <Form.Item rules={reasonForDelayRules} label={translateContent('vehicleDeliveryNote.invoiceDetails.label.reasonForDelayRemarks')} name="reasonForDelayRemarks" initialValue={formData?.reasonForDelayRemarks}>
                                                            <TextArea showCount maxLength={300} placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.invoiceDetails.label.reasonForDelayRemarks'))} />
                                                        </Form.Item>
                                                    </Col>
                                                </>
                                            )}
                                        </>
                                    )}
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
