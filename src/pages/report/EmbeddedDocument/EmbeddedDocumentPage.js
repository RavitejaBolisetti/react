/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { useParams } from 'react-router-dom';
import { EmbeddedReportMaster } from 'components/Reports/EmbeddedReport';

import { EMBEDDED_REPORTS } from 'constants/EmbeddedReports';

const EmbeddedDocumentBase = (props) => {
    const params = useParams();
    const reportDetail = Object.values(EMBEDDED_REPORTS)?.find((i) => i?.slug === params?.slug);

    return <>{reportDetail && <EmbeddedReportMaster reportDetail={reportDetail} />}</>;
};

export const EmbeddedDocumentPage = EmbeddedDocumentBase;
