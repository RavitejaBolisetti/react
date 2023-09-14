/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const ROUTING_HOME = '/';

export const ROUTING_SSO_LOGIN = '/adidaccess';

export const ROUTING_LOGIN = '/login';
export const ROUTING_FORGOT_PASSWORD = '/forgot-password';
export const ROUTING_UPDATE_PASSWORD = '/update-password';

export const ROUTING_DASHBOARD = '/dashboard';

export const ROUTING_COMMON = '/common/';
export const ROUTING_MILE = '/mile/';
export const ROUTING_SALES = '/sales/';
export const ROUTING_FINANCE = '/finance/';
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
export const ROUTING_REPORT_BI_REPORT = ROUTING_REPORT.concat('bi-report');
export const ROUTING_REPORT_PAGINATED_REPORT = ROUTING_REPORT.concat('paginated-report');
export const ROUTING_REPORT_EMBEDDED_REPORT = ROUTING_REPORT.concat(':type');
export const ROUTING_REPORT_URL_FILTER_REPORT = ROUTING_REPORT.concat('url-filter-report');

export const ROUTING_ADMIN = '/admin/';

export const ROUTING_ADMIN_USER_MANAGEMENT = ROUTING_ADMIN.concat('user-management/');
export const ROUTING_USER_MANAGEMENT_DEALER = ROUTING_ADMIN_USER_MANAGEMENT.concat('dealer');
export const ROUTING_USER_MANAGEMENT_MANUFACTURER = ROUTING_ADMIN_USER_MANAGEMENT.concat('manufacturer');
export const ROUTING_OTF = ROUTING_SALES.concat('booking-form');
// export const ROUTING_VECHILE_DETAILS = ROUTING_SALES.concat('vehicle-details');
export const ROUTING_VECHILE_PURCHASE_ORDER = ROUTING_SALES.concat('vehicle-purchase-order');
export const ROUTING_RSM_APPROVAL = ROUTING_SALES.concat('rsm-approval');
export const ROUTING_DELIVERY_NOTE_INVOICE_CANELLATION = ROUTING_SALES.concat('delivery-note-invoice-cancellation');
export const ROUTING_VEHICLE_TRACKING = ROUTING_SALES.concat('vehicle-tracking');
export const ROUTING_VEHICLE_DETAILS = ROUTING_SALES.concat('vehicle-details');
export const ROUTING_VEHICLE_PRICE_MASTER = ROUTING_SALES.concat('vehicle-price-master');
export const ROUTING_VEHICLE_RECEIPT = ROUTING_SALES.concat('vehicle-receipt');
export const ROUTING_RECEIPTS = ROUTING_SALES.concat('receipts');
export const ROUTING_OTF_SO_MAPPING_CONTROL_MASTER = ROUTING_SALES.concat('otf-so-mapping-control-master');
export const ROUTING_OTF_BLOCK_MASTER = ROUTING_SALES.concat('otf-block-master');


export const ROUTING_FINANCIAL_ACCOUNTING_TAX_CHARGES = ROUTING_FINANCIAL_ACCOUNTING.concat('tax-charges');
export const ROUTING_FINANCIAL_ACCOUNTING_TAX_CHARGES_CATEGORY = ROUTING_FINANCIAL_ACCOUNTING.concat('tax-charges-category');
export const ROUTING_CREDIT_DEBIT_NOTE = ROUTING_FINANCIAL_ACCOUNTING.concat('credit-debit-note');
export const ROUTING_FINANCIAL_ACCOUNTING_ACCOUNT_CATEGORY = ROUTING_FINANCIAL_ACCOUNTING.concat('account-category');
export const ROUTING_DOCUMENT_TYPE = ROUTING_FINANCIAL_ACCOUNTING.concat('docment-type-other-charges-ledger-mapping');
export const ROUTING_FINANCIAL_ACCOUNTING_CHART_OF_ACCOUNT = ROUTING_FINANCIAL_ACCOUNTING.concat('chart-of-account');

export const ROUTING_REPORT_OTF_REPORTS = ROUTING_REPORT.concat('otf-reports');
export const ROUTING_VEHICLE_ALLOTMENT = ROUTING_SALES.concat('order-delivery/vehicle-allotment');
export const ROUTING_VEHICLE_RECIEPT_CHECKLIST = ROUTING_SALES.concat('receipt-checklist');
export const ROUTING_VEHICLE_INVOICE_GENERATION = ROUTING_SALES.concat('vehicle-invoice-generation');
export const ROUTING_VEHICLE_DELIVERY_NOTE = ROUTING_SALES.concat('vehicle-delivery-note');

export const ROUTING_VEHICLE_MODEL_TAX_CHARGES_CATEGORY = ROUTING_FINANCIAL_ACCOUNTING.concat('vehicle-model-tax-and-charges-category');
export const ROUTING_VEHICLE_VEHICLE_ALLOTMENT_PRIORITY_MASTER = ROUTING_SALES.concat('vehicle-allotment-priority-master');
export const ROUTING_DIGITAL_SIGNATURE_MAPPING = ROUTING_SALES.concat('digital-signature');
export const ROUTING_HO_PRICE_MAPPING = ROUTING_SALES.concat('ho-price-mapping');
export const STOCK_TRANSFER_INDENT = ROUTING_SALES.concat('stock-transfer-indent');
export const ROUTING_SO_MAPPING_UNMAPPING = ROUTING_SALES.concat('otf-so-mapping');
