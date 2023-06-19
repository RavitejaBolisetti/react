import { combineReducers } from 'redux';

import { InvoiceDetail } from './invoiceDetails';
import { FinanceDetail } from './financeDetail';
import { OtfDetails } from './otfDetails';

export const OTF = combineReducers({
    InvoiceDetail,
    FinanceDetail,
    OtfDetails,
});
