import React from 'react';
import { DistrictGeo } from 'components/common/Geo';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const DistrictGeoBase = (props) => {
    const pageTitle = 'District List';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <DistrictGeo />
        </>
    );
};

export const DistrictGeoPage = withLayoutMaster(DistrictGeoBase);
