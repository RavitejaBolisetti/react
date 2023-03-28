import React, { useState } from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { CriticalityGroup } from 'components/common/CriticalityGroup';

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

export const CriticalityGroupPageBase = (props) => {
    const pageTitle = 'Application Criticality Group Master';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
    
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <CriticalityGroup />
        </>
    );
};

export const CriticalityGroupPage = connect(mapStateToProps, null)(withLayoutMaster(CriticalityGroupPageBase));
