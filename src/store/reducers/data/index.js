import { combineReducers } from 'redux';
import { Menu } from './menu';
import { Geo } from './geo';
import { ProductHierarchy } from './productHierarchy';
import { HierarchyAttributeMaster } from './hierarchyAttributeMaster';
import { criticalityGroup } from './criticalityGroup';
import { RoleManagement } from './roleManagement';
import { ManufacturerAdminHierarchy } from './manufacturerAdminHierarchy';
import { ManufacturerOrgHierarchy } from './manufacturerOrgHierarchy';
import { ChangePassword } from './changePassword';
import { DealerHierarchy } from './dealerHierarchy';
import { ConfigurableParameterEditing } from './configurableParamterEditing';
import { dealerManpower } from './dealerManpower';
import { ApplicationMaster } from './applicationMaster';
import { QualificationMaster } from './qualificationMaster';
import { UserManagement } from './userManagement';
import { UserManagementManufacturer } from './UserManagementManufacturer';


export const data = combineReducers({
    Menu,
    Geo,
    ProductHierarchy,
    HierarchyAttributeMaster,
    criticalityGroup,
    RoleManagement,
    ManufacturerAdminHierarchy,
    ManufacturerOrgHierarchy,
    ChangePassword,
    DealerHierarchy,
    ConfigurableParameterEditing,
    dealerManpower,
    ApplicationMaster,
    QualificationMaster,
    UserManagement,
    UserManagementManufacturer,
});
