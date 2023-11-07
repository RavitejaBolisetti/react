/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { ListRoleMaster } from 'components/common/DealerManpower/RoleMaster/ListRoleMaster';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { translateContent } from 'utils/translateContent';

export const RoleMasterPageBase = (props) => {
    const pageTitle = translateContent('roleMaster.heading.pageTitle');
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
