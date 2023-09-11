/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';
import { VehicleInvoiceSearchList } from './vehicleInvoiceGeneration';
import { VehicleIrnGeneration } from './irnGeneration';
import { VehicleInvoiceDetail } from './vehicleInvoiceDetail';
import { VehicleDetails } from './vehicleDetails';

export const VehicleInvoiceGeneration = combineReducers({
    VehicleInvoiceSearchList,
    VehicleIrnGeneration,
    VehicleInvoiceDetail,
    VehicleDetails,
});
