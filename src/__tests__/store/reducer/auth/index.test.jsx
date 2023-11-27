/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { auth } from 'store/reducers/auth';

describe('auth reducer', () => {
    const initialState = { name: 'kAI' };
    it('should handle AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE', () => {
        const action = {
            type: 'AUTH_LOGIN_SUCCESS',
            isLoaded: true,
            data: [{ id: 1, name: 'User 1' }],
        };
        auth(initialState, action);
    });

    it('should handle AUTH_LOGIN_SUCCESS', () => {
        const action = {
            type: 'AUTH_LOGIN_PRE_SUCCESS',
            isLoaded: true,
            data: [{ id: 1, name: 'User 1' }],
        };
        auth(initialState, action);
    });

    it('should handle AUTH_LOGIN_ERROR', () => {
        const action = {
            type: 'AUTH_LOGIN_ERROR',
            isLoaded: true,
            data: [{ id: 1, name: 'User 1' }],
        };
        auth(initialState, action);
    });

    it('should handle AUTH_LOGIN_ERROR_CLOSE', () => {
        const action = {
            type: 'AUTH_LOGIN_ERROR_CLOSE',
            isLoaded: true,
            data: [{ id: 1, name: 'User 1' }],
        };
        auth(initialState, action);
    });

    it('should handles AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE', () => {
        const action = {
            type: 'AUTH_LOGIN_USER_UNAUTHENTICATED_CLOSE',
            isLoaded: true,
            data: [{ id: 1, name: 'User 1' }],
        };
        auth(initialState, action);
    });

    it('should handles AUTH_LOGOUT', () => {
        const action = {
            type: 'AUTH_LOGOUT',
            isLoaded: true,
            data: [{ id: 1, name: 'User 1' }],
        };
        auth(initialState, action);
    });

    it('should handles USER_UNAUTHENTICATED', () => {
        const action = {
            type: 'USER_UNAUTHENTICATED',
            isLoaded: true,
            data: [{ id: 1, name: 'User 1' }],
        };
        auth(initialState, action);
    });

    it('should handles default value', () => {
        const action = {
            type: 'default',
            isLoaded: true,
            data: [{ id: 1, name: 'User 1' }],
        };
        auth(initialState, action);
    });
});
