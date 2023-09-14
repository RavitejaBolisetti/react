/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';
import { withModal } from 'components/withModal';
import { ISSUE_CONSTANT, BUTTON_NAME_CONSTANTS } from '../Constants';
import styles from 'assets/sass/app.module.scss';

const CancelConfirmModalMain = ({ handdleYes, onCloseAction, AcceptButtonName = ISSUE_CONSTANT?.CANCEL }) => {
    return (
        <>
            <Row gutter={20} className={styles.marB20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <p>{AcceptButtonName?.modelMessage}</p>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button className={styles.fullWidth} danger onClick={onCloseAction}>
                        {BUTTON_NAME_CONSTANTS?.NO?.name}
                    </Button>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button className={styles.fullWidth} type="primary" onClick={handdleYes}>
                        {AcceptButtonName?.modalButtonName}
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export const CancelConfirmModal = withModal(CancelConfirmModalMain, { width: '30%', footer: null });
