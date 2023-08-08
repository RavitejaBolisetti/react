/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { combineReducers } from 'redux';

import { SupportingDocument } from './SupportingDocument';

import { VehicleReceiptMain } from './VehicleReceiptChecklistMain';

export const VehicleReceiptChecklist = combineReducers({
    SupportingDocument,
    VehicleReceiptMain,
});
