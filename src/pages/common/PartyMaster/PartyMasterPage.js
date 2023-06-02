import React from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { ListPartyMaster } from 'components/common/PartyMaster';

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

export const PartyMasterPageBase = (props) => {
    const pageTitle = 'Party Master';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ListPartyMaster />
        </>
    );
};

export const PartyMasterPage = connect(mapStateToProps, null)(withLayoutMaster(PartyMasterPageBase));