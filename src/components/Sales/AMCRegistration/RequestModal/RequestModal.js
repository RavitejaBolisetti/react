/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';

const { TextArea } = Input;

export const RejectRequestForm = (props) => {
    const { rejectModalCloseAction, rejectRequest } = props;
    const { handleCancelRequests, amcWholeCancellation, amcCancellationText, typeData, formData, cancelAMCForm, onFinish, onFinishFailed } = props;

    return (
        <>
            <Form autoComplete="off" layout="vertical" form={cancelAMCForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                {amcWholeCancellation && rejectRequest ? (
                    <>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                                <Form.Item label="Reason for Cancellation" name="amcCancelRemarks" rules={[validateRequiredInputField('remarks')]} initialValue={formData?.remarks}>
                                    {customSelectBox({ data: typeData?.[PARAM_MASTER.AMC_CANCEL_REASON.id], placeholder: preparePlaceholderSelect('Sale Type') })}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                                <Form.Item label="Rejection Remarks" name="remarks" rules={[validateRequiredInputField('remarks')]} initialValue={formData?.remarks}>
                                    <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('remark')} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.modalCheckBox}>
                                {amcCancellationText}
                            </Col>
                        </Row>
                    </>
                )}

                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button onClick={rejectModalCloseAction} danger className={styles.fullWidth}>
                            No
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button className={styles.fullWidth} onClick={handleCancelRequests} type="primary">
                            Yes, Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const RejectRequest = withModal(RejectRequestForm, {});
