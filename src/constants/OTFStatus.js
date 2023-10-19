/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
// export const VEHICLE_COMPANY_MAKE = 'MAL';
export const VEHICLE_COMPANY_MAKE = 'MM';

export const OTF_STATUS = {
    BOOKED: {
        id: 1,
        key: 'O',
        title: 'Booked',
        desc: 'Booked',
        displayonview: true,
        filter: true,
    },
    ALLOTED: {
        id: 2,
        key: 'A',
        title: 'Allotted',
        desc: 'Allotted',
        displayonview: true,
        filter: true,
    },
    CANCELLED: {
        id: 3,
        key: 'C',
        title: 'Cancelled',
        desc: 'Cancelled',
        displayonview: true,
        filter: true,
    },
    INVOICED: {
        id: 4,
        key: 'I',
        title: 'Invoiced',
        desc: 'Invoiced',
        displayonview: true,
        filter: true,
    },
    DELIVERED: {
        id: 5,
        key: 'D',
        title: 'Delivered',
        desc: 'Delivered',
        displayonview: true,
        filter: true,
    },
    TRANSFERRED: {
        id: 6,
        key: 'T',
        title: 'Transferred',
        desc: 'Transferred',
        displayonview: false,
        filter: true,
    },
    PENDING_FOR_CANCELLATION: {
        id: 7,
        key: 'PND',
        title: 'Pending for Cancellation',
        desc: 'Pending for Cancellation',
        displayonview: true,
        filter: true,
    },
    CANCELLATION_REQUESTED: {
        id: 8,
        key: 'Cancellation Requested',
        title: 'Cancellation Requested',
        desc: 'Cancellation Requested',
        displayonview: false,
    },
    REJECTED: {
        id: 9,
        key: 'Rejected',
        title: 'Rejected',
        desc: 'Rejected',
        displayonview: false,
    },
    DELIVERY_NOTE: {
        id: 9,
        key: 'N',
        title: 'Delivery Note',
        desc: 'Delivery Note',
        displayonview: false,
    },
    UNALLOTED: {
        id: 10,
        key: 'UN',
        title: 'Un-Alloted',
        desc: 'Un-Alloted',
        displayonview: false,
    },
};
