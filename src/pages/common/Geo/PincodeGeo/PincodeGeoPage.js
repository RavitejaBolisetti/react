import React from 'react';
import { PincodeGeo } from 'components/common/Geo/Pincode/PincodeGeo';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const PincodeGeoBase = (props) => {
    const pageTitle = 'PIN Master';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <PincodeGeo />
        </>
    );
};

export const PincodeGeoPage = withLayoutMaster(PincodeGeoBase);
