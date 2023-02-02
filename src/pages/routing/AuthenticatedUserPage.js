import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DashboardPage } from 'pages/dashboard';
import { GeoPage } from 'pages/common';
// import {ProductMasterPage} from 'pages/common/Product';
import { GeoPage, ProductHierarchyPage,ProductMasterPage } from 'pages/common';
import * as routing from 'constants/routing';
import { SplashPage } from 'pages/splash';
import { ProfilePage, SettingPage } from 'pages/user';

export const AuthenticatedUserPage = () => {
    return (
       
            <Routes>
                <Route path={routing.ROUTING_HOME} element={<SplashPage />} exact />
                <Route path={routing.ROUTING_DASHBOARD} element={<DashboardPage />} />
                <Route path={routing.ROUTING_COMMON_GEO} element={<GeoPage />} />
                <Route path={routing.ROUTING_COMMON_PRODUCT_HIERARCHY} element={<ProductHierarchyPage />} />
                <Route path={routing.ROUTING_COMMON_PRODUCT} element={<ProductMasterPage />} />
                
                {/* <Route path="*" component={NotFoundPage} exact /> */}
                <Route path={routing.ROUTING_USER_PROFILE} element={<ProfilePage />} exact />
                <Route path={routing.ROUTING_USER_SETTING} element={<SettingPage />} exact />
                {/* <Route path="*"  element={<LoginPage />} exact /> */}
            </Routes>
       
    );
};
