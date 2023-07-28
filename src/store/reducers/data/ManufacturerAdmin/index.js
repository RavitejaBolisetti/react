/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { ManufacturerAdminHierarchy } from './manufacturerAdminHierarchy';
import { ManufacturerAdminUpload } from './manufacturerAdminUpload';
import { ManufacturerAdminHierarchyChangeHistory } from './manufacturerAdminHierarchyChangeHistory';
import { ManufactureAdminValidateToken } from './manufactureAdminValidateToken';
import { ManufacturerAdminHierarchyDetailData } from './manufacturerAdminHierarchyDetailData';
import { AuthorityHierarchy } from './authorityHierarchy'
export const ManufacturerAdmin = combineReducers({
    ManufacturerAdminHierarchy,
    ManufacturerAdminUpload,
    ManufacturerAdminHierarchyChangeHistory,
    ManufactureAdminValidateToken,
    ManufacturerAdminHierarchyDetailData,
    AuthorityHierarchy,
});
