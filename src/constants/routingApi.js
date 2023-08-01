/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const BASE_URL_LOGIN = BASE_URL + 'login';
export const BASE_URL_REFRESH_TOKEN = BASE_URL + 'refresh';
export const BASE_URL_VERIFY_USER = BASE_URL + 'verifyuser';
export const BASE_URL_GENERATE_OTP = BASE_URL + 'generateotp';
export const BASE_URL_VALIDATE_OTP = BASE_URL + 'validateotp';
export const BASE_URL_FORGOT_PASSWORD = BASE_URL + 'forgotpassword';

export const BASE_URL_LOGOUT = BASE_URL + 'logout';
export const BASE_URL_USER_DETAIL = BASE_URL + 'users';

export const BASE_URL_HEADER_DETAIL = BASE_URL + 'home/header';
export const BASE_URL_MENU = BASE_URL + 'home/menus';
export const BASE_URL_MENU_FAVOURITE = BASE_URL + 'home/favourites';

export const BASE_URL_CHANGE_PASSWORD = BASE_URL + 'changepassword';
export const BASE_URL_UPDATE_PASSWORD = BASE_URL + 'changepassword';

export const BASE_URL_GEO_GRAPHY = BASE_URL + 'geography';
export const BASE_URL_GEO_GRAPHY_COUNTRY = BASE_URL + 'geography/countries';
export const BASE_URL_GEO_GRAPHY_STATE = BASE_URL + 'geography/states';
export const BASE_URL_GEO_GRAPHY_DISTRICT = BASE_URL + 'geography/districts';
export const BASE_URL_GEO_GRAPHY_TEHSIL = BASE_URL + 'geography/tehsils';
export const BASE_URL_GEO_GRAPHY_CITY = BASE_URL + 'geography/cities';
export const BASE_URL_GEO_GRAPHY_PINCODE = BASE_URL + 'geography/pincodes';
export const BASE_URL_GEO_GRAPHY_PINCODE_REPORT = BASE_URL + 'geography/pincodes/report';
export const BASE_URL_GEO_GRAPHY_PINCODE_DETAILS = BASE_URL_GEO_GRAPHY_PINCODE + '/details';

export const BASE_URL_DEALER_MANPOWER = BASE_URL + 'dealer';
export const BASE_URL_DEALER_MANPOWER_LOCATION_TYPE = BASE_URL_DEALER_MANPOWER + '/locationtypes';
export const BASE_URL_DEALER_MANPOWER_BAY_TYPE = BASE_URL_DEALER_MANPOWER + '/baytypes';
export const BASE_URL_DEALER_MANPOWER_DIVISION_MASTER = BASE_URL_DEALER_MANPOWER + '/divisions';
export const BASE_URL_DEALER_MANPOWER_DESIGNATION = BASE_URL_DEALER_MANPOWER + '/designations';

export const BASE_URL_DEALER_MANPOWER_EMPLOYEE_DEPARTMENT = BASE_URL_DEALER_MANPOWER + '/employee/departments';
export const BASE_URL_ROLE = BASE_URL_DEALER_MANPOWER + '/roles';

export const BASE_URL_CUSTOMER_MASTER = BASE_URL + 'customers';
export const BASE_URL_PARTY_MASTER = BASE_URL_CUSTOMER_MASTER + '/partymaster';
export const BASE_URL_LESSOR_COMPANY_MASTER = BASE_URL_CUSTOMER_MASTER + '/lessorcompany';
export const BASE_URL_LESSOR_CUSTOMER_CREATION = BASE_URL_CUSTOMER_MASTER + '/lessorcustomer';
export const BASE_URL_CUSTOMER_MASTER_LIST = BASE_URL + 'customers/search';
export const BASE_URL_CUSTOMER_MASTER_CHANGE_HISTORY = BASE_URL + 'customers/changeHistory';
export const BASE_URL_CUSTOMER_MASTER_VEHICLE_LIST = BASE_URL + 'customers/vehicle/search';
export const BASE_URL_SUPPORTING_DOCUMENT = BASE_URL_CUSTOMER_MASTER + '/document';

export const BASE_URL_GEO_GRAPHY_CHANGE_HISTORY = BASE_URL + 'geochangehistory';
export const BASE_URL_ROLE_MANAGEMENT = BASE_URL + 'application/roles';
export const BASE_URL_ROLE_MANAGEMENT_ROLES = BASE_URL + 'application/rolemanagement';

