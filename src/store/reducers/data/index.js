import { combineReducers } from 'redux';
import { Menu } from './menu';
import { Geo } from './geo';
import { ProductHierarchy } from './productHierarchy';
import { HierarchyAttributeMaster } from './hierarchyAttributeMaster';
import { ManufacturerAdminHierarchy } from './manufacturerAdminHierarchy';

export const data = combineReducers({
    Menu,
    Geo,
    ProductHierarchy,
    HierarchyAttributeMaster,
    ManufacturerAdminHierarchy,
});