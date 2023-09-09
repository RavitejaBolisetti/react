/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Collapse, Divider, Space } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';

import { convertDateToCalender } from 'utils/formatDateTime';
import OtfDetailsForm from './OtfDetailsForm';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, otfFormData, typeData, setSameAsBookingCustomer, sameAsBookingCustomer, invoiceDetailForm } = props;
    const { activeKey, setActiveKey, formActionType: { editMode } = undefined } = props;
    const [corporateType, setCorporateType] = useState('');

    useEffect(() => {
        if (formData) {
            invoiceDetailForm?.setFieldsValue({
                ...formData,
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

    const handleOnChange = (e) => {
        if (e.target.checked) {
            setSameAsBookingCustomer(true);
            let bookingCustomer = invoiceDetailForm?.getFieldsValue()?.bookingCustomer;
            invoiceDetailForm?.setFieldsValue({ billingCustomer: { ...bookingCustomer } });
        } else {
            setSameAsBookingCustomer(false);
        }
    };

    // const bookingCustomerProps = {
    //     ...props,
    //     AutoComplete,
    //     typeData,
    //     formData: formData?.bookingCustomer,
    //     formType: 'bookingCustomer',
    //     handleOnChange: () => {},
    // };

    // const bilingCustomerProps = {
    //     ...props,
    //     AutoComplete,
    //     typeData,
    //     formData: formData?.billingCustomer,
    //     formType: 'billingCustomer',
    //     disabledProps: { disabled: sameAsBookingCustomer },
    //     handleOnChange,
    // };
    // const handleSave = () => {};

    // const onFinishFailed = () => {};

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                    <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end">
                        <Panel header="OTF Details" key="3">
                            <Divider />
                            <OtfDetailsForm {...props} />
                        </Panel>
                    </Collapse>
                </Space>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
