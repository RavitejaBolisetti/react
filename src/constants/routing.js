/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const ROUTING_HOME = '/';

export const PAGE_NOT_FOUND = '*';

export const ROUTING_SSO_LOGIN = '/adidaccess';

export const ROUTING_LOGIN = '/login';
export const ROUTING_FORGOT_PASSWORD = '/forgot-password';
export const ROUTING_UPDATE_PASSWORD = '/update-password';

export const ROUTING_DASHBOARD = '/dashboard';
export const ROUTING_DASHBOARD_OLD = '/dashboard-old';

export const ROUTING_COMMON = '/common/';
export const ROUTING_MILE = '/mile/';
export const ROUTING_SALES = '/sales/';
export const ROUTING_FINANCE = '/finance/';
export const ROUTING_SPARES = '/spares/';
export const ROUTING_FINANCIAL_ACCOUNTING = '/financial-accounting/';
export const ROUTING_TERM_CONDITION = ROUTING_COMMON.concat('term-condition');

export const ROUTING_COMMON_GEO = ROUTING_COMMON.concat('geo/');

export const ROUTING_COMMON_GEO_COUNTRY = ROUTING_COMMON_GEO.concat('country');
export const ROUTING_COMMON_GEO_STATE = ROUTING_COMMON_GEO.concat('state');
export const ROUTING_COMMON_GEO_STATE_CRUD = ROUTING_COMMON_GEO.concat('state-crud');
export const ROUTING_COMMON_GEO_DISTRICT = ROUTING_COMMON_GEO.concat('district');
export const ROUTING_COMMON_GEO_CITY = ROUTING_COMMON_GEO.concat('city');
export const ROUTING_COMMON_GEO_TEHSIL = ROUTING_COMMON_GEO.concat('tehsil');
export const ROUTING_COMMON_GEO_PINCODE = ROUTING_COMMON_GEO.concat('pincode');

export const ROUTING_COMMON_PRODUCT_HIERARCHY = ROUTING_COMMON.concat('product-hierarchy');
export const ROUTING_COMMON_APPLICATION_MASTER = ROUTING_COMMON.concat('application-master');
export const ROUTING_COMMON_CRITICALITY_GROUP = ROUTING_COMMON.concat('criticality-group');
export const ROUTING_COMMON_ROLE_MANAGEMENT = ROUTING_COMMON.concat('role-management');
export const ROUTING_COMMON_USER_MANAGEMENT_OLD = ROUTING_COMMON.concat('user-management-old');
export const ROUTING_COMMON_USER_MANAGEMENT = ROUTING_COMMON.concat('user-management');
export const ROUTING_COMMON_CUSTOMER_MASTER = ROUTING_COMMON.concat('customer-master');
export const ROUTING_COMMON_TERM_CONDITION_DEALER = ROUTING_TERM_CONDITION.concat('/dealer');
export const ROUTING_COMMON_TERM_CONDITION_MANUFACTURER = ROUTING_TERM_CONDITION.concat('/manufacturer');

export const ROUTING_COMMON_HIERARCHY_ATTRIBUTE_MASTER = ROUTING_COMMON.concat('hierarchy-attribute-master');
export const ROUTING_COMMON_BRANCH_DEALER_MAPPING = ROUTING_COMMON.concat('branch-dealer-mapping');

export const ROUTING_COMMON_PARTY_MASTER = ROUTING_COMMON.concat('party-master');
export const ROUTING_COMMON_LESSOR_COMPANY_MASTER = ROUTING_COMMON.concat('lessor-company-master');
export const ROUTING_COMMON_LESSOR_CUSTOMER_CREATION = ROUTING_COMMON.concat('lessor-customer-creation');

export const ROUTING_COMMON_QUALIFICATION_MASTER = ROUTING_COMMON.concat('qualification-master');

