/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import * as scanner from 'sonarqube-scanner';

import { config as configDotenv } from 'dotenv';

// config the environment
configDotenv();

// The URL of the SonarQube server. Defaults to http://localhost:9000
const serverUrl = process.env.SONARQUBE_URL;

// The token used to connect to the SonarQube/SonarCloud server. Empty by default.
const token = process.env.SONARQUBE_TOKEN;

// projectKey must be unique in a given SonarQube instance
const projectKey = process.env.SONARQUBE_PROJECTKEY;

// options Map (optional) Used to pass extra parameters for the analysis.
// See the [official documentation](https://docs.sonarqube.org/latest/analysis/analysis-parameters/) for more details.
const options = {
    'sonar.projectKey': projectKey,

    // projectName - defaults to project key
    'sonar.projectName': 'dms-ui-application',

    // Path is relative to the sonar-project.properties file. Defaults to .
    'sonar.sources': 'src/',
    'sonar.coverage.exclusions': 'src/components/DashboardOld/**/*, src/components/Sales/ChargerInstallationProcess/**/*,src/components/Sales/common/ChecklistDetails/**/*,src/components/Sales/common/utils/**/*',

    // source language
    'sonar.coverage.exclusions': 'src/__mocks__/**/*, src/mocks/**/*,src/__test__/**/*',
    'sonar.language': 'js',

    'sonar.javascript.lcov.reportPaths': 'src/coverage/lcov.info',

    // Encoding of the source code. Default is default system encoding
    'sonar.sourceEncoding': 'UTF-8',
};

// parameters for sonarqube-scanner
const params = {
    serverUrl,
    token,
    options,
};

const sonarScanner = async () => {
    if (!serverUrl) {
        return;
    }

    //  Function Callback (the execution of the analysis is asynchronous).
    const callback = () => {};

    scanner(params, callback);
};

sonarScanner().catch((err) => console.error('Error during sonar scan', err));
