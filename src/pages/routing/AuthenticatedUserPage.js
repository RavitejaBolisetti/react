import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DashboardPage } from 'pages/dashboard';
import { GeoPage, ProductHierarchyPage, ProductMasterPage, HierarchyAttributeMasterPage, ManufacturerAdministrativeHierarchyPage, ManufacturerOrgHierarchyPage, DealerHierarchyPage,ConfigurableParameterEditingPage,QualificationMasterPage, ApplicationMasterPage,DealerManpowerPage } from 'pages/common';

import * as routing from 'constants/routing';
import { SplashPage } from 'pages/splash';

import { ProfilePage, SettingPage, FaqPage, TrainingPage } from 'pages/user';

import { CMSPage } from 'pages/cms';

export const AuthenticatedUserPage = () => {
    return (
        <Routes>
            <Route path={routing.ROUTING_HOME} element={<SplashPage />} exact />
            <Route path={routing.ROUTING_DASHBOARD} element={<DashboardPage />} />
            <Route path={routing.ROUTING_COMMON_GEO} element={<GeoPage />} />
            <Route path={routing.ROUTING_COMMON_MANUFACTURER_ORGANIZATION_HIERARCHY} element={<ManufacturerOrgHierarchyPage />} />
            <Route path={routing.ROUTING_COMMON_PRODUCT_HIERARCHY} element={<ProductHierarchyPage />} />
            <Route path={routing.ROUTING_COMMON_HIERARCHY_ATTRIBUTE_MASTER} element={<HierarchyAttributeMasterPage />} exact />
            <Route path={routing.ROUTING_COMMON_MANUFACTURER_ADMINISTRATIVE_HIERARCHY} element={<ManufacturerAdministrativeHierarchyPage />} />
            <Route path={routing.ROUTING_COMMON_PRODUCT_MASTER} element={<ProductMasterPage />} />
            <Route path={routing.ROUTING_COMMON_DEALER_HIERARCHY} element={<DealerHierarchyPage />} />
            <Route path={routing.ROUTING_COMMON_CONFIG_PARAM_EDIT} element={<ConfigurableParameterEditingPage />} />
            <Route path={routing.ROUTING_USER_PROFILE} element={<ProfilePage />} exact />
            <Route path={routing.ROUTING_USER_SETTING} element={<SettingPage />} exact />
            <Route path={routing.ROUTING_USER_FAQ} element={<FaqPage />} exact />
            <Route path={routing.ROUTING_USER_TRAINING} element={<TrainingPage />} exact />
            
            <Route path={routing.ROUTING_USER_TERM} element={<CMSPage />} exact />
            <Route path={routing.ROUTING_USER_ABOUT} element={<CMSPage />} exact />
            <Route path={routing.ROUTING_USER_DISCLAIMER} element={<CMSPage />} exact />
            <Route path={routing.ROUTING_USER_CONTACT} element={<CMSPage />} exact />
            {/* <Route path="*"  element={<LoginPage />} exact /> */}
        </Routes>
    );
};
