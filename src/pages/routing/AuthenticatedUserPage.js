/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DashboardPage } from 'pages/dashboard';
import * as routing from 'constants/routing';

import {
    ProductHierarchyPage,
    UserManagementPage,
    UserManagementPageNew,
    HierarchyAttributeMasterPage,
    ManufacturerAdministrativeHierarchyPage,
    ManufacturerOrgHierarchyPage,
    ConfigurableParameterEditingPage,
    QualificationMasterPage,
    ApplicationMasterPage,
    CriticalityGroupPage,
    RoleManagementPage,
    StatePage,
    StateCrudPage,
    DistrictPage,
    CityPage,
    TehsilPage,
    PinCodePage,
    DealerLocationTypePage,
    DealerDivisionMasterPage,
    BayTypeMasterPage,
    DesignationMasterPage,
    DealerEmployeeDepartmentPage,
    RoleMasterPage,
    DealerParentPage,
    PartyMasterPage,
    LessorCompanyMasterPage,
    CustomerMasterPage,
    TermConditionDealerMasterPage,
    TermConditionManufacturerMasterPage,
    OtfReportsPage,
    LessorCustomerCreationPage,
} from 'pages/common';

import { TaxChargesPage, TaxChargesCategoryPage, AccountCategoryPage, VehicleModelTaxChargesCategoryPage, DocumentTypeOtherChargesPage, CreditDebitNoteMasterPage, ChartOfAccountPage  } from 'pages/FinancialAccounting';
import { OTFMasterPage, VehicleDetailMasterPage, VehiclePriceMasterPage, VehicleReceiptMasterPage, RSMApprovalPage, VehiclePurchaseOrderMasterPage, VehicleRecieptChecklistMaster, OtfSoMappingMasterPage, ReceiptMasterPage, VehicleInvoiceMasterPage, VehicleAllotmentMasterPage, DigitalSignatureMasterPage, HoPriceMappingMasterPage, DeliveryNoteInvoiceCancellationPage } from 'pages/Sales';


import { SplashPage } from 'pages/splash';

import { ProfilePage, SettingPage, FaqPage, TrainingPage } from 'pages/user';
import { BiReportPage } from 'pages/report/BiReport/BiReportPage';
import { PaginatedReportPage } from 'pages/report/PaginatedReport/PaginatedReportPage';
import { EmbeddedReportPage } from 'pages/report/EmbeddedReport/EmbeddedReportPage';
import { URLFilterReportPage } from 'pages/report/URLFilterReport/URLFilterReportPage';

import { CMSPage } from 'pages/cms';
import { DealerCompanyPage } from 'pages/common/Dealer';

