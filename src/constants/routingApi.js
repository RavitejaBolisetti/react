export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const BASE_URL_LOGIN = BASE_URL + 'login';
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
export const BASE_URL_MANUFACTURER_ADMIN_AUTHORITY_CHANGE_HISTORY = BASE_URL + 'manufacturer/authority/changehistory';
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

export const BASE_URL_TERM_CONDITION_PRODUCT_HIERARCHY = BASE_URL + 'product';
//export const BASE_URL_TERM_CONDITION_DOCUMENT_TYPE = BASE_URL + 'appmst/documenttypes?code=tns&type=DOCUMENT';
export const BASE_URL_TERM_CONDITION_DOCUMENT_TYPE = BASE_URL + 'appmst/documenttypes?code=TERMS_CONDITIONS&type=MODULE';
export const BASE_URL_TERM_CONDITION_LANGUAGE = BASE_URL + 'configurableparametertypes?parameterType=MOTHER_TOUNGE';
export const BASE_URL_TERM_CONDITION_DEALER = BASE_URL + 'appmst/termconditiondealer';
//export const BASE_URL_TERM_CONDITION_MANUFACTURER = BASE_URL + 'dealer/tncmanufracturer';
export const BASE_URL_TERM_CONDITION_MANUFACTURER = BASE_URL + 'appmst/tncmanufracturer';
export const BASE_URL_TERM_CONDITION_CHANGE_HISTORY = BASE_URL + 'appmst/termconditiondealerhistory';
export const BASE_URL_TERM_CONDITION_MANUFACTURER_CHANGE_HISTORY = BASE_URL + 'appmst/tncmanufracturerhistory';

export const BASE_URL_OTF_REPORTS = BASE_URL + 'customreports/otf/names';
export const BASE_URL_OTF_DOWNLAOD_REPORT = BASE_URL + 'customreports/otf/register';

export const BASE_URL_FAMILY_DETAIL_CUSTOMER_MASTER = BASE_URL + 'customers//individual/familydetails';
export const BASE_URL_FAMILY_DETAIL_CUSTOMER_MASTER_SAVE = BASE_URL + 'customers//individual/familydetails';