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

import styles from 'assets/sass/app.module.scss';

import { InsuranceDetailsMaster } from 'components/Sales/Common/InsuranceDetails';
import { SchemeDetailsMaster } from 'components/Sales/Common/SchemeDetails';
import { VehicleDetailsMaster } from 'components/Sales/Common/VehicleDetails';
import { FinananceDetailsMaster } from 'components/Sales/Common/FinananceDetails';
import { ReferralsMaster } from 'components/Sales/Common/Referrals';
import { ExchangeVehiclesMaster } from 'components/Sales/Common/ExchangeVehicles';
import { LoyaltySchemeMaster } from 'components/Sales/Common/LoyaltyScheme';

import { InvoiceDetailsMaster } from './InvoiceDetails';

const VehicleInvoiceMainConatinerMain = (props) => {
    const { currentSection, generateIrn } = props;

    const myProps = {
        ...props,
        generateIrn,
    };

    const renderElement = () => {
        switch (currentSection) {
            case VEHICLE_INVOICE_SECTION.INVOICE_DETAILS.id: {
                return <InvoiceDetailsMaster {...myProps} />;
            }
            case VEHICLE_INVOICE_SECTION.VEHICLE_DETAILS.id: {
                return <VehicleDetailsMaster {...myProps} />;
            }
            case VEHICLE_INVOICE_SECTION.SCHEME_OFFER_DETAILS.id: {
                return <SchemeDetailsMaster {...myProps} />;
            }
            case VEHICLE_INVOICE_SECTION.FINANACE_DETAILS.id: {
                return <FinananceDetailsMaster {...myProps} />;
            }
            case VEHICLE_INVOICE_SECTION.INSURANCE_DETAILS.id: {
                return <InsuranceDetailsMaster {...myProps} />;
            }
            case VEHICLE_INVOICE_SECTION.EXCHANGE_DETAILS.id: {
                return <ExchangeVehiclesMaster {...myProps} />;
            }
            case VEHICLE_INVOICE_SECTION.LOYALTY_SCHEME.id: {
                return <LoyaltySchemeMaster {...myProps} />;
            }
            case VEHICLE_INVOICE_SECTION.REFERRALS.id: {
                return <ReferralsMaster {...myProps} />;
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
