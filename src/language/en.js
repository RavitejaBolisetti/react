/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const LANGUAGE_EN = {
    GENERAL: {
        NETWORK_ERROR: { TITLE: 'Network Error', MESSAGE: 'Please check your internet connection.' },
        REQUEST_TIMEOUT: { TITLE: 'Request Timeout', MESSAGE: 'Request timeout. Please try again.' },
        AUTHORIZED_REQUEST: { TITLE: 'Authorized Request', MESSAGE: 'Sorry you are not authorised to view this page. Please login again.' },
        NO_RESPONSE: { TITLE: 'Error', MESSAGE: 'No response received from the server.' },
        ERROR: { TITLE: 'ERROR', MESSAGE: 'We are facing server issue. Please try again.' },
        INTERNAL_SERVER_ERROR: { TITLE: 'Server Error', MESSAGE: 'Internal server error. Please try again.' },
        SESSION_EXPIRED: { TITLE: 'Session Expired', MESSAGE: 'Your session has been expired. Please login again' },
        NO_DATA_EXIST: { TITLE: 'No records found', MESSAGE: 'Please add New "{NAME}" using below button' },
        LIST_NO_DATA_FOUND_WITH_ADD: { TITLE: 'No records found', MESSAGE: 'Please add New "{NAME}" using below button' },
        LIST_NO_DATA_FOUND: { TITLE: 'No records found', MESSAGE: '' },
        NO_DATA_VALIDATOIN: { TITLE: 'Error', MESSAGE: 'Please add {NAME}  to proceed' },
        ADD_DEALER_LOCATION: { TITLE: 'Success', MESSAGE: 'Location added successfully' },
        ADD_DUPLICATE_DEALER_LOCATION: { TITLE: 'Error', MESSAGE: 'This location is already added' },
        REMOVE_DEALER_LOCATION: { TITLE: 'Delete', MESSAGE: '{NAME} deleted sucessfully' },
        ALLOWED_TIMING_DELETED: { TITLE: 'SUCCESS', MESSAGE: 'Group Timing has been deleted Successfully' },
        TIME_OVERLAPPING: { TITLE: 'ERROR', MESSAGE: 'Time overlaps with other time' },
        START_TIME_GREATER_THAN_END_TIME: { TITLE: 'ERROR', MESSAGE: 'Start Time cannot be greater than End Time' },
        HIERARCHY_SAME_PARENT_AND_CHILD_WARNING: { TITLE: 'WARNING', MESSAGE: 'Select different parent' },
        THANK_YOU_PAGE_OTF: { TITLE: 'Booking form updated successfully', MESSAGE: 'Booking number: {ORDER_ID}' },
        CUSTOMER_UPDATE: { TITLE: 'Success', MESSAGE: 'Customer detail edited successfully' },
        THANK_YOU_PAGE_INVOICE: { TITLE: 'Invoice number created successfully', MESSAGE: 'Booking number: {ORDER_ID}' },

        DOWNLOAD_START: { TITLE: 'Download', MESSAGE: 'Your download will start soon' },
        USER_TOKEN_VALIDATION: { TITLE: 'Error', MESSAGE: 'User token number {DealerSearchvalue} does not exist. Try again with valid token number' },
        APPLICATON_REQUIRE_VALIDATION: { TITLE: 'Error', MESSAGE: 'Please provide {NAME} to proceed' },
        DELIVERY_NOTE_MESSAGE: { TITLE: 'Delivery {NAME} created successfully', MESSAGE: 'Delivery Note No.: {ORDER_ID}' },
        USER_NOT_FOUND: { TITLE: 'User not found', MESSAGE: 'User does not exist, do you want to create user?' },
        PAGE_NOT_FOUND: { TITLE: 'Page Not Found', MESSAGE: '<p>Sorry, the page you visited does not exist. Redirecting to dashboard in <b>{COUNTER}</b></p>' },
        NO_EMPLOYEES_FOUND: { TITLE: 'Employees not found', MESSAGE: 'No employees found for searched name' },
        NO_VIN_FOUND: { TITLE: 'VIN not found',     MESSAGE: 'No VIN found for searched Booking Number' },
        APPROVE_CONFIRMATION: { TITLE: 'Approve Name', MESSAGE: 'Are you sure want to approve the changes within the current name?' },
        UNSAVE_DATA_WARNING: { TITLE: 'Are you sure you want to leave ?', MESSAGE: 'You have unsave changes. All changes may lost.' },
    },
};
