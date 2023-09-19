/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { OTF_SECTION } from 'constants/OTFSection';

import { OtfDetailsMaster } from './OtfDetails';
import { CustomerDetailsMaster } from 'components/Sales/OTF/CustomerDetails';
import { VehicleDetailsMaster } from 'components/Sales/OTF/VehicleDetails';
import { InsuranceDetailsMaster } from 'components/Sales/OTF/InsuranceDetails';

import { SchemeDetailsMaster } from 'components/Sales/Common/SchemeDetails';
import { FinananceDetailsMaster } from 'components/Sales/Common/FinananceDetails';
import { ExchangeVehiclesMaster } from 'components/Sales/Common/ExchangeVehicles';
import { LoyaltySchemeMaster } from 'components/Sales/Common/LoyaltyScheme';
import { ReferralsMaster } from 'components/Sales/Common/Referrals';

// import { OtfDetailsMaster } from './OtfDetails';
// import { CustomerDetailsMaster } from './CustomerDetails';
// import { VehicleDetailsMaster } from './VehicleDetails';
// import { SchemeDetailsMaster } from './SchemeDetails';
// import { InsuranceDetailsMaster } from './InsuranceDetails';
// import { FinananceDetailsMaster } from './FinananceDetails';
// import { ExchangeVehiclesMaster } from './ExchangeVehicles';
// import { LoyaltySchemeMaster } from './LoyaltyScheme';
// import { ReferralsMaster } from './Referrals';

import { AddOnDetailsMaster } from './AddOnDetails';
import { InvoiceDetailsMaster } from './InvoiceDetails';
import { ThankYouMaster } from './ThankYou';

import { LeftSidebar } from './LeftSidebar';
import { OTFFormButton } from './OTFFormButton';
import { OTFStatusBar } from './utils/OTFStatusBar';
import { PAGE_TYPE } from 'components/Sales/VehicleDeliveryNote/utils/pageType';

import styles from 'assets/sass/app.module.scss';

const OTFMainConatinerMain = (props) => {
    const { currentSection } = props;

    const myProps = {
        ...props,
        FormActionButton: OTFFormButton,
        StatusBar: OTFStatusBar,
        pageType: PAGE_TYPE?.OTF_PAGE_TYPE?.key,
    };

    const renderElement = () => {
        switch (currentSection) {
            case OTF_SECTION.OTF_DETAILS.id: {
                return <OtfDetailsMaster {...myProps} />;
            }
            case OTF_SECTION.CUSTOMER_DETAILS.id: {
                return <CustomerDetailsMaster {...myProps} />;
            }
            case OTF_SECTION.VEHICLE_DETAILS.id: {
                return <VehicleDetailsMaster {...myProps} />;
            }
            case OTF_SECTION.SCHEME_AND_OFFER_DETAILS.id: {
                return <SchemeDetailsMaster {...myProps} />;
            }
            case OTF_SECTION.INSURANCE_DETAILS.id: {
                return <InsuranceDetailsMaster {...myProps} />;
            }
            case OTF_SECTION.FINANCE_DETAILS.id: {
                return <FinananceDetailsMaster {...myProps} />;
            }
            case OTF_SECTION.EXCHANGE_VEHICLE.id: {
                return <ExchangeVehiclesMaster {...myProps} />;
            }
            case OTF_SECTION.REFERRALS.id: {
                return <ReferralsMaster {...myProps} />;
            }
            case OTF_SECTION.LOYALTY_SCHEME.id: {
                return <LoyaltySchemeMaster {...myProps} />;
            }
            case OTF_SECTION.INVOICE_INFORMATION.id: {
                return <InvoiceDetailsMaster {...myProps} />;
            }
            case OTF_SECTION.ADDON_DETAIL.id: {
                return <AddOnDetailsMaster {...myProps} />;
            }
            case OTF_SECTION.THANK_YOU_PAGE.id: {
                return <ThankYouMaster {...myProps} />;
            }
            default: {
                return <CustomerDetailsMaster {...myProps} />;
            }
        }
    };

    return (
        <Row gutter={0} data-testid="logRole">
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.drawerBodyLeft}>
                <LeftSidebar {...myProps} />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18} className={styles.drawerRightMainContainer}>
                <div>{renderElement()}</div>
            </Col>
        </Row>
    );
};

export const OTFMainConatiner = withDrawer(OTFMainConatinerMain, { width: '90%', footer: null });
