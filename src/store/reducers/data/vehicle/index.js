/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { VehicleDetail } from './vehicleDetail';
import { MakeVehicleDetails } from './makeDetails';
import { ModelVehicleDetails } from './modelDetails';
import { VariantVehicleDetails } from './variantDetails';
import { VehicleDetailDocument } from './vehicleDetailDocument';
import { ViewVehicleDetail } from './viewVehicleDetails';
import { Contacts } from './contacts';
import { EntitelmentDetail } from './entitelmentDetail';
import { CustomerDetails } from './customerDetails';
import { CustomerCommonDetails } from './customerCommonDetails';
import { VehicleSearchList } from './vehicleSearch';
import { ProductDetails } from './productDetails';
import { VehiclePurchaseOrderDetail } from './vehiclePurchaseOrderDetails';
import { ViewVPODetail } from './viewVPODetails';
import { SaveVPODetail } from './vehiclePurchaseOrder';
import { DealerLocationDetail } from './dealerLocation';
import { OnRoadPriceMasterDetails } from './onRoadPriceMasterDetails';

import { ViewOnRoadPriceDetails } from './viewOnRoadPriceDetails';

import { VehicleAllotPriorityDetail } from './vehicleAllotmentPriorityDetails';
import { VehicleAllotPriorDetail } from './vehicleAllotPriorityDetails'; 

import { VinBlockMasterDetails } from './vinBlockMasterDetails';
import { VinBlockDetails } from './vinBlockDetails';


export const Vehicle = combineReducers({
    VehicleDetail,
    MakeVehicleDetails,
    ModelVehicleDetails,
    VariantVehicleDetails,
    VehicleDetailDocument,
    ViewVehicleDetail,
    Contacts,
    EntitelmentDetail,
    CustomerDetails,
    CustomerCommonDetails,
    VehicleSearchList,
    ProductDetails,
    VehiclePurchaseOrderDetail,
    ViewVPODetail,
    SaveVPODetail,
    DealerLocationDetail,
    OnRoadPriceMasterDetails,
    ViewOnRoadPriceDetails,
    VehicleAllotPriorityDetail,
    VehicleAllotPriorDetail,
    VinBlockMasterDetails,
    VinBlockDetails,
});
