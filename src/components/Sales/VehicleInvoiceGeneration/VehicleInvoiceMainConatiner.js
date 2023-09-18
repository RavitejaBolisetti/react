/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { VEHICLE_INVOICE_SECTION } from 'constants/VehicleInvoiceSection';

import { LeftSidebar } from './LeftSidebar';
import { InvoiceDetailsMaster } from './InvoiceDetails';
import { InsuranceDetailsMaster } from 'components/Sales/Common/InsuranceDetails';
import { SchemeDetailsMaster } from 'components/Sales/Common/SchemeDetails';
import { VehicleDetailsMaster } from 'components/Sales/VehicleInvoiceGeneration/VehicleDetails';
import { FinananceDetailsMaster } from 'components/Sales/Common/FinananceDetails';
import { ReferralsMaster } from 'components/Sales/Common/Referrals';
import { ExchangeVehiclesMaster } from 'components/Sales/Common/ExchangeVehicles';
import { LoyaltySchemeMaster } from 'components/Sales/Common/LoyaltyScheme';

import { VehicleInvoiceFormButton } from './VehicleInvoiceFormButton';

import styles from 'assets/sass/app.module.scss';

const VehicleInvoiceMainConatinerMain = (props) => {
    const { currentSection, handleIRNGeneration, selectedOtfNumber, requestPayload, setRequestPayload } = props;

    const onFinishCustom = ({ key, values }) => {
        setRequestPayload({ ...requestPayload, [key]: values });
    };

    const myProps = {
        ...props,
        wrapForm: false,
        handleIRNGeneration,
        onFinishCustom,
        selectedOrderId: selectedOtfNumber,
        FormActionButton: VehicleInvoiceFormButton,
    };

    const renderElement = () => {
        switch (currentSection) {
            case VEHICLE_INVOICE_SECTION.INVOICE_DETAILS.id: {
                return <InvoiceDetailsMaster {...myProps} />;
            }
            case VEHICLE_INVOICE_SECTION.VEHICLE_DETAILS.id: {
                return <VehicleDetailsMaster {...myProps} formKey={'vehicleDetails'} />;
            }
            case VEHICLE_INVOICE_SECTION.SCHEME_OFFER_DETAILS.id: {
                return <SchemeDetailsMaster {...myProps} formKey={'schemeOfferDetails'} />;
            }
            case VEHICLE_INVOICE_SECTION.FINANACE_DETAILS.id: {
                return <FinananceDetailsMaster {...myProps} formKey={'financeDetails'} />;
            }
            case VEHICLE_INVOICE_SECTION.INSURANCE_DETAILS.id: {
                return <InsuranceDetailsMaster {...myProps} formKey={'insuranceDetails'} />;
            }
            case VEHICLE_INVOICE_SECTION.EXCHANGE_DETAILS.id: {
                return <ExchangeVehiclesMaster {...myProps} formKey={'exchangeDetails'} />;
            }
            case VEHICLE_INVOICE_SECTION.LOYALTY_SCHEME.id: {
                return <LoyaltySchemeMaster {...myProps} formKey={'loyaltyScheme'} />;
            }
            case VEHICLE_INVOICE_SECTION.REFERRALS.id: {
                return <ReferralsMaster {...myProps} formKey={'referrals'} />;
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

export const VehicleInvoiceMainConatiner = withDrawer(VehicleInvoiceMainConatinerMain, { width: '90%', footer: null });
