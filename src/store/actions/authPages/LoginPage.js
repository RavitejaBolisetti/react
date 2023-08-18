/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const LOGIN_PAGE_LOGGING_IN = 'LOGIN_PAGE_LOGGING_IN';
export const LOGIN_PAGE_CLEAR = 'LOGIN_PAGE_CLEAR';

export const loginPageIsLoading = (isLoading = true) => ({
    type: LOGIN_PAGE_LOGGING_IN,
    isLoading,
});

export const loginPageClear = () => ({
    type: LOGIN_PAGE_CLEAR,
});

