import React from 'react';
import { BayTypeMaster } from 'components/common/DealerManpower/BayTypeMaster/BayTypeMaster';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const BayTypeMasterBase = (props) => {
    const pageTitle = 'Location Type Master';
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

export const BayTypeMasterPage = withLayoutMaster(BayTypeMasterBase);
