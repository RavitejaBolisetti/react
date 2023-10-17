/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Row, Collapse, AutoComplete, Divider } from 'antd';

import { AddressCommonForm } from './AddressCommonForm';
import { formattedCalendarDate } from 'utils/formatDateTime';

import { expandIcon } from 'utils/accordianExpandIcon';
import { VehicleCustomerSearch } from '../../VehicleDetail/CustomerDetails/VehicleCustomerSearch';

const { Panel } = Collapse;

const AddEditFormBase = (props) => {
    const { form, formData, sameAsBookingCustomer, setSameAsBookingCustomer, viewOnly = false } = props;
    const { typeData, activeKey, setActiveKey, fnSetData, selectedOrderId = '' } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (formData) {
            form?.setFieldsValue({
                bookingCustomer: {
                    ...formData?.bookingCustomer,
                    birthDate: formattedCalendarDate(formData?.bookingCustomer?.birthDate),
                },
                billingCustomer: {
                    ...formData?.billingCustomer,
                    birthDate: formattedCalendarDate(formData?.billingCustomer?.birthDate),
                    sameAsBookingCustomer: formData?.billingCustomer?.sameAsBookingCustomer,
                },
            });

            if (formData?.billingCustomer?.sameAsBookingCustomer) {
                setSameAsBookingCustomer(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData, selectedOrderId]);
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

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOnChange = (e) => {
        let bookingCustomer = form.getFieldsValue()?.bookingCustomer || formData?.bookingCustomer;

        const data = { ...bookingCustomer, birthDate: !form.getFieldsValue()?.bookingCustomer ? formattedCalendarDate(bookingCustomer?.birthDate) : bookingCustomer?.birthDate };
        if (e.target.checked) {
            setSameAsBookingCustomer(true);
            form?.setFieldsValue({ billingCustomer: data, bookingCustomer: data });
        } else {
            setSameAsBookingCustomer(false);
            form?.setFieldsValue({ bookingCustomer: data, billingCustomer: null });
        }
    };

    const bookingCustomerProps = {
        ...props,
        AutoComplete,
        typeData,
        formData: formData?.bookingCustomer,
        formType: 'bookingCustomer',
        handleOnChange: () => {},
        disabledProps: { disabled: viewOnly },
        fnSetData: (data) => fnSetData(data, 'bookingCustomer'),
        viewOnly,
    };

    const bilingCustomerProps = {
        ...props,
        AutoComplete,
        typeData,
        formData: formData?.billingCustomer,
        formType: 'billingCustomer',
        handleOnChange,
        disabledProps: { disabled: sameAsBookingCustomer || viewOnly },
        fnSetData: (data) => fnSetData(data, 'billingCustomer'),
        viewOnly,
    };

    const modalProps = {
        isVisible: isModalOpen,
        titleOverride: 'Customer Search Details',
        closable: false,
        onCloseAction: handleCancel,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                        <Panel header="Booking Customer" key="1">
                            <Divider />
                            <AddressCommonForm key="3" {...bookingCustomerProps} isBillingCustmrForm={false} />
                        </Panel>
                    </Collapse>
                    <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                        <Panel header="Billing Customer" key="2">
                            <Divider />
                            <AddressCommonForm key="4" {...bilingCustomerProps} isBillingCustmrForm={true} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <VehicleCustomerSearch {...modalProps} />
        </>
    );
};

export const AddEditForm = AddEditFormBase;