export const BASE_URL_PRODUCT_HIERARCHY = BASE_URL + 'product';
export const BASE_URL_PRODUCT_HIERARCHY_SAVE = BASE_URL + 'product';
export const BASE_URL_PRODUCT_HIERARCHY_CHANGE_HISTORY = BASE_URL + 'product/hierarchychangehistory';
export const BASE_URL_PRODUCT_HIERARCHY_SKU = BASE_URL + 'product/skuattribute';
export const BASE_URL_PRODUCT_HIERARCHY_SKU_SAVE = BASE_URL + 'product/skuattribute';
export const BASE_URL_PRODUCT_NAME_DROPDOWN = BASE_URL + 'product/attributes';

export const BASE_URL_ATTRIBUTE_MASTER = BASE_URL + 'hierarchyattributes';

export const BASE_URL_CONFIG_PARAM_EDIT_TYPE = BASE_URL + 'configurableparametertypes';
export const BASE_URL_QUALIFICATION_MASTER = BASE_URL + 'application/qualifications';
export const BASE_URL_CRITICALITY_GROUP = BASE_URL + 'application/criticalitygroup';

export const BASE_URL_CONFIG_PARAM_EDIT = BASE_URL + 'configurableparameters';
export const BASE_URL_MANUFACTURER_ORGANIZATION_HIERARCHY = BASE_URL + 'manufacturer/organization/hierarchy';
export const BASE_URL_MANUFACTURER_ORG_HIERARCHY_SAVE = BASE_URL + 'manufacturer/organization/hierarchy';
export const BASE_URL_MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY = BASE_URL + 'manufacturer/organization/changehistory';

export const BASE_URL_MANUFACTURER_ADMINISTRATION_HIERARCHY = BASE_URL + 'manufacturer/admin/hierarchy';
export const BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_SAVE = BASE_URL + 'manufacturer/admin/hierarchy';
export const BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_CHANGE_HISTORY = BASE_URL + 'manufacturer/admin/changehistory';
export const BASE_URL_MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY = BASE_URL + 'manufacturer/admin/authority/changehistory';

export const BASE_URL_MANUFACTURER_ADMIN_AUTHORITY_UPLOAD = BASE_URL + 'manufacturer/admin/authority';
export const BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_SEARCH = BASE_URL + 'users/manufacturer';
export const BASE_URL_MANUFACTURER_AUTHORITY_TYPE_DROPDOWN = BASE_URL + 'configurableparametertypes';

export const BASE_URL_DEALER_HIERARCHY = BASE_URL + 'dealerhierarchy';
export const BASE_URL_DEALER_HIERARCHY_SAVE = BASE_URL + 'dealerhierarchy';

export const BASE_URL_DEALER_PARENT = BASE_URL + 'dealer/parents';
export const BASE_URL_DEALER_COMAPANY = BASE_URL + 'dealer/company';
export const BASE_URL_DEALER_PARENT_GROUP_SEARCH = BASE_URL + 'dealer/search/parentgroups';
export const BASE_URL_DEALER_PARENT_TITLE = BASE_URL + 'configurableparametertypes';
export const BASE_URL_DEALER_COMPANY_LOV = BASE_URL + 'dealer/parents/lov';

//get all applications
export const BASE_URL_APPLICATIONS = BASE_URL + 'applications';
// get post All form
export const BASE_URL_APPLICATION_DETAILS = BASE_URL + 'application/applicationdetails';

export const BASE_URL_APPLICATION_ACTIONS = BASE_URL + 'application/actions';
export const BASE_URL_APPLICATION_CRITICALITY_GROUP = BASE_URL + 'application/criticalitygroup';
export const BASE_URL_APPLICATION_DEALER_LOCATION = BASE_URL + 'dealer/search/locations';

export const BASE_URL_DOCUMENT_TYPE = BASE_URL + 'document';

export const BASE_URL_USER_MANAGEMENT_DEALER = BASE_URL + 'users/dealer';
export const BASE_URL_USER_MANAGEMENT_MANUFACTURER = BASE_URL + 'users/manufacturer';

