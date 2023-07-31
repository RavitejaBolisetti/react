/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { BASE_URL_REPORTS_GET_EMBEDED_INFO } from 'constants/routingApi';

const EmbeddedReportPageBase = (props) => {
    const reportLink = process.env.REACT_APP_POWER_BI_EMBEDDED_REPORT;

    const token =
        'eyJraWQiOiJMVndUWU1OOTg4eUZwbDkyMGxoVzIxQ2NYYWF6ckk0aE1ZYndpSDV5d1Q4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlM2VhNGFkZS0zNzUzLTRmYTItOWJkNS0xODUzOGQ5NzYwNjAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX0VKbWNiS1pyaiIsImNsaWVudF9pZCI6IjU4bTZxOGtucDE5Y2M5NGplZ2x1bnA0bXQ4Iiwib3JpZ2luX2p0aSI6ImQxNjcxMmJmLWRmMzUtNDUxZS04MDUzLTFhODY5YTU0MTUxNCIsImV2ZW50X2lkIjoiNDE3MTE1YjItYWJkNS00ZDk3LWEyM2QtMzVlMGJkYTY3MDgyIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY5MDc5NjQ1OCwiZXhwIjoxNjkwODAwMDU4LCJpYXQiOjE2OTA3OTY0NTgsImp0aSI6ImM4NjZkYjY1LTNhYWQtNGFmOC1hZGI2LTVlYmZjZGYwY2IzNCIsInVzZXJuYW1lIjoiZ3RhMDEuMTNhZTE2MjAifQ.EZiPVQWY677M1dDsMPWk1rbcXfFlOs-qPOwtPmMcLqPS33bpIGpfZGW3yQ7r_SQLStoAPpbMTHKu9Elko4GOEzoxYcm-cpHPDFoYvfPzDYz5SwwuXqSeU9lGiWXOdYizsenHfVZVsFSpsTpHdk4xqjcBhf31BiEn2SxFiekBsUu2rtFwNdvHrckybm_hoIJMQaezqn_er6K9FyrgF9afC1RJ7CHv5gCpb3eomspL2g-zp1YUiJpQ6jD7zVfzY9iymULDNaG5mq60k3OPOjWl9nulfSLKyeUWfTK9VynlZ56T21Fxk23vR7hemCSQWyN-HzPROBY8dSRkEhhK4LBI0Q';
    const AuthStr = 'Bearer '.concat(token);
    const headers = { Authorization: AuthStr, accessToken: token, deviceType: 'W', deviceId: '' };
    fetch(BASE_URL_REPORTS_GET_EMBEDED_INFO, {
        method: 'GET',
        headers: headers,
    }).then((response) => {
        console.log('🚀 ~ file: EmbeddedReportPage.js:22 ~ EmbeddedReportPageBase ~ response:', response);
    });
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
