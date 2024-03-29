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
export const BASE_URL_USER_ACCESS = BASE_URL + 'users/defaultaccess';

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

export const BASE_URL_CUSTOMER_MASTER = BASE_URL + 'customers';
export const BASE_URL_PARTY_MASTER = BASE_URL_CUSTOMER_MASTER + '/partymaster';
export const BASE_URL_PARTY_MASTER_LOV = BASE_URL_CUSTOMER_MASTER + '/partymaster/lov';
export const BASE_URL_LESSOR_COMPANY_MASTER = BASE_URL_CUSTOMER_MASTER + '/lessorcompany';
export const BASE_URL_LESSOR_CUSTOMER_CREATION = BASE_URL_CUSTOMER_MASTER + '/lessorcustomer';
export const BASE_URL_CUSTOMER_MASTER_LIST = BASE_URL + 'customers/search';
export const BASE_URL_CUSTOMER_MASTER_CHANGE_HISTORY = BASE_URL + 'customers/changehistory';
export const BASE_URL_CUSTOMER_MASTER_NAME_CHANGE_HISTORY = BASE_URL + 'customers/individual/namechangehistory';
export const BASE_URL_CUSTOMER_MASTER_VEHICLE_LIST = BASE_URL + 'customers/vehicle/search';
export const BASE_URL_SUPPORTING_DOCUMENT = BASE_URL_CUSTOMER_MASTER + '/document';
export const BASE_URL_CORPORATE_DESCRIPTION = BASE_URL_CUSTOMER_MASTER + '/corporate';
export const BASE_URL_CORPORATE_TYPE = BASE_URL_CUSTOMER_MASTER + '/corporate/type';

export const BASE_URL_GEO_GRAPHY_CHANGE_HISTORY = BASE_URL + 'geochangehistory';

export const BASE_URL_ROLE = BASE_URL_DEALER_MANPOWER + '/roles';
export const BASE_URL_ROLE_MANAGEMENT_ROLES = BASE_URL + 'application/rolemanagement';
export const BASE_URL_ROLE_MANAGEMENT = BASE_URL + 'application/rolemaster';
export const BASE_URL_ROLE_MANAGEMENT_ROLES_MENU = BASE_URL + 'application/roles';

export const BASE_URL_PRODUCT_HIERARCHY = BASE_URL + 'product';
export const BASE_URL_PRODUCT_MAKE = BASE_URL_PRODUCT_HIERARCHY + '/make';
export const BASE_URL_PRODUCT_MODEL_GROUP = BASE_URL_PRODUCT_HIERARCHY + '/modelgroups';
export const BASE_URL_PRODUCT_VARIENT = BASE_URL_PRODUCT_HIERARCHY + '/variants';
export const BASE_URL_PRODUCT_MODEL_FAMILY = BASE_URL_PRODUCT_HIERARCHY + '/family/lov';
export const BASE_URL_PRODUCT_HIERARCHY_DETAIL = BASE_URL + 'product/details';
export const BASE_URL_PRODUCT_HIERARCHY_SAVE = BASE_URL + 'product';
export const BASE_URL_PRODUCT_HIERARCHY_CHANGE_HISTORY = BASE_URL + 'product/hierarchychangehistory';
export const BASE_URL_PRODUCT_HIERARCHY_SKU = BASE_URL + 'product/skuattribute';
export const BASE_URL_PRODUCT_HIERARCHY_SKU_SAVE = BASE_URL + 'product/skuattribute';
export const BASE_URL_PRODUCT_NAME_DROPDOWN = BASE_URL + 'product/attributes';

export const BASE_URL_ATTRIBUTE_MASTER = BASE_URL + 'hierarchyattributes';
export const BASE_URL_HIERARCHY_ATTRIBUTE_LOV = BASE_URL_ATTRIBUTE_MASTER + '/lov';

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
// export const BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_SEARCH = BASE_URL + 'users/manufacturer';
export const BASE_URL_MANUFACTURER_ADMIN_HIERARCHY_SEARCH = BASE_URL + 'users/search';
export const BASE_URL_MANUFACTURER_AUTHORITY_TYPE_DROPDOWN = BASE_URL + 'configurableparametertypes';

export const BASE_URL_DEALER_HIERARCHY = BASE_URL + 'dealerhierarchy';
export const BASE_URL_DEALER_HIERARCHY_SAVE = BASE_URL + 'dealerhierarchy';