export const BASE_URL_TERM_CONDITION_PRODUCT_HIERARCHY = BASE_URL + 'product/lov';
//export const BASE_URL_TERM_CONDITION_DOCUMENT_TYPE = BASE_URL + 'appmst/documenttypes?code=tns&type=DOCUMENT';
export const BASE_URL_TERM_CONDITION_DOCUMENT_TYPE = BASE_URL + 'appmst/documenttypes?code=TERMS_CONDITIONS&type=MODULE&onlyActive=yes';
export const BASE_URL_TERM_CONDITION_LANGUAGE = BASE_URL + 'configurableparametertypes?parameterType=MOTHER_TOUNGE';
export const BASE_URL_TERM_CONDITION_DEALER = BASE_URL + 'appmst/termconditiondealer';
//export const BASE_URL_TERM_CONDITION_MANUFACTURER = BASE_URL + 'dealer/tncmanufracturer';
export const BASE_URL_TERM_CONDITION_MANUFACTURER = BASE_URL + 'appmst/tncmanufracturer';
export const BASE_URL_TERM_CONDITION_CHANGE_HISTORY = BASE_URL + 'appmst/termconditiondealerhistory';
export const BASE_URL_TERM_CONDITION_MANUFACTURER_CHANGE_HISTORY = BASE_URL + 'appmst/tncmanufracturerhistory';

export const BASE_URL_LOYALTY_AND_SCHEME = BASE_URL + 'otf/loyalty/schemes';
export const BASE_URL_FAMILY_DETAIL_SEARCH = BASE_URL + 'customers/individual';
export const BASE_URL_INDIVIUAL_PROFILE_CUSTOMER_MASTER = BASE_URL + 'customers/individual/profile';
export const BASE_URL_CUSTOMER_MASTER_CUSTOMER_DETAILS_INDIVIDUAL = BASE_URL + 'customers/individual';
export const BASE_URL_CUSTOMER_MASTER_ACCOUNTS_RELATED_INDIVISUAL = BASE_URL + 'customers/individual/accounts';
export const BASE_URL_FAMILY_DETAIL_CUSTOMER_MASTER = BASE_URL + 'customers//individual/familydetails';
export const BASE_URL_CUSTOMER_MASTER_ADDRESS = BASE_URL + 'customers/individual/address';
export const BASE_URL_CUSTOMER_MASTER_ADDRESS_CORPORATE = BASE_URL + 'customers/corporate/address';
export const BASE_URL_CUSTOMER_MASTER_INDIVIDUAL_CONTACT = BASE_URL + 'customers/individual/contacts';
export const BASE_URL_INDIVIDUAL_NAME_CHANGE_HISTORY = BASE_URL + 'customers/individual/name/changehistory';

export const BASE_URL_CUSTOMER_MASTER_CORPORATE_PARENT_COMPANY = BASE_URL + 'customers/parent/company';
export const BASE_URL_CUSTOMER_MASTER_CUSTOMER_DETAILS = BASE_URL + 'customers/corporate';
export const BASE_URL_CUSTOMER_MASTER_CORPORATE_LOV = BASE_URL + 'customers/corporate/firms/lov';
export const BASE_URL_CUSTOMER_MASTER_FIRM_CONTACT = BASE_URL + 'customers/corporate/contacts';
export const BASE_URL_CUSTOMER_MASTER_ACCOUNTS_RELATED_CORPORATE = BASE_URL + 'customers/corporate/accounts';
export const BASE_URL_CORPORATE_COMPANY_LIST = BASE_URL + 'customers/corporate/firms';
export const BASE_URL_CORPORATE_COMPANY_PROFILE = BASE_URL + 'customers/corporate/profile';

export const BASE_URL_OTF = BASE_URL + 'otf/';

export const BASE_URL_REFERRALS = BASE_URL_OTF + 'referrals';

export const BASE_URL_OTF_REQUEST = BASE_URL_OTF + 'request/';
export const BASE_URL_OTF_REJECT = BASE_URL_OTF_REQUEST + 'reject';
export const BASE_URL_OTF_SEARCH_LIST = BASE_URL_OTF + 'search';
export const BASE_URL_OTF_REPORTS = BASE_URL + 'customreports/otf/names';
export const BASE_URL_OTF_DOWNLAOD_REPORT = BASE_URL + 'customreports/otf/register';
export const BASE_URL_OTF_INVOICE_DETAILS = BASE_URL + 'otf/invoice';
export const BASE_URL_OTF_DETAILS = BASE_URL_OTF + 'details';
export const BASE_URL_OTF_VEHICLE_DETAILS = BASE_URL_OTF + 'vehicledetails';
export const BASE_URL_ADD_ON_DETAILS = BASE_URL_OTF + 'addons';
export const BASE_URL_ADD_ON_PART = BASE_URL_OTF + 'part/details';

