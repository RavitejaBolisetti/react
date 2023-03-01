import React from 'react';
import { useLocation } from 'react-router-dom';

import { LOCAL_STORAGE_KEY_AUTH_ID_TOKEN, LOCAL_STORAGE_KEY_AUTH_USER_ID } from 'store/actions/auth';
import jwtDecode from 'jwt-decode';
import { ROUTING_DASHBOARD } from 'constants/routing';

export const SSOLoginPage = () => {
    // const search = useLocation().search;
    // const id = new URLSearchParams(search).get('id_token');

    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_ID_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_USER_ID);

    const responseURL = useLocation();
    const params = responseURL?.hash;
    const idToken = params?.split('id_token=').pop().split('&access_token=')[0];
    if (idToken) {
        localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_ID_TOKEN, idToken);
        localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_USER_ID, '11113');
        const decodeToken = jwtDecode(idToken);
        if (decodeToken && decodeToken['cognito:username']) {
            window.location.href = ROUTING_DASHBOARD;
            // navigate(ROUTING_DASHBOARD);
        }
    } else {
        // window.location.href = ROUTING_LOGIN;
    }

    // useEffect(() => {
    //     isLoggedIn ? navigate(ROUTING_DASHBOARD) : navigate(ROUTING_HOME);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isLoggedIn]);

    return <></>;
};
