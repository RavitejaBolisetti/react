/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { InvoiceDetail } from './invoiceDetail';
import { FinanceDetail } from './financeDetail';
import { OtfDetails } from './otfDetails';
import { InsuranceDetail } from './insuranceDetail';
import { OtfSearchList } from './otfSearch';
import { FinanceLov } from './financeLov';
import { ExchangeVehicle } from './exchangeVehicle';
import { SchemeDetail } from './schemeDetail';

export const OTF = combineReducers({
    InvoiceDetail,
    FinanceDetail,
    OtfDetails,
    InsuranceDetail,
    OtfSearchList,
    FinanceLov,
    ExchangeVehicle,
    SchemeDetail
});
