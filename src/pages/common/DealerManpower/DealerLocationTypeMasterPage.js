import React from 'react';
import { DealerLocationType } from 'components/common/DealerManpower/DealerLocationTypeMaster/DealerLocationTypeMaster';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const DealerLocationTypeBase = (props) => {
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
            <DealerLocationType />
        </>
    );
};

export const DealerLocationTypePage = withLayoutMaster(DealerLocationTypeBase);
