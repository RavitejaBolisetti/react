import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DashboardPage } from 'pages/dashboard';
import { GeoPage, ProductHierarchyPage } from 'pages/common';
import * as routing from 'constants/routing';

export const AuthenticatedUserPage = () => {
    return (
        <Router>
            <Routes>
                <Route path={routing.ROUTING_DASHBOARD} element={<DashboardPage />} />
                <Route path={routing.ROUTING_COMMON_GEO} element={<GeoPage />} />
                <Route path={routing.ROUTING_COMMON_PRODUCT_HIERARCHY} element={<ProductHierarchyPage />} />
                {/* <Route path="*" component={NotFoundPage} exact /> */}
            </Routes>
        </Router>
    );
};
