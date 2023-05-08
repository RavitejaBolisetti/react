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
