/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, Card, Collapse, Divider, Space, Input, DatePicker } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';

import { convertDateToCalender } from 'utils/formatDateTime';
import { customSelectBox } from 'utils/customSelectBox';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';

import OtfDetailsForm from './OtfDetailsForm';
import { translateContent } from 'utils/translateContent';
const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, invoiceDetailForm } = props;
    const { activeKey, setActiveKey } = props;

    useEffect(() => {
        if (formData) {
            invoiceDetailForm?.setFieldsValue({
                formData: formData,
                bookingCustomer: { ...formData?.bookingCustomer, birthDate: convertDateToCalender(formData?.bookingCustomer?.birthDate) },
                billingCustomer: { ...formData?.billingCustomer, birthDate: convertDateToCalender(formData?.billingCustomer?.birthDate) },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                <Card style={{ backgroundColor: '#f2f2f2' }}>
                <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.taxPayableOnReverseCharges} label='Party Segment' >
                                        {customSelectBox({ placeholder: 'Party Segment' })}
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Payment Number">
                                        <Input  placeholder="Payment Number"  />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Payment Address">
                                        <Input value={'108, Greens Medical Centre Plot, Kanpur Rd, Sector B, Bargawan, Lucknow, Uttar Pradesh 226012'} placeholder="" disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="City">
                                        <Input value={'Lucknow'} placeholder="" disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="State">
                                        <Input value={'Uttar Pradesh'} placeholder="" disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Phone">
                                        <Input value={'0522-76121283'} placeholder="" disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Mitra Type">
                                        <Input value={'ABC'} placeholder="" disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            {/* <DrawerFormButton {...buttonProps} /> */}
                        </Card>
              
                </Space>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
