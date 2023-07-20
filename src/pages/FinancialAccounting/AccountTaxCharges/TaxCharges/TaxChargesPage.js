/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { TaxChargesMaster } from 'components/FinancialAccounting';

const TaxChargesBase = (props) => {
    const pageTitle = 'Tax & Charges';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <TaxChargesMaster />
        </>
    );
};

export const TaxChargesPage = withLayoutMaster(TaxChargesBase);
