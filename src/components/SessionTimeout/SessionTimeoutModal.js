/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';
import { withModal } from 'components/withModal';

import styles from './SessionTimeoutModal.module.scss';
//import styles from './SessionTimeoutModal.module.css';

const SessionTimeoutModalMain = (props) => {
    const { remaining, handleLogoutAction, handleSessionContinueAction } = props;
    const seconds = remaining > 1 ? 'seconds' : 'second';
    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.information}>
                    Your session is about to expire. You will be logged out <br />
                    in{' '}
                    <b>
                        {remaining} {seconds}
                    </b>
                    . Click "Continue" if you want to continue and stay logged in.
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button onClick={handleLogoutAction} danger className={styles.button}>
                        Logout
                    </Button>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button onClick={handleSessionContinueAction} htmlType="submit" type="primary" className={styles.button}>
                        Continue
                    </Button>
                </Col>

            </Row>
        </>
    );
};

export const SessionTimeoutModal = withModal(SessionTimeoutModalMain, { width: 400 });
