/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const getUserId = (state) => state.auth.userId;
export const getAuthToken = (state) => state.auth.token;
export const getAuthAccessToken = (state) => state.auth.accessToken;
export const getAuthRefreshToken = (state) => state.auth.refreshToken;
