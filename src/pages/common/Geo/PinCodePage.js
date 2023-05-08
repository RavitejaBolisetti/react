import React from 'react';
import { ListPinCodeMaster } from 'components/common/Geo';
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

const PinCodePage = withLayoutMaster(PincodeGeoBase);

export default PinCodePage;
