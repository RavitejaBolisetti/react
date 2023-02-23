import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Col, Layout, Row } from 'antd';

import { ROUTING_USER_TERM, ROUTING_USER_ABOUT, ROUTING_USER_CONTACT, ROUTING_USER_DISCLAIMER } from 'constants/routing';
import { convertDateTime } from 'utils/formatDateTime';

import styles from './Footer.module.css';

const { Footer: FooterLayout } = Layout;

export const Footer = () => {
    return (
        <FooterLayout id="footerSection">
            <div className={styles.footerLink}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.textLeft}>
                        <div>
                            <Link to={ROUTING_USER_TERM}>Terms of use</Link>
                            <Link to={ROUTING_USER_ABOUT}>About us</Link>
                            <Link to={ROUTING_USER_DISCLAIMER}>Disclaimer</Link>
                            <Link to={ROUTING_USER_CONTACT}>Contact Us</Link>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.textRight}>
                        <div className={styles.textCenter}>
                            <span>Copyright &copy; {convertDateTime(moment(), 'Y ')} ROBIN. All Rights Reserved.</span>
                        </div>
                    </Col>
                </Row>
                {/* <div className={styles.footerLink}>
                <Link to={ROUTING_USER_TERM}>Terms of use</Link>
                <Link to={ROUTING_USER_ABOUT}>About us</Link>
                <Link to={ROUTING_USER_DISCLAIMER}>Disclaimer</Link>
                <Link to={ROUTING_USER_CONTACT}>Contact Us</Link>
            </div>
            <div className={styles.footerBottomText}>
                <span>Copyright &copy; {convertDateTime(moment(), 'Y ')} ROBIN. All Rights Reserved.</span>
            </div> */}
            </div>
        </FooterLayout>
    );
};
