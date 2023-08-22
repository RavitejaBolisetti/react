/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Form, Row, Button, Input } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';

import styles from 'components/common/Common.module.css';

const { TextArea } = Input;

export const CancelReceiptForm = ({ handleCloseReceipt, handleCancelReceipt, cancelReceiptForm }) => {
    const onFinishFailed = () => {
        return;
    };

    return (
        <Form autoComplete="off" form={cancelReceiptForm} onFinish={handleCancelReceipt} layout="vertical" onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label="Cancellation Remark" name="cancelRemarks" rules={[validateRequiredInputField('Cancel Remarks')]}>
                        <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('Remarks')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={handleCloseReceipt} danger>
                        Cancel
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const CancelReceipt = withModal(CancelReceiptForm, {});
