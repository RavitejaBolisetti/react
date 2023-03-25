import React, { useState } from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { ApplicationMaster } from '../../../components/common/ApplicationMaster/ApplicationMaster';

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

export const ApplicationMasterBase = (props) => {
    const pageTitle = 'APPLICATION MASTER';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ApplicationMaster />
        </>
    );
};

export const ApplicationMasterPage = connect(mapStateToProps, null)(withLayoutMaster(ApplicationMasterBase));
