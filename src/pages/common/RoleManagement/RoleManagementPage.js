/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { RoleManagement } from 'components/common/RoleManagement/RoleManagement';
import { translateContent } from 'utils/translateContent';

export const RoleManagementPageBase = (props) => {

    const pageHeaderData = {
        pageTitle: translateContent('roleManagement.heading.pageTitle'),
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <RoleManagement />
        </>
    );
};

export const RoleManagementPage = withLayoutMaster(RoleManagementPageBase);
