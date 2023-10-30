/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Splash } from 'components/Splash';
import { LoginPage } from 'pages/auth/Login';
import { ROUTING_DASHBOARD, ROUTING_LOGIN } from 'constants/routing';
import { LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN, LOCAL_STORAGE_KEY_AUTH_USER_ID } from 'store/actions/auth';

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
});

const SplashPageBase = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const isLoggedIn = !!(localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN) && localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_USER_ID));

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            navigate(isLoggedIn ? ROUTING_DASHBOARD : ROUTING_LOGIN);
        }, 3000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ? (
                <div>
                    <Splash />
                </div>
            ) : (
                <LoginPage />
            )}
        </>
    );
};

export const SplashPage = connect(mapStateToProps, null)(SplashPageBase);
