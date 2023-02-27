import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { Dealer } from 'components/common/DealerHierarchy';

export const DealerHierarchyBase = (props) => {
    const pageTitle = 'Dealer Hierarchy';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <Dealer />
        </>
    );
};

export const DealerHierarchyPage = withLayoutMaster(DealerHierarchyBase);
