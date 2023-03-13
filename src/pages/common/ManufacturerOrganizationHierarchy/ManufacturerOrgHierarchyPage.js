import React, { useState } from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { ManufacturerOrgHierarchy } from 'components/common/ManufacturerOrganizationHierarchy';

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
    const pageTitle = 'Manufacturer Organization Hierarchy';
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
