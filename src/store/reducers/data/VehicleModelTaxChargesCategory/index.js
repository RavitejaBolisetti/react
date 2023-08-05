/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { VehicleModelTaxChargesCategoryMain } from './VehicleModelTaxChargesCategoryMain';
import { ProductModelGroup } from './productModelGroup';
import { AccountCategorylov } from './accountCategorylov';
import { TaxChargeCategoryLov } from './taxChargeslov';
export const VehicleModelandTaxChargesCategory = combineReducers({
    VehicleModelTaxChargesCategoryMain,
    ProductModelGroup,
    AccountCategorylov,
    TaxChargeCategoryLov,
});
