import React from 'react';
import { StateGeo } from 'components/common/Geo';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const StateGeoBase = (props) => {
    const pageTitle = 'State Master';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <StateGeo />
        </>
    );
};

export const StateGeoPage = withLayoutMaster(StateGeoBase);
