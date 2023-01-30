import { combineReducers } from 'redux';

import { auth } from './auth';
import { authPages } from './authPages';

const appReducer = combineReducers({
    auth,
    authPages,
});
//const initialState = appReducer({}, {})

export const rootReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};
