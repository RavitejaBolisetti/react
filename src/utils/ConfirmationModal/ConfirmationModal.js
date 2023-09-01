/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button, Input, Form } from 'antd';
import { withModal } from 'components/withModal';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from './ConfirmationModal.module.css';

const { TextArea } = Input;
const ConfirmationModalMain = (props) => {
    const { onCloseAction, onSubmitAction, submitText = 'Submit', showField = false, text = '', content = '' } = props;

    const [form] = Form.useForm();
    const onFinish = (values) => {
        onSubmitAction({ ...values });
    };

    const onFinishFailed = () => {};

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                    {text && (
                        <div className={styles.confirmModalText}>
                            {text}
                            {content && (
                                <>
                                    <br /> {content}
                                </>
                            )}
                        </div>
                    )}
                    {showField && (
                        <Form.Item name="rejectionRemark" label={'Remark for Rejection'} rules={[validateRequiredInputField('remark')]}>
                            <TextArea maxLength={300} placeholder={preparePlaceholderText('remark')} showCount />
                        </Form.Item>
                    )}
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Button onClick={() => onCloseAction()} danger className={`${styles.modalButton} ${styles.btnLeft}`}>
                        No
                    </Button>
                    <Button htmlType="submit" type="primary" className={`${styles.modalButton} ${styles.btnRight}`}>
                        {submitText}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const ConfirmationModal = withModal(ConfirmationModalMain, { width: 400 });
