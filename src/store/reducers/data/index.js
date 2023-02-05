import { combineReducers } from 'redux';
import { Menu } from './menu';
import { Geo } from './geo';
import { ProductHierarchy } from './productHierarchy';

export const data = combineReducers({
    Menu,
    Geo,
    ProductHierarchy,
});