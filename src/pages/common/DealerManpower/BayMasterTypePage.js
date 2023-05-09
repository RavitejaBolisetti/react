import React from 'react';
import { BayTypeMaster } from 'components/common/DealerManpower';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const BayTypeMasterPageBase = (props) => {
    const pageTitle = 'Bay Type Master';
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
