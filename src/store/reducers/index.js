import { combineReducers } from 'redux';

import { auth } from './auth';
import { authPages } from './authPages';
import { common } from './common';

const appReducer = combineReducers({
    auth,
    authPages,
    common,
});

export const rootReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};
