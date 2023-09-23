/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

import * as IMAGES from 'assets';
import Footer from '../Footer';

import { ROUTING_LOGIN } from 'constants/routing';

import styles from '../Auth.module.scss';
const Logout = (props) => {
    return (
        <div className={styles.loginSection}>
            <div className={styles.loginMnMlogo}>
                <img src={IMAGES.MAH_WHITE_LOGO} alt="" />
            </div>
            <div className={styles.center}>
                <div className={styles.loginLogoSection}>
                    <img src={IMAGES.RL_LOGO} className={styles.mainLogo} alt="" />
                    <br></br>
                    <img src={IMAGES.LINE} className={styles.mainLogoLine} alt="" />
                    <div className={styles.logoText}>Dealer Management System</div>
                </div>
                <div className={styles.loginWrap}>
                    <Row>
                        <Col span={24}>
                            <div className={styles.logOutHtml}>
                                <div className={styles.centerInner}>
                                    <div className={styles.loginForm}>
                                        <div className={styles.logOutHeading}>
                                            <h1>Thank You!</h1>
                                            <div className={styles.logOutSubHeading}>You are successfully logged out.</div>
                                            <div className={styles.logOutSubHeading}>
                                                Please <strong>Close</strong> the browser to
                                                <strong>&nbsp;Exit</strong> or click the <strong>Login</strong> button to
                                                <strong>&nbsp;Login</strong> again.
                                            </div>
                                        </div>
                                        <Link to={ROUTING_LOGIN}>
                                            <Button className={styles.button} type="primary" htmlType="link">
                                                Login
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Logout;
