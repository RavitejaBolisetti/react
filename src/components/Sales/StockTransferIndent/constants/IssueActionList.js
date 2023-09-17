/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

export const ISSUE_ACTION_LIST = {
    CANCEL: {
        id: 'Cancel',
        key: 'CNCL',
        title: 'Cancel Issue',
        modalButtonName: 'Yes',
        modelMessage: 'Do you want to cancel this issue ?',
    },
    RECEIVED: {
        id: 'Received',
        key: 'REC',
        title: 'Receive Vehicle',
        modalButtonName: 'Yes, Recieve',
        modelMessage: 'Do you want to receive this ?',
    },
    RETURNED: {
        id: 'Returned',
        key: 'RET',
        title: 'Return Vehicle',
        modalButtonName: 'Yes, Return',
        modelMessage: 'Do you want to return this ?',
    },
    ISSUED: {
        id: 'Issued',
        key: 'I',
        title: '',
        modalButtonName: 'Yes Return',
    },
};
