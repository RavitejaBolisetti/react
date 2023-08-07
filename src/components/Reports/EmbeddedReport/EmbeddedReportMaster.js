/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState } from 'react';
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';

import './EmbeddedReportMaster.module.css';

// Root Component to demonstrate usage of wrapper component
function EmbeddedReportMaster() {
    // PowerBI Report object (to be received via callback)
    const [, setReport] = useState();

    // API end-point url to get embed config for a sample report
    const sampleReportUrl = 'https://playgroundbe-bck-1.azurewebsites.net/Reports/SampleReport';

    // Report config useState hook
    // Values for properties like embedUrl, accessToken and settings will be set on click of buttons below
    const [sampleReportConfig, setReportConfig] = useState({
        type: 'report',
        embedUrl: undefined,
        tokenType: models.TokenType.Embed,
        accessToken: undefined,
        settings: undefined,
    });

    // Map of event handlers to be applied to the embedding report
    const eventHandlersMap = new Map([
        [
            'loaded',
            function () {
                console.log('Report has loaded');
            },
        ],
        [
            'rendered',
            function () {
                console.log('Report has rendered');

                // Update display message
                setMessage('The report is rendered');
            },
        ],
        [
            'error',
            function (event) {
                if (event) {
                    console.error(event.detail);
                }
            },
        ],
    ]);

    // Fetch sample report's config (eg. embedUrl and AccessToken) for embedding
    const mockSignIn = async () => {
        // Fetch sample report's embed config
        const reportConfigResponse = await fetch(sampleReportUrl);

        if (!reportConfigResponse.ok) {
            console.error(`Failed to fetch config for report. Status: ${reportConfigResponse.status} ${reportConfigResponse.statusText}`);
            return;
        }

        const reportConfig = await reportConfigResponse.json();

        // Update display message
        setMessage('The access token is successfully set. Loading the Power BI report');

        // Set the fetched embedUrl and embedToken in the report config
        setReportConfig({
            ...sampleReportConfig,
            embedUrl: reportConfig.EmbedUrl,
            accessToken: reportConfig.EmbedToken.Token,
        });
    };

    const changeSettings = () => {
        // Update the state "sampleReportConfig" and re-render DemoApp component
        setReportConfig({
            ...sampleReportConfig,
            settings: {
                panes: {
                    filters: {
                        expanded: false,
                        visible: false,
                    },
                },
            },
        });
    };

    const [displayMessage, setMessage] = useState(`The report is bootstrapped. Click the Embed Report button to set the access token`);

    const controlButtons = (
        <div className="controls">
            <button onClick={mockSignIn}>Embed Report</button>

            <button onClick={changeSettings}>Hide filter pane</button>
        </div>
    );

    const header = (
        <div className="header">
            <div className="title">Power BI React component demo</div>
        </div>
    );

    const footer = (
        <div className="footer">
            <div className="footer-text">
                GitHub: &nbsp;
                <a href="https://github.com/microsoft/PowerBI-client-react">https://github.com/microsoft/PowerBI-client-react</a>
            </div>
        </div>
    );

    return (
        <div>
            {header}

            <PowerBIEmbed
                embedConfig={sampleReportConfig}
                eventHandlers={eventHandlersMap}
                cssClassName={'report-style-class'}
                getEmbeddedComponent={(embedObject) => {
                    console.log(`Embedded object of type "${embedObject.embedtype}" received`);
                    setReport(embedObject);
                }}
            />

            <div className="hr"></div>

            <div className="displayMessage">{displayMessage}</div>

            {controlButtons}

            {footer}
        </div>
    );
}

export default EmbeddedReportMaster;
