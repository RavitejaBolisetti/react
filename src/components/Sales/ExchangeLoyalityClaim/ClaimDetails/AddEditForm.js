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
    const disabledProps = { disabled: true };
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
            {/* <DatePicker placeholder={preparePlaceholderSelect('Financial Year')} format={dateFormat} picker="year" className={styles.fullWidth} {...disabledProps} /> */}
            <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={'Claim Detail' || translateContent('applicationMaster.text.applicationActions')} key="1">
                    <Divider />
                    <Row gutter={20}>
                        {/* <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <Form.Item name="Co-Dealer Invoice" label={'Co-Dealer Invoice'} initialValue={formData?.invoiceNo}>
                                {customSelectBox({ data: financialYrData, placeholder: preparePlaceholderSelect('Co-Dealer Invoice' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                            </Form.Item>
                        </Col> */}
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <Form.Item name="chassisNo" label={'Chassis No'} initialValue={formData?.invoiceNo}>
                                {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Chassis No' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <Form.Item name="invoiceNo" label={'Invoice No'} initialValue={formData?.invoiceNo}>
                                {customSelectBox({ data: requesterData, placeholder: preparePlaceholderSelect('Invoice No' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <Form.Item name="invoiceDate" label={'Invoice Date'} initialValue={formData?.invoiceNo}>
                                <DatePicker placeholder={preparePlaceholderSelect('Invoice Date')} format={dateFormat} picker="year" className={styles.fullWidth} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="corporateType" label={'Corporate Type'} initialValue={formData?.insPremiumValue} disabled={true}>
                                <Input placeholder={preparePlaceholderText('Corporate Type')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="customerId" label={'Customer Id'} initialValue={formData?.insCompanyName}>
                                <Input placeholder={preparePlaceholderText('Customer Id')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="customerType" label={'Customer Type'} initialValue={formData?.customerType}>
                                <Input placeholder={preparePlaceholderText('Customer Type')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="customerName" label={'Customer Name'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('Customer Name')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="evaluationId" label={'Evaluation Id'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('Evaluation Id')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="approverRemark" label={'Approver Remarks'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('Approver Remarks')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
            <Collapse onChange={() => handleCollapse(2)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={'Old Vehicle Details' || translateContent('applicationMaster.text.applicationActions')} key="2">
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item initialValue={formData?.invoiceDate} label={'Title'} name="title" className={styles?.datePicker}>
                                            {customSelectBox({ data: [{ key: 1, value: 'Mr' }], placeholder: preparePlaceholderSelect('Title' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                        </Form.Item>
                                    </Col>
                                    {/* <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="invoiceNo" label={'Dealer Code'} initialValue={formData?.invoiceNo}>
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect(translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                        </Form.Item>
                                    </Col> */}
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="firstName" label={'First Name'}>
                                            <Input placeholder={preparePlaceholderText('First Name')} maxLength={50} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="middleName" label={'Middle Name'}>
                                            <Input placeholder={preparePlaceholderText('Middle Name')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="LastName" label={'Last Name'}>
                                            <Input placeholder={preparePlaceholderText('Last Name')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="make" label={'Make'}>
                                            <Input placeholder={preparePlaceholderText('Make')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="modal" label={'Modal'}>
                                            <Input placeholder={preparePlaceholderText('Modal')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="exchangeMake" label={'Exchange Make'} initialValue={formData?.chassisNumber}>
                                            <Input placeholder={preparePlaceholderText('Exchange Make')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item name="exchangeModal" label={'Exchange Modal'} initialValue={formData?.chassisNumber}>
                                            <Input placeholder={preparePlaceholderText('Exchange Modal')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'VehicleVarient'} name="vehicleVarient" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Vehicle Varient')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Chessis No'} name="chessisNo" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Chessis No')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Reg. No'} name="RegistrationNo" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Reg. No')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Year of Registration'} name="yearOfRegistration" className={styles?.datePicker}>
                                            <DatePicker placeholder={preparePlaceholderSelect('Year of Registration')} format={dateFormat} className={styles.fullWidth} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Month of Registration'} name="MonthOfRegistration" className={styles?.datePicker}>
                                            <DatePicker placeholder={preparePlaceholderSelect('Month of Registration')} format={dateFormat} className={styles.fullWidth} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Scheme'} name="scheme" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Scheme')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Relationship'} name="relationship" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Relationship')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Usage'} name="usage" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Usage')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Procurement Price'} name="procurementPrice" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Procurement Price')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Customer Exp. Price'} name="customerExpPrice" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Customer Exp. Price')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Finance'} name="finance" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Finance')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Financier Name'} name="financierName" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Financier Name')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Insurence Type'} name="insurenceType" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Insurence Type')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Insurence Company'} name="insurenceCompany" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Insurence Company')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Ins. No Claim Bonus'} name="InsNoClaimBonus" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Ins. No Claim Bonus')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Ins. Exp. Date'} name="InsExpDate" className={styles?.datePicker}>
                                            <DatePicker placeholder={preparePlaceholderSelect('Ins. Exp. Date')} format={dateFormat} className={styles.fullWidth} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Deviation Doc Id'} name="deviationDocId" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Deviation Doc Id')} maxLength={50} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Deviation Doc Date'} name="Deviation Doc Date" className={styles?.datePicker}>
                                            <DatePicker placeholder={preparePlaceholderSelect('Deviation Doc Date')} format={dateFormat} className={styles.fullWidth} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                        <Form.Item label={'Deviation Req Status'} name="Deviation Req Status" className={styles?.datePicker}>
                                            <Input placeholder={preparePlaceholderText('Deviation Req Status')} maxLength={50} disabled={true} />
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
