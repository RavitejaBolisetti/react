import React from 'react';
import { ListDistrictMaster } from 'components/common/Geo';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const DistrictGeoBase = (props) => {
    const pageTitle = 'District';
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

const DistrictPage = withLayoutMaster(DistrictGeoBase);

export default DistrictPage;
