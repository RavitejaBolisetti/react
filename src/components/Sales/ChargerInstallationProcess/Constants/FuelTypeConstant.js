/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { translateContent } from 'utils/translateContent';

export const FUEL_TYPE = {
    ELECTR: {
        id: 1,
        key: 'ELECTR',
        title: translateContent('chargerInstallationDetails.label.electric'),
        desc: 'Electric',
        displayOnView: true,
        filter: true,
    },
};
export const REQUEST_STAGE_CONSTANTS = {
    SITE_SURVEY: {
        id: 1,
        key: 'SRV',
        value: 'Site Survey',
    },
    SITE_VALIDATION: {
        id: 2,
        key: 'VLD',
        value: 'Site Validation',
    },
    INSTALLATION: {
        id: 3,
        key: 'INS',
        value: 'Installation',
    },
    COMMISSIONING: {
        id: 4,
        key: 'COM',
        value: 'Commissioning',
    },
};
