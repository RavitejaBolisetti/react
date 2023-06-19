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
