import React from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { TermConditionManufacturerMaster } from 'components/common/TermsAndConditions/ManufacturerTermCondition';

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

export const TermConditionPageBase = (props) => {
    const pageTitle = 'Terms & Conditions - Manufacturer Location';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <TermConditionManufacturerMaster />
        </>
    );
};

export const TermConditionManufacturerMasterPage = connect(mapStateToProps, null)(withLayoutMaster(TermConditionPageBase));
