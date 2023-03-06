import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';

import { Dashboard } from 'components/Dashboard/Dashboard';
import { DashboardSkelton } from 'components/Dashboard/DashboardSkelton';

const DashboardPageBase = ({ props }) => {
    const { isLoading } = props;
    return isLoading ? <DashboardSkelton /> : <Dashboard {...props} />;
};

export const DashboardPage = withLayoutMaster(DashboardPageBase);
