import React from 'react';
import { ListTehsilMaster } from 'components/common/Geo';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const TehsilGeoBase = (props) => {
    const pageTitle = 'Tehsil';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ListTehsilMaster />
        </>
    );
};

const TehsilPage = withLayoutMaster(TehsilGeoBase);

export default TehsilPage;
