/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Col, Input, Form, Row, Card, DatePicker, Space, AutoComplete } from 'antd';

import { disableFutureDate, disableFieldsOnFutureDate } from 'utils/disableDate';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText, preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';
import { debounce } from 'utils/debounce';

const { TextArea, Search } = Input;
const AddEditFormMain = (props) => {
    const { formData, relationshipManagerData, typeData, form, soldByDealer, handleInvoiceNoSearch, handleOnChange } = props;
    const { vinData } = props;

    const [chassisNoList, setChassisNoList] = useState([]);

    const handleSelect = (value) => {};

    const onSearchLocation = () => {};

    useEffect(() => {
        if (soldByDealer) {
            form.setFieldsValue({
                deliveryNoteFor: 'Vehicle Sold By Dealer',
            });
        } else {
            form.setFieldsValue({
                deliveryNoteFor: 'Direct Built by MnM',
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [soldByDealer]);

    const handleSelectVinNo = (value) => {
    form.setFieldsValue({
        engineNumber: value,
    });
    }

    const fieldNames = { label: 'vinNumber', value: 'engineNumber' };


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
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.invoiceNumber} label="Invoice No." name="invoiceNumber">
                                            {soldByDealer ? (
                                                <>
                                                    <Input placeholder={preparePlaceholderText('Invoice No.')} disabled={true} />
                                                </>
                                            ) : (
                                                // <Search onSearch={handleInvoiceNoSearch} onChange={handleOnChange} placeholder={preparePlaceholderText('Invoice No.')} allowClear />
                                                <AutoComplete fieldNames={fieldNames} label="Chasiss No" options={vinData} backfill={false}

                                                 onSelect={handleSelectVinNo}
                                                  onSearch={debounce(handleInvoiceNoSearch, 400)} allowSearch >
                                                    <Input.Search size="large" allowClear placeholder={preparePlaceholderAutoComplete('')} />
                                                </AutoComplete>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    {soldByDealer && (
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Invoice Date" name="invoiceDate">
                                                <DatePicker format={dateFormat} disabledDate={disableFutureDate} placeholder={preparePlaceholderSelect('Invoice Date')} disabled={true} />
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
                                                    {customSelectBox({ data: relationshipManagerData, placeholder: preparePlaceholderSelect('Relationship Manager') })}
                                                </Form.Item>
                                            </Col>
                                        </>
                                    )}
                                </Row>

                                <Row gutter={20}>
                                    {soldByDealer && (
                                        <>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formattedCalendarDate(formData?.customerPromiseDate)} label="Customer Provided Date" name="customerPromiseDate">
                                                    <DatePicker format={dateFormat} placeholder={preparePlaceholderSelect('Customer Provided Date')} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                            {disableFieldsOnFutureDate(dayjs(formData?.customerPromiseDate)) && (
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
