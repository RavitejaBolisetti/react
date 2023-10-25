/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';
import { withModal } from 'components/withModal';

import styles from 'assets/sass/app.module.scss';

const LeaveUnsaveDataModalMain = (props) => {
    const { information, handleCloseModal, handleOk } = props;

    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {information}
                </Col>
            </Row>
            <div className={styles.modalFooter}>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                        <Button onClick={handleCloseModal} danger>
                            Cancel
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                        <Button type="primary" onClick={handleOk}>
                            Leave
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const LeaveUnsaveDataModal = withModal(LeaveUnsaveDataModalMain, {});
