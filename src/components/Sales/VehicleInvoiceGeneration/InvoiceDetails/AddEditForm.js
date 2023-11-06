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
import { translateContent } from 'utils/translateContent';

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
                    <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end">
                        <Panel header={translateContent('vehicleInvoiceGeneration.heading.collapse.bookingDetails')} key="3">
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
