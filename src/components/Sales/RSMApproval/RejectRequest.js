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

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;

export const RejectRequestForm = (props) => {
    const { rejectModalCloseAction, rejectRequest } = props;
    const { formData, rejectForm, onFinish, rejectFormButtonActive, setRejectFormButtonActive } = props;

    const handleFormValueChange = () => {
        setRejectFormButtonActive(false);
    };

    const handleFormFieldChange = () => {
        setRejectFormButtonActive(false);
    };

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setRejectFormButtonActive(false);
        } else {
            setRejectFormButtonActive(true);
        }
    };

    return (
        <Form autoComplete="off" layout="vertical" form={rejectForm} onFinish={onFinish} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange}>
            {rejectRequest ? (
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                        <Form.Item label={translateContent('rsmApproval.label.rejectionRemarks')} name="remarks" rules={[validateRequiredInputField(translateContent('rsmApproval.label.rejectionRemarks'))]} initialValue={formData?.remarks}>
                            <TextArea showCount maxLength={300} placeholder={preparePlaceholderText(translateContent('rsmApproval.label.rejectionRemarks'))} />
                        </Form.Item>
                    </Col>
                </Row>
            ) : (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.modalCheckBox}>
                            <Form.Item initialValue={false} valuePropName="checked" name="status">
                                <Checkbox className={styles.registered} onChange={handleCheckboxChange}>
                                    {translateContent('rsmApproval.label.acceptanceTermsFirstLine')} <br />
                                    {translateContent('rsmApproval.label.acceptanceTermsSecondLine')}
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Button onClick={rejectModalCloseAction} danger className={styles.fullWidth}>
                        Cancel
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Button disabled={rejectFormButtonActive} className={styles.fullWidth} htmlType="submit" type="primary">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const RejectRequest = withModal(RejectRequestForm, {});
