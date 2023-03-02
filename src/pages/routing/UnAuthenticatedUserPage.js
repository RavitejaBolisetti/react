import React from 'react';
import { Route, Routes } from 'react-router-dom';

import * as routing from 'constants/routing';
import { LoginPage, LogoutPage, ForgotPasswordPage, SSOLoginPage } from 'pages/auth';
import { SplashPage } from 'pages/splash';

export const UnAuthenticatedUserPage = () => {
    return (
        <Routes>
            <Route path={routing.ROUTING_HOME} element={<SplashPage />} exact />
            <Route path={routing.ROUTING_LOGIN} element={<LoginPage />} exact />
            <Route path={routing.ROUTING_LOGOUT} element={<LogoutPage />} exact />
            <Route path={routing.ROUTING_FORGOT_PASSWORD} element={<ForgotPasswordPage />} exact />

            <Route path={routing.ROUTING_SSO_LOGIN} element={<SSOLoginPage />} exact />
            <Route path="*" exact />
        </Routes>
    );
};
