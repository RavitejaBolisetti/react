/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';
import { Menu } from './menu';
import { ProductHierarchy } from './productHierarchy';
import { HierarchyAttributeMaster } from './hierarchyAttributeMaster';
import { CriticalityGroup } from './criticalityGroup';
import { RoleManagement } from './roleManagement';
// import { ManufacturerAdminHierarchy } from './manufacturerAdminHierarchy';
import { ManufacturerOrgHierarchy } from './manufacturerOrgHierarchy';
import { ForgotPassword } from './forgotPassword';
import { ChangePassword } from './changePassword';
import { ConfigurableParameterEditing } from './configurableParamterEditing';
import { ApplicationMaster } from './applicationMaster';
import { QualificationMaster } from './qualificationMaster';
import { UserManagement } from './userManagement';
import { UserManagementManufacturer } from './UserManagementManufacturer';
import { Geo } from './geo';
import { Sales } from './sales';
import { DealerManpower } from './dealerManpower';
import { PartyMaster } from './partyMaster';
import { TermCondition } from './termsConditions';
import { DealerHierarchy } from './dealer';
import { PincodeDetails } from './pincodeDetails';
import { LessorCompanyMaster } from './lessorCompanyMaster';
import { LessorCustomerCreation } from './lessorCustomerCreation';
import { OtfReports } from './otfReports';
import { OTF } from './otf';
import { Vehicle } from './vehicle';
import { CustomerMaster } from './customerMaster';
import { SupportingDocument } from './supportingDocument';
import { FinancialAccounting } from './financialAccounting';
import { VehiclePriceMaster } from './vehiclePriceMaster';
import { ManufacturerAdmin } from './ManufacturerAdmin';
import { ManufacturerOrg } from './ManufacturerOrg';
import { VehicleReceipt } from './vehicleReceipt';
import { VehicleModelandTaxChargesCategory } from './VehicleModelTaxChargesCategory';
import { Report } from './report';
import { VehicleReceiptChecklist } from './VehicleReceiptCheckList';

export const data = combineReducers({
    Menu,
    ProductHierarchy,
    HierarchyAttributeMaster,
    CriticalityGroup,
    RoleManagement,
    // ManufacturerAdminHierarchy,
    ManufacturerOrgHierarchy,
    ForgotPassword,
    ChangePassword,
    ConfigurableParameterEditing,
    ApplicationMaster,
    QualificationMaster,
    UserManagement,
    UserManagementManufacturer,
    Geo,
    Sales,
    DealerManpower,
    PartyMaster,
    TermCondition,
    DealerHierarchy,
    PincodeDetails,
    LessorCompanyMaster,
    LessorCustomerCreation,
    OtfReports,
    OTF,
    CustomerMaster,
    SupportingDocument,
    Vehicle,
    FinancialAccounting,
    ManufacturerAdmin,
    ManufacturerOrg,
    VehicleReceipt,
    VehiclePriceMaster,
    VehicleModelandTaxChargesCategory,
    Report,
    VehicleReceiptChecklist,
});
