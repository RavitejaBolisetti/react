/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { ListDealerLocationTypeMaster } from 'components/common/DealerManpower/DealerLocationTypeMaster/ListDealerLocationTypeMaster';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const DealerLocationTypePageBase = (props) => {
    const pageTitle = 'Dealer Location Type Master';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ListDealerLocationTypeMaster />
        </>
    );
};

const DealerLocationTypePage = withLayoutMaster(DealerLocationTypePageBase);

export default DealerLocationTypePage;
