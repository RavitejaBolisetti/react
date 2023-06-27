/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import * as routing from 'constants/routing';
import { LoginPage, ForgotPasswordPage, UpdatePasswordPage, SSOLoginPage } from 'pages/auth';
import { SplashPage } from 'pages/splash';

export const UnAuthenticatedUserPage = () => {
    return (
        <Routes>
            <Route path={routing.ROUTING_HOME} element={<SplashPage />} exact />
            <Route path={routing.ROUTING_LOGIN} element={<LoginPage />} exact />
            <Route path={routing.ROUTING_FORGOT_PASSWORD} element={<ForgotPasswordPage />} exact />
            <Route path={routing.ROUTING_UPDATE_PASSWORD} element={<UpdatePasswordPage />} exact />
            <Route path={routing.ROUTING_SSO_LOGIN} element={<SSOLoginPage />} exact />
            {/* <Route path="*" element={<LoginPage />} exact /> */}
        </Routes>
    );
};