export const BASE_URL_DEALER_PARENT = BASE_URL + 'dealer/parents';
export const BASE_URL_DEALER_COMAPANY = BASE_URL + 'dealer/company';
export const BASE_URL_DEALER_PARENT_GROUP_SEARCH = BASE_URL + 'dealer/search/parentgroups';
export const BASE_URL_DEALER_PARENT_TITLE = BASE_URL + 'configurableparametertypes';
export const BASE_URL_DEALER_COMPANY_LOV = BASE_URL + 'dealer/parents';

//get all applications
export const BASE_URL_APPLICATIONS = BASE_URL + 'applications';
// get post All form
export const BASE_URL_APPLICATION_DETAILS = BASE_URL + 'application/applicationdetails';

export const BASE_URL_APPLICATION_ACTIONS = BASE_URL + 'application/actions';
export const BASE_URL_APPLICATION_CRITICALITY_GROUP = BASE_URL + 'application/criticalitygroup';
export const BASE_URL_APPLICATION_DEALER_LOCATION = BASE_URL + 'dealer/search/locations'; //THIS WILL BE USE FOR --

export const BASE_URL_DOCUMENT_TYPE = BASE_URL + 'document';

export const BASE_URL_USER_MANAGEMENT_DEALER = BASE_URL + 'users/dealer';
export const BASE_URL_USER_MANAGEMENT_MANUFACTURER = BASE_URL + 'users/manufacturer';

export const BASE_URL_TERM_CONDITION_PRODUCT_HIERARCHY = BASE_URL + 'product/lov';
//export const BASE_URL_TERM_CONDITION_DOCUMENT_TYPE = BASE_URL + 'applications/documenttypes?code=tns&type=DOCUMENT';
export const BASE_URL_TERM_CONDITION_DOCUMENT_TYPE = BASE_URL + 'applications/documenttypes?code=TERMS_CONDITIONS&type=MODULE&onlyActive=yes';
export const BASE_URL_TERM_CONDITION_LANGUAGE = BASE_URL + 'configurableparametertypes?parameterType=MOTHER_TOUNGE';
export const BASE_URL_TERM_CONDITION_DEALER = BASE_URL + 'applications/termconditiondealer';
//export const BASE_URL_TERM_CONDITION_MANUFACTURER = BASE_URL + 'dealer/tncmanufracturer';
export const BASE_URL_TERM_CONDITION_MANUFACTURER = BASE_URL + 'applications/tncmanufracturer';
export const BASE_URL_TERM_CONDITION_CHANGE_HISTORY = BASE_URL + 'applications/termconditiondealerhistory';
export const BASE_URL_TERM_CONDITION_MANUFACTURER_CHANGE_HISTORY = BASE_URL + 'applications/tncmanufracturerhistory';

export const BASE_URL_LOYALTY_AND_SCHEME = BASE_URL + 'otf/loyalty/schemes';
export const BASE_URL_FAMILY_DETAIL_SEARCH = BASE_URL + 'customers/individual';
export const BASE_URL_INDIVIUAL_PROFILE_CUSTOMER_MASTER = BASE_URL + 'customers/individual/profile';
export const BASE_URL_CUSTOMER_MASTER_CUSTOMER_DETAILS_INDIVIDUAL = BASE_URL + 'customers/individual';
export const BASE_URL_CUSTOMER_MASTER_ACCOUNTS_RELATED_INDIVISUAL = BASE_URL + 'customers/individual/accounts';
export const BASE_URL_FAMILY_DETAIL_CUSTOMER_MASTER = BASE_URL + 'customers/individual/familydetails';
export const BASE_URL_CUSTOMER_MASTER_ADDRESS = BASE_URL + 'customers/individual/address';
export const BASE_URL_CUSTOMER_MASTER_ADDRESS_CORPORATE = BASE_URL + 'customers/corporate/address';
export const BASE_URL_CUSTOMER_MASTER_INDIVIDUAL_CONTACT = BASE_URL + 'customers/individual/contacts';
export const BASE_URL_INDIVIDUAL_NAME_CHANGE_REQUEST = BASE_URL + 'customers/individual/namechange/approval';

export const BASE_URL_CUSTOMER_MASTER_CORPORATE_PARENT_COMPANY = BASE_URL + 'customers/parent/company';
export const BASE_URL_CUSTOMER_MASTER_CUSTOMER_DETAILS = BASE_URL + 'customers/corporate';
export const BASE_URL_CUSTOMER_MASTER_CORPORATE_LOV = BASE_URL + 'customers/corporate/firms/lov';
export const BASE_URL_CUSTOMER_MASTER_FIRM_CONTACT = BASE_URL + 'customers/corporate/contacts';
export const BASE_URL_CUSTOMER_MASTER_ACCOUNTS_RELATED_CORPORATE = BASE_URL + 'customers/corporate/accounts';
export const BASE_URL_CORPORATE_COMPANY_LIST = BASE_URL + 'customers/corporate/firms';
export const BASE_URL_CORPORATE_COMPANY_PROFILE = BASE_URL + 'customers/corporate/profile';
export const BASE_URL_CORPORATE_SCHEME_REGISTRATION = BASE_URL + 'claims/corporate';

