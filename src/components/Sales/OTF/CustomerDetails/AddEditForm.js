/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Checkbox, Space, Collapse, Typography, AutoComplete } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { AddressCommonForm } from './AddressCommonForm';

import styles from 'components/common/Common.module.css';

const { Text } = Typography;
const { Panel } = Collapse;

const AddEditFormBase = (props) => {
    const { form, billCstmForm, formData, customerFormData, setSameAsBookingCustomer } = props;
    const { typeData } = props;
    const [activeKey, setactiveKey] = useState([1]);

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const bilingCustomerProps = {
        ...props,
        AutoComplete,
        typeData,
        formData: formData?.billingCustomer,
        formType: 'billingCustomer',
    };

    const bookingCustomerProps = {
        ...props,
        AutoComplete,
        typeData,
        formData: formData?.bookingCustomer,
        formType: 'bookingCustomer',
    };

    const handleOnChange = (vall) => {
        if (vall.target.checked) {
            setSameAsBookingCustomer(true);
            billCstmForm.setFieldsValue(form.getFieldsValue());
        } else setSameAsBookingCustomer(false);
    };

    const handleDataSet = () => {
        form.setFieldsValue(customerFormData.bookingCustomer);
        billCstmForm.setFieldsValue(customerFormData.billingCustomer);
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                    <Collapse
                        expandIcon={() => {
                            if (activeKey.includes(1)) {
                                return (
                                    <>
                                        <FiEdit onClick={handleDataSet} />
                                        <span>Edit</span>
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        <FiEdit />
                                        <span>Edit</span>
                                    </>
                                );
                            }
                        }}
                        activeKey={activeKey}
                        onChange={() => onChange(1)}
                        expandIconPosition="end"
                    >
                        <Panel
                            header={
                                <div className={styles.alignUser}>
                                    <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                        Booking Customer
                                    </Text>
                                </div>
                            }
                            key="1"
                        >
                            <AddressCommonForm key="3" {...bookingCustomerProps} isBillingCustmrForm={false} />
                        </Panel>
                    </Collapse>
                    <Collapse
                        expandIcon={() => {
                            if (activeKey.includes(2)) {
                                return (
                                    <>
                                        <FiEdit />
                                        <span>Edit</span>
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        <FiEdit />
                                        <span>Edit</span>
                                    </>
                                );
                            }
                        }}
                        activeKey={activeKey}
                        onChange={() => onChange(2)}
                        expandIconPosition="end"
                    >
                        <Panel
                            header={
                                <div className={styles.alignUser}>
                                    <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                        Billing Customer
                                    </Text>
                                </div>
                            }
                            key="2"
                        >
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Checkbox valuePropName="checked" style={{ margin: '5px 0px 15px 0px' }} onClick={handleOnChange} name="sameAsBookingCustomer">
                                        Same as Booking Customer
                                    </Checkbox>
                                </Col>
                            </Row>
                            <AddressCommonForm key="4" {...bilingCustomerProps} isBillingCustmrForm={true} />
                        </Panel>
                    </Collapse>
                </Space>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormBase;
