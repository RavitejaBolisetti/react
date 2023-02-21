import React from 'react';
import moment from 'moment';
import { Col, Row } from 'antd';

import { convertDateTime } from 'utils/formatDateTime';
import styles from './Auth.module.css';

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
                    <div className={styles.textCenter}>
                        <span>Copyright &copy; {convertDateTime(moment(), 'Y ')} ROBIN. All Rights Reserved.</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