export const BASE_URL_OTF_INVOICE = BASE_URL + 'otf/invoice';
export const BASE_URL_OTF_FINANCE = BASE_URL + 'otf/finance';
export const BASE_URL_OTF_SCHEME_DETAIL = BASE_URL + 'otf/schemes';
export const BASE_URL_OTF_INSURANCE_DETAIL = BASE_URL + 'otf/insurancedetails';
export const BASE_URL_OTF_FINANCE_LOV = BASE_URL + 'otf/financiers/lov';
export const BASE_URL_OTF_SCHEMES = BASE_URL_OTF + 'schemes';
export const BASE_URL_OTF_EXCHANGE_VEHICLE = BASE_URL_OTF + 'exchangevehicle';
export const BASE_URL_OTF_CHANGE_HISTORY = BASE_URL_OTF + 'changehistory';

export const BASE_URL_OTF_TRANSFER = BASE_URL_OTF + 'transfer';
export const BASE_URL_OTF_CANCELLATION = BASE_URL_OTF + 'request/cancel';
export const BASE_URL_OTF_CANCELLATION_DEALER_SEARCH = BASE_URL + 'dealer/search';

export const BASE_URL_DOCUMENT_UPLOAD = BASE_URL + 'common/document/upload';
export const BASE_URL_DOCUMENT_DOWNLOAD = BASE_URL + 'common/document/download';
export const BASE_URL_DOCUMENT_VIEW_URL = BASE_URL + 'common/document/view';

export const BASE_URL_SALES_CONSULTANT = BASE_URL + 'users/dealer/employees/lov';
export const BASE_URL_OTF_CUSTOMER = BASE_URL + 'otf/customerdetails';

export const BASE_URL_VEHICLE = BASE_URL + 'vehicle/';
export const BASE_URL_VEHICLE_SEARCH = BASE_URL_VEHICLE + 'search';
export const BASE_URL_VIEW_VEHICLE_DETAILS = BASE_URL_VEHICLE + 'details';
export const BASE_URL_VEHICLE_CONTACTS = BASE_URL_VEHICLE + 'contacts';
export const BASE_URL_VEHICLE_PRODUCT_DETAILS = BASE_URL_VEHICLE + 'productdetails';
export const BASE_URL_VEHICLE_DETAILS_DOCUMENT = BASE_URL_VEHICLE + 'documents';
export const BASE_URL_VEHICLE_ENTITELMENT = BASE_URL_VEHICLE + 'schemes';

export const BASE_URL_VEHICLE_VARIANT = BASE_URL_VEHICLE + 'variant';
export const BASE_URL_VEHICLE_MAKE = BASE_URL_VEHICLE + 'make';
export const BASE_URL_VEHICLE_MODEL = BASE_URL_VEHICLE + 'model';

export const BASE_URL_ACCOUNT_HEAD = BASE_URL + 'finance/financialaccountheads';
export const BASE_URL_DOCUMENT_DESCRIPTION = BASE_URL + 'appmst/documenttypes';

export const BASE_URL_FINANCIAL_ACC_TAX_CHARGE = BASE_URL + 'finance/tax/charges';
export const BASE_URL_FINANCIAL_ACC_TAX_CHARGE_CATEGORY_SEARCH = BASE_URL + 'finance/tax/chargecategory/search';
export const BASE_URL_FINANCIAL_ACC_TAX_CHARGE_CATEGORY = BASE_URL + 'finance/tax/chargecategory';

export const BASE_URL_FINANCIAL_ACC_TAX_CHARGE_TYPE = BASE_URL + 'finance/tax/chargetypes/lov';
export const BASE_URL_FINANCIAL_ACC_TAX_CHARGE_CODE = BASE_URL + 'finance/tax/charges/lov';

export const BASE_URL_VEHICLE_PRICE_MASTER = BASE_URL_VEHICLE + 'pricemaster';
export const BASE_URL_VEHICLE_PRICE_MASTER_SEARCH = BASE_URL_VEHICLE + 'pricemaster/search';
export const BASE_URL_VEHICLE_CUSTOMER_DETAIL = BASE_URL_VEHICLE + 'customerdetails';
export const BASE_URL_VEHICLE_CUSTOMER_COMMON_DETAIL = BASE_URL + 'customers/commondetails';
export const BASE_URL_REPORTS_GET_EMBEDED_INFO = BASE_URL + 'reports/getembedinfo';
