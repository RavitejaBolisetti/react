/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { InvoiceDetail } from './invoiceDetail';
import { FinanceDetail } from './financeDetail';
import { OtfCustomerDetails } from './customerDetails';
import { VehicleDetails } from './vehicleDetails';
import { InsuranceDetail } from './insuranceDetail';
import { OtfSearchList } from './otfSearch';
import { salesConsultantLov } from './salesConsultant';
import { OtfCancellation } from './otfCancellation';

import { FinanceLov } from './financeLov';
import { LoyaltyScheme } from './loyaltyAndScheme';
import { Referrals } from './referrals';
import { ExchangeVehicle } from './exchangeVehicle';
import { SchemeDetail } from './schemeDetail';
import { VehicleDetailsLov } from './vehicleDetailsLov';
import { AddonDetails } from './addOnDetails';
import { AddonParts } from './addonParts';

import { OtfSoMapping } from './otfSoMapping';
import { OtfSoUserMapping } from './otfSoUserMapping';

export const OTF = combineReducers({
    InvoiceDetail,
    FinanceDetail,
    OtfCustomerDetails,
    VehicleDetails,
    InsuranceDetail,
    OtfSearchList,
    salesConsultantLov,
    OtfCancellation,
    FinanceLov,
    LoyaltyScheme,
    Referrals,
    ExchangeVehicle,
    SchemeDetail,
    VehicleDetailsLov,
    AddonDetails,
    AddonParts,
    OtfSoMapping,
    OtfSoUserMapping,
});
