import React from 'react';
import { Route, Routes } from 'react-router-dom';

import * as routing from 'constants/routing';
import { LoginPage, ForgotPasswordPage } from 'pages/auth';
import { GeoPage, ProductHierarchyPage } from 'pages/common';
import { SplashPage } from 'pages/splash';

export const UnAuthenticatedUserPage = () => {
    return (
        <Routes>
            <Route path={routing.ROUTING_HOME} element={<SplashPage />} exact />
            <Route path={routing.ROUTING_LOGIN} element={<LoginPage />} exact />
            <Route path={routing.ROUTING_COMMON_PRODUCT_HIERARCHY} element={<ProductHierarchyPage />} />
            <Route path={routing.ROUTING_FORGOT_PASSWORD} element={<ForgotPasswordPage />} exact />           

            <Route path="*" exact />
        </Routes>
    );
};
