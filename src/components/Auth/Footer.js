/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';

import styles from './Auth.module.css';
import Copyright from 'components/common/Footer/Copyright';

export default function Footer() {
    return (
        <div className={styles.loginMainFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Copyright />
                </Col>
            </Row>
        </div>
    );
}
