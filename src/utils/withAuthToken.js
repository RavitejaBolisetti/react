/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { getAuthToken, getAuthRefreshToken, getAuthAccessToken, getUserId } from '../store/state/auth';

export const withAuthToken = (fn) => {
    return (...params) =>
        (dispatch, getState) => {
            const token = getAuthToken(getState());
            const userId = getUserId(getState());
            const accessToken = getAuthAccessToken(getState());
            const refreshToken = getAuthRefreshToken(getState());
            return fn(...params)({ token, accessToken, userId, refreshToken })(dispatch);
        };
};
