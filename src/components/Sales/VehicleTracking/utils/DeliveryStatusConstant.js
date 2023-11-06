import { translateContent } from "utils/translateContent";

/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const DELIVERY_STATUS_CONSTANT = {
    DISPATCHED: {
        id: 1,
        title: translateContent('vehicleTracking.title.dispatched'),
        key: 'Dispatched',
    },
    INTRANSIT: {
        id: 2,
        title: translateContent('vehicleTracking.title.inTransit'),
        key: 'InTransit',
    },
    DELIVERED: {
        id: 3,
        title: translateContent('vehicleTracking.title.delivered'),
        key: 'Delivered',
    },
    RECEIVED: {
        id: 4,
        title: translateContent('vehicleTracking.title.received'),
        key: 'Received',
    },
};
