import { combineReducers } from 'redux';

import { InvoiceDetail } from './invoiceDetail';
import { FinanceDetail } from './financeDetail';
import { OtfDetails } from './otfDetails';
import { VehicleDetails } from './vehicleDetails';
export const OTF = combineReducers({
    InvoiceDetail,
    FinanceDetail,
    OtfDetails,
    VehicleDetails,
});
