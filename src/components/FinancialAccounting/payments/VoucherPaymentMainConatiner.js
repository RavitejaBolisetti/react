/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { VOUCHER_PAYMENT_SECTION } from 'constants/VoucherPaymentSection';

import LeftSidebar from 'utils/LeftSidebar';
import PaymentDetailsMaster from './PaymentDetails';
import PartyDetailsMaster from './PartyDetails';
import ApportionDetailsMaster from './ApportionDetails';
// import { InsuranceDetailsMaster } from 'components/Sales/VehicleInvoiceGeneration/InsuranceDetails';
// import { VehicleDetailsMaster } from 'components/Sales/Common/VehicleDetails';
// import { SchemeDetailsMaster } from 'components/Sales/VehicleInvoiceGeneration/SchemeDetails';
// import { FinananceDetailsMaster } from 'components/Sales/VehicleInvoiceGeneration/FinananceDetails';
// import { ExchangeVehiclesMaster } from 'components/Sales/Common/ExchangeVehicles';
// import { LoyaltySchemeMaster } from 'components/Sales/Common/LoyaltyScheme';
// import { ReferralsMaster } from 'components/Sales/Common/Referrals';
// import { ThankYouMaster } from 'components/Sales/VehicleInvoiceGeneration/ThankYou';

import { VehicleInvoiceFormButton } from './VehicleInvoiceFormButton';


import styles from 'assets/sass/app.module.scss';
import { SALES_MODULE_TYPE } from 'constants/salesModuleType';

const PaymentMainConatinerMain = (props) => {
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
            case VOUCHER_PAYMENT_SECTION.INVOICE_DETAILS.id: {
                return <PaymentDetailsMaster {...myProps} />;
            }
            case VOUCHER_PAYMENT_SECTION.PARTY_DETAILS.id: {
                 return <PartyDetailsMaster {...myProps} />;
            }
            case VOUCHER_PAYMENT_SECTION.APPORTION_DETAILS.id: {
                return <ApportionDetailsMaster {...myProps} />;
           }
            // case VOUCHER_PAYMENT_SECTION.SCHEME_OFFER_DETAILS.id: {
            //     return <SchemeDetailsMaster {...myProps} formData={requestPayload?.schemeOfferDetails} formKey={'schemeOfferDetails'} />;
            // }
            // case VOUCHER_PAYMENT_SECTION.FINANACE_DETAILS.id: {
            //     return <FinananceDetailsMaster {...myProps} formData={requestPayload?.financeDetails} formKey={'financeDetails'} />;
            // }
            // case VOUCHER_PAYMENT_SECTION.INSURANCE_DETAILS.id: {
            //     return <InsuranceDetailsMaster {...myProps} selectedRecordId={selectedOtfId} formData={requestPayload?.insuranceDetails} formKey={'insuranceDetails'} />;
            // }
            // case VOUCHER_PAYMENT_SECTION.EXCHANGE_DETAILS.id: {
            //     return <ExchangeVehiclesMaster {...myProps} exchangeDataPass={requestPayload?.exchangeDetails} formKey={'exchangeDetails'} />;
            // }
            // case VOUCHER_PAYMENT_SECTION.LOYALTY_SCHEME.id: {
            //     return <LoyaltySchemeMaster {...myProps} loyaltySchemeDataPass={requestPayload?.loyaltyScheme} formKey={'loyaltyScheme'} />;
            // }
            // case VOUCHER_PAYMENT_SECTION.REFERRALS.id: {
            //     return <ReferralsMaster {...myProps} referralDataPass={requestPayload?.referrals} formKey={'referrals'} />;
            // }
            // case VOUCHER_PAYMENT_SECTION.THANK_YOU_PAGE.id: {
            //     return <ThankYouMaster {...myProps} />;
            // }
            default: {
                return <PaymentDetailsMaster {...myProps} />;
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

export const PaymentMainConatiner = withDrawer(PaymentMainConatinerMain, { width: '90%', footer: null });
