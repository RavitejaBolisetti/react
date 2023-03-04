import { combineReducers } from 'redux';
import { Menu } from './menu';
import { Geo } from './geo';
import { ProductHierarchy } from './productHierarchy';
import { HierarchyAttributeMaster } from './hierarchyAttributeMaster';
import { criticalityGroup } from './criticalityGroup';
import { ManufacturerAdminHierarchy } from './manufacturerAdminHierarchy';
import { ManufacturerOrgHierarchy } from './manufacturerOrgHierarchy';
import { ChangePassword } from './changePassword';
import { ConfigurableParameterEditing } from './configurableParamterEditing';

export const data = combineReducers({
    Menu,
    Geo,
    ProductHierarchy,
    HierarchyAttributeMaster,
    criticalityGroup,
    ManufacturerAdminHierarchy,
    ManufacturerOrgHierarchy,
    ChangePassword,
    ConfigurableParameterEditing,
});
