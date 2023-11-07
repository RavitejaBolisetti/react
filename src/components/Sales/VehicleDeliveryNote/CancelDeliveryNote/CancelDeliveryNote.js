/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'assets/sass/app.module.scss';

const { TextArea } = Input;

export const RejectRequestForm = (props) => {
    const { formData, cancelDeliveryNoteForm, onFinish, cancelModalCloseAction, retailMonth, typeData, yesRetailMonth, setYesRetailMonth } = props;

    return (
        <Form autoComplete="off" layout="vertical" form={cancelDeliveryNoteForm} onFinish={onFinish}>
            {retailMonth ? (
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                        <Form.Item label="Remark For Cancellation" name="cancellationRemark" rules={[validateRequiredInputField('remarks')]} initialValue={formData?.remarks}>
                            <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('remark')} />
                        </Form.Item>
                    </Col>
                </Row>
            ) : (
                <>
                    {yesRetailMonth ? (
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                                <div>Retail sale month closed. Would you like to send Cancellation approval request?</div>
                            </Col>
                        </Row>
                    ) : (
                        <>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Form.Item name="cancellationReason" label="Reason for Cancellation" rules={[validateRequiredSelectField('Reason Type')]}>
                                        {customSelectBox({ data: typeData[PARAM_MASTER?.DLVR_CNCL_RSN?.id], placeholder: preparePlaceholderSelect('Cancellation Reason Type') })}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                                    <Form.Item label="Cancellation Remarks" name="cancellationRemark" rules={[validateRequiredInputField('remarks')]} initialValue={formData?.remarks}>
                                        <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('remark')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                </>
            )}
            {retailMonth ? (
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button onClick={cancelModalCloseAction} danger className={styles.fullWidth}>
                            Cancel
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button className={styles.fullWidth} htmlType="submit" type="primary">
                            Submit
                        </Button>
                    </Col>
                </Row>
            ) : (
                <>
                    {yesRetailMonth ? (
                        <>
                            <Row gutter={20}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Button onClick={cancelModalCloseAction} danger className={styles.fullWidth}>
                                        No
                                    </Button>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Button
                                        className={styles.fullWidth}
                                        onClick={() => {
                                            setYesRetailMonth(false);
                                        }}
                                        type="primary"
                                    >
                                        Yes
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <>
                            <Row gutter={20}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Button onClick={cancelModalCloseAction} danger className={styles.fullWidth}>
                                        Cancel
                                    </Button>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Button className={styles.fullWidth} onClick={onFinish} type="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}
                </>
            )}
        </Form>
    );
};

export const CancelDeliveryNote = withModal(RejectRequestForm, {});
