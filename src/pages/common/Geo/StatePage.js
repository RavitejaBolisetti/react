import React from 'react';
import { ListStateMaster } from 'components/common/Geo';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const StateGeoBase = (props) => {
    const pageTitle = 'State';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ListStateMaster />
        </>
    );
};

const StatePage = withLayoutMaster(StateGeoBase);

export default StatePage;
