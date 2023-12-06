/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { OTF_SECTION } from 'constants/OTFSection';

import { OtfDetailsMaster } from 'components/Sales/OTF/OtfDetails';
import { CustomerDetailsMaster } from 'components/Sales/OTF/CustomerDetails';
import { VehicleDetailsMaster } from 'components/Sales/Common/VehicleDetails';
import { SchemeDetailsMaster } from 'components/Sales/OTF/SchemeDetails';
import { FinananceDetailsMaster } from 'components/Sales/OTF/FinananceDetails';
import { InsuranceDetailsMaster } from 'components/Sales/OTF/InsuranceDetails';
import { ExchangeVehiclesMaster } from 'components/Sales/Common/ExchangeVehicles';
import { LoyaltySchemeMaster } from 'components/Sales/Common/LoyaltyScheme';

import { ReferralsMaster } from 'components/Sales/Common/Referrals';
import { AddOnDetailsMaster } from 'components/Sales/OTF/AddOnDetails';
import { InvoiceDetailsMaster } from 'components/Sales/OTF/InvoiceDetails';

import { ThankYouMaster } from 'components/Sales/OTF/ThankYou';

import LeftSidebar from 'utils/LeftSidebar';
import { OTFFormButton } from './OTFFormButton';
import { OTFStatusBar } from './utils/OTFStatusBar';
import { PAGE_TYPE } from 'components/Sales/VehicleDeliveryNote/utils/pageType';

import styles from 'assets/sass/app.module.scss';
import { SALES_MODULE_TYPE } from 'constants/salesModuleType';

const OTFMainConatinerMain = (props) => {
    const { currentSection } = props;
    const [workFlowDetails, setWorkFlowDetails] = useState({});

    const myProps = {
        ...props,
        salesModuleType: SALES_MODULE_TYPE.OTF.KEY,
        FormActionButton: OTFFormButton,
        StatusBar: OTFStatusBar,
        pageType: PAGE_TYPE?.OTF_PAGE_TYPE?.key,
        workFlowDetails,
        setWorkFlowDetails,
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
