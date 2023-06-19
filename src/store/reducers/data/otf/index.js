import { combineReducers } from 'redux';

import { InvoiceDetail } from './invoiceDetail';
import { FinanceDetail } from './financeDetail';
import { OtfDetails } from './otfDetails';

export const OTF = combineReducers({
    InvoiceDetail,
    FinanceDetail,
    OtfDetails,
});
