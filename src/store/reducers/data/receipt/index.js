/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { ReceiptSearchList } from './receipt';
import { ReceiptDetails } from './receiptDetails';
import { PartyDetails } from './partyDetails';

export const Receipt = combineReducers({
    ReceiptSearchList,
    ReceiptDetails,
    PartyDetails,
});
