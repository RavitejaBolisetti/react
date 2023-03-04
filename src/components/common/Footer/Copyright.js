import React from 'react';
import moment from 'moment';
import { convertDateTime } from 'utils/formatDateTime';

import styles from './Footer.module.css';

function Copyright({ alignRight }) {
    return (
        <div className={alignRight ? styles.footerRight : styles.footerText}>
            <span>Copyright &copy; {convertDateTime(moment(), 'Y ')} ROBIN</span>
        </div>
    );
}

export default Copyright;