export const ROUTING_MILE_DEALER_MANPOWER = ROUTING_MILE.concat('dealer-manpower/');
export const ROUTING_MILE_DEALER_MANPOWER_LOCATION_TYPE_MASTER = ROUTING_MILE_DEALER_MANPOWER.concat('location-type-master');
export const ROUTING_MILE_DEALER_MANPOWER_DIVISION_MASTER = ROUTING_MILE_DEALER_MANPOWER.concat('division-master');
export const ROUTING_MILE_DEALER_MANPOWER_BAY_TYPE_MASTER = ROUTING_MILE_DEALER_MANPOWER.concat('bay-type-master');
export const ROUTING_MILE_DEALER_MANPOWER_DESIGNATION_MASTER = ROUTING_MILE_DEALER_MANPOWER.concat('designation-master');
export const ROUTING_MILE_DEALER_MANPOWER_EMPLOYEE_DEPARTMENT_MASTER = ROUTING_MILE_DEALER_MANPOWER.concat('employee-department');
export const ROUTING_MILE_DEALER_MANPOWER_ROLE_MASTER = ROUTING_MILE_DEALER_MANPOWER.concat('role-master');

export const ROUTING_MILE_DEALER_HIERARCHY_DEALER_PARENT = ROUTING_MILE.concat('dealer-parent');
export const ROUTING_MILE_DEALER_HIERARCHY_DEALER_COMPANY = ROUTING_MILE.concat('dealer-company');

export const ROUTING_COMMON_CONFIG_PARAM_EDIT = ROUTING_COMMON.concat('config-param-edit');

export const ROUTING_COMMON_MANUFACTURER_ADMINISTRATIVE_HIERARCHY = ROUTING_COMMON.concat('manufacturer-adminstrative-hierarchy');
export const ROUTING_COMMON_MANUFACTURER_ORGANIZATION_HIERARCHY = ROUTING_COMMON.concat('manufacturer-organization-hierarchy');
export const ROUTING_COMMON_DEALER_HIERARCHY = ROUTING_COMMON.concat('dealer-hierarchy');
export const ROUTING_AMC_REGISTRATION = ROUTING_COMMON.concat('amc-registration');

export const ROUTING_USER = '/user/';
export const ROUTING_USER_PROFILE = ROUTING_USER.concat('profile');
export const ROUTING_USER_SETTING = ROUTING_USER.concat('setting');
export const ROUTING_USER_FAQ = ROUTING_USER.concat('faq');
export const ROUTING_USER_TRAINING = ROUTING_USER.concat('training');

export const ROUTING_USER_TERM = ROUTING_HOME.concat('term-of-Use');
export const ROUTING_USER_ABOUT = ROUTING_HOME.concat('about-us');
export const ROUTING_USER_DISCLAIMER = ROUTING_HOME.concat('disclaimer');
export const ROUTING_USER_CONTACT = ROUTING_HOME.concat('contact-us');

export const ROUTING_REPORT = ROUTING_HOME.concat('report/');
export const ROUTING_DOCUMENT = ROUTING_HOME.concat('document/');
export const ROUTING_REPORT_BI_REPORT = ROUTING_REPORT.concat('bi-report');
export const ROUTING_REPORT_PAGINATED_REPORT = ROUTING_REPORT.concat('paginated-report');
export const ROUTING_REPORT_EMBEDDED_REPORT = ROUTING_REPORT.concat(':slug');
export const ROUTING_REPORT_EMBEDDED_DOCUMENT = ROUTING_DOCUMENT.concat(':slug');
export const ROUTING_REPORT_URL_FILTER_REPORT = ROUTING_REPORT.concat('url-filter-report');

export const ROUTING_ADMIN = '/admin/';

