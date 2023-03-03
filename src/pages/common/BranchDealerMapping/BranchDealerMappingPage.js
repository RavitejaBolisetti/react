import React, { useState } from 'react';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import {BranchDealerMapping} from 'components/common/BranchDealerMapping';

export const BranchDealerMappingPageBase = (props) => {
    const [isChangeHistoryVisible, setChangeHistoryVisible] = useState(false);

    const handleChangeHistoryClick = (e) => {
        setChangeHistoryVisible(!isChangeHistoryVisible);
    };
    const pageTitle = 'BRANCH DEALER MAPPING';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: true,
        handleChangeHistoryClick,
        isChangeHistoryVisible,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <BranchDealerMapping isChangeHistoryVisible={isChangeHistoryVisible} />
        </>
    );
};

export const BranchDealerMappingPage = withLayoutMaster(BranchDealerMappingPageBase);
