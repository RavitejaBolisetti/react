/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { MakeVehicleDetails } from './makeDetails';
import { ModelVehicleDetails } from './modelDetails';
import { VariantVehicleDetails } from './variantDetails';
import { VehicleDetail } from './vehicleDetail';
import { ViewVehicleDetail } from './viewVehicleDetails';

export const Vehicle = combineReducers({
    MakeVehicleDetails,
    ModelVehicleDetails,
    VariantVehicleDetails,
    VehicleDetail,
    ViewVehicleDetail,
});
