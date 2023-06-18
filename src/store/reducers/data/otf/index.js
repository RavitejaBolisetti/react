import { combineReducers } from 'redux';

import { InvoiceDetail } from './invoiceDetails';
import { OtfDetails } from './otfDetails';

export const OTF = combineReducers({
    InvoiceDetail,
    OtfDetails,
});
