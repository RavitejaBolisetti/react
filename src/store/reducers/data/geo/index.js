import { combineReducers } from 'redux';

import { Country } from './country';
import { State } from './state';
import { District } from './district';
import { City } from './city';
import { Tehsil } from './tehsil';

export const Geo = combineReducers({
    Country,
    State,
    District,
    City,
    Tehsil,
});
