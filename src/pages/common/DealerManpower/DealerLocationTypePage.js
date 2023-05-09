import React from 'react';
import { ListDealerLocationTypeMaster } from 'components/common/DealerManpower';
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
