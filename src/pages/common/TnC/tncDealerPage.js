import React from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { TermConditionDealer } from 'components/common/TnC';

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
    const pageTitle = 'Term & Conditions - Dealer Branch';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <TermConditionDealer />
        </>
    );
};

export const TermConditionPage = connect(mapStateToProps, null)(withLayoutMaster(TermConditionPageBase));
