/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import { combineReducers } from 'redux';

import { customerDetail } from './customerDetail';
import { customerContacts } from './customerContacts';

export const customer = combineReducers({
    customerDetail,
    customerContacts,
});
