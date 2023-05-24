export const ROUTING_HOME = '/';

export const ROUTING_SSO_LOGIN = '/adidaccess';

export const ROUTING_LOGIN = '/login';
// export const ROUTING_LOGOUT = '/logout';
export const ROUTING_FORGOT_PASSWORD = '/forgot-password';
export const ROUTING_UPDATE_PASSWORD = '/update-password';

export const ROUTING_DASHBOARD = '/dashboard';

export const ROUTING_COMMON = '/common/';
export const ROUTING_MILE = '/mile/';
export const ROUTING_COMMON_GEO = ROUTING_COMMON.concat('geo/');

export const ROUTING_COMMON_GEO_COUNTRY = ROUTING_COMMON_GEO.concat('country');
export const ROUTING_COMMON_GEO_STATE = ROUTING_COMMON_GEO.concat('state');
export const ROUTING_COMMON_GEO_DISTRICT = ROUTING_COMMON_GEO.concat('district');
export const ROUTING_COMMON_GEO_CITY = ROUTING_COMMON_GEO.concat('city');
export const ROUTING_COMMON_GEO_TEHSIL = ROUTING_COMMON_GEO.concat('tehsil');
export const ROUTING_COMMON_GEO_PINCODE = ROUTING_COMMON_GEO.concat('pincode');

export const ROUTING_COMMON_PRODUCT_MASTER = ROUTING_COMMON.concat('product-master');
export const ROUTING_COMMON_PRODUCT_HIERARCHY = ROUTING_COMMON.concat('product-hierarchy');
export const ROUTING_COMMON_APPLICATION_MASTER = ROUTING_COMMON.concat('application-master');
export const ROUTING_COMMON_CRITICALITY_GROUP = ROUTING_COMMON.concat('criticality-group');
export const ROUTING_COMMON_ROLE_MANAGEMENT = ROUTING_COMMON.concat('role-management');
export const ROUTING_COMMON_USER_MANAGEMENT = ROUTING_COMMON.concat('user-management');
export const ROUTING_COMMON_CUSTOMER_MASTER = ROUTING_COMMON.concat('customer-master');

export const ROUTING_COMMON_HIERARCHY_ATTRIBUTE_MASTER = ROUTING_COMMON.concat('hierarchy-attribute-master');
export const ROUTING_COMMON_BRANCH_DEALER_MAPPING = ROUTING_COMMON.concat('branch-dealer-mapping');

export const ROUTING_COMMON_PARTY_MASTER = ROUTING_COMMON.concat('party-master');

export const ROUTING_COMMON_QUALIFICATION_MASTER = ROUTING_COMMON.concat('qualification-master');

export const ROUTING_MILE_DEALER_MANPOWER = ROUTING_MILE.concat('dealer-manpower/');
export const ROUTING_MILE_DEALER_MANPOWER_LOCATION_TYPE_MASTER = ROUTING_MILE_DEALER_MANPOWER.concat('location-type-master');
export const ROUTING_MILE_DEALER_MANPOWER_DIVISION_MASTER = ROUTING_MILE_DEALER_MANPOWER.concat('division-master');
export const ROUTING_MILE_DEALER_MANPOWER_BAY_TYPE_MASTER = ROUTING_MILE_DEALER_MANPOWER.concat('bay-type-master');
export const ROUTING_MILE_DEALER_MANPOWER_DESIGNATION_MASTER = ROUTING_MILE_DEALER_MANPOWER.concat('designation-master');
export const ROUTING_MILE_DEALER_MANPOWER_EMPLOYEE_DEPARTMENT_MASTER = ROUTING_MILE_DEALER_MANPOWER.concat('employee-department');
export const ROUTING_MILE_DEALER_MANPOWER_ROLE_MASTER = ROUTING_MILE_DEALER_MANPOWER.concat('role-master');

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
export const ROUTING_REPORT_EMBEDDED_REPORT = ROUTING_REPORT.concat('embedded-report');
export const ROUTING_REPORT_URL_FILTER_REPORT = ROUTING_REPORT.concat('url-filter-report');

export const ROUTING_ADMIN = '/admin/';

export const ROUTING_ADMIN_USER_MANAGEMENT = ROUTING_ADMIN.concat('user-management/');
export const ROUTING_USER_MANAGEMENT_DEALER = ROUTING_ADMIN_USER_MANAGEMENT.concat('dealer');
export const ROUTING_USER_MANAGEMENT_MANUFACTURER = ROUTING_ADMIN_USER_MANAGEMENT.concat('manufacturer');

