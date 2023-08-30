/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Row, Space, Collapse, AutoComplete, Divider } from 'antd';

import { FiEdit } from 'react-icons/fi';
import { AddressCommonForm } from './AddressCommonForm';
import { formattedCalendarDate } from 'utils/formatDateTime';

import { expandIconWithText } from 'utils/accordianExpandIcon';
const { Panel } = Collapse;

const AddEditFormBase = (props) => {
    const { form, formData, sameAsBookingCustomer, setSameAsBookingCustomer } = props;
    const { typeData, activeKey, setActiveKey } = props;

    useEffect(() => {
        if (formData) {
            form?.setFieldsValue({
                ...formData,
                bookingCustomer: { ...formData?.bookingCustomer, birthDate: formattedCalendarDate(formData?.bookingCustomer?.birthDate) },
                billingCustomer: { ...formData?.billingCustomer, birthDate: formattedCalendarDate(formData?.billingCustomer?.birthDate) },
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

    const handleOnChange = (e) => {
        if (e.target.checked) {
            setSameAsBookingCustomer(true);
            let bookingCustomer = form?.getFieldsValue()?.bookingCustomer;
            form?.setFieldsValue({ billingCustomer: { ...bookingCustomer } });
        } else {
            setSameAsBookingCustomer(false);
        }
    };

    const bookingCustomerProps = {
        ...props,
        AutoComplete,
        typeData,
        formData: formData?.bookingCustomer,
        formType: 'bookingCustomer',
        handleOnChange: () => {},
    };

    const bilingCustomerProps = {
        ...props,
        AutoComplete,
        typeData,
        formData: formData?.billingCustomer,
        formType: 'billingCustomer',
        disabledProps: { disabled: sameAsBookingCustomer },
        handleOnChange,
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                    <Panel header="Booking Customer" key="1">
                        <Divider />
                        <AddressCommonForm key="3" {...bookingCustomerProps} isBillingCustmrForm={false} />
                    </Panel>
                </Collapse>
                <Collapse collapsible="icon" expandIcon={({ isActive }) => expandIconWithText(isActive, <FiEdit />, <FiEdit style={{ color: '#B5B5B6' }} />)} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                    <Panel header="Billing Customer" key="2">
                        <Divider />
                        <AddressCommonForm key="4" {...bilingCustomerProps} isBillingCustmrForm={true} />
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormBase;
