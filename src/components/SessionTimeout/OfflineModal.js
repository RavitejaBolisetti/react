/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col } from 'antd';
import { withModal } from 'components/withModal';

import styles from './SessionTimeoutModal.module.scss';
const OfflineModalMain = (props) => {
    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.information}>
                    Check your internet connectivity
                </Col>
            </Row>
        </>
    );
};

export const OfflineModal = withModal(OfflineModalMain, { width: 400 });
