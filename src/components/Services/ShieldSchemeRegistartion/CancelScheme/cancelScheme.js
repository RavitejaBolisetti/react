/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;

export const CancelSchemeForm = (props) => {
    const { rejectModalCloseAction, rejectRequest } = props;
    const { handleCancelRequests, handleCancelScheme, amcWholeCancellation, isMNMApproval, amcCancellationText, typeData, formData, cancelSchemeForm, userType, buttonText } = props;
    const [isOtherReason, setIsOtherReason] = useState(false);
    const handleRemarksChange = (value) => {
        if (value === AMC_CONSTANTS?.OTHERS?.key) {
            setIsOtherReason(true);
        } else {
            setIsOtherReason(false);
        }
    };
    return (
        <>
            <Form autoComplete="off" layout="vertical" form={cancelSchemeForm} onFinish={handleCancelScheme}>
                {(amcWholeCancellation || !isMNMApproval) && rejectRequest ? (
                    <>
                        {userType === AMC_CONSTANTS?.DEALER?.key ? (
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                                    <Form.Item label={translateContent('shieldSchemeRegistration.label.reasonForCancellation')} name="cancelRemarks" rules={[validateRequiredInputField(translateContent('shieldSchemeRegistration.label.reasonForCancellation'))]} initialValue={formData?.amcCancelRemarks}>
                                        {customSelectBox({ data: typeData?.[PARAM_MASTER.AMC_CANCEL_REASON.id], placeholder: preparePlaceholderSelect(translateContent('shieldSchemeRegistration.label.reasonForCancellation')), onChange: handleRemarksChange })}
                                    </Form.Item>
                                </Col>
                            </Row>
                        ) : (
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                                    <Form.Item label={translateContent('shieldSchemeRegistration.label.reasonForRejection')} name="reasonForRejection" rules={[validateRequiredInputField(translateContent('shieldSchemeRegistration.label.reasonForRejection'))]} initialValue={formData?.reasonForRejection}>
                                        {customSelectBox({ data: typeData?.[PARAM_MASTER.AMC_CANCEL_REASON.id], placeholder: preparePlaceholderSelect(translateContent('shieldSchemeRegistration.label.reasonForRejection')), onChange: handleRemarksChange })}
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}
                        {isOtherReason && (
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                                    <Form.Item label={translateContent('shieldSchemeRegistration.label.otherReason')} name="otherReason" rules={[validateRequiredInputField(translateContent('shieldSchemeRegistration.label.otherReason'))]} initialValue={formData?.otherReason}>
                                        <TextArea showCount maxLength={300} placeholder={preparePlaceholderText(translateContent('shieldSchemeRegistration.label.otherReason'))} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}
                    </>
                ) : (
                    <Row gutter={16} className={styles?.marB20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.modalCheckBox}>
                            {amcCancellationText}
                        </Col>
                    </Row>
                )}

                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button onClick={rejectModalCloseAction} danger className={styles.fullWidth}>
                            {translateContent('shieldSchemeRegistration.label.no')}
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Button className={styles.fullWidth} onClick={handleCancelRequests} type="primary">
                            {buttonText}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const CancelScheme = withModal(CancelSchemeForm, {});
