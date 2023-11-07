/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';

import { DashboardOld } from 'components/DashboardOld/DashboardOld';
import { DashboardSkelton } from 'components/DashboardOld/DashboardSkelton';

const DashboardOldPageBase = ({ props }) => {
    const { isLoading } = props;
    return isLoading ? <DashboardSkelton /> : <DashboardOld {...props} />;
};

export const DashboardOldPage = withLayoutMaster(DashboardOldPageBase);