export const BASE_URL_OTF = BASE_URL + 'otf/';

export const BASE_URL_REFERRALS = BASE_URL_OTF + 'referrals';
export const BASE_URL_FINANCE = BASE_URL + 'finance/';
export const BASE_URL_ACCOUNTS = BASE_URL + 'accounts/';

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
export const BASE_URL_OTF_SO_MAPPING = BASE_URL_OTF + 'somapping';
export const BASE_URL_OTF_SO_USER_MAPPING = BASE_URL_OTF + 'somapping/users';
export const BASE_URL_OTF_SO_MAPPING_UNMAPPING_HISTORY = BASE_URL_OTF + 'somapping/history';
export const BASE_URL_OTF_BLOCK_MASTER = BASE_URL_OTF + 'blockmaster';
export const BASE_URL_DEALER_OTF_BLOCK_MASTER = BASE_URL + 'dealer/otf/block';
export const BASE_URL_OTF_EXCHANGE_VEHICLE_ALERT = BASE_URL + 'vehicle/exchangevehicle/prioritymasteralert';

export const BASE_URL_OTF_TRANSFER = BASE_URL_OTF + 'transfer';
export const BASE_URL_OTF_CANCELLATION = BASE_URL_OTF + 'request/cancel';
export const BASE_URL_OTF_CANCELLATION_WF = BASE_URL_OTF_CANCELLATION + '/approval';
export const BASE_URL_OTF_CANCELLATION_DEALER_SEARCH = BASE_URL + 'dealer/search';

export const BASE_URL_DOCUMENT_UPLOAD = BASE_URL + 'common/document/upload';
export const BASE_URL_DOCUMENT_DOWNLOAD = BASE_URL + 'common/document/download';
export const BASE_URL_DOCUMENT_VIEW_URL = BASE_URL + 'common/document/view';

export const BASE_URL_SALES_CONSULTANT = BASE_URL + 'users/dealer/employees/lov';
export const BASE_URL_OTF_CUSTOMER = BASE_URL + 'otf/customerdetails';

export const BASE_URL_INVOICE = BASE_URL + 'invoice/';
export const BASE_URL_RSM_APPROVAL = BASE_URL_INVOICE + 'rsm';
export const BASE_URL_DELIVERY_NOTE_INVOICE_CANCELLATION = BASE_URL_INVOICE + 'invoicedeliverynote/cancellation';
export const BASE_URL_DELIVERY_NOTE_INVOICE_CANCELLATION_SEARCH = BASE_URL_DELIVERY_NOTE_INVOICE_CANCELLATION + '/search';
export const BASE_URL_RSM_APPROVAL_SEARCH = BASE_URL_RSM_APPROVAL + '/search';
export const BASE_URL_INVOICE_DETAIL = BASE_URL_INVOICE + 'details';
export const BASE_URL_INVOICE_DEFECT_LOCATION = BASE_URL_INVOICE + 'defect/location';
export const BASE_URL_INVOICE_DEFECT_SHORTAGE = BASE_URL_INVOICE + 'defect/shortage/lov';

export const BASE_URL_VEHICLE = BASE_URL + 'vehicle/';
export const BASE_URL_CHARGER_INSTALLATION_SEARCH = BASE_URL_VEHICLE + 'charger/installation/search';
export const BASE_URL_CHARGER_INSTALLATION_GUEST_DETAILS = BASE_URL_VEHICLE + 'charger/installation/questdetails';
export const BASE_URL_CHARGER_INSTALLATION = BASE_URL_VEHICLE + 'charger/installation';
export const BASE_URL_VEHICLE_SEARCH = BASE_URL_VEHICLE + 'search';
export const BASE_URL_VIEW_VEHICLE_DETAILS = BASE_URL_VEHICLE + 'details';
export const BASE_URL_VEHICLE_CONTACTS = BASE_URL_VEHICLE + 'contacts';
export const BASE_URL_VEHICLE_PRODUCT_DETAILS = BASE_URL_VEHICLE + 'productdetails';
export const BASE_URL_VEHICLE_DETAILS_DOCUMENT = BASE_URL_VEHICLE + 'documents';
export const BASE_URL_VEHICLE_ENTITELMENT = BASE_URL_VEHICLE + 'schemes';
export const BASE_URL_VEHICLE_DETAILS_DELIVERY_NOTE = BASE_URL_VEHICLE + 'invoice/detail';
export const BASE_URL_VEHICLE_VARIANT = BASE_URL_VEHICLE + 'variant';
export const BASE_URL_VEHICLE_MAKE = BASE_URL_VEHICLE + 'make';
export const BASE_URL_VEHICLE_MODEL = BASE_URL_VEHICLE + 'model';
export const BASE_URL_VEHICLE_TRACKING = BASE_URL_VEHICLE + 'tracking';
export const BASE_URL_VEHICLE_CHECKLIST = BASE_URL_VEHICLE + 'checklist';
export const BASE_URL_VEHICLE_SALES_SCHEME_MASTER = BASE_URL_VEHICLE + 'schememaster/search';
export const BASE_URL_VEHICLE_SALES_SCHEME_MASTER_DETAILS = BASE_URL_VEHICLE + 'schememaster';
export const BASE_URL_VEHICLE_SALES_SCHEME_MASTER_UPLOAD = BASE_URL_VEHICLE + 'schememaster/upload';

