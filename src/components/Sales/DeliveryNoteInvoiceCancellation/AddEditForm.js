/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, Typography, Divider } from 'antd';

import { withDrawer } from 'components/withDrawer';
import { RequestDetailsForm } from './RequestDetailsForm';
import { DeliveryNoteInvoiceForm } from './DeliveryNoteInvoiceForm';
import { InvoiceDetailsForm } from './InvoiceDetailsForm';
import { REQUEST_TYPE_CONSTANT } from './utils/RequestTypeConstant';
import { formattedCalendarDate } from 'utils/formatDateTime';
import { PARAM_MASTER } from 'constants/paramMaster';

import { VehicleDetailsForm } from './VehicleDetailsForm';
import { InvoiceCancellationButtons } from './InvoiceCancellationButtons';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { typeData, form, isDetailLoaded, requestDetailData, invoiceStatusType } = props;
    useEffect(() => {
        if (isDetailLoaded && requestDetailData) {
            form.setFieldsValue({
                ...requestDetailData,
                requestType: typeData[PARAM_MASTER?.DEL_INV_CAN_TYP?.id]?.find((request) => requestDetailData?.requestType === request?.key)?.value,
                invoiceStatus: typeData[PARAM_MASTER?.INV_DEL_NOT_REQ_TYP?.id]?.find((status) => requestDetailData?.invoiceStatus === status?.key)?.value,
                requestStatus: typeData[PARAM_MASTER?.CDLR_INV_APP_STATUS?.id]?.find((reqStatus) => requestDetailData?.requestStatus === reqStatus?.key)?.value,
                requestDate: formattedCalendarDate(requestDetailData?.requestDate),
                invoiceDate: formattedCalendarDate(requestDetailData?.invoiceDate),
                deliveryNoteDate: formattedCalendarDate(requestDetailData?.deliveryNoteDate),
                cancelDate: formattedCalendarDate(requestDetailData?.cancelDate),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDetailLoaded, requestDetailData]);

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
                        {requestDetailData?.requestType === REQUEST_TYPE_CONSTANT?.invoice?.key && (
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Row>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Text strong>Invoice Details</Text>
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <InvoiceDetailsForm {...requestDetailFormProps} />
                                </Col>
                            </Row>
                        )}

                        {requestDetailData?.requestType === REQUEST_TYPE_CONSTANT?.delivery?.key && (
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
                        )}

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
