import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import * as routing from 'constants/routing';
import { LoginPage, ForgotPasswordPage } from 'pages/auth';
import { DashboardPage } from 'pages/dashboard';
import { SplashPage } from 'pages/splash';
import { GeoPage, ProductHierarchyPage } from 'pages/common';

import { ProfilePage } from 'pages/user/ProfilePage';
import { SettingPage } from 'pages/user/SettingPage';
import { FaqPage } from 'pages/user/FaqPage';
import { TrainingPage } from 'pages/user/TrainingPage';
import { MahindraPage } from 'pages/user/MahindraPage';
import { MgPage } from 'pages/user/MgPage';
import { TermPage } from 'pages/user/TermPage';
import { AboutPage } from 'pages/user/AboutPage';
import { DisclaimerPage } from 'pages/user/DisclaimerPage';
import { ContactPage } from 'pages/user/ContactPage';
import { BranchPage } from 'pages/user/BranchPage';
import { FinancialPage } from 'pages/user/FinancialPage';

export const UnAuthenticatedUserPage = () => {
    return (
        <Router>
            <Routes>
                <Route path={routing.ROUTING_USER_PROFILE} element={<ProfilePage />} exact />
                <Route path={routing.ROUTING_USER_SETTING} element={<SettingPage />} exact />
                <Route path={routing.ROUTING_USER_FAQ} element={<FaqPage />} exact />
                <Route path={routing.ROUTING_USER_TRAINING} element={<TrainingPage />} exact />
                <Route path={routing.ROUTING_USER_MAHINDRA} element={<MahindraPage />} exact />
                <Route path={routing.ROUTING_USER_MG} element={<MgPage />} exact />
                <Route path={routing.ROUTING_USER_TERM} element={<TermPage />} exact />
                <Route path={routing.ROUTING_USER_ABOUT} element={<AboutPage />} exact />
                <Route path={routing.ROUTING_USER_DISCLAIMER} element={<DisclaimerPage />} exact />
                <Route path={routing.ROUTING_USER_CONTACT} element={<ContactPage />} exact />
                <Route path={routing.ROUTING_USER_BRANCH} element={<BranchPage />} exact />
                <Route path={routing.ROUTING_USER_FINANACIAL} element={<FinancialPage />} exact />
                <Route path={routing.ROUTING_COMMON_GEO} element={<GeoPage />} />
                <Route path={routing.ROUTING_COMMON_PRODUCT_HIERARCHY} element={<ProductHierarchyPage />} />
                <Route path={routing.ROUTING_DASHBOARD1} element={<DashboardPage />} />
                <Route path={routing.ROUTING_LOGIN} element={<LoginPage />} exact />
                <Route path={routing.ROUTING_FORGOT_PASSWORD} element={<ForgotPasswordPage />} exact />
                <Route path={routing.ROUTING_HOME} element={<SplashPage />} exact />

                {/* Profile Pages                */}

                <Route path="*" exact />
            </Routes>
        </Router>
    );
};
