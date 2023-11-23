/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';
import { AMCRegistrationSearch } from './amcRegistration';
import { EmployeeData } from './employeeSearch';
import { AMCScheme } from './amcScheme';
import { DealerLocations } from './dealerLocations';

export const AMCRegistration = combineReducers({
    AMCRegistrationSearch,
    EmployeeData,
    AMCScheme,
    DealerLocations,
});
