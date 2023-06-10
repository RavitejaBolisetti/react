import React from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { TermConditionDealerMaster } from 'components/common/TermsAndConditions/DealerTermCondition';

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
    const pageTitle = 'Terms & Conditions - Dealer Location';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <TermConditionDealerMaster />
        </>
    );
};

export const TermConditionDealerMasterPage = connect(mapStateToProps, null)(withLayoutMaster(TermConditionPageBase));
