/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, Select, Collapse, Typography, Divider } from 'antd';

import { withDrawer } from 'components/withDrawer';
import { RequestDetailsForm } from './RequestDetailsForm';
import { DeliveryNoteInvoiceForm } from './DeliveryNoteInvoiceForm';
import { formattedCalendarDate } from 'utils/formatDateTime';

import { VehicleDetailsForm } from './VehicleDetailsForm';
import { InvoiceCancellationButtons } from './InvoiceCancellationButtons';
import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { typeData, form, isDetailLoaded, requestDetailData, invoiceStatusType } = props;
    useEffect(() => {
        if (isDetailLoaded && requestDetailData) {
            form.setFieldsValue({ ...requestDetailData, requestDate: formattedCalendarDate(requestDetailData?.requestDate), invoiceDate: formattedCalendarDate(requestDetailData?.invoiceDate) });
        }
    }, [isDetailLoaded]);

    const requestDetailFormProps = {
        invoiceStatusType,
        typeData,
    };

    return (
        <>
            <Form autoComplete="off" layout="vertical" form={form}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Text strong>Request Details</Text>
                                    </Col>
                                </Row>
                                <Divider />
                                <RequestDetailsForm {...requestDetailFormProps} />
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Text strong>Delivery Note/Invoice Details</Text>
                                    </Col>
                                </Row>
                                <Divider />

                                <DeliveryNoteInvoiceForm {...requestDetailFormProps} />
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Text strong>Vehicle Details</Text>
                                    </Col>
                                </Row>
                                <Divider />

                                <VehicleDetailsForm />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <InvoiceCancellationButtons {...props} />
            </Form>
        </>
    );
};

const AddEditForm = withDrawer(AddEditFormMain, { width: '90%', footer: null });
export default AddEditForm;