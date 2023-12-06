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
    const { formData, onHandleSelect } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };
    const [openAccordian, setOpenAccordian] = useState(1);

    const financialYrData = [
        {
            key: '2',
            value: '2023 - 2024',
        },
        {
            key: '3',
            value: '2022 - 2023',
        },
    ];
    const requesterData = [
        {
            key: '2',
            value: 'Token 1',
        },
        {
            key: '3',
            value: 'Token 2',
        },
    ];
    const month = [{key: 'Jan', value: 'Jan'}, {key:'Feb', value: 'Feb'}, {key: 'Mar', 'Mar' : 'Mar'}, {key:'Apr', value: 'Apr'}, {key:'May', value: 'Apr'}, {key: 'Jun', value: 'Jun'}, {key:'Jul', value: 'Jul'}, {key: 'Aug', value: 'Aug'}, {key: 'Sep', value:'Sep'}, {key: 'Oct', value: 'Oct'}, {key:'Nov', value: 'Nov'}, {key:'Dec', value: 'Dec'}];

    const handleCollapse = (key) => {
        setOpenAccordian(key);
    };

    return (
        <>
            <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={'Request Detail' || translateContent('applicationMaster.text.applicationActions')} key="1">
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <Form.Item name="financialYear" label={'Financial Year'} initialValue={formData?.invoiceNo}>
                                {customSelectBox({ data: financialYrData, placeholder: preparePlaceholderSelect('Financial Year' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}

                                {/* <DatePicker placeholder={preparePlaceholderSelect('Financial Year')} format={dateFormat} picker="year" className={styles.fullWidth} {...disabledProps} /> */}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <Form.Item name="month" label={'Month'} initialValue={formData?.invoiceNo}>
                                {customSelectBox({ data: month, placeholder: preparePlaceholderSelect('Month' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}

                                {/* <DatePicker placeholder={preparePlaceholderSelect('Month')} format={dateFormat} picker="month" className={styles.fullWidth} {...disabledProps} /> */}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <Form.Item name="financialYear" label={'Requester ID'} initialValue={formData?.invoiceNo}>
                                {customSelectBox({ data: requesterData, placeholder: preparePlaceholderSelect('Requester ID' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}

                                {/* <DatePicker placeholder={preparePlaceholderSelect('Financial Year')} format={dateFormat} picker="year" className={styles.fullWidth} {...disabledProps} /> */}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="insPremiumValue" label={'Requester'} initialValue={formData?.insPremiumValue} disabled={true}>
                                <Input placeholder={preparePlaceholderText('Bank Acc No')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="insCompanyName" label={'Budget For The Period'} initialValue={formData?.insCompanyName}>
                                <Input placeholder={preparePlaceholderText('IFSC Code')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="financierName" label={'Utilized'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('Recognition Amount')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="dealerShareAmount" label={'Balance Available'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('Recognition Comment')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
            <Collapse onChange={() => handleCollapse(2)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={'Employeement Details' || translateContent('applicationMaster.text.applicationActions')} key="2">
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.invoiceDate} label={'Dealer Location'} name="invoiceDate" className={styles?.datePicker}>
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect(translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="invoiceNo" label={'Dealer Code'} initialValue={formData?.invoiceNo}>
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect(translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="customerName" label={'Employee Code'}>
                                            <Input placeholder={preparePlaceholderText('Employee Code')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="customerName" label={'Mile Code'}>
                                            <Input placeholder={preparePlaceholderText('Mile Code')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    {/* on search with employee code employee data fetch feom employee master */}
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="customerName" label={'Employee Name'}>
                                            <Input placeholder={preparePlaceholderText('Employee Name')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="customerCategory" label={'Employee Status'}>
                                            <Input placeholder={preparePlaceholderText('Employee Status')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="customerCategory" label={'Designation'}>
                                            <Input placeholder={preparePlaceholderText('Designation')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="chassisNumber" label={'Mobile No'} initialValue={formData?.chassisNumber}>
                                            <Input placeholder={preparePlaceholderText('Mobile No')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'PAN No'} name="insCoverNoteNo" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('PAN No')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Bank Name'} name="insCoverNoteDate" className={styles?.datePicker}>
                                            <DatePicker placeholder={preparePlaceholderSelect('Bank Name')} format={dateFormat} className={styles.fullWidth} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="insPremiumValue" label={'Bank Acc No'} initialValue={formData?.insPremiumValue}>
                                            <Input placeholder={preparePlaceholderText('Bank Acc No')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="insCompanyName" label={'IFSC Code'} initialValue={formData?.insCompanyName}>
                                            <Input placeholder={preparePlaceholderText('IFSC Code')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    {/*  */}
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="financierName" label={'Recognition Amount'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Recognition Amount')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={18} md={18} lg={18} xl={18} xxl={18}>
                                        <Form.Item name="dealerShareAmount" label={'Recognition Comments'} initialValue={formData?.financierName}>
                                            <Input placeholder={preparePlaceholderText('Recognition Comment')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Space>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
