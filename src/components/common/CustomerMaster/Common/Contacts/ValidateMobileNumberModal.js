/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import { Row, Col, Button, Space } from 'antd';
import { withModal } from '../../../../withModal/withModal';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const ValidateMobileModalMain = (props) => {
    const { onCloseAction, onCloseActionOnContinue } = props;

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
                        <Button onClick={onCloseAction} htmlType="submit" danger className={styles.modalButton}>
                            {translateContent('customerMaster.button.no')}
                        </Button>
                        <Button onClick={onCloseActionOnContinue} htmlType="submit" type="primary" className={styles.modalButton}>
                            {translateContent('customerMaster.button.yes')}
                        </Button>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const ValidateMobileNumberModal = withModal(ValidateMobileModalMain, { width: 400 });
