import { combineReducers } from 'redux';
import { Menu } from './menu';
import { Geo } from './geo';

export const data = combineReducers({
    Menu,
    Geo,
});