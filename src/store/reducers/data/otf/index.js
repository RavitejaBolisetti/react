import { combineReducers } from 'redux';

import { InvoiceDetail } from './invoiceDetail';
import { FinanceDetail } from './financeDetail';
import { OtfDetails } from './otfDetails';
import { FinanceLov } from './financeLov';

export const OTF = combineReducers({
    InvoiceDetail,
    FinanceDetail,
    OtfDetails,
    FinanceLov,
});