export const AuthenticatedUserPage = () => {
    return (
        <Routes>
            <Route path={routing.ROUTING_HOME} element={<SplashPage />} exact />
            <Route path={routing.ROUTING_DASHBOARD} element={<DashboardPage />} />

            <Route path={routing.ROUTING_COMMON_MANUFACTURER_ORGANIZATION_HIERARCHY} element={<ManufacturerOrgHierarchyPage />} />
            <Route path={routing.ROUTING_COMMON_PRODUCT_HIERARCHY} element={<ProductHierarchyPage />} />
            <Route path={routing.ROUTING_COMMON_CONFIG_PARAM_EDIT} element={<ConfigurableParameterEditingPage />} />
            <Route path={routing.ROUTING_COMMON_USER_MANAGEMENT} element={<UserManagementPage />} />
            <Route path={routing.ROUTING_COMMON_USER_MANAGEMENT_NEW} element={<UserManagementPageNew />} />
            <Route path={routing.ROUTING_COMMON_HIERARCHY_ATTRIBUTE_MASTER} element={<HierarchyAttributeMasterPage />} exact />
            <Route path={routing.ROUTING_COMMON_MANUFACTURER_ADMINISTRATIVE_HIERARCHY} element={<ManufacturerAdministrativeHierarchyPage />} />

            <Route path={routing.ROUTING_COMMON_GEO_STATE_CRUD} element={<StateCrudPage />} />
            <Route path={routing.ROUTING_COMMON_GEO_STATE} element={<StatePage />} />
            <Route path={routing.ROUTING_COMMON_GEO_CITY} element={<CityPage />} />
            <Route path={routing.ROUTING_COMMON_GEO_DISTRICT} element={<DistrictPage />} />
            <Route path={routing.ROUTING_COMMON_GEO_TEHSIL} element={<TehsilPage />} />
            <Route path={routing.ROUTING_COMMON_GEO_PINCODE} element={<PinCodePage />} />

            <Route path={routing.ROUTING_MILE_DEALER_MANPOWER_LOCATION_TYPE_MASTER} element={<DealerLocationTypePage />} />
            <Route path={routing.ROUTING_MILE_DEALER_MANPOWER_EMPLOYEE_DEPARTMENT_MASTER} element={<DealerEmployeeDepartmentPage />} />

            <Route path={routing.ROUTING_MILE_DEALER_MANPOWER_DIVISION_MASTER} element={<DealerDivisionMasterPage />} />
            <Route path={routing.ROUTING_MILE_DEALER_MANPOWER_BAY_TYPE_MASTER} element={<BayTypeMasterPage />} />
            <Route path={routing.ROUTING_MILE_DEALER_MANPOWER_DESIGNATION_MASTER} element={<DesignationMasterPage />} />
            <Route path={routing.ROUTING_MILE_DEALER_MANPOWER_ROLE_MASTER} element={<RoleMasterPage />} />
            <Route path={routing.ROUTING_MILE_DEALER_HIERARCHY_DEALER_PARENT} element={<DealerParentPage />} />
            <Route path={routing.ROUTING_MILE_DEALER_HIERARCHY_DEALER_COMPANY} element={<DealerCompanyPage />} />

            <Route path={routing.ROUTING_COMMON_APPLICATION_MASTER} element={<ApplicationMasterPage />} />
            <Route path={routing.ROUTING_COMMON_QUALIFICATION_MASTER} element={<QualificationMasterPage />} />
            <Route path={routing.ROUTING_COMMON_CRITICALITY_GROUP} element={<CriticalityGroupPage />} />
            <Route path={routing.ROUTING_COMMON_ROLE_MANAGEMENT} element={<RoleManagementPage />} />

            <Route path={routing.ROUTING_COMMON_PARTY_MASTER} element={<PartyMasterPage />} />
            <Route path={routing.ROUTING_COMMON_LESSOR_COMPANY_MASTER} element={<LessorCompanyMasterPage />} />
            <Route path={routing.ROUTING_COMMON_LESSOR_CUSTOMER_CREATION} element={<LessorCustomerCreationPage />} />
            <Route path={routing.ROUTING_USER_PROFILE} element={<ProfilePage />} exact />
            <Route path={routing.ROUTING_COMMON_CUSTOMER_MASTER} element={<CustomerMasterPage />} />
            <Route path={routing.ROUTING_COMMON_TERM_CONDITION_DEALER} element={<TermConditionDealerMasterPage />} />
            <Route path={routing.ROUTING_COMMON_TERM_CONDITION_MANUFACTURER} element={<TermConditionManufacturerMasterPage />} />
            <Route path={routing.ROUTING_USER_SETTING} element={<SettingPage />} exact />
            <Route path={routing.ROUTING_USER_FAQ} element={<FaqPage />} exact />

            <Route path={routing.ROUTING_REPORT_BI_REPORT} element={<BiReportPage />} exact />
            <Route path={routing.ROUTING_REPORT_PAGINATED_REPORT} element={<PaginatedReportPage />} exact />
            <Route path={routing.ROUTING_REPORT_EMBEDDED_REPORT} element={<EmbeddedReportPage />} exact />
            <Route path={routing.ROUTING_REPORT_URL_FILTER_REPORT} element={<URLFilterReportPage />} exact />

            <Route path={routing.ROUTING_USER_SETTING} element={<SettingPage />} exact />
            <Route path={routing.ROUTING_USER_FAQ} element={<FaqPage />} exact />
            <Route path={routing.ROUTING_USER_TRAINING} element={<TrainingPage />} exact />
            <Route path={routing.ROUTING_USER_MANAGEMENT_DEALER} element={<UserManagementPage />} exact />

            <Route path={routing.ROUTING_USER_TERM} element={<CMSPage />} exact />
            <Route path={routing.ROUTING_USER_ABOUT} element={<CMSPage />} exact />
            <Route path={routing.ROUTING_USER_DISCLAIMER} element={<CMSPage />} exact />
            <Route path={routing.ROUTING_USER_CONTACT} element={<CMSPage />} exact />
            <Route path={routing.ROUTING_OTF} element={<OTFMasterPage />} exact />
            <Route path={routing.ROUTING_VECHILE_PURCHASE_ORDER} element={<VehiclePurchaseOrderMasterPage />} exact />

            <Route path={routing.ROUTING_RSM_APPROVAL} element={<RSMApprovalPage />} exact />
            <Route path={routing.ROUTING_DELIVERY_NOTE_INVOICE_CANELLATION} element={<DeliveryNoteInvoiceCancellationPage />} exact />
            <Route path={routing.ROUTING_VEHICLE_DETAILS} element={<VehicleDetailMasterPage />} exact />
            <Route path={routing.ROUTING_VEHICLE_PRICE_MASTER} element={<VehiclePriceMasterPage />} exact />
            <Route path={routing.ROUTING_VEHICLE_RECEIPT} element={<VehicleReceiptMasterPage />} exact />
            <Route path={routing.ROUTING_RECEIPTS} element={<ReceiptMasterPage />} exact />
            <Route path={routing.ROUTING_VEHICLE_INVOICE_GENERATION} element={<VehicleInvoiceMasterPage />} exact />

            <Route path={routing.ROUTING_REPORT_OTF_REPORTS} element={<OtfReportsPage />} />
            <Route path={routing.ROUTING_OTF_SO_MAPPING_CONTROL_MASTER} element={<OtfSoMappingMasterPage />} />

            <Route path={routing.ROUTING_FINANCIAL_ACCOUNTING_TAX_CHARGES} element={<TaxChargesPage />} exact />
            <Route path={routing.ROUTING_FINANCIAL_ACCOUNTING_TAX_CHARGES_CATEGORY} element={<TaxChargesCategoryPage />} exact />
            <Route path={routing.ROUTING_FINANCIAL_ACCOUNTING_ACCOUNT_CATEGORY} element={<AccountCategoryPage />} exact />
            <Route path={routing.ROUTING_VEHICLE_ALLOTMENT} element={<VehicleAllotmentMasterPage />} exact />
            <Route path={routing.ROUTING_VEHICLE_MODEL_TAX_CHARGES_CATEGORY} element={<VehicleModelTaxChargesCategoryPage />} exact />
            <Route path={routing.ROUTING_CREDIT_DEBIT_NOTE} element={<CreditDebitNoteMasterPage />} exact />
            <Route path={routing.ROUTING_DOCUMENT_TYPE} element={<DocumentTypeOtherChargesPage />} exact />
            <Route path={routing.ROUTING_VEHICLE_RECIEPT_CHECKLIST} element={<VehicleRecieptChecklistMaster />} exact />
            <Route path={routing.ROUTING_DIGITAL_SIGNATURE_MAPPING} element={<DigitalSignatureMasterPage />} exact />
            <Route path={routing.ROUTING_FINANCIAL_ACCOUNTING_CHART_OF_ACCOUNT} element={<ChartOfAccountPage />} exact />

            <Route path={routing.ROUTING_HO_PRICE_MAPPING} element={<HoPriceMappingMasterPage />} exact />
        </Routes>
    );
};
