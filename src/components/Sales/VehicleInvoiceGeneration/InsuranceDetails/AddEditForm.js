/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Card, DatePicker, Space } from 'antd';

import { disableFutureDate } from 'utils/disableDate';
import { dateFormat } from 'utils/formatDateTime';
import { validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';

const AddEditFormMain = (props) => {
    const { formData } = props;

    // useEffect(() => {
    //     setDoReceived(formData?.doReceived || 'N');
    //     formData && form.setFieldsValue({ ...formData, doDate: formattedCalendarDate(formData?.doDate) });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [formData]);

    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.branch} label="Insurance Company" name="insuranceCompany">
                                            <Input placeholder={preparePlaceholderText('insurance company')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.fileNumber} label="Insurance Cover Note" name="coverNote">
                                            <Input placeholder={preparePlaceholderText('Insurance Cover Note')} maxLength={30} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.fileNumber} label="Insurance Amount" name="insuranceAmount">
                                            <Input placeholder={preparePlaceholderText('Insurance Amount')} maxLength={30} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Date" name="date">
                                            <DatePicker format={dateFormat} disabledDate={disableFutureDate} placeholder={preparePlaceholderSelect('date')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.registrationNumber} label="Registration Number" name="registrationNumber" rules={[validateNumberWithTwoDecimalPlaces('Registration Number')]}>
                                            <Input placeholder={preparePlaceholderText('Registration Number')} maxLength={10} disabled={true} />
                                        </Form.Item>
                                    </Col>
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
