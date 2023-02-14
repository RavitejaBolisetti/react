import React from 'react';
import { Row, Col, Button } from 'antd';

import { ROUTING_LOGIN } from 'constants/routing';

import * as IMAGES from 'assets';

import styles from '../Auth.module.css';

const Logout = (props) => {
    return (
        <div className={styles.loginSection}>
            <div className={styles.loginMnMlogo}>
                <img src={IMAGES.MAH_WHITE_LOGO} alt="" />
            </div>
            <div className={styles.center}>
                <div className={styles.loginLogoSection}>
                    <img src={IMAGES.RL_LOGO} alt="" />
                    <div className={styles.logoText}>Dealer Management System</div>
                </div>
                <div className={styles.loginWrap}>
                    <Row>
                        <Col span={24}>
                            <div className={styles.logOutHtml}>
                                <div className={styles.center}>
                                    <div className={styles.loginForm}>
                                        <div className={styles.logOutHeading}>
                                            <h4>Thank You!</h4>
                                            <div className={styles.logOutSubHeading}>You are successfully logged out.</div>
                                            <div className={styles.logOutSubHeading}>Please <strong>Close</strong> the browser to
                                                <strong>&nbsp;Exit</strong> or click the <strong>Login</strong> button to
                                                <strong>&nbsp;Login</strong> again.</div>
                                        </div>
                                        <Button className={styles.button} type="primary" htmlType="link" href={ROUTING_LOGIN}>
                                            Login
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Logout;