export const ROUTING_ADMIN_USER_MANAGEMENT = ROUTING_ADMIN.concat('user-management/');
export const ROUTING_USER_MANAGEMENT_DEALER = ROUTING_ADMIN_USER_MANAGEMENT.concat('dealer');
export const ROUTING_USER_MANAGEMENT_MANUFACTURER = ROUTING_ADMIN_USER_MANAGEMENT.concat('manufacturer');
export const ROUTING_OTF = ROUTING_SALES.concat('booking-management');
export const ROUTING_VECHILE_PURCHASE_ORDER = ROUTING_SALES.concat('vehicle-purchase-order');
export const ROUTING_RSM_APPROVAL = ROUTING_SALES.concat('rsm-approval');
export const ROUTING_DELIVERY_NOTE_INVOICE_CANELLATION = ROUTING_SALES.concat('delivery-note-invoice-cancellation');
export const ROUTING_VEHICLE_TRACKING = ROUTING_SALES.concat('vehicle-tracking');
export const ROUTING_VEHICLE_DETAILS = ROUTING_SALES.concat('vehicle-details');
export const ROUTING_VEHICLE_PRICE_MASTER = ROUTING_SALES.concat('vehicle-price-master');
export const ROUTING_VEHICLE_RECEIPT = ROUTING_SALES.concat('vehicle-receipt');
export const ROUTING_RECEIPTS = ROUTING_SALES.concat('receipts');
export const ROUTING_OTF_SO_MAPPING_CONTROL_MASTER = ROUTING_SALES.concat('booking-so-mapping-control-master');
export const ROUTING_OTF_BLOCK_MASTER = ROUTING_SALES.concat('booking-block-master');
export const ROUTING_VEHICLE_CHECKLIST_MASTER = ROUTING_SALES.concat('vehicle-checklist-master');
export const ROUTING_CRM_SCHEME_ENROLMENT = ROUTING_SALES.concat('crm-scheme-enrolment');

export const ROUTING_FINANCIAL_ACCOUNTING_TAX_CHARGES = ROUTING_FINANCIAL_ACCOUNTING.concat('tax-charges');
export const ROUTING_FINANCIAL_ACCOUNTING_TAX_CHARGES_CATEGORY = ROUTING_FINANCIAL_ACCOUNTING.concat('tax-charges-category');
export const ROUTING_CREDIT_DEBIT_NOTE = ROUTING_FINANCIAL_ACCOUNTING.concat('credit-debit-note');
export const ROUTING_FINANCIAL_ACCOUNTING_ACCOUNT_CATEGORY = ROUTING_FINANCIAL_ACCOUNTING.concat('account-category');
export const ROUTING_DOCUMENT_TYPE = ROUTING_FINANCIAL_ACCOUNTING.concat('document-type-other-charges-ledger-mapping');
export const ROUTING_FINANCIAL_ACCOUNTING_CHART_OF_ACCOUNT = ROUTING_FINANCIAL_ACCOUNTING.concat('chart-of-account');

export const ROUTING_REPORT_OTF_REPORTS = ROUTING_REPORT.concat('booking-reports');
export const ROUTING_VEHICLE_ALLOTMENT = ROUTING_SALES.concat('order-delivery/vehicle-allotment');
export const ROUTING_VEHICLE_RECIEPT_CHECKLIST = ROUTING_SALES.concat('receipt-checklist');
export const ROUTING_VEHICLE_INVOICE_GENERATION = ROUTING_SALES.concat('vehicle-invoice-generation');
export const ROUTING_VEHICLE_DELIVERY_NOTE = ROUTING_SALES.concat('vehicle-delivery-note');
export const ROUTING_CHARGER_INSTALLATION_PROCESS = ROUTING_SALES.concat('charger-installation');

export const ROUTING_VEHICLE_MODEL_TAX_CHARGES_CATEGORY = ROUTING_FINANCIAL_ACCOUNTING.concat('vehicle-model-tax-and-charges-category');

export const ROUTING_GST_IRN_AUTHENTICATION = ROUTING_FINANCIAL_ACCOUNTING.concat('gst-irn-authentication');
export const ROUTING_ONROAD_PRICE_MASTER = ROUTING_SALES.concat('onroad-price-master');
export const ROUTING_VEHICLE_VEHICLE_ALLOTMENT_PRIORITY_MASTER = ROUTING_SALES.concat('vehicle-allotment-priority-master');
export const ROUTING_DIGITAL_SIGNATURE_MAPPING = ROUTING_SALES.concat('digital-signature');
export const ROUTING_HO_PRICE_MAPPING = ROUTING_SALES.concat('ho-price-mapping');
export const STOCK_TRANSFER_INDENT = ROUTING_SALES.concat('stock-transfer-indent');
export const ROUTING_SO_MAPPING_UNMAPPING = ROUTING_SALES.concat('booking-so-mapping');
export const ROUTING_VEHICLE_SALES_SCHEME_MASTER = ROUTING_SALES.concat('vehicle-sales-scheme-master');
export const ROUTING_RSM_ASM_APPROVAL = ROUTING_SALES.concat('delivery-invoice-cancellation-approval');
export const ROUTING_EVR_DETAILS_CAPTURING = ROUTING_SALES.concat('evr-details-capturing');

export const ROUTING_SERVICES = '/services/';
export const ROUTING_SHIELD_SCHEME_REGISTER = ROUTING_SERVICES.concat('shield-scheme-registration');

export const ROUTING_VIN_BLOCK_MASTER = ROUTING_SALES.concat('vin-block-master');
export const ROUTING_GST_IRN_TRANSACTION = ROUTING_FINANCIAL_ACCOUNTING.concat('gst-irn-transaction');
export const ROUTING_RSA_REGISTRATION = ROUTING_SALES.concat('rsa-registration');
export const CO_DEALER_INVOICE = ROUTING_SALES.concat('co-dealer-invoice');
export const ROUTING_CO_DEALER_INVOICE = ROUTING_SALES.concat('co-dealer-invoice');
export const ROUTING_CENTRAL_FAME_SUBSIDY = ROUTING_SALES.concat('central-fame-subsidy');

// UI-Screens

//Financial-accounting
export const ROUTING_FINANCE_PAYMENT = ROUTING_FINANCIAL_ACCOUNTING.concat('voucher-payment');

//Corporate Scheme
export const ROUTING_DEALER_CORPORATE_CLAIM = ROUTING_SALES.concat('dealer-corporate-claim');
export const ROUTING_CORPORATE_MASTER = ROUTING_SALES.concat('corporate-master');
export const ROUTING_CORPORATE_SCHEME_REGISTRATION = ROUTING_SALES.concat('corporate-scheme-registration');
export const ROUTING_CORPORATE_ADDITIONALDISCOUNT_REGISTRATION = ROUTING_SALES.concat('corporate-additional-discount-registration');

export const ROUTING_DEALER_EMPOWERMENT_REQUEST = ROUTING_SALES.concat('customer-empowerment');
export const ROUTING_CUSTOMER_EMPOWERMENT_REQUEST = ROUTING_SALES.concat('employee-empowerment');

//CSD CPC Claim
export const ROUTING_CSD_CPC_CLAIM = ROUTING_SALES.concat('csd-cpc-claim');
export const ROUTING_ADDITIONAL_CDC_CPC_CLAIM = ROUTING_SALES.concat('addional-csd-cpc-claim');
export const ROUTING_OVER_RIDER_CLAIM = ROUTING_SALES.concat('over-rider-claim');

//Exchange loyalty Scheme & Registration
// export const ROUTING_EXCHANGE_LOYALTY_CAPPING_MASTER = ROUTING_SALES.concat('exchange-loyalty-capping-master');
// export const ROUTING_EXCHANGE_LOYALTY_DOCUMENT_MASTER = ROUTING_SALES.concat('exchange-loyalty-document-master');
// export const ROUTING_EXCHANGE_LOYALTY_SCHEME_MASTER = ROUTING_SALES.concat('exchange-loyalty-scheme-master');
export const ROUTING_EXCHANGE_LOYALTY_INCENTIVE_MASTER = ROUTING_SALES.concat('exchange-loyalty-incentive-master');
export const ROUTING_EXCHANGE_LOYALTY_RECLAIM_REQUEST = ROUTING_SALES.concat('exchange-loyalty-reclaim-request');
export const ROUTING_EXCHANGE_LOYALTY_CLAIM_GENERATION = ROUTING_SALES.concat('exchange-loyalty-claim-generation');
export const ROUTING_EXCHANGE_CLAIM_GENERATION = ROUTING_SALES.concat('exchange-claim-generation');
export const ROUTING_LOYALTY_CLAIM_GENERATION = ROUTING_SALES.concat('loyalty-claim-generation');

