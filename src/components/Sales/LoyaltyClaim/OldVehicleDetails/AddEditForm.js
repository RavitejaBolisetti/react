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

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                    <Card style={{ backgroundColor: '#f2f2f2' }}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item initialValue={formData?.invoiceDate} label={'Title'} name="title" className={styles?.datePicker}>
                                    {customSelectBox({ data: [{ key: 1, value: 'Mr' }], placeholder: preparePlaceholderSelect('Title' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect, disabled:true  })}
                                </Form.Item>
                            </Col>
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
                                <Form.Item name="lastName" label={'Last Name'}>
                                    <Input placeholder={preparePlaceholderText('Last Name')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>
                           
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="make" label={'Make'} initialValue={formData?.chassisNumber}>
                                    <Input placeholder={preparePlaceholderText('Make')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="modal" label={'Modal'} initialValue={formData?.chassisNumber}>
                                    <Input placeholder={preparePlaceholderText('Modal')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Vehicle Varient'} name="vehicleVarient" className={styles?.datePicker}>
                                    <Input placeholder={preparePlaceholderText('Vehicle Varient')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Chessis No'} name="chessisNo" className={styles?.datePicker}>
                                    <Input placeholder={preparePlaceholderText('Chessis No')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Reg. No'} name="registrationNo" className={styles?.datePicker}>
                                    <Input placeholder={preparePlaceholderText('Reg. No')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Year of Registration'} name="yearOfRegistration" className={styles?.datePicker}>
                                    <DatePicker placeholder={preparePlaceholderSelect('Year of Registration')} format={dateFormat} className={styles.fullWidth} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Month of Registration'} name="monthOfRegistration" className={styles?.datePicker}>
                                    <DatePicker placeholder={preparePlaceholderSelect('Month of Registration')} format={dateFormat} className={styles.fullWidth} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'KM'} name="km" className={styles?.datePicker}>
                                    <Input placeholder={preparePlaceholderText('KM')} maxLength={50} disabled={true} />
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
                           
                        </Row>
                    </Card>
                </Space>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