export const BASE_URL_ACCOUNT_HEAD = BASE_URL + 'finance/financialaccountheads';

export const BASE_URL_CRM_SCHEME_ENROLLMENT = BASE_URL + 'vehicle/crmschemes/search';
export const BASE_URL_CRM_SCHEME_ENROLLMENT_DETAILS = BASE_URL + 'vehicle/crmschemes';
export const BASE_URL_DOCUMENT_DESCRIPTION_SEARCH = BASE_URL + 'applications/documenttypes/search';
export const BASE_URL_DOCUMENT_DESCRIPTION = BASE_URL + 'applications/documenttypes';

export const BASE_URL_FINANCIAL_ACC_TAX_CHARGE = BASE_URL + 'finance/tax/charges';
export const BASE_URL_FINANCIAL_ACC_TAX_CHARGE_CATEGORY_SEARCH = BASE_URL + 'finance/tax/chargecategory/search';
export const BASE_URL_FINANCIAL_ACC_TAX_CHARGE_CATEGORY = BASE_URL + 'finance/tax/chargecategory';
export const BASE_URL_FINANCIAL_ACC_ACCOUNT_CATEGORY_SEARCH = BASE_URL + 'finance/accounts/categories/search';
export const BASE_URL_FINANCIAL_ACC_ACCOUNT_CATEGORY = BASE_URL + 'finance/accounts/categories';
export const BASE_URL_FINANCIAL_ACC_APPLICATION_MENU = BASE_URL + 'home/menus';
export const BASE_URL_FINANCIAL_ACC_CHART_OF_ACCOUNT_HIERARCHY = BASE_URL + 'finance/chartofaccounts/hierarchy';
export const BASE_URL_FINANCIAL_ACC_CHART_OF_ACCOUNT = BASE_URL + 'finance/chartofaccounts';
export const BASE_URL_FINANCIAL_ACC_CHART_OF_ACCOUNT_EXPORT_COA = BASE_URL + 'reports/chartofaccounts/hierarchy/exportcoa';

export const BASE_URL_DOCUMENT_TYPE_LEDGER_SEARCH = BASE_URL + 'applications/documenttypes/search';
export const BASE_URL_DOCUMENT_TYPE_LEDGER = BASE_URL + 'finance/ledgermappings';

export const BASE_URL_FINANCIAL_ACC_TAX_CHARGE_TYPE = BASE_URL + 'finance/tax/chargetypes/lov';
export const BASE_URL_FINANCIAL_ACC_TAX_CHARGE_CODE = BASE_URL + 'finance/tax/charges/lov';
export const BASE_URL_FINANCIAL_ACC_ACCOUNT_CATEGORY_DOCUMENT_DESCRIPTION = BASE_URL + 'application/documenttypes/lov';
export const BASE_URL_FINANCIAL_ACCOUNTING = BASE_URL + 'finance/';
export const BASE_URL_VOUCHER = BASE_URL_FINANCIAL_ACCOUNTING + 'voucher/';
export const BASE_URL_CREDIT_DEBIT_NOTE = BASE_URL_VOUCHER + 'creditanddebit';
export const BASE_URL_CREDIT_DEBIT_NOTE_SEARCH = BASE_URL_CREDIT_DEBIT_NOTE + '/search';
export const BASE_URL_CREDIT_DEBIT_NOTE_DETAILS = BASE_URL_CREDIT_DEBIT_NOTE + '/details';

