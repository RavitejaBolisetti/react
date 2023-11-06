/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { ManufacturerOrgHierarchy } from 'components/common/ManufacturerOrganizationHierarchy';
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

const ManufacturerOrgHierarchyPageBase = (props) => {
    const [isChangeHistoryVisible, setChangeHistoryVisible] = useState(false);

    const handleChangeHistoryClick = (e) => {
        setChangeHistoryVisible(!isChangeHistoryVisible);
    };
    const pageTitle = translateContent('manufacturerOrganisation.heading.pageTitle');
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: true,
        handleChangeHistoryClick,
        isChangeHistoryVisible,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ManufacturerOrgHierarchy isChangeHistoryVisible={isChangeHistoryVisible} />
        </>
    );
};

export const ManufacturerOrgHierarchyPage = connect(mapStateToProps, null)(withLayoutMaster(ManufacturerOrgHierarchyPageBase));
