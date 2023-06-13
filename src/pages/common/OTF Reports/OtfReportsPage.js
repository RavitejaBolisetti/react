import React from 'react';
import { OtfReportsMaster } from 'components/common/OTFReports/OtfReportsMaster';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const OtfReportsBase = (props) => {
    const pageTitle = 'OTF Reports';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <OtfReportsMaster />
        </>
    );
};

const OtfReportsPage = withLayoutMaster(OtfReportsBase);

export default OtfReportsPage;
