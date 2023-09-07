/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { useParams } from 'react-router-dom';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { EmbeddedReportMaster } from 'components/Reports/EmbeddedReport';
import { PageHeader } from 'pages/common/PageHeader';

import { EMBEDDED_REPORTS } from 'constants/EmbeddedReports';

const EmbeddedReportPageBase = (props) => {
    const params = useParams();

    const reportDetail = Object.values(EMBEDDED_REPORTS)?.find((i) => i.module === params?.type);

    const pageHeaderData = {
        pageTitle: reportDetail?.title,
        showChangeHisoty: true,
        canMarkFavourite: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            {reportDetail && <EmbeddedReportMaster reportDetail={reportDetail} />}
        </>
    );
};

export const EmbeddedReportPage = withLayoutMaster(EmbeddedReportPageBase);
