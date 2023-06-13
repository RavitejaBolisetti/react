import React from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { ManufacturerAdminstrativeHierarchy } from 'components/common/ManufacturerAdminstrativeHierarchy';

import { PageHeader } from '../PageHeader';

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

const ManufacturerAdministrativeHierarchyPageBase = () => {
    const pageTitle = 'Manufacturer Adminstrative Hierarchy';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: false,
        visibleChangeHistory: false,
    };
    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ManufacturerAdminstrativeHierarchy />
        </>
    );
};

export const ManufacturerAdministrativeHierarchyPage = connect(mapStateToProps, null)(withLayoutMaster(ManufacturerAdministrativeHierarchyPageBase));
