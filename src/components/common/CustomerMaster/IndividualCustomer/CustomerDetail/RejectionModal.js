/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import { Row, Col, Button, Space, Typography, Input } from 'antd';
import { withModal } from '../../../../withModal/withModal';
import styles from '../../CustomertMaster.module.css';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
const { TextArea } = Input;

const { Text } = Typography;

const RejectionModalMain = (props) => {
    const { onCloseAction, onCloseActionOnContinue } = props;

    return (
        <>
            <Row>
                <Text type="secondary" style={{ fontWeight: '400', fontSize: '14px' }}>
                    Reason for Rejection
                </Text>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('Description')} />
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space>
                        <Button onClick={onCloseAction} htmlType="submit" danger className={styles.modalButton}>
                            Cancel
                        </Button>
                        <Button onClick={onCloseActionOnContinue} htmlType="submit" type="primary" className={styles.modalButton}>
                            Submit
                        </Button>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const RejectionModal = withModal(RejectionModalMain, { width: 400 });
