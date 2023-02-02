import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import * as routing from 'constants/routing';
import { LoginPage, ForgotPasswordPage } from 'pages/auth';
import { DashboardPage } from 'pages/dashboard';
import { SplashPage } from 'pages/splash';
import { GeoPage } from 'pages/common';
import {ProductMasterPage} from 'pages/common/Product';
export const UnAuthenticatedUserPage = () => {
    return (
        <Router>
            <Routes>
                <Route path={routing.ROUTING_COMMON_GEO} element={<GeoPage />} />
                <Route path={routing.ROUTING_COMMON_PRODUCT} element={<ProductMasterPage />} />
                <Route path={routing.ROUTING_DASHBOARD1} element={<DashboardPage />} />
                <Route path={routing.ROUTING_LOGIN} element={<LoginPage />} exact />
                <Route path={routing.ROUTING_FORGOT_PASSWORD} element={<ForgotPasswordPage />} exact />
                <Route path={routing.ROUTING_HOME} element={<SplashPage />} exact />
                <Route path="*" exact />
            </Routes>
        </Router>
    );
};
