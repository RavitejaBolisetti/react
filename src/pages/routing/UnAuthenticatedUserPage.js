import React from 'react';
import { Route, Routes } from 'react-router-dom';

import * as routing from 'constants/routing';
import { LoginPage, ForgotPasswordPage } from 'pages/auth';
import { SplashPage } from 'pages/splash';

import { ProfilePage } from 'pages/user/ProfilePage';
import { SettingPage } from 'pages/user/SettingPage';
import { FaqPage } from 'pages/user/FaqPage';
import { TrainingPage } from 'pages/user/TrainingPage';

import { CMSPage } from 'pages/cms';

export const UnAuthenticatedUserPage = () => {
    return (
        <Routes>
            <Route path={routing.ROUTING_HOME} element={<SplashPage />} exact />
            <Route path={routing.ROUTING_LOGIN} element={<LoginPage />} exact />
            <Route path={routing.ROUTING_FORGOT_PASSWORD} element={<ForgotPasswordPage />} exact />

            <Route path={routing.ROUTING_USER_PROFILE} element={<ProfilePage />} exact />
            <Route path={routing.ROUTING_USER_SETTING} element={<SettingPage />} exact />
            <Route path={routing.ROUTING_USER_FAQ} element={<FaqPage />} exact />
            <Route path={routing.ROUTING_USER_TRAINING} element={<TrainingPage />} exact />
           
           
            <Route path={routing.ROUTING_USER_TERM} element={<CMSPage />} exact />
            <Route path={routing.ROUTING_USER_ABOUT} element={<CMSPage />} exact />
            <Route path={routing.ROUTING_USER_DISCLAIMER} element={<CMSPage />} exact />
            <Route path={routing.ROUTING_USER_CONTACT} element={<CMSPage />} exact />

            <Route path="*" exact />
        </Routes>
    );
};
