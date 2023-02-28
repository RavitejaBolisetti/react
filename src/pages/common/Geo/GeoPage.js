import React from 'react';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { Geo } from 'components/common/Geo';

export const GeoPageBase = (props) => {
    const pageTitle = 'Geographical Hierarchy';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <Geo />
        </>
    );
};

export const GeoPage = withLayoutMaster(GeoPageBase);
