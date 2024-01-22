/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Form, Row, Button } from 'antd';

import { withModal } from 'components/withModal';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const CancelInvoiceForm = ({ handleCloseReceipt, handleCancelReceipt, cancelInvoiceForm, typeData }) => {
    const invoiceCancellationType = typeData?.INVOICE_CANCEL_TYPE;
    return (
        <Form autoComplete="off" form={cancelInvoiceForm} onFinish={handleCancelReceipt} layout="vertical">
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label={translateContent('vehicleInvoiceGeneration.label.cancelInvoice.reasonForCancellation')} name="cancelReason" rules={[validateRequiredInputField('Reason for Cancellation')]}>
                        {customSelectBox({ data: typeData?.[PARAM_MASTER.INVOICE_CANCEL_REASON.id], placeholder: preparePlaceholderSelect('Reason for Cancellation') })}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label={translateContent('vehicleInvoiceGeneration.label.cancelInvoice.cancellationType')} name="cancelType" rules={[validateRequiredInputField(translateContent('vehicleInvoiceGeneration.label.cancelInvoice.cancellationType'))]}>
                        {customSelectBox({ data: invoiceCancellationType, placeholder: preparePlaceholderSelect(translateContent('vehicleInvoiceGeneration.label.cancelInvoice.cancellationType')) })}
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

export const CancelInvoice = withModal(CancelInvoiceForm, {});
