/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { auth } from './auth';
import { authPages } from './authPages';
import { common } from './common';
import { data } from './data';
import { notification } from './notification';
import { customer } from './customer';

const appReducer = combineReducers({
    auth,
    authPages,
    common,
    data,
    notification,
    customer,
});

export const rootReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};
