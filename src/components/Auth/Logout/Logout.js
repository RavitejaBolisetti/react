import React from 'react';
import { Row, Col, Button } from 'antd';

import { ROUTING_LOGIN } from 'constants/routing';

import * as IMAGES from 'assets';

import styles from '../Auth.module.css';
import 'assets/style/new_robin.css';
import 'assets/style/new_robin.scss';

const Logout = (props) => {
    return (
        <div className="loginSection">
            <div className="loginMMlogo">
                <img src={IMAGES.MAH_WHITE_LOGO} alt="" />
            </div>
            <div className="loginlogoSection">
                <img src={IMAGES.RL_LOGO} alt="" />
                <div className="logotext">Dealer Management System</div>
            </div>
            <Row>
                <Col xs={20} sm={18} md={14} lg={12} xl={8} style={{ margin: '23px auto 0' }}>
                    <div className="login-wrap">
                        <Row>
                            <Col span={24}>
                                <div className="login-html">
                                    <div className="login-form">
                                        <div>
                                            <div className="loginHeading">
                                                <h4>Welcome!</h4>
                                                <div className="loginsubHeading">Please enter your credentials to login</div>
                                            </div>

                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.mrt10}>
                                                    <Button className={styles.button} type="primary" htmlType="link" href={ROUTING_LOGIN}>
                                                        Login
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Logout;