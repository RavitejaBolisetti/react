import React from 'react';
import { ListRoleMaster } from 'components/common/DealerManpower/RoleMaster/ListRoleMaster';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const RoleMasterPageBase = (props) => {
    const pageTitle = 'Role Master';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ListRoleMaster />
        </>
    );
};

const RoleMasterPage = withLayoutMaster(RoleMasterPageBase);

export default RoleMasterPage;
