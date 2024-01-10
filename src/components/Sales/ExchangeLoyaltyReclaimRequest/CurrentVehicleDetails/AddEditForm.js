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
import { validateRequiredInputField } from 'utils/validation';

const { TextArea } = Input;

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

    return (
        <>
            <Card>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="customerID" label={'Customer ID'}>
                            <Input placeholder={preparePlaceholderText('Customer ID')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="customerName" label={'Customer Name'}>
                            <Input placeholder={preparePlaceholderText('Customer Name')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="make" label={'Make'}>
                            <Input placeholder={preparePlaceholderText('Make')} maxLength={50} disabled={true} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="modalGroup" label={'Modal Group'}>
                            {customSelectBox({ data: [], placeholder: preparePlaceholderText('Modal Group'), disabled: true })}
                            {/* <Input placeholder={preparePlaceholderText('Modal Group')} maxLength={50} disabled={true} /> */}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'varient'} name="Varient">
                            <Input placeholder={preparePlaceholderText('Varient')} maxLength={50} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Old Reg. No'} name="oldRegistrationNo">
                            <Input placeholder={preparePlaceholderText('Old Reg. No')} maxLength={50} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Old Chessis No'} name="oldchessisNo">
                            <Input placeholder={preparePlaceholderText('Old Chessis No')} maxLength={50} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'DOB'} name="dob" className={styles?.datePicker}>
                            <DatePicker placeholder={preparePlaceholderSelect('DOB')} format={dateFormat} className={styles.fullWidth} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Relationship'} name="relationship" className={styles?.datePicker}>
                            <Input placeholder={preparePlaceholderText('Relationship')} maxLength={50} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Year of Registration'} name="yearOfRegistration" className={styles?.datePicker}>
                            {customSelectBox({ data: [], placeholder: preparePlaceholderText('Month of Registration'),  disabled: true })}
                            {/* <DatePicker placeholder={preparePlaceholderSelect('Year of Registration')} format={dateFormat} className={styles.fullWidth} disabled={true} /> */}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Month of Registration'} name="monthOfRegistration" className={styles?.datePicker}>
                            {customSelectBox({ data: [], placeholder: preparePlaceholderText('Month of Registration'), disabled:true, })}

                            {/* <DatePicker placeholder={preparePlaceholderSelect('Month of Registration')} format={dateFormat} className={styles.fullWidth} disabled={true} /> */}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Usage'} name="usage" className={styles?.datePicker}>
                            <Input placeholder={preparePlaceholderText('Usage')} maxLength={50} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Scheme Name'} name="schemeName" className={styles?.datePicker}>
                            <Input placeholder={preparePlaceholderText('Scheme Name')} maxLength={50} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Scheme Amount'} name="schemeAmount" className={styles?.datePicker}>
                            <Input placeholder={preparePlaceholderText('Scheme Amount')} maxLength={50} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'KM'} name="km" className={styles?.datePicker}>
                            <Input placeholder={preparePlaceholderText('KM')} maxLength={50} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Customer Expected Price'} name="customerExpectedPrice" className={styles?.datePicker}>
                            <Input placeholder={preparePlaceholderText('Customer Expected Price')} maxLength={50} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="procurementPrice" label={'Procurement Price'}>
                            <Input placeholder={preparePlaceholderText('Procurement Price')} disabled={true}/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="financeCompany" label={'Finance Company'}>
                            <Input placeholder={preparePlaceholderText('Finance Company')} disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
