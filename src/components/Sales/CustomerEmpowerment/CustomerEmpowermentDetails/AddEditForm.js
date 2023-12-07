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

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, onHandleSelect, editMode } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };
    const [openAccordian, setOpenAccordian] = useState(1);

    const financialYrData = [
        {
            key: '1',
            value: '2024 - 2025',
        },
        {
            key: '2',
            value: '2023 - 2024',
        },
        {
            key: '3',
            value: '2022 - 2023',
        },
    ];
    const month = [
        { key: 'Jan', value: 'Jan' },
        { key: 'Feb', value: 'Feb' },
        { key: 'Mar', Mar: 'Mar' },
        { key: 'Apr', value: 'Apr' },
        { key: 'May', value: 'Apr' },
        { key: 'Jun', value: 'Jun' },
        { key: 'Jul', value: 'Jul' },
        { key: 'Aug', value: 'Aug' },
        { key: 'Sep', value: 'Sep' },
        { key: 'Oct', value: 'Oct' },
        { key: 'Nov', value: 'Nov' },
        { key: 'Dec', value: 'Dec' },
    ];

    const handleCollapse = (key) => {
        setOpenAccordian(key);
    };

    return (
        <>
            <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={'Request Details' || translateContent('applicationMaster.text.applicationActions')} key="1">
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                                <Row gutter={20}>
                                    {/* <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="invoiceNo" label={'Emp Request ID'} initialValue={formData?.invoiceNo}>
                                            <Input placeholder={preparePlaceholderText('Emp Request ID')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.invoiceDate} label={'Request Date'} name="invoiceDate" className={styles?.datePicker}>
                                            <DatePicker placeholder={preparePlaceholderSelect('Request Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="customerName" label={'Request Status'}>
                                            <Input placeholder={preparePlaceholderText('Request Status')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col> */}
                                    {/* <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="customerCategory" label={'Reason for Delay'}>
                                            <Input placeholder={preparePlaceholderText('Reason for Delay')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col> */}

                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="chassisNumber" label={'Invoice ID'} initialValue={formData?.chassisNumber}>
                                            <Input placeholder={preparePlaceholderText('Invoice ID')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Invoice Date'} name="insCoverNoteNo" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Invoice Date')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Invoice Status'} name="insCoverNoteDate" className={styles?.datePicker}>
                                            <DatePicker placeholder={preparePlaceholderSelect('Invoice Status')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="vdnDate" label={'VDN ID'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('VDN Date')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="vdnDate" label={'VDN Date'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('VDN Date')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>



                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="insPremiumValue" label={'Segment'} initialValue={formData?.insPremiumValue}>
                                            <Input placeholder={preparePlaceholderText('Segment')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="insCompanyName" label={'Model Description'} initialValue={formData?.insCompanyName}>
                                            <Input placeholder={preparePlaceholderText('Model Description')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="financierName" label={'Chassis No'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Chassis No')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>


                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="customerName" label={'Customer Name'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Customer Name')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="requestedAmount" label={'Requested Amount'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Requested Amount')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                                        <Form.Item name="remarks" label={'Dealer remarks'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Dealer remarks')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Space>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
            <Collapse onChange={() => handleCollapse(2)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={'Credit/Debit Detail' || translateContent('applicationMaster.text.applicationActions')} key="2">
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="dealerShareAmount" label={'Credit Note No'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('Credit Note No')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="dealerShareAmount" label={'Credit Note Amount'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('Credit Note Amount')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="dealerShareAmount" label={'Credit Note Date'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('Credit Note Date')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="dealerShareAmount" label={'Debit Note No'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('Debit Note No')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="dealerShareAmount" label={'Debit Note Amount'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('Debit Note Amount')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="dealerShareAmount" label={'Debit Note Date'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('Debit Note Date')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="dealerShareAmount" label={'IRN Number'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('IRN Number')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="dealerShareAmount" label={'IRN Status'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('IRN Status')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="dealerShareAmount" label={'IRN Desc'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('IRN Desc')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
