/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
// import { UserManagementMaster } from 'components/common/UserManagement'
import { UserManagementMaster } from 'components/common/UserManagement';

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
    };
    return returnValue;
};

export const UserManagementPageBase = (props) => {
    const pageTitle = 'User Management';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <UserManagementMaster />
        </>
    );
};

export const UserManagementPage = connect(mapStateToProps, null)(withLayoutMaster(UserManagementPageBase));
