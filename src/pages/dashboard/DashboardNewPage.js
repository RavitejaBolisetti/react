/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';

import { DashboardNew } from 'components/DashboardNew/DashboardNew';
import { DashboardSkelton } from 'components/Dashboard/DashboardSkelton';

const DashboardNewPageBase = ({ props }) => {
    const { isLoading } = props;
    return isLoading ? <DashboardSkelton /> : <DashboardNew {...props} />;
};

export const DashboardNewPage = withLayoutMaster(DashboardNewPageBase);
