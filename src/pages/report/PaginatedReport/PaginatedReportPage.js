import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

const PaginatedReportPageBase = (props) => {
    const reportLink = process.env.REACT_APP_POWER_BI_PAGINATED_REPORT;
    const pageHeaderData = {
        pageTitle: 'Bi Report',
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
