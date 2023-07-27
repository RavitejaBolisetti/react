/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const VEHICLE_RECEIPT_STATUS = {
    IN_TRANSIT: {
        id: 1,
        key: 'O',
        title: 'In-Transit',
        desc: 'In-Transit',
        displayOnView: true,
    },
    PARTIALLY_RECEIVED: {
        id: 2,
        key: 'A',
        title: 'PartiallyReceived',
        desc: 'PartiallyReceived',
        displayOnView: true,
    },
    RECEIVED: {
        id: 3,
        key: 'C',
        title: 'Received',
        desc: 'Received',
        displayOnView: true,
    },
    RETURNED: {
        id: 4,
        key: 'I',
        title: 'Returned',
        desc: 'Returned',
        displayOnView: true,
    },
};
