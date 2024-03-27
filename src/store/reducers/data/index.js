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
import { ManufacturerOrgHierarchy } from './manufacturerOrgHierarchy';
import { ForgotPassword } from './forgotPassword';
import { ChangePassword } from './changePassword';
import { ConfigurableParameterEditing } from './configurableParamterEditing';
import { ApplicationMaster } from './applicationMaster';
import { QualificationMaster } from './qualificationMaster';
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
import { RoleManagementData } from './roleManagementData';
import { ManufacturerAdmin } from './ManufacturerAdmin';
import { ManufacturerOrg } from './ManufacturerOrg';
import { Receipt } from './receipt';
import { VehicleReceipt } from './vehicleReceipt';
import { VehicleModelandTaxChargesCategory } from './VehicleModelTaxChargesCategory';
import { Report } from './report';
import { UserManagement } from './userManagement';
import { VehicleReceiptChecklist } from './VehicleReceiptCheckList';
import { vehicleAllotmentData } from './vehicleAllotment';
import { corporateSchemeRegistrationData } from './corporateSchemeRegistration';
import { HoPriceMapping } from './hoPriceMapping';
import { UserAccess } from './userAccess';
import { OTFSoMapping } from './otfSoMappingUnmapping';
import { OTFBlockMaster } from './otfBlockMaster';
import { VehicleDeliveryNote } from './vehicleDeliveryNote';
import { DealerBlockMaster } from './dealerBlockMaster';
import { CRMCustomerVehicle } from './crmCustomerVehicle';
import { ChargerInstallation } from './chargerInstallation';
import { RsmAsmApproval } from './rsmAsmApproval';
import { EvrDetailsCapturing } from './evrDetailsCapturing';
import { VehicleChecklistMaster } from './vehicleChecklistMaster';
import { stockTransferIndentData } from './stockTransferIndent';
import { VehicleSalesSchemeMaster } from './vehicleSalesSchemeMaster';
import { VehicleSalesSchemeMasterUpload } from './vehicleSalesSchemeMasterUpload';
import { AreaOffice } from './areaOfficeLov';
import { ZoneMaster } from './zoneMaster';
import { RSASchemeCategoryLov } from './rsaSchemeCategoryLov';
import { AMCSchemeCategoryLov } from './amcSchemeCategoryLov';
import { ShieldSchemeCategoryLov } from './shieldSchemeCategory';

import { AMCRegistration } from './amcRegistration';
import { CRMSchemeEnrollmentList } from './crmSchemeEnrollment';
import { ShieldSchemeRegistration } from './services';
import { Dashboard } from './dashboard';
import { CoDealerInvoice } from './CoDealerInvoice';
import { CentralFameSubsidy } from './CentralFameSubsidy';

export const data = combineReducers({
    Menu,
    ProductHierarchy,
    HierarchyAttributeMaster,
    CriticalityGroup,
    RoleManagement,
    ManufacturerOrgHierarchy,
    ForgotPassword,
    ChangePassword,
    ConfigurableParameterEditing,
    ApplicationMaster,
    QualificationMaster,
    UserManagement,
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
    RoleManagementData,
    ManufacturerAdmin,
    ManufacturerOrg,
    VehicleReceipt,
    Receipt,
    VehiclePriceMaster,
    VehicleModelandTaxChargesCategory,
    Report,
    VehicleReceiptChecklist,
    vehicleAllotmentData,
    corporateSchemeRegistrationData,
    HoPriceMapping,
    UserAccess,
    stockTransferIndentData,
    OTFSoMapping,
    OTFBlockMaster,
    VehicleDeliveryNote,
    DealerBlockMaster,
    VehicleSalesSchemeMaster,
    VehicleSalesSchemeMasterUpload,
    ChargerInstallation,
    CRMCustomerVehicle,
    CRMSchemeEnrollmentList,
    RsmAsmApproval,
    EvrDetailsCapturing,
    ShieldSchemeRegistration,
    VehicleChecklistMaster,
    AMCRegistration,
    Dashboard,
    AreaOffice,
    ZoneMaster,
    AMCSchemeCategoryLov,
    RSASchemeCategoryLov,
    ShieldSchemeCategoryLov,
    CoDealerInvoice,
    CentralFameSubsidy,
});
