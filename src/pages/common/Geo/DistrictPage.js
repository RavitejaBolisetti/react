import React from 'react';
import { ListDistrictMaster } from 'components/common/Geo';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const DistrictGeoBase = (props) => {
    const pageTitle = 'District Master';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ListDistrictMaster />
        </>
    );
};

export const DistrictPage = withLayoutMaster(DistrictGeoBase);
