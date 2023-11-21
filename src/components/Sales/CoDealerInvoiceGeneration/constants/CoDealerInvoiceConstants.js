/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const CO_DEALER_QUERY_BUTTONS = {
    PENDING: {
        id: 'pending',
        title: 'Pending',
        key: 'P',
        active: true,
    },
    CANCELLED: {
        id: 'cancelled',
        title: 'Cancelled',
        key: 'C',
        active: false,
    },
    INVOICED: {
        id: 'invoiced',
        title: 'Invoiced',
        key: 'I',
        active: false,
    },
};
export const CO_DEALER_SECTIONS = {
    INVOICE_DETAILS: {
        id: 1,
        title: 'Invoice Details',
        displayOnList: true,
    },
    VEHICLE_DETAILS: {
        id: 2,
        title: 'Vehicle Details',
        displayOnList: true,
    },
    THANK_YOU_PAGE: {
        id: 3,
        title: 'Thank You',
        displayOnList: false,
    },
};
