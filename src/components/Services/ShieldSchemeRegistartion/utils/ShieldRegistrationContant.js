/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const QUERY_BUTTONS_CONSTANTS = {
    PENDING: {
        id: 'pending',
        title: 'Pending',
        key: 'PEND',
        active: true,
    },
    APPROVED: {
        id: 'approved',
        title: 'Approved',
        key: 'APPR',
        active: true,
    },
    REJECTED: {
        id: 'rejected',
        title: 'Rejected',
        key: 'REJD',
        active: true,
    },
    CANCELLED: {
        id: 'cancelled',
        title: 'Cancelled',
        key: 'CNCL',
        active: false,
    },
};

export const QUERY_BUTTONS_MNM_USER = {
    PENDING_FOR_APPROVAL: {
        id: 'pendingApproval',
        title: 'Pending for Approval',
        key: 'PFA',
        active: true,
    },

    PENDING_FOR_CANCELLATION: {
        id: 'pendingCancellation',
        title: 'Pending for Cancellation',
        key: 'PFC',
        active: true,
    },
};
