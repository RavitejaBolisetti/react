/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { VEHICLE_DELIVERY_NOTE_SECTION } from 'constants/vehicleDeliveryNoteSection';

import { LeftSidebar } from './LeftSidebar';
import { InvoiceDetailsMaster } from './InvoiceDetails';
import { CustomerDetailsMaster } from './CustomerDetails';
import { VehicleDetailsMaster } from './VehicleDetails';

import { InsuranceDetailsMaster } from './InsuranceDetails';
import { FinananceDetailsMaster } from './FinananceDetails';

import { AddOnDetailsMaster } from './AddOnDetails';
import { DeliverableChecklistMaster } from './DeliverableChecklist';
import { VehicleDeliveryNoteFormButton } from './VehicleDeliveryNoteFormButton';
import { ThankYouMaster } from './ThankYou';
import styles from 'assets/sass/app.module.scss';

const VehicleDeliveryNoteConatinerMain = (props) => {
    const { currentSection, selectedOtfNumber, selectedOrderId, soldByDealer } = props;
    const { requestPayload, setRequestPayload } = props;

    const onFinishCustom = ({ key, values }) => {
        setRequestPayload({ ...requestPayload, [key]: values });
    };
    const requestData = requestPayload;
    const invoiceDataPayload = soldByDealer ? requestData?.deliveryNoteInvoiveDetails : requestData?.engineDetailDto;
    const myProps = {
        ...props,
        FormActionButton: VehicleDeliveryNoteFormButton,
        onFinishCustom,
        selectedOrderId: selectedOtfNumber,
        selectedInvoiceId: selectedOrderId,
    };

    const renderElement = () => {
        switch (currentSection) {
            case VEHICLE_DELIVERY_NOTE_SECTION.INVOICE_DETAILS.id: {
                return <InvoiceDetailsMaster {...myProps} invoiceData={invoiceDataPayload} />;
            }
            case VEHICLE_DELIVERY_NOTE_SECTION.CUSTOMER_DETAILS.id: {
                return <CustomerDetailsMaster {...myProps} customerDetailsData={requestData?.customerDetails} />;
            }
            case VEHICLE_DELIVERY_NOTE_SECTION.VEHICLE_DETAILS.id: {
                return <VehicleDetailsMaster {...myProps} vehicleData={soldByDealer ? requestData?.vehicleDetails : requestData?.vehicleInformationDto} />;
            }
            case VEHICLE_DELIVERY_NOTE_SECTION.FINANCE_DETAILS.id: {
                return <FinananceDetailsMaster {...myProps} formKey={'financeDetails'} financeData={requestData?.financeDetails} />;
            }
            case VEHICLE_DELIVERY_NOTE_SECTION.INSURANCE_DETAILS.id: {
                return <InsuranceDetailsMaster {...myProps} formKey={'insuranceDetails'} insuranceData={requestData?.insuranceDetails} />;
            }
            case VEHICLE_DELIVERY_NOTE_SECTION.ADD_ON_DETAILS.id: {
                return <AddOnDetailsMaster {...myProps} AddonDetailsData={requestData?.deliveryNoteAddOnDetails} />;
            }
            case VEHICLE_DELIVERY_NOTE_SECTION.DELIVERABLE_CHECKLIST.id: {
                return <DeliverableChecklistMaster {...myProps} />;
            }
            case VEHICLE_DELIVERY_NOTE_SECTION.THANK_YOU_PAGE.id: {
                return <ThankYouMaster {...myProps} />;
            }
            default: {
                return <InvoiceDetailsMaster {...myProps} />;
            }
        }
    };

    return (
        <Row gutter={0}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.drawerBodyLeft}>
                <LeftSidebar {...myProps} />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18} className={styles.drawerRightMainContainer}>
                <div>{renderElement()}</div>
            </Col>
        </Row>
    );
};

export const VehicleDeliveryNoteMainConatiner = withDrawer(VehicleDeliveryNoteConatinerMain, { width: '90%', footer: null });
