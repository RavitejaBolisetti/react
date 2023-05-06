import React from 'react';
import { ListPinCodeMaster } from 'components/common/Geo/Pincode/ListPinCodeMaster';
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
            <ListPinCodeMaster />
        </>
    );
};

export const PinCodePage = withLayoutMaster(PincodeGeoBase);