//DemandForecasting
export const ROUTING_DEMAND_FORECASTING = ROUTING_SALES.concat('demand-forecasting');


// Incentive scheme and claim
export const ROUTING_MITRA_BROKER_REGISTRATION = ROUTING_SALES.concat('mitra-broker-registration');
export const ROUTING_INCENTIVE_SCHEME_MASTER = ROUTING_SALES.concat('incentive-scheme-master');
export const ROUTING_INCENTIVE_SCHEME = ROUTING_SALES.concat('incentive-schemes');
export const ROUTING_INCENTIVE_CLAIM = ROUTING_SALES.concat('incentive-claim');

export const ROUTING_SPECIAL_INCENTIVE_SCHEME = ROUTING_SALES.concat('special-incentive-scheme');
export const ROUTING_INITIATE_DEALER_SCHEME_SPECIAL = ROUTING_SALES.concat('initiate-dealer-scheme-special'); //remove 
export const ROUTING_DEALER_COMMUNICTION_VIEW = ROUTING_SALES.concat('dealer-communication-view');
export const ROUTING_UPLOAD_FESTIVE_SCHEME = ROUTING_SALES.concat('upload-festive-scheme');

export const ROUTING_GST_CLAIM = ROUTING_SALES.concat('gst-claim');


// Used Vehicle
export const ROUTING_BRAND_SPIDER_MASTER = ROUTING_SALES.concat('brand-spider-master');
export const ROUTING_RESALE_VEHICLE_COLOR_MASTER = ROUTING_SALES.concat('resale-vehicle-color-master');
export const ROUTING_MULTI_MODAL_VEHICLE_MASTER = ROUTING_SALES.concat('multi-modal-vehicle-master');
export const ROUTING_MULTI_BRAND_USED_VEHICLE_CAMPAIGN_CREATION = ROUTING_SALES.concat('multi-brand-used-vehicle-campaign-creation');
export const ROUTING_MULTI_BRAND_USED_VEHICLE_PRICE_CAPTURING = ROUTING_SALES.concat('multi-brand-used-vehicle-price-capturing');

// Spares
export const ROUTING_STORE_MASTER = ROUTING_SPARES.concat('store-master');
export const ROUTING_PART_MASTER = ROUTING_SPARES.concat('part-master');
export const ROUTING_UNIT_OF_MEASURE_MASTER = ROUTING_SPARES.concat('unit-of-measure-master');

export const ROUTING_KIT_MASTER = ROUTING_SPARES.concat('kit-master');
export const ROUTING_PART_CATEGORY_MASTER = ROUTING_SPARES.concat('part-category-master');
export const ROUTING_SPARE_PRODUCT_DIVISION_MASTER = ROUTING_SPARES.concat('spare-product-division');
export const ROUTING_VENDOR_BRAND_MASTER = ROUTING_SPARES.concat('vendor-brand-master');//vendor + brand
export const ROUTING_MATERIAL_PRICING_GROUP = ROUTING_SPARES.concat('metarial-pricing-group');
export const ROUTING_MOVEMENT_CLASS = ROUTING_SPARES.concat('movement-class');
export const ROUTING_ISSUE_INDICATOR = ROUTING_SPARES.concat('issue-indicator');
export const ROUTING_CAMPAIGN_DISCOUNT = ROUTING_SPARES.concat('campaign-discount');
export const ROUTING_INVENTORY_CLASSIFICATION = ROUTING_SPARES.concat('inventory-classification');
// export const ROUTING_TARGET_TYPE = ROUTING_SPARES.concat('Target-Type');
export const ROUTING_BRANCH_WISE_STOCK = ROUTING_SPARES.concat('branch-wise-stock');
export const ROUTING_TARGET_TYPE = ROUTING_SPARES.concat('target-type');
export const ROUTING_TO_BIN_TRANSFER = ROUTING_SPARES.concat('bin-to-bin-transfer');
export const ROUTING_STOCK_TRANSFER_INDENT = ROUTING_SPARES.concat('stock-transfer-indent');

// vehicle related
export const ROUTING_COMMON_VEHICLE_RELATED = ROUTING_COMMON.concat('vehicle-related');

