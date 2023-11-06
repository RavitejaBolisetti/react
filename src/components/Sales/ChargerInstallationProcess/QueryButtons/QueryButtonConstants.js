/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { translateContent } from 'utils/translateContent';

export const QUERY_BUTTONS = {
    SITE_SURVEY: {
        id: 1,
        title: translateContent('queryButtons.label.siteSurvey'),
        key: 'SRV',
        displayOnView: true,
        active: true,
    },
    SITE_VALIDATION: {
        id: 2,
        title: translateContent('queryButtons.label.siteValidation'),
        key: 'VLD',
        displayOnView: true,
        active: false,
    },
    INSTALLATION: {
        id: 3,
        title: translateContent('queryButtons.label.installation'),
        key: 'INS',
        displayOnView: true,
        active: false,
    },
    COMMISSION: {
        id: 4,
        title: translateContent('queryButtons.label.checklistCode'),
        key: 'COM',
        displayOnView: true,
        active: false,
    },
};
