import { combineReducers } from 'redux';
import { Menu } from './menu';
import { Geo } from './geo';
import { ProductHierarchy } from './productHierarchy';
import { HierarchyAttributeMaster } from './hierarchyAttributeMaster';
import { ManufacturerAdminHierarchy } from './manufacturerAdminHierarchy';
import { ManufacturerOrgHierarchy } from './manufacturerOrgHierarchy';
import { ChangePassword } from './changePassword';
import { DealerHierarchy } from './dealerHierarchy';
import { ConfigurableParameterEditing } from './configurableParamterEditing';

export const data = combineReducers({
    Menu,
    Geo,
    ProductHierarchy,
    HierarchyAttributeMaster,
    ManufacturerAdminHierarchy,
    ManufacturerOrgHierarchy,
    ChangePassword,
    DealerHierarchy,
    ConfigurableParameterEditing,
});
