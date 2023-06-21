import { combineReducers } from 'redux';

import { InvoiceDetail } from './invoiceDetail';
import { FinanceDetail } from './financeDetail';
import { OtfDetails } from './otfDetails';
import { OtfSearchList } from './otfSearch';

export const OTF = combineReducers({
    InvoiceDetail,
    FinanceDetail,
    OtfDetails,
    OtfSearchList,
});
