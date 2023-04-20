import React from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { UserManagementManufacturer } from 'components/common/UserManagementManufacturer'

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

export const UserManagementManufacturerPageBase = (props) => {
    const pageTitle = 'User Management Manufacturer';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <UserManagementManufacturer />
        </>
    );
};

export const UserManagementManufacturerPage = connect(mapStateToProps, null)(withLayoutMaster(UserManagementManufacturerPageBase));
