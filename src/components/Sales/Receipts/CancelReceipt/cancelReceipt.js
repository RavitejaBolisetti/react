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

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;

export const CancelReceiptForm = ({ handleCloseReceipt, handleCancelReceipt, cancelReceiptForm }) => {
    return (
        <Form autoComplete="off" form={cancelReceiptForm} onFinish={handleCancelReceipt} layout="vertical">
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                    <Form.Item label={translateContent('receipts.label.cancellationRemark')} name="cancelRemarks" rules={[validateRequiredInputField(translateContent('receipts.validation.cancelRemarks'))]}>
                        <TextArea showCount maxLength={300} placeholder={preparePlaceholderText(translateContent('receipts.placeholder.remarks'))} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={handleCloseReceipt} danger>
                        {translateContent('global.buttons.cancel')}
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                    {translateContent('global.buttons.submit')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const CancelReceipt = withModal(CancelReceiptForm, {});