export const BASE_URL_VEHICLE_PRICE_MASTER = BASE_URL_VEHICLE + 'pricemaster';
export const BASE_URL_VEHICLE_PRICE_MASTER_SEARCH = BASE_URL_VEHICLE + 'pricemaster/search';
export const BASE_URL_VEHICLE_CUSTOMER_DETAIL = BASE_URL_VEHICLE + 'customerdetails';
export const BASE_URL_VEHICLE_CUSTOMER_COMMON_DETAIL = BASE_URL + 'customers/commondetails';
export const BASE_URL_CUSTOMER_VERIFY = BASE_URL + 'customers/verify';

export const BASE_URL_VEHICLE_PURCHASE_ORDER_DETAILS = BASE_URL + 'otf/vehicle/purchaseorder/search';
export const BASE_URL_VIEW_VEHICLE_PURCHASE_ORDER_DETAILS = BASE_URL + 'otf/vehicle/purchaseorder/';
export const BASE_URL_SAVE_VEHICLE_PURCHASE_ORDER_DETAILS = BASE_URL + 'otf/vehicle/purchaseorder';

export const BASE_URL_GET_DEALER_LOCATION_DETAILS = BASE_URL_DEALER_MANPOWER + '/search/locations';

export const BASE_URL_VEHICLE_RECEIPT_SEARCH_LIST = BASE_URL_INVOICE + 'receipts/search';
export const BASE_URL_SUPPLIER_INVOICE_DETAIL = BASE_URL_INVOICE + 'receipts/supplierdetails';
export const BASE_URL_VEHICLE_DETAIL = BASE_URL_INVOICE + 'receipts';
export const BASE_URL_REPORTS_GET_EMBEDED_INFO = BASE_URL + 'reports/getembedinfo';
export const BASE_URL_VEHICLE_MODEL_AND_TAX_CHARGE_CATEGORY = BASE_URL_FINANCE + 'accounts/vehiclemapping';
export const BASE_URL_VEHICLE_MODEL_AND_TAX_CHARGE_CATEGORY_PRODUCT_MODEL_GROUP = BASE_URL_PRODUCT_HIERARCHY + '/modelgroups/lov';
export const BASE_URL_VEHICLE_MODEL_AND_TAX_CHARGE_CATEGORY_ACCOUNT_CATEGORY = BASE_URL_FINANCE + 'accounts/categories';
export const BASE_URL_VEHICLE_MODEL_AND_TAX_CHARGE_CATEGORY_TAX_CHARGES = BASE_URL_FINANCE + 'tax/chargecategory';

export const BASE_URL_USER_MANAGEMENT = BASE_URL + 'users/';
export const BASE_URL_USER_MANAGEMENT_USER_SEARCH = BASE_URL_USER_MANAGEMENT + 'search';
export const BASE_URL_USER_MANAGEMENT_APPLICATIONS_DEALER = BASE_URL_USER_MANAGEMENT + 'dealer';
export const BASE_URL_USER_MANAGEMENT_MAC_ID = BASE_URL_USER_MANAGEMENT_APPLICATIONS_DEALER + '/devices';

export const BASE_URL_USER_MANAGEMENT_USER_DEALER_BRANCH_LOCATIONS = BASE_URL_USER_MANAGEMENT_APPLICATIONS_DEALER + '/location'; // MAPPED WITH USER
export const BASE_URL_USER_MANAGEMENT_DEALER_BRANCH_LOCATIONS = BASE_URL + 'dealer/parent/locations';
export const BASE_URL_USER_MANAGEMENT_DEALER_USER_BRANCH_LOCATIONS = BASE_URL + 'dealer/parent/locations'; //all location of dealer dealer/search/locations?dealerParentCode=DP007
export const BASE_URL_USER_DEALER_PRODUCT = BASE_URL + 'users/dealer/product';

export const BASE_URL_USER_MANAGEMENT_MANUFACTURER_APPLICATIONS = BASE_URL_USER_MANAGEMENT + 'manufacturer';
export const BASE_URL_USER_ROLE = BASE_URL_USER_MANAGEMENT + 'roles';
export const BASE_URL_ROLE_LIST = BASE_URL + 'application/rolemaster';

export const BASE_URL_DEALER_LIST = BASE_URL + 'dealer/details';

