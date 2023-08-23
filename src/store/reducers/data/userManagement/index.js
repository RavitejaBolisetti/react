/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';
import { SearchUser } from './searchUser';
import { UserDealerApplicatin } from './dealerApplications';
import { UserManufacturerApplication } from './manufacturerApplication';
import { RoleList } from './roleList';
import { RoleApplicaion } from './roleApplication';
import { UserDealerList } from './dealersList';
import { UserRoleList } from './userRoleList';
import { DealerBranchLocation } from './dealerBranchLocation';
import { UserDealerBranchLocation } from './userDealerBranchLocation';

import { MacId } from './macid';

export const UserManagement = combineReducers({
    SearchUser,
    UserDealerApplicatin,
    UserManufacturerApplication,
    RoleList,
    RoleApplicaion,
    UserDealerList,
    UserRoleList,
    DealerBranchLocation,
    UserDealerBranchLocation,
    MacId,
});
