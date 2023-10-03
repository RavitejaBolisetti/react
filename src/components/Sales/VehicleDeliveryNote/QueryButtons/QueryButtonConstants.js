/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const QUERY_BUTTONS = {
    PENDING: {
        id: 'pending',
        title: 'Pending',
        key: 'pending',
        active: true,
    },
    GENERATED: {
        id: 'generated',
        title: 'Generated',
        key: 'generated',
        active: false,
    },
    CANCELLED: {
        id: 'cancelled',
        title: 'Cancelled',
        key: 'cancelled',
        active: false,
    },
};
export const DELIVERY_NOTE_MESSAGE_CONSTANTS ={
    DELIVERY_NOTE_DETAILS_NOT_PRESENT:{
        id: 1,
        notificationType: 'error',
        title: 'Error',
        message: 'delivery note details not present',
    }
}