export const BASE_URL_RECEIPT_SEARCH_LIST = BASE_URL_FINANCE + 'receipts/search';
export const BASE_URL_RECEIPT_DETAILS = BASE_URL_FINANCE + 'receipts';
export const BASE_URL_CANCEL_RECEIPT = BASE_URL_RECEIPT_DETAILS + '/cancelreceipts';
export const BASE_URL_VEHICLE_RECEIPT_CHECKLIST_SUPPORTING_DOCUMENT = BASE_URL_VEHICLE + 'receiptchecklist/documents';
export const BASE_URL_VEHICLE_RECEIPT_CHECKLIST_MAIN = BASE_URL_VEHICLE + 'receiptchecklist/search';
export const BASE_URL_VEHICLE_RECEIPT_CHECKLIST_PROFILE = BASE_URL_VEHICLE + 'receiptchecklist/profile';
export const BASE_URL_VEHICLE_RECEIPT_CHECKLIST_MASTER = BASE_URL_VEHICLE + 'receiptchecklist/detail';
export const BASE_URL_VEHICLE_ALLOTMENT = BASE_URL + 'vehicle/allotments';

export const BASE_URL_VEHICLE_INVOICE = BASE_URL_OTF + 'vehicleinvoice';
export const BASE_URL_VEHICLE_INVOICE_DETAIL = BASE_URL_OTF + 'vehicleinvoice/details';
export const BASE_URL_VEHICLE_INVOICE_LIST = BASE_URL_VEHICLE_INVOICE + '/search';
export const BASE_URL_VEHICLE_INVOICE_IRN_GENERATION = BASE_URL_VEHICLE_INVOICE + '/irngeneration';
export const BASE_URL_VEHICLE_INVOICE_PROFILE_CARD = BASE_URL_VEHICLE_INVOICE + '/profile';

export const BASE_URL_VEHICLE_DETAILS_SERVICE = BASE_URL + 'otf/vehicledetails/optionalcharges';
export const BASE_URL_VEHICLE_CUSTOMER_CRM_DETAILS = BASE_URL + 'otf/vehiclecustomer/details';

export const BASE_URL_ON_ROAD_PRICE_MASTER_SEARCH = BASE_URL + 'vehicle/onroad/pricemaster/search';

export const BASE_URL_VIEWON_ROAD_PRICE_MASTER = BASE_URL + 'vehicle/onroad/pricemaster';

export const BASE_URL_MILE_SKILL = BASE_URL + 'dealer/mileskills';

export const BASE_URL_HO_PRICE_MAPPING = BASE_URL_VEHICLE + 'hopriceuploadmapping/search';
export const BASE_URL_HO_PRICE_MAPPING_DETAIL = BASE_URL_VEHICLE + 'hopriceuploadmapping';
export const BASE_URL_GET_VEHICLE_ALLOTMENT_PRIORITY = BASE_URL + 'vehicle/allotments/prioritymaster/search';
export const BASE_URL_VEHICLE_ALLOTMENT_PRIORITY = BASE_URL + 'vehicle/allotments/prioritymaster';

export const BASE_URL_NOTIFICATION = BASE_URL + 'applications/notifications';

export const BASE_URL_NOTIFICATION_COUNTS = BASE_URL + 'applications/notifications/counts';

export const BASE_URL_OTF_SO_MAPPING_MAIN = BASE_URL + 'otf/somapunmap';
export const BASE_URL_OTF_SO_MAPPING_SWAP = BASE_URL + 'otf/somapunmap/swap';
export const BASE_URL_SO_MAPPING_SEARCH = BASE_URL + 'otf/somapunmap/search';
export const BASE_URL_SO_MAPPING_OTF_SEARCH = BASE_URL + 'otf/somapunmap/orders';
export const BASE_URL_VEHICLE_MODEL_SO_MAPPING_SEARCH = BASE_URL + 'otf/vehicle/salesorder/search';

export const BASE_URL_STOCK_TRANSFER = BASE_URL_VEHICLE + 'stocktransfer';
export const BASE_URL_STOCK_TRANSFER_INDENT_ISSUE = BASE_URL_VEHICLE + 'stocktransfer/indent/issue';

