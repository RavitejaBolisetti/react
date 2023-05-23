import React from 'react';
import { ListDealerDivisionMaster } from 'components/common/DealerManpower/DealerDivisionMaster/ListDealerDivisionMaster';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const DealerLocationTypePageBase = (props) => {
    const pageTitle = 'Dealer Division Master';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ListDealerDivisionMaster />
        </>
    );
};

const DealerLocationTypePage = withLayoutMaster(DealerLocationTypePageBase);

export default DealerLocationTypePage;
