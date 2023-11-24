/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { BayTypeMaster } from 'components/common/DealerManpower/BayTypeMaster/BayTypeMaster';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { translateContent } from 'utils/translateContent';

export const BayTypeMasterPageBase = (props) => {
    const pageTitle = translateContent('bayTypeMaster.heading.pageTitle');
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <BayTypeMaster />
        </>
    );
};

const BayTypeMasterPage = withLayoutMaster(BayTypeMasterPageBase);

export default BayTypeMasterPage;
