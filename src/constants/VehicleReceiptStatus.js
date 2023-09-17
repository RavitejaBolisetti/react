/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const VEHICLE_RECEIPT_STATUS = {
    IN_TRANSIT: {
        id: 1,
        key: 'TRN',
        title: 'In-Transit',
        desc: 'In-Transit',
        active: true,
    },
    PARTIALLY_RECEIVED: {
        id: 2,
        key: 'PARCV',
        title: 'Partially Received',
        desc: 'Partially Received',
        active: false,
    },
    RECEIVED: {
        id: 3,
        key: 'RCV',
        title: 'Received',
        desc: 'Received',
        active: false,
    },
    RETURNED: {
        id: 4,
        key: 'RTRN',
        title: 'Returned',
        desc: 'Returned',
        active: false,
    },
};
