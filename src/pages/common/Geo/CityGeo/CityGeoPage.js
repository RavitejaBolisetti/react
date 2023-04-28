import React from 'react';
import { DistrictGeo } from 'components/common/Geo';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const CityGeoBase = (props) => {
    const pageTitle = 'City List';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <CityGeo />
        </>
    );
};

export const CityGeoPage = withLayoutMaster(CityGeoBase);
