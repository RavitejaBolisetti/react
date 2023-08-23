/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { useLocation } from 'react-router-dom';

import { LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN, LOCAL_STORAGE_KEY_AUTH_ID_TOKEN, LOCAL_STORAGE_KEY_AUTH_USER_ID } from 'store/actions/auth';
import jwtDecode from 'jwt-decode';
import { ROUTING_DASHBOARD, ROUTING_LOGIN } from 'constants/routing';

export const SSOLoginPage = () => {
    // const search = useLocation().search;
    // const id = new URLSearchParams(search).get('id_token');

    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_ID_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_USER_ID);

    const responseURL = useLocation();
    const params = responseURL?.hash;

    let accessToken = '';
    let idToken = '';
    let canLogin = false;
    if (params.includes('#access_token=')) {
        canLogin = true;
        accessToken = params?.split('access_token=').pop().split('&id_token=')[0];
        idToken = params?.split('id_token=').pop().split('&token_type=')[0];
    } else if (params.includes('#id_token=')) {
        canLogin = true;
        idToken = params?.split('id_token=').pop().split('&access_token=')[0];
        accessToken = params?.split('access_token=').pop().split('&expires_in=')[0];
    }

    if (canLogin && idToken && accessToken) {
        const decodeToken = jwtDecode(idToken);
        const userId = decodeToken?.['cognito:username'];

        localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_ID_TOKEN, idToken);
        localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN, accessToken);
        localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_USER_ID, userId);

        if (decodeToken && userId) {
            window.location.href = ROUTING_DASHBOARD;
        } else {
            window.location.href = ROUTING_LOGIN;
        }
    } else {
        window.location.href = ROUTING_LOGIN;
    }

    return <></>;
};
