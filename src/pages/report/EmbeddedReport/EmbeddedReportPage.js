/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { EmbeddedReportMaster } from 'components/Reports/EmbeddedReport';
import { PageHeader } from 'pages/common/PageHeader';

const EmbeddedReportPageBase = (props) => {
    const pageHeaderData = {
        pageTitle: 'Embedded Report',
        showChangeHisoty: true,
        canMarkFavourite: true,
        visibleChangeHistory: false,
    };
    return (
        <>
            <PageHeader {...pageHeaderData} />
            <EmbeddedReportMaster />
        </>
    );
};

export const EmbeddedReportPage = withLayoutMaster(EmbeddedReportPageBase);
