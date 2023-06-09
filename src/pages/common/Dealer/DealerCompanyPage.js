import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { DealerCompany } from 'components/Mile';
const DealerCompanyBase = (props) => {
    const pageTitle = 'Dealer Parent Company';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <DealerCompany />
        </>
    );
};

export const DealerCompanyPage = withLayoutMaster(DealerCompanyBase);
