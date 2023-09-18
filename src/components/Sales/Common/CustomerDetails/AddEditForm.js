/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Row, Collapse, AutoComplete, Divider } from 'antd';

import { AddressCommonForm } from './AddressCommonForm';
import { formattedCalendarDate } from 'utils/formatDateTime';

import { expandActionIcon } from 'utils/accordianExpandIcon';
import { VehicleCustomerSearch } from '../../VehicleDetail/CustomerDetails/VehicleCustomerSearch';

const { Panel } = Collapse;

const AddEditFormBase = (props) => {
    const { form, formData, sameAsBookingCustomer, setSameAsBookingCustomer } = props;
    const { typeData, activeKey, setActiveKey, formActionType, fnSetData } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOnChange = (e) => {
        if (e.target.checked) {
            setSameAsBookingCustomer(true);
            let bookingCustomer = formData?.bookingCustomer;
            form?.setFieldsValue({ billingCustomer: { ...bookingCustomer } });
        } else {
            setSameAsBookingCustomer(false);
            form?.resetFields();
            form?.setFieldsValue({ billingCustomer: null });
        }
    };

    const bookingCustomerProps = {
        ...props,
        AutoComplete,
        typeData,
        formData: formData?.bookingCustomer,
        formType: 'bookingCustomer',
        handleOnChange: () => {},
        fnSetData: (data) => fnSetData(data, 'bookingCustomer'),
    };

    const bilingCustomerProps = {
        ...props,
        AutoComplete,
        typeData,
        formData: formData?.billingCustomer,
        formType: 'billingCustomer',
        disabledProps: { disabled: sameAsBookingCustomer },
        handleOnChange,
        fnSetData: (data) => fnSetData(data, 'billingCustomer'),
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
                    <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                        <Panel header="Booking Customer" key="1">
                            <Divider />
                            <AddressCommonForm key="3" {...bookingCustomerProps} isBillingCustmrForm={false} />
                        </Panel>
                    </Collapse>
                    <Collapse collapsible="icon" expandIcon={({ isActive }) => expandActionIcon(isActive, formActionType)} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
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
