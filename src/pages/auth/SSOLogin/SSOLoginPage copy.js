import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LOCAL_STORAGE_KEY_AUTH_TOKEN, LOCAL_STORAGE_KEY_AUTH_USER_ID } from 'store/actions/auth';
import jwtDecode from 'jwt-decode';
import { ROUTING_DASHBOARD, ROUTING_LOGIN } from 'constants/routing';

export const SSOLoginPage = () => {
    const navigate = useNavigate();
    // const search = useLocation().search;
    // const id = new URLSearchParams(search).get('id_token');

    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_USER_ID);

    const responseURL = useLocation();
    const params = responseURL?.hash;
    const idToken = params?.split('id_token=').pop().split('&expires_in=')[0];
    if (idToken) {
        localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_TOKEN, idToken);
        localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_USER_ID, 'reena');
        // localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_USER_ID, decodeToken['cognito:username']);

        const decodeToken = jwtDecode(idToken);
        console.log("🚀 ~ file: SSOLoginPage.js:26 ~ SSOLoginPage ~ decodeToken:", decodeToken)
        if (decodeToken && decodeToken['cognito:username']) {
            navigate(ROUTING_DASHBOARD);
        }
    } else {
        // navigate(ROUTING_LOGIN);
    }

    // useEffect(() => {
    //     isLoggedIn ? navigate(ROUTING_DASHBOARD) : navigate(ROUTING_HOME);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isLoggedIn]);

    return <>SSO Page</>;
};
