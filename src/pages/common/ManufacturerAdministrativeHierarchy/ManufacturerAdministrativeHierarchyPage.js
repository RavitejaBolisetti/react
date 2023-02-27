import React, { useState } from 'react';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { connect } from 'react-redux';
// import { ProductHierarchy } from 'components/common/ProductHierarchy/ProductHierarchy';
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

export const ManufacturerAdministrativeHierarchyPageBase = () => {
    const [isAttributeVisible, setAttributeVisible] = useState(false);
    const [isChangeHistoryVisible, setChangeHistoryVisible] = useState(false);

    const handleChangeHistoryClick = (e) => {
        setChangeHistoryVisible(!isChangeHistoryVisible);
    };

    const pageTitle = 'Manufacturer Adminstrative Hierarchy';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: true,
        handleChangeHistoryClick,
        isChangeHistoryVisible,
        isUploadVisible:true,
    };
    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ManufacturerAdminstrativeHierarchy isChangeHistoryVisible={isChangeHistoryVisible} />
        </>
    );
};

export const ManufacturerAdministrativeHierarchyPage = connect(mapStateToProps, null)(withLayoutMaster(ManufacturerAdministrativeHierarchyPageBase));
