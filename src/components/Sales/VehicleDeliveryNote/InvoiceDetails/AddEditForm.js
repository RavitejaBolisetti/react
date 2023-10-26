/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import dayjs from 'dayjs';

import { Col, Input, Form, Row, Card, DatePicker, Space, Select } from 'antd';

import { disableFutureDate, disableFieldsOnFutureDate } from 'utils/disableDate';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';

const { TextArea } = Input;
const AddEditFormMain = (props) => {
    const { formData, relationshipManagerData, typeData, form, soldByDealer, handleRelationShipManagerChange, setButtonData } = props;
    const { vinData, getChallanDetails } = props;

    useEffect(() => {
        if (formData && Object?.keys(formData)?.length > 0) {
            if (formData?.invoiceDate && formData?.customerPromiseDate && soldByDealer) form.setFieldsValue({ ...formData, invoiceDate: formattedCalendarDate(formData?.invoiceDate), customerPromiseDate: formattedCalendarDate(formData?.customerPromiseDate) });
            else if (!soldByDealer) form.setFieldsValue({ ...formData });
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
    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.deliveryNoteFor} label="Delivery Note For" name="deliveryNoteFor">
                                            <Input placeholder={preparePlaceholderText('Delivery Note For')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    {soldByDealer && (
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formData?.invoiceNumber} label="Invoice No." name="invoiceNumber">
                                                <Input placeholder={preparePlaceholderText('Invoice No.')} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                    )}
                                    {soldByDealer && (
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Invoice Date" name="invoiceDate">
                                                <DatePicker format={dateFormat} disabledDate={disableFutureDate} placeholder={preparePlaceholderSelect('Invoice Date')} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                    )}
                                    {!soldByDealer && (
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formData?.chassisNumber} label="VIN" name="chassisNumber">
                                                <Select showSearch options={(vinData?.length && vinData) || []} fieldNames={{ label: 'chassisNumber', value: 'chassisNumber' }} placeholder={preparePlaceholderSelect('VIN')} onSelect={(value, valueObj) => handleSelectVinNo(value, valueObj)} optionFilterProp="chassisNumber" />
                                            </Form.Item>
                                        </Col>
                                    )}

                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.engineNumber} label="Engine No." name="engineNumber">
                                            <Input placeholder={preparePlaceholderText('Engine No.')} maxLength={10} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    {soldByDealer && (
                                        <>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.chassisNumber} label="Chassis No." name="chassisNumber">
                                                    <Input placeholder={preparePlaceholderText('Chassis No.')} maxLength={10} disabled={true} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.relationShipManager} label="Relationship Manager" name="relationShipManager">
                                                    {customSelectBox({ data: relationshipManagerData, fieldNames: { key: 'key', value: 'value' }, placeholder: preparePlaceholderSelect('Relationship Manager'), onChange: handleRelationShipManagerChange })}
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
                                                <Form.Item initialValue={formattedCalendarDate(formData?.customerPromiseDate)} label="Customer Promise Date" name="customerPromiseDate">
                                                    <DatePicker format={dateFormat} placeholder={preparePlaceholderSelect('Customer Promise Date')} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                            {formData?.customerPromiseDate && disableFieldsOnFutureDate(dayjs(formData?.customerPromiseDate)) && (
                                                <>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                        <Form.Item initialValue={formData?.reasonForDelay} label="Reasons For Delay" name="reasonForDelay" rules={[validateRequiredSelectField('reasons for delay')]}>
                                                            {customSelectBox({ data: typeData['DLVR_DLY_RSN'], placeholder: preparePlaceholderSelect('Reasons For Delay') })}
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                        <Form.Item label="Remark For Delay" name="reasonForDelayRemarks" initialValue={formData?.reasonForDelayRemarks}>
                                                            <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('Remark For Delay')} />
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
