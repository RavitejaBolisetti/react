/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { ExchangeLoyaltyReclaimRequestMaster } from 'components/Sales/ExchangeLoyaltyReclaimRequest';

const ExchangeLoyaltyReclaimRequestBase = (props) => {
    
    const pageTitle = 'Exchange/Loyalty Reclaim Request';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ExchangeLoyaltyReclaimRequestMaster/>
        </>
    );
};

export const ExchangeLoyaltyReclaimRequestMasterPage = withLayoutMaster(ExchangeLoyaltyReclaimRequestBase);
