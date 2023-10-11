/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { VehicleDeliveryNoteSearchList } from './vehicleDeliveryNote';
import { RelationshipManager } from './relationshipManager';
import { CustomerDetailsDeliveryNote } from './customerDetails';
import { VehicleDetailsChallan } from './vehicleChallanDetails';
import { CancelDeliveryNote } from './cancelDeliveryNote';
import { VinNumberSearch } from './challanVinNumber';

import { DeliverableChecklistMain } from './deliverableChecklistMain';
import { SchemeDescriptionShield } from './fetchSchemeShield';
import { SchemeDescriptionRsa } from './fetchSchemeRsa';
import { SchemeDescriptionAmc } from './fetchSchemeAmc';

export const VehicleDeliveryNote = combineReducers({
    VehicleDeliveryNoteSearchList,
    RelationshipManager,
    CustomerDetailsDeliveryNote,
     VehicleDetailsChallan,
    CancelDeliveryNote,
    VinNumberSearch,
    DeliverableChecklistMain,
    SchemeDescriptionShield,
    SchemeDescriptionRsa,
    SchemeDescriptionAmc,
});
