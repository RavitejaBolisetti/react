/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { VehicleDeliveryNoteSearchList } from './vehicleDeliveryNote';
import { InvoiceDetails } from './invoiceDetails';
import { RelationshipManager } from './relationshipManager';
import { AddOnDetails } from './addOnDetails';
import { CustomerDetailsDeliveryNote } from './customerDetails';
import { VehicleRegistrationNumberSearch } from './vehicleRegistrationNumber';
import { VehicleBatteryDetails } from './vehicleBatteryDetails';
import { CancelDeliveryNote } from './cancelDeliveryNote';
import { SchemeDescription } from './schemeDescription';
import { VinNumberSearch } from './challanVinNumber';

export const VehicleDeliveryNote = combineReducers({
    VehicleDeliveryNoteSearchList,
    InvoiceDetails,
    RelationshipManager,
    AddOnDetails,
    CustomerDetailsDeliveryNote,
    VehicleRegistrationNumberSearch,
    VehicleBatteryDetails,
    CancelDeliveryNote,
    SchemeDescription,
    VinNumberSearch,
});
