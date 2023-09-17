/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { OtfReportsMaster } from 'components/common/OTFReports/OtfReportsMaster';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const OtfReportsBase = (props) => {
    const pageTitle = 'Booking Reports';
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
