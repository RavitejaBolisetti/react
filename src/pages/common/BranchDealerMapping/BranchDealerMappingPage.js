import React, { useState } from 'react';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import {BranchDealerMapping} from 'components/common/BranchDealerMapping';

export const BranchDealerMappingPageBase = (props) => {
    
    const pageTitle = 'BRANCH DEALER MAPPING';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        visibleChangeHistory:false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <BranchDealerMapping  />
        </>
    );
};

export const BranchDealerMappingPage = withLayoutMaster(BranchDealerMappingPageBase);
