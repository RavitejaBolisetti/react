/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { RSMApproval } from './rsmApproval';
import { RSMApprovalSearch } from './rsmApprovalSearch';
import { RSARegistration } from './rsaRegistration';
import { DeliveryNoteInvoice } from './deliveryNoteInvoiceCancellation';
import { VehicleTracking } from './vehicleTracking';
import { VehicleInvoiceGeneration } from './vehicleInvoiceGeneration';

export const Sales = combineReducers({
    RSMApproval,
    RSMApprovalSearch,
    DeliveryNoteInvoice,
    VehicleTracking,
    VehicleInvoiceGeneration,
    RSARegistration,
});
