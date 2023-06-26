/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { customerDetail } from './customerDetail';
import { customerContacts } from './customerContacts';
import { customerContactsIndividual } from './customerContactsIndividual'

export const customer = combineReducers({
    customerDetail,
    customerContacts,
    customerContactsIndividual,
});
