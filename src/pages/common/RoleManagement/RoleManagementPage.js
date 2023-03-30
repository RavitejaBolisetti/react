import React from 'react';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { RoleManagement } from 'components/common/RoleManagement/RoleManagement';

export const RoleManagementPageBase = (props) => {
    const pageTitle = 'Role Management ';
    const pageHeaderData = {
        pageTitle,
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
