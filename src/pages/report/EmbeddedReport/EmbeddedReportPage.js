import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

const EmbeddedReportPageBase = (props) => {
    const reportLink = process.env.REACT_APP_POWER_BI_EMBEDDED_REPORT;
    const pageHeaderData = {
        pageTitle: 'Embedded Report',
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

export const EmbeddedReportPage = withLayoutMaster(EmbeddedReportPageBase);
