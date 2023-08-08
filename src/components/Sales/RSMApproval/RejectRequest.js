/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';

import styles from 'components/common/Common.module.css';

const { TextArea } = Input;

export const RejectRequestForm = (props) => {
    const { rejectModalCloseAction, rejectRequest } = props;
    const { formData, rejectForm, onFinish, onFinishFailed, rejectFormButtonActive, setRejectFormButtonActive } = props;

    const handleFormValueChange = () => {
        setRejectFormButtonActive(false);
    };

    const handleFormFieldChange = () => {
        setRejectFormButtonActive(false);
    };

    return (
        <Form autoComplete="off" layout="vertical" form={rejectForm} onFinish={onFinish} onFinishFailed={onFinishFailed} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange}>
            {rejectRequest ? (
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item label="Rejection Remarks" name="remarks" rules={[validateRequiredInputField('remarks')]} initialValue={formData?.remarks}>
                            <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('remark')} />
                        </Form.Item>
                    </Col>
                </Row>
            ) : (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item initialValue={false} valuePropName="checked" name="status">
                                <Checkbox className={styles.registered}>
                                    <div style={{ fontSize: '16px' }}>I accept that for the Transferred Vehicle , Claim can be generated from the billed Dealer. If more than one transfer happens for the same vehicle then claim is not allowed for any of the dealership. </div>
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={rejectModalCloseAction} danger>
                        Cancel
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button disabled={rejectFormButtonActive} htmlType="submit" type="primary">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const RejectRequest = withModal(RejectRequestForm, {});
