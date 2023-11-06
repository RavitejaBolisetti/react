/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { ManufacturerAdminstrativeHierarchy } from 'components/common/ManufacturerAdminstrativeHierarchy';

import { PageHeader } from '../PageHeader';
import { translateContent } from 'utils/translateContent';

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
    const pageTitle = translateContent('adminHierarchy.heading.adminPageTitle');
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
