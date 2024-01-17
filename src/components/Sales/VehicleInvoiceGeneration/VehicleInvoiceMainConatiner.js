/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { VEHICLE_INVOICE_SECTION } from 'constants/VehicleInvoiceSection';

import LeftSidebar from 'utils/LeftSidebar';
import { InvoiceDetailsMaster } from './InvoiceDetails';

import { InsuranceDetailsMaster } from 'components/Sales/VehicleInvoiceGeneration/InsuranceDetails';
import { VehicleDetailsMaster } from 'components/Sales/Common/VehicleDetails';
import { SchemeDetailsMaster } from 'components/Sales/VehicleInvoiceGeneration/SchemeDetails';
import { FinananceDetailsMaster } from 'components/Sales/VehicleInvoiceGeneration/FinananceDetails';
import { ExchangeVehiclesMaster } from 'components/Sales/Common/ExchangeVehicles';
import { LoyaltySchemeMaster } from 'components/Sales/Common/LoyaltyScheme';
import { ReferralsMaster } from 'components/Sales/Common/Referrals';
import { ThankYouMaster } from 'components/Sales/VehicleInvoiceGeneration/ThankYou';

import { VehicleInvoiceFormButton } from './VehicleInvoiceFormButton';

import styles from 'assets/sass/app.module.scss';
import { SALES_MODULE_TYPE } from 'constants/salesModuleType';

const VehicleInvoiceMainConatinerMain = (props) => {
    const { currentSection, handleIRNGeneration, selectedOtfNumber, requestPayload, setRequestPayload, selectedOtfId, profileCardData } = props;
    const formData = { selectedRecordId: selectedOtfId, modelCode: requestPayload?.vehicleDetails?.modelCode, viewOnly: true };
    const onFinishCustom = ({ key, values }) => {
        setRequestPayload({ ...requestPayload, [key]: values });
    };

    const myProps = {
        ...props,
        ...formData,
        wrapForm: false,
        salesModuleType: SALES_MODULE_TYPE.INVOICE.KEY,
        handleIRNGeneration,
        onFinishCustom,
        selectedOrderId: selectedOtfNumber,
        FormActionButton: VehicleInvoiceFormButton,
        vehicleInvoiceMasterData: requestPayload,
        otfData: { ...profileCardData },
    };
    const renderElement = () => {
        switch (currentSection) {
            case VEHICLE_INVOICE_SECTION.INVOICE_DETAILS.id: {
                return <InvoiceDetailsMaster {...myProps} />;
            }
            case VEHICLE_INVOICE_SECTION.VEHICLE_DETAILS.id: {
                return <VehicleDetailsMaster {...myProps} selectedRecordId={selectedOtfId} showPrintDiscount={true} salesModuleType={SALES_MODULE_TYPE.INVOICE.KEY} vehicleDetailDataPass={requestPayload?.vehicleDetails} formKey={'vehicleDetails'} />;
            }
            case VEHICLE_INVOICE_SECTION.SCHEME_OFFER_DETAILS.id: {
                return <SchemeDetailsMaster {...myProps} formData={requestPayload?.schemeOfferDetails} formKey={'schemeOfferDetails'} />;
            }
            case VEHICLE_INVOICE_SECTION.FINANACE_DETAILS.id: {
                return <FinananceDetailsMaster {...myProps} formData={requestPayload?.financeDetails} formKey={'financeDetails'} />;
            }
            case VEHICLE_INVOICE_SECTION.INSURANCE_DETAILS.id: {
                return <InsuranceDetailsMaster {...myProps} selectedRecordId={selectedOtfId} formData={requestPayload?.insuranceDetails} formKey={'insuranceDetails'} />;
            }
            case VEHICLE_INVOICE_SECTION.EXCHANGE_DETAILS.id: {
                return <ExchangeVehiclesMaster {...myProps} exchangeDataPass={requestPayload?.exchangeDetails} formKey={'exchangeDetails'} />;
            }
            case VEHICLE_INVOICE_SECTION.LOYALTY_SCHEME.id: {
                return <LoyaltySchemeMaster {...myProps} loyaltySchemeDataPass={requestPayload?.loyaltyScheme} formKey={'loyaltyScheme'} />;
            }
            case VEHICLE_INVOICE_SECTION.REFERRALS.id: {
                return <ReferralsMaster {...myProps} referralDataPass={requestPayload?.referrals} formKey={'referrals'} />;
            }
            case VEHICLE_INVOICE_SECTION.THANK_YOU_PAGE.id: {
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

export const VehicleInvoiceMainConatiner = withDrawer(VehicleInvoiceMainConatinerMain, { width: '90%', footer: null });
