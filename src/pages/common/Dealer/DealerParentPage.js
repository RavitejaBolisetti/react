import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { DealerParent } from 'components/Mile';
const DealerParentBase = (props) => {
    const pageTitle = 'Dealer Parent';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <DealerParent />
        </>
    );
};

export const DealerParentPage = withLayoutMaster(DealerParentBase);
