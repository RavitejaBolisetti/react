import React from 'react';
import { Col, Row } from 'antd';

import styles from './Auth.module.css';
import Copyright from 'components/common/Footer/Copyright';

export default function Footer() {
    return (
        <div className={styles.loginMainFooter}>
            <Row gutter={20}>
                {/* <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div>
                            <a>Terms of use</a>
                            <a>About us</a>
                            <a>Disclaimer</a>
                            <a>Contact us</a>
                        </div>
                    </Col> */}
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Copyright />
                </Col>
            </Row>
        </div>
    );
}
