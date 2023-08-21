/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import { Row, Col, Button, Space, Input, Form } from 'antd';
import { withModal } from 'components/withModal';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from '../../../CustomertMaster.module.css';

const { TextArea } = Input;

const RejectNameChangeRequestMain = (props) => {
    const { onCloseAction, onContinueAction } = props;
    const [form] = Form.useForm();

    const onFinish = (values) => {
        onContinueAction({ ...values });
    };

    const onFinishFailed = () => {};

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item name="rejectionRemark" label={'Reason for Rejection'} rules={[validateRequiredInputField('remark')]}>
                        <TextArea maxLength={300} placeholder={preparePlaceholderText('Enter remark')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space>
                        <Button onClick={onCloseAction} danger className={styles.modalButton}>
                            Cancel
                        </Button>
                        <Button htmlType="submit" type="primary" className={styles.modalButton}>
                            Submit
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Form>
    );
};

export const RejectNameChangeRequest = withModal(RejectNameChangeRequestMain, { width: 400 });
