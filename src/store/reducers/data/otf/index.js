import { combineReducers } from 'redux';

import { FinanceDetail } from './financeDetail';
import { InvoiceDetail } from './invoiceDetail';

export const OTF = combineReducers({
    FinanceDetail,
    InvoiceDetail,
});
