/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

const PaginatedReportPageBase = (props) => {
    const reportLink = process.env.REACT_APP_POWER_BI_PAGINATED_REPORT;
    const pageHeaderData = {
        pageTitle: 'Paginated Report',
        showChangeHisoty: true,
        canMarkFavourite: true,
        visibleChangeHistory: false,
    };
    return (
        <>
            <PageHeader {...pageHeaderData} />
            <object data={reportLink} width="100%" height="90%">
                <embed src={reportLink} width="100%" height="90%"></embed>
                Issue with report
            </object>
        </>
    );
};

export const PaginatedReportPage = withLayoutMaster(PaginatedReportPageBase);