export const BASE_URL_VEHICLE_DELIVERY_NOTE = BASE_URL_OTF + 'deliverynote/';
export const BASE_URL_VEHICLE_DELIVERY_NOTE_SEARCH = BASE_URL_VEHICLE_DELIVERY_NOTE + 'search';
export const BASE_URL_VEHICLE_DELIVERY_NOTE_GENERATE = BASE_URL_VEHICLE_DELIVERY_NOTE + 'generate';
export const BASE_URL_VEHICLE_DELIVERY_NOTE_CHALLAN_GENERATE = BASE_URL_VEHICLE_DELIVERY_NOTE + 'challan/generate';
export const BASE_URL_VEHICLE_DELIVERY_NOTE_INVOICE_DETAILS = BASE_URL_VEHICLE_DELIVERY_NOTE + 'invoicedetail';
export const BASE_URL_VEHICLE_DELIVERY_NOTE_CANCELLATION = BASE_URL_VEHICLE_DELIVERY_NOTE + 'cancel';
export const BASE_URL_VEHICLE_CUSTOMER_DETAILS = BASE_URL_CUSTOMER_MASTER + '/deliverynote/details';
export const BASE_URL_VEHICLE_ADD_ON_DETAILS = BASE_URL_VEHICLE_DELIVERY_NOTE + 'addondetail';
export const BASE_URL_DELIVERY_NOTE_INSURANCE_CHALLAN_DETAILS = BASE_URL_VEHICLE_DELIVERY_NOTE + 'challan/insurance';
export const BASE_URL_VEHICLE_ADD_ON_SCHEME_DESCRIPTION = BASE_URL_OTF + 'scheme/lov'; // otf/scheme/lov?invoiceNumber=INV1693579301957
export const BASE_URL_VEHICLE_ADD_ON_SCHEME_RSA_DESCRIPTION = BASE_URL_OTF + 'scheme/rsa/lov';
export const BASE_URL_VEHICLE_ADD_ON_SCHEME_AMC_DESCRIPTION = BASE_URL_OTF + 'scheme/amc/lov';
export const BASE_URL_CHALLAN_VIN_SEARCH = BASE_URL_VEHICLE_DELIVERY_NOTE + 'challan/chassis';
export const BASE_URL_CHALLAN_ENGINE_NUMBER = BASE_URL + 'vehicle/invoice/challan/detail';
export const BASE_URL_VEHICLE_CHALLAN_DETAILS_DELIVERY_NOTE = BASE_URL_VEHICLE + 'invoice/challan/detail';
export const BASE_URL_VEHICLE_CHALLAN_INVOICE_DETAILS_DELIVERY_NOTE = BASE_URL + 'otf/deliverynote/challan/chassis/details';
export const BASE_URL_VEHICLE_CHALLAN_INSURANCE_DETAILS_DELIVERY_NOTE = BASE_URL + 'otf/deliverynote/challan/insurance';
export const BASE_URL_VEHICLE_CHALLAN_CANCEL_DELIVERY_NOTE = BASE_URL + 'otf/delivery/challan/cancel/info';
export const BASE_URL_VEHICLE_INFO_CANCEL_DELIVERY_NOTE = BASE_URL + 'otf/deliverynote/cancellation/information';
export const BASE_URL_VEHICLE_CHALLAN_CANCEL_NOTE = BASE_URL + 'otf/delivery/challan/cancel';
export const BASE_URL_VEHICLE_CHANGE_MODEL_VARIANT = BASE_URL + 'otf/vehicle/modelchange';

export const BASE_URL_RELATIONSHIP_MANAGER = BASE_URL_USER_MANAGEMENT_APPLICATIONS_DEALER + '/employees';
export const BASE_URL_DELIVERY_NOTE_VEHICLE_DETAILS = BASE_URL_OTF_VEHICLE_DETAILS + '/search/registrationnumber';
export const BASE_URL_VEHICLE_INVOICE_GENERATION_PROFILE_CARD = BASE_URL_OTF + 'vehicleinvoice/profile';

export const BASE_URL_VIN_BLOCK_MASTER = BASE_URL_VEHICLE + 'vinbolckmaster/search';
export const BASE_URL_VIN_BLOCK_VIEWMASTER = BASE_URL_VEHICLE + 'vinbolckmaster';

export const BASE_URL_GSTIRN_TRANSACTION_SEARCH = BASE_URL_OTF + 'irn/transactions/search';
export const BASE_URL_GSTIRN_TRANSACTION_GSTIN = BASE_URL + 'dealer/parent/gstin/lov';
export const BASE_URL_GSTIRN_TRANSACTION_VIEW_DOC = BASE_URL + 'common/document/view';
export const BASE_URL_GSTIRN_TRANSACTION_UPLOAD_DOC = BASE_URL + 'dealer/parent/gstin/lov';
export const BASE_URL_EVR_DETAILS_CAPTURING_SEARCH = BASE_URL_VEHICLE + 'evr/details/search';
export const BASE_URL_EVR_DETAILS_CAPTURING_DETAIL = BASE_URL_VEHICLE + 'evr/details';
export const BASE_URL_VEHICE_DELIVERY_NOTE_MASTER_DATA = BASE_URL_OTF + 'deliverynote/dealer/detail';
export const BASE_URL_VEHICE_DELIVERY_NOTE_CHALLAN_MASTER_DATA = BASE_URL_OTF + 'delivery/challan/detail';

