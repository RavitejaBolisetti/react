/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React from 'react';
import { Row, Col, Button, Space } from 'antd';
import { withModal } from '../../../../withModal/withModal';

import styles from '../../CustomertMaster.module.css';

const ValidateMobileModalMain = (props) => {
    const { onCloseAction } = props;
    
    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.information}>
                    The mobile number you have entered is already used for customer ID-C12345678. Do you want to continue with the same number?
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space>
                        <Button ghost onClick={onCloseAction} htmlType="submit" type="primary" className={styles.modalButton}>
                            No
                        </Button>
                        <Button onClick={onCloseAction} htmlType="submit" type="primary" className={styles.modalButton}>
                            Yes, Continue
                        </Button>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const ValidateMobileNumberModal = withModal(ValidateMobileModalMain, { width: 400 });
