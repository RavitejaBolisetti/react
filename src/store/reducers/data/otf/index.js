import { combineReducers } from 'redux';

import { InvoiceDetail } from './invoiceDetails';
import { LoyaltyScheme } from './loyaltyAndScheme';
export const OTF = combineReducers({
    InvoiceDetail,
    LoyaltyScheme,
});
