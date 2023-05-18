import { combineReducers } from 'redux';
import { Menu } from './menu';
import { ProductHierarchy } from './productHierarchy';
import { HierarchyAttributeMaster } from './hierarchyAttributeMaster';
import { criticalityGroup } from './criticalityGroup';
import { RoleManagement } from './roleManagement';
import { ManufacturerAdminHierarchy } from './manufacturerAdminHierarchy';
import { ManufacturerOrgHierarchy } from './manufacturerOrgHierarchy';
import { ForgotPassword } from './forgotPassword';
import { ChangePassword } from './changePassword';
import { DealerHierarchy } from './dealerHierarchy';
import { ConfigurableParameterEditing } from './configurableParamterEditing';
import { ApplicationMaster } from './applicationMaster';
import { QualificationMaster } from './qualificationMaster';
import { UserManagement } from './userManagement';
import { UserManagementManufacturer } from './UserManagementManufacturer';
import { Geo } from './geo';
import { DealerManpower } from './dealerManpower';
import { PartyMaster } from './partyMaster';

export const data = combineReducers({
    Menu,
    ProductHierarchy,
    HierarchyAttributeMaster,
    criticalityGroup,
    RoleManagement,
    ManufacturerAdminHierarchy,
    ManufacturerOrgHierarchy,
    ForgotPassword,
    ChangePassword,
    DealerHierarchy,
    ConfigurableParameterEditing,
    ApplicationMaster,
    QualificationMaster,
    UserManagement,
    UserManagementManufacturer,
    Geo,
    DealerManpower,
    PartyMaster,
});
