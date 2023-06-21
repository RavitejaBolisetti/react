/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { InvoiceDetail } from './invoiceDetail';
import { FinanceDetail } from './financeDetail';
import { OtfDetails } from './otfDetails';
import { FinanceLov } from './financeLov';
import { LoyaltyScheme } from './loyaltyAndScheme';

export const OTF = combineReducers({
    InvoiceDetail,
    FinanceDetail,
    OtfDetails,
    FinanceLov,
    LoyaltyScheme,
});
