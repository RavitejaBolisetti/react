/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Header } from '@store/reducers/common/header';

describe('Header reducer', () => {
    const initialState = {
        isLoaded: false,
        data: [],
        isLoading: false,
    };

    it('should handle HEADER_USER_DATA_LOADED action', () => {
        const action = {
            type: 'HEADER_USER_DATA_LOADED',
            isLoaded: true,
            data: [{ id: 1, name: 'User 1' }],
        };

        const newState = Header(initialState, action);

        expect(newState).toEqual({
            isLoaded: true,
            data: [{ id: 1, name: 'User 1' }],
            isLoading: false,
        });
    });

    it('should handle HEADER_USER_DATA_SHOW_LOADING action', () => {
        const action = {
            type: 'HEADER_USER_DATA_SHOW_LOADING',
            isLoading: true,
        };

        const newState = Header(initialState, action);

        expect(newState).toEqual({
            isLoaded: false,
            data: [],
            isLoading: true,
        });
    });

    it('should handle HEADER_USER_DATA_CLEAR action', () => {
        // Set the state to something different from the initial state
        const currentState = {
            isLoaded: true,
            data: [{ id: 1, name: 'User 1' }],
            isLoading: true,
        };

        const action = {
            type: 'HEADER_USER_DATA_CLEAR',
        };

        const newState = Header(currentState, action);

        expect(newState).toEqual(initialState);
    });

    it('should return the current state for an unknown action', () => {
        const currentState = {
            isLoaded: true,
            data: [{ id: 1, name: 'User 1' }],
            isLoading: true,
        };

        const action = {
            type: 'UNKNOWN_ACTION',
        };

        const newState = Header(currentState, action);

        expect(newState).toEqual(currentState);
    });
});
