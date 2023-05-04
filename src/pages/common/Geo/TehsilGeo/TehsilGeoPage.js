import React from 'react';
import { TehsilGeo } from 'components/common/Geo';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const TehsilGeoBase = (props) => {
    const pageTitle = 'Tehsil Master';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <TehsilGeo />
        </>
    );
};

export const TehsilGeoPage = withLayoutMaster(TehsilGeoBase);
