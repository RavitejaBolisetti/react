/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { Country } from './country';
import { State } from './state';
import { District } from './district';
import { City } from './city';
import { Tehsil } from './tehsil';
import { Pincode } from './pincode';

export const Geo = combineReducers({
    Country,
    State,
    District,
    City,
    Tehsil,
    Pincode,
});
