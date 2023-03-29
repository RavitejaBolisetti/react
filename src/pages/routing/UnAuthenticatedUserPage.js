import React from 'react';
import { Route, Routes } from 'react-router-dom';

import * as routing from 'constants/routing';
import { LoginPage, ForgotPasswordPage, UpdatePasswordPage, SSOLoginPage } from 'pages/auth';
import { SplashPage } from 'pages/splash';
import { DealerHierarchyPage } from 'pages/common/DealerHierarchy/DealerHierarchyPage';

export const UnAuthenticatedUserPage = () => {
    return (
        <Routes>
            <Route path={routing.ROUTING_HOME} element={<SplashPage />} exact />
            <Route path={routing.ROUTING_LOGIN} element={<LoginPage />} exact />
            {/* <Route path={routing.ROUTING_LOGOUT} element={<LogoutPage />} exact /> */}
            <Route path={routing.ROUTING_FORGOT_PASSWORD} element={<ForgotPasswordPage />} exact />
            <Route path={routing.ROUTING_UPDATE_PASSWORD} element={<UpdatePasswordPage />} exact />
            <Route path={routing.ROUTING_COMMON_DEALER_HIERARCHY} element={<DealerHierarchyPage />} />

            <Route path={routing.ROUTING_SSO_LOGIN} element={<SSOLoginPage />} exact />
            <Route path="*" exact />
        </Routes>
    );
};
