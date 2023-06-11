import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { OtfMaster } from 'components/Sales';
const OtfMasterBase = (props) => {
    const pageTitle = 'Order Tracking Form';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <OtfMaster />
        </>
    );
};

export const OtfMasterPage = withLayoutMaster(OtfMasterBase);
