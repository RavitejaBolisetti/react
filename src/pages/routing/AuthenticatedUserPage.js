/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { DashboardPage } from 'pages/dashboard';
import * as routing from 'constants/routing';
import { menuDataActions } from 'store/actions/data/menu';
import { showGlobalNotification } from 'store/actions/notification';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    ProductHierarchyPage,
    UserManagementPage,
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

import { TaxChargesPage, TaxChargesCategoryPage, AccountCategoryPage, VehicleModelTaxChargesCategoryPage, DocumentTypeOtherChargesPage, CreditDebitNoteMasterPage, GSTIRNAuthenticationPage, ChartOfAccountPage, GstIRNTransactionPage } from 'pages/FinancialAccounting';
import {
    OTFMasterPage,
    VehicleDetailMasterPage,
    OtfBlockMasterPage,
    VehiclePriceMasterPage,
    VehicleReceiptMasterPage,
    RSMApprovalPage,
    VehiclePurchaseOrderMasterPage,
    VehicleRecieptChecklistMaster,
    OtfSoMappingMasterPage,
    ReceiptMasterPage,
    VehicleAllotmentMasterPage,
    VehicleAllotmentPriorityMasterPage,
    DeliveryNoteInvoiceCancellationPage,
    DigitalSignatureMasterPage,
    HoPriceMappingMasterPage,
    OnRoadPriceMasterPage,
    VehicleInvoiceMasterPage,
    VehicleTrackingPage,
    OtfSoMappingUnmappingMasterPage,
    StockTransferIndentMasterPage,
    VehicleDeliveryNoteMasterPage,
    EvrDetailsCapturingMasterPage,
    CrmScreenEnrolmentMasterPage,
    VinBlockMasterPage,
    VehicleChecklistMasterPage,
    RsmAsmApprovalPage,
    ChargerInstallationPage,
    AMCRegistrationMasterPage,
    RSARegistrationPage,
    CoDealerInvoiceGenerationPage,
    DealerCorporateClaimMasterPage,
    CorporateMasterPage,
    EmployeeEmpowermentMasterPage,
    ExchangeLoyaltyIncentiveMasterPage,
    MitraBrokerRegistrationMasterPage,
    IncentiveClaimPage,
    CentralFameSubsidyPage,
} from 'pages/Sales';

import { ShieldSchemeRegistrationPage } from 'pages/Services';

import { PageNotFound } from 'components/PageNotFound';

import { SplashPage } from 'pages/splash';
import { ProfilePage, SettingPage, FaqPage, TrainingPage } from 'pages/user';
import { EmbeddedReportPage } from 'pages/report/EmbeddedReport/EmbeddedReportPage';
import { EmbeddedDocumentPage } from 'pages/report/EmbeddedDocument/EmbeddedDocumentPage';

import { CMSPage } from 'pages/cms';
import { DealerCompanyPage } from 'pages/common/Dealer';
import { VehicleSalesSchemeMasterPage } from 'pages/Sales/VehicleSalesSchemeMaster/VehicleSalesSchemeMasterPage';
import { UnAuthozisedAccess } from 'components/UnAuthozisedAccess';
import { withSpinner } from 'components/withSpinner';
import CorporateSchemeRegistrationMasterPage from 'pages/Sales/CorporateSchemeRegistration';
import CorporateAdditionalDiscountRegistrationMasterPage from 'pages/Sales/CorporateAdditionalDiscountRegistration';
import CustomerEmpowermentMasterPage from 'pages/Sales/CustomerEmpowerment';
import CsdCpcClaimMasterPage from 'pages/Sales/CsdCpcClaim';
import AdditionalCsdCpcClaimPage from 'pages/Sales/AdditionalCsdCpcClaim';
import OverRiderClaimPage from 'pages/Sales/OverRiderClaim';
import ExchangeLoyalityClaimMasterPage from 'pages/Sales/ExchangeLoyalityClaim';
import { IncentiveSchemeMasterPage } from 'pages/Sales/IncentiveSchemeMaster/IncentiveSchemeMasterPage';
import IncentiveSchemePage from 'pages/Sales/IncentiveScheme';

