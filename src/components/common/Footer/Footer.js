import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Layout } from 'antd';

import styles from './Footer.module.css';
import { ROUTING_DASHBOARD, ROUTING_USER_ABOUT } from 'constants/routing';
import { ROUTING_USER_CONTACT } from 'constants/routing';
import { ROUTING_USER_TERM } from 'constants/routing';
import { ROUTING_USER_DISCLAIMER } from 'constants/routing';
import { convertDateTime } from 'utils/formatDateTime';

const { Footer: FooterLayout } = Layout;

export const Footer = () => {
    return (
        <FooterLayout id="footerSection">
            <div className={styles.footerLink}>
                <Link to={ROUTING_USER_TERM}>Terms of use</Link>
                <Link to={ROUTING_USER_ABOUT}>About us</Link>
                <Link to={ROUTING_USER_DISCLAIMER}>Disclaimer</Link>
                <Link to={ROUTING_USER_CONTACT}>Contact Us</Link>
            </div>
            <div className={styles.footerBottomText}>
                Copyright &copy; {convertDateTime(moment(), 'Y')} <Link to={ROUTING_DASHBOARD}>ROBIN</Link>. All rights reserved.
            </div>
        </FooterLayout>
    );
};
