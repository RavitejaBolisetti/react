/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { DealerLocationTypeMaster } from './dealerLocationTypeMaster';
import { DealerDivisionMaster } from './dealerDivisionMaster';
import { BayTypeMaster } from './bayMasterType';
import { DesignationMaster } from './designationMaster';
import { DealerEmployeeDepartmentMaster } from './dealerEmployeeDepartmentMaster';
import { RoleMaster } from './roleMaster';
import { MileSkill } from './mileSkill';

export const DealerManpower = combineReducers({
    DealerLocationTypeMaster,
    DealerDivisionMaster,
    BayTypeMaster,
    DesignationMaster,
    DealerEmployeeDepartmentMaster,
    RoleMaster,
    MileSkill,
});
