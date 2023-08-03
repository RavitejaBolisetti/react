/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Input, Button, Checkbox } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const { TextArea } = Input;

export const RejectRequestForm = (props) => {
    const { rejectModalCloseAction, rejectRequest } = props;
    const { formData, rejectForm } = props;

    const onFinish = (values) => {};

    const onFinishFailed = () => {
        return;
    };

    return (
        <Form autoComplete="off" layout="vertical" form={rejectForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {rejectRequest ? (
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item label="Rejection Remarks" name="remarks" initialValue={formData?.remarks}>
                            <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('remark')} />
                        </Form.Item>
                    </Col>
                </Row>
            ) : (
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Checkbox className={styles.registered} value="status">
                            I accept that for the Transferred Vehicle , Claim can be generated from the billed Dealer. If more than one transfer happens for the same vehicle then claim is not allowed for any of the dealership.
                        </Checkbox>
                    </Col>
                </Row>
            )}

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={rejectModalCloseAction} danger>
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

export const RejectRequest = withModal(RejectRequestForm, {});