const mapStateToProps = (state) => {
    const {
        auth: { userId, isLoggedIn },
        data: {
            Menu: { isLoaded: isDataLoaded = false, isLoading, data: menuData = [], flatternData },
        },
    } = state;

    return {
        userId,
        isLoggedIn,
        isDataLoaded,
        isLoading,
        menuData,
        flatternData,
    };
};
const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchMenuList: menuDataActions.fetchList,
            listShowMenuLoading: menuDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const AuthenticatedUserPageMain = (props) => {
    const { isDataLoaded, isLoading, listShowMenuLoading, fetchMenuList, flatternData, userId, showGlobalNotification } = props;

    const location = useLocation();
    const pagePath = location.pathname;
    const canViewPage = flatternData?.find((menu) => (menu.link === pagePath || (menu.link && menu.slug) ? menu.link?.replace(':slug', menu.slug) === pagePath : false))?.menuId;

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchMenuList({
                setIsLoading: listShowMenuLoading,
                userId,
                errorAction: (message) => {
                    showGlobalNotification({ message });
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    const routeExclusion = [routing?.ROUTING_HOME, routing?.ROUTING_DASHBOARD];
    const authorized = true || canViewPage || routeExclusion?.includes(pagePath);

    return !isLoading ? (
        authorized ? (
            <Routes>
                <Route path={routing.ROUTING_HOME} element={<SplashPage />} exact />
                <Route path={routing.ROUTING_DASHBOARD} element={<DashboardPage />} />

                <Route path={routing.ROUTING_COMMON_MANUFACTURER_ORGANIZATION_HIERARCHY} element={<ManufacturerOrgHierarchyPage />} />
                <Route path={routing.ROUTING_COMMON_PRODUCT_HIERARCHY} element={<ProductHierarchyPage />} />
                <Route path={routing.ROUTING_COMMON_CONFIG_PARAM_EDIT} element={<ConfigurableParameterEditingPage />} />
                <Route path={routing.ROUTING_COMMON_USER_MANAGEMENT} element={<UserManagementPage />} />
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

                <Route path={routing.ROUTING_RSM_APPROVAL} element={<RSMApprovalPage />} exact />
                <Route path={routing.ROUTING_DELIVERY_NOTE_INVOICE_CANELLATION} element={<DeliveryNoteInvoiceCancellationPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_TRACKING} element={<VehicleTrackingPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_DETAILS} element={<VehicleDetailMasterPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_PRICE_MASTER} element={<VehiclePriceMasterPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_RECEIPT} element={<VehicleReceiptMasterPage />} exact />
                <Route path={routing.ROUTING_RECEIPTS} element={<ReceiptMasterPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_INVOICE_GENERATION} element={<VehicleInvoiceMasterPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_DELIVERY_NOTE} element={<VehicleDeliveryNoteMasterPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_SALES_SCHEME_MASTER} element={<VehicleSalesSchemeMasterPage />} exact />
                <Route path={routing.ROUTING_CHARGER_INSTALLATION_PROCESS} element={<ChargerInstallationPage />} exact />
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

                <Route path={routing.ROUTING_REPORT_EMBEDDED_REPORT} element={<EmbeddedReportPage />} exact />
                <Route path={routing.ROUTING_REPORT_EMBEDDED_DOCUMENT} element={<EmbeddedDocumentPage />} exact />

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
                <Route path={routing.ROUTING_VEHICLE_TRACKING} element={<VehicleTrackingPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_DETAILS} element={<VehicleDetailMasterPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_PRICE_MASTER} element={<VehiclePriceMasterPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_RECEIPT} element={<VehicleReceiptMasterPage />} exact />
                <Route path={routing.ROUTING_RECEIPTS} element={<ReceiptMasterPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_INVOICE_GENERATION} element={<VehicleInvoiceMasterPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_DELIVERY_NOTE} element={<VehicleDeliveryNoteMasterPage />} exact />
                <Route path={routing.ROUTING_CHARGER_INSTALLATION_PROCESS} element={<ChargerInstallationPage />} exact />

                <Route path={routing.ROUTING_REPORT_OTF_REPORTS} element={<OtfReportsPage />} />
                <Route path={routing.ROUTING_OTF_SO_MAPPING_CONTROL_MASTER} element={<OtfSoMappingMasterPage />} />
                <Route path={routing.ROUTING_OTF_BLOCK_MASTER} element={<OtfBlockMasterPage />} />
                <Route path={routing.ROUTING_CRM_SCHEME_ENROLMENT} element={<CrmScreenEnrolmentMasterPage />} />
                <Route path={routing.ROUTING_SO_MAPPING_UNMAPPING} element={<OtfSoMappingUnmappingMasterPage />} />

                <Route path={routing.ROUTING_FINANCIAL_ACCOUNTING_TAX_CHARGES} element={<TaxChargesPage />} exact />
                <Route path={routing.ROUTING_FINANCIAL_ACCOUNTING_TAX_CHARGES_CATEGORY} element={<TaxChargesCategoryPage />} exact />
                <Route path={routing.ROUTING_FINANCIAL_ACCOUNTING_ACCOUNT_CATEGORY} element={<AccountCategoryPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_ALLOTMENT} element={<VehicleAllotmentMasterPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_MODEL_TAX_CHARGES_CATEGORY} element={<VehicleModelTaxChargesCategoryPage />} exact />
                <Route path={routing.ROUTING_CREDIT_DEBIT_NOTE} element={<CreditDebitNoteMasterPage />} exact />
                <Route path={routing.ROUTING_DOCUMENT_TYPE} element={<DocumentTypeOtherChargesPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_RECIEPT_CHECKLIST} element={<VehicleRecieptChecklistMaster />} exact />
                <Route path={routing.ROUTING_VEHICLE_VEHICLE_ALLOTMENT_PRIORITY_MASTER} element={<VehicleAllotmentPriorityMasterPage />} exact />
                <Route path={routing.ROUTING_DIGITAL_SIGNATURE_MAPPING} element={<DigitalSignatureMasterPage />} exact />
                <Route path={routing.ROUTING_FINANCIAL_ACCOUNTING_CHART_OF_ACCOUNT} element={<ChartOfAccountPage />} exact />

                <Route path={routing.ROUTING_GST_IRN_AUTHENTICATION} element={<GSTIRNAuthenticationPage />} exact />
                <Route path={routing.ROUTING_ONROAD_PRICE_MASTER} element={<OnRoadPriceMasterPage />} exact />

                <Route path={routing.ROUTING_HO_PRICE_MAPPING} element={<HoPriceMappingMasterPage />} exact />
                <Route path={routing.ROUTING_EVR_DETAILS_CAPTURING} element={<EvrDetailsCapturingMasterPage />} exact />
                <Route path={routing.STOCK_TRANSFER_INDENT} element={<StockTransferIndentMasterPage />} exact />

                <Route path={routing.ROUTING_SHIELD_SCHEME_REGISTER} element={<ShieldSchemeRegistrationPage />} exact />
                <Route path={routing.ROUTING_RSM_ASM_APPROVAL} element={<RsmAsmApprovalPage />} exact />
                <Route path={routing.ROUTING_AMC_REGISTRATION} element={<AMCRegistrationMasterPage />} exact />

                <Route path={routing.ROUTING_RSM_ASM_APPROVAL} element={<RsmAsmApprovalPage />} exact />
                <Route path={routing.ROUTING_GST_IRN_TRANSACTION} element={<GstIRNTransactionPage />} exact />
                <Route path={routing.ROUTING_VIN_BLOCK_MASTER} element={<VinBlockMasterPage />} exact />
                <Route path={routing.ROUTING_VEHICLE_CHECKLIST_MASTER} element={<VehicleChecklistMasterPage />} exact />
                <Route path={routing.ROUTING_RSM_ASM_APPROVAL} element={<RsmAsmApprovalPage />} exact />
                <Route path={routing.ROUTING_RSA_REGISTRATION} element={<RSARegistrationPage />} exact />
                <Route path={routing.PAGE_NOT_FOUND} element={<PageNotFound />} exact />
                <Route path={routing.CO_DEALER_INVOICE} element={<CoDealerInvoiceGenerationPage />} exact />

                {/* UI-Screens */}
                <Route path={routing.ROUTING_DEALER_CORPORATE_CLAIM} element={<DealerCorporateClaimMasterPage />} exact />
                <Route path={routing.ROUTING_CORPORATE_MASTER} element={<CorporateMasterPage />} exact />
                <Route path={routing.ROUTING_CORPORATE_SCHEME_REGISTRATION} element={<CorporateSchemeRegistrationMasterPage />} exact />
                <Route path={routing.ROUTING_CORPORATE_ADDITIONALDISCOUNT_REGISTRATION} element={<CorporateAdditionalDiscountRegistrationMasterPage />} exact />

                <Route path={routing.ROUTING_DEALER_EMPOWERMENT_REQUEST} element={<CustomerEmpowermentMasterPage />} exact />
                <Route path={routing.ROUTING_CUSTOMER_EMPOWERMENT_REQUEST} element={<EmployeeEmpowermentMasterPage />} exact />
                <Route path={routing.ROUTING_CSD_CPC_CLAIM} element={<CsdCpcClaimMasterPage />} exact />
                <Route path={routing.ROUTING_ADDITIONAL_CDC_CPC_CLAIM} element={<AdditionalCsdCpcClaimPage />} exact />
                <Route path={routing.ROUTING_OVER_RIDER_CLAIM} element={<OverRiderClaimPage />} exact />

                <Route path={routing.ROUTING_EXCHANGE_LOYALTY_CLAIM_GENERATION} element={<ExchangeLoyalityClaimMasterPage />} exact />
                <Route path={routing.ROUTING_EXCHANGE_LOYALTY_INCENTIVE_MASTER} element={<ExchangeLoyaltyIncentiveMasterPage />} exact />
                
                {/* iNCENTIVE SCHEME N CLAIM  */}
                <Route path={routing.ROUTING_MITRA_BROKER_REGISTRATION} element={<MitraBrokerRegistrationMasterPage />} exact />
                <Route path={routing.ROUTING_INCENTIVE_SCHEME_MASTER} element={<IncentiveSchemeMasterPage />} exact />
                <Route path={routing.ROUTING_INCENTIVE_SCHEME} element={<IncentiveSchemePage />} exact />
                <Route path={routing.ROUTING_INCENTIVE_CLAIM} element={<IncentiveClaimPage />} exact />
                


                {/*  */}
                <Route path={routing.ROUTING_CO_DEALER_INVOICE} element={<CoDealerInvoiceGenerationPage />} exact />
                <Route path={routing.ROUTING_CENTRAL_FAME_SUBSIDY} element={<CentralFameSubsidyPage />} exact />
            </Routes>
        ) : (
            <Routes>
                <Route path={routing.PAGE_NOT_FOUND} element={<UnAuthozisedAccess />} exact />
            </Routes>
        )
    ) : (
        <div style={{ height: '100vh' }}></div>
    );
};

export const AuthenticatedUserPage = connect(mapStateToProps, mapDispatchToProps)(withSpinner(AuthenticatedUserPageMain));
