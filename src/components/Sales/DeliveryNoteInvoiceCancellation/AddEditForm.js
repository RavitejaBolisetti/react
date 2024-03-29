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
import { getCodeValue } from 'utils/getCodeValue';

import { VehicleDetailsForm } from './VehicleDetailsForm';
import { InvoiceCancellationButtons } from './InvoiceCancellationButtons';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { typeData, form, isDetailLoaded, requestDetailData, invoiceStatusType } = props;
    useEffect(() => {
        if (isDetailLoaded && requestDetailData) {
            form.setFieldsValue({
                ...requestDetailData,
                requestType: typeData[PARAM_MASTER?.DEL_INV_CAN_TYP?.id]?.find((request) => requestDetailData?.requestType === request?.key)?.value,
                invoiceStatus: typeData[PARAM_MASTER?.INVC_STATS?.id]?.find((status) => requestDetailData?.invoiceStatus === status?.key)?.value,
                requestStatus: typeData[PARAM_MASTER?.DEL_NOTE_CANCL_STATS?.id]?.find((reqStatus) => requestDetailData?.requestStatus === reqStatus?.key)?.value,
                requestDate: formattedCalendarDate(requestDetailData?.requestDate),
                invoiceDate: formattedCalendarDate(requestDetailData?.invoiceDate),
                deliveryNoteDate: formattedCalendarDate(requestDetailData?.deliveryNoteDate),
                deliveryNoteStatus: getCodeValue(typeData?.DLVR_NT_STS, requestDetailData?.deliveryNoteStatus),
                cancelDate: formattedCalendarDate(requestDetailData?.cancelDate),
                reasonForCancellation: requestDetailData?.requestType === REQUEST_TYPE_CONSTANT?.INVOICED?.key ? getCodeValue(typeData?.INVOICE_CANCEL_REASON, requestDetailData?.reasonForCancellation) : getCodeValue(typeData?.DLVR_CNCL_RSN, requestDetailData?.reasonForCancellation),
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
                                        <Text strong>{translateContent('deliveryNoteInvoiceCancellation.heading.requestDetailsTitle')}</Text>
                                    </Col>
                                </Row>
                                <Divider />
                                <RequestDetailsForm {...requestDetailFormProps} />
                            </Col>
                        </Row>
                        {requestDetailData?.requestType === REQUEST_TYPE_CONSTANT?.INVOICED?.key && (
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Row>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Text strong>{translateContent('deliveryNoteInvoiceCancellation.heading.invoiceDetailsTitle')}</Text>
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <InvoiceDetailsForm {...requestDetailFormProps} />
                                </Col>
                            </Row>
                        )}

                        {requestDetailData?.requestType === REQUEST_TYPE_CONSTANT?.DELIVERY?.key && (
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Row>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Text strong>{translateContent('deliveryNoteInvoiceCancellation.heading.deliveryNoteTitle')}</Text>
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
                                        <Text strong>{translateContent('deliveryNoteInvoiceCancellation.heading.vehicleDetailsTitle')}</Text>
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