export const BASE_URL_GST_LOGIN = BASE_URL + 'finance/gstirnauthentication/login';
export const BASE_URL_RSM_ASM_APPROVAL_SEARCH = BASE_URL_INVOICE + 'invoicedeliverynote/cancellation/approval/search';
export const BASE_URL_APPROVAL_CANCEL_REQUEST_URL = BASE_URL_DELIVERY_NOTE_INVOICE_CANCELLATION + '/approval';

export const BASE_URL_DEALER_BRANCH_ACCESS = BASE_URL_DEALER_MANPOWER + '/parent/locations';
export const BASE_URL_DEALER_GST = BASE_URL_DEALER_MANPOWER + '/parent/gstin/lov';
export const BASE_URL_VEHICLE_CHECKLIST_MASTER = BASE_URL + 'vehicle/checklist/checklistmaster';

export const BASE_URL_AMC_REGISTRATION = BASE_URL + 'vehicle/amc';
export const BASE_URL_AMC_REGISTRATION_SEARCH = BASE_URL_AMC_REGISTRATION + '/search';
export const BASE_URL_AMC_REGISTRATION_DATA = BASE_URL_AMC_REGISTRATION + '/registration/details';
export const BASE_URL_AMC_EMPLOYEE_SEARCH = BASE_URL + 'users/dealer/employees';
export const BASE_URL_AMC_SCHEMES = BASE_URL_AMC_REGISTRATION + '/scheme';
export const BASE_URL_GST_DOCID_NAME = BASE_URL + 'finance/gstirnauthentication';
export const BASE_URL_RSM_ASM_APPROVAL_DETAILS = BASE_URL_RSM_ASM_APPROVAL_SEARCH + '/details';

export const BASE_URL_SHIELD_REGISTRATION = BASE_URL + 'vehicle/shieldschemes/registration';
export const BASE_URL_SHIELD_REGISTRATION_SEARCH = BASE_URL_SHIELD_REGISTRATION + '/search';
export const BASE_URL_SCHEME_DESCRIPTION_LOV = BASE_URL + 'vehicle/shieldschemes/lov';
export const BASE_URL_SHIELD_SCHEME_CATEGORY_LOV = BASE_URL + 'vehicle/shieldschemes/category/lov';
export const BASE_URL_RSA_SCHEME_CATEGORY_LOV = BASE_URL + 'vehicle/rsa/schemecategory/lov';
export const BASE_URL_AMC_SCHEME_CATEGORY_LOV = BASE_URL + 'vehicle/amc/schemecategory/lov';
export const BASE_URL_RSA_REGISTRATION = BASE_URL + 'vehicle/rsa';
export const BASE_URL_RSA_REGISTRATION_SEARCH = BASE_URL_RSA_REGISTRATION + '/search';
export const BASE_URL_GET_REGISTRATION_DETAILS = BASE_URL_RSA_REGISTRATION + '/registration/details';

export const BASE_URL_DASHBOARD_STOCKS_STATICS = BASE_URL + 'invoice/ibdnstockscount';
export const BASE_URL_DASHBOARD_BILLING_STATICS = BASE_URL + 'geography/billingcount';
export const BASE_URL_DASHBOARD_RETAIL_STATICS = BASE_URL + 'geography/retailcount';

export const BASE_URL_ZONE_MASTER = BASE_URL + 'zone/lov';
export const BASE_URL_AREA_OFFICE = BASE_URL + 'area/lov';
export const BASE_URL_CO_DEALER_INVOICE = BASE_URL_OTF + 'codealerinvoice/search';
export const BASE_URL_CO_DEALER_DETAILS = BASE_URL_OTF + 'codealerinvoice';
export const BASE_URL_DEALER_LOCATIONS = BASE_URL + 'dealer/location';
export const BASE_URL_SCHEME_RSA_DESCRIPTION = BASE_URL_VEHICLE + 'scheme/rsa/lov';
export const BASE_URL_CO_DEALER_VIN_DETAILS = BASE_URL_VEHICLE_ALLOTMENT + '/search';
export const BASE_URL_TAX_CALCULATION = BASE_URL_OTF + 'codealerinvoice/taxdetails';
export const BASE_URL_APPORTION_DETAILS_SEARCH = BASE_URL_FINANCE + 'documentdetails';
export const BASE_URL_RSM_APPROVAL_FORM_DATA = BASE_URL_INVOICE + 'codealer/rsmapproval';
export const BASE_URL_OTF_FAME_DETAILS = BASE_URL_OTF + 'fame/detail/search';
export const BASE_URL_OTF_FAME_DETAILS_SAVE = BASE_URL_OTF + 'fame/detail';
