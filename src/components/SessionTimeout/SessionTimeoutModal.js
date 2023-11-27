/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';
import { withModal } from 'components/withModal';

import styles from './SessionTimeoutModal.module.scss';
import { translateContent } from 'utils/translateContent';
const SessionTimeoutModalMain = (props) => {
    const { remaining, handleLogoutAction, handleSessionContinueAction } = props;
    const seconds = remaining > 1 ? translateContent('sessionTimeout.notification.seconds') : translateContent('sessionTimeout.notification.second');
    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.information}>
                    {translateContent('sessionTimeout.notification.loggedOut')} <br />
                    {translateContent('sessionTimeout.notification.in')}{' '}
                    <b>
                        {remaining} {seconds}
                    </b>
                    {translateContent('sessionTimeout.notification.continue')}
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button onClick={handleLogoutAction} danger className={styles.button}>
                        {translateContent('sessionTimeout.buttons.logout')}
                    </Button>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button onClick={handleSessionContinueAction} htmlType="submit" type="primary" className={styles.button}>
                        {translateContent('sessionTimeout.buttons.continue')}
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export const SessionTimeoutModal = withModal(SessionTimeoutModalMain, { width: 400 });
