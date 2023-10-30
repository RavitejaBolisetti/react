/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import parser from 'html-react-parser';
import { convertDateTime } from 'utils/formatDateTime';

import styles from './Footer.module.scss';

const Copyright = ({ alignRight }) => {
    const { t: translate } = useTranslation();
    return (
        <div className={alignRight ? styles.footerRight : styles.footerText}>
            <span>{parser(translate('footer.copyright').replace('{YEAR}', convertDateTime(moment(), 'Y ')))}</span>
        </div>
    );
};

export default Copyright;
