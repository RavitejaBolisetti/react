import React from 'react';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { DealerManpower } from '../../../components/common/DealerManpower';

export const DealerManpowerPageBase = (props) => {
    const pageTitle = 'Dealer Manpower';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <DealerManpower />
        </>
    );
};

export const DealerManpowerPage = withLayoutMaster(DealerManpowerPageBase);
