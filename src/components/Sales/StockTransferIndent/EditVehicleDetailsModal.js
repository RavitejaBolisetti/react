/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { withModal } from 'components/withModal';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validationNumber, isValidQunatity } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const EditVehicleDetailsModalFrom = (props) => {
    const { onCloseAction, formData, editVehicleDetailsForm, onFinish } = props;

    return (
        <Form autoComplete="off" layout="vertical" form={editVehicleDetailsForm} onFinish={onFinish}>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('stockTransferIndent.label.modelDescription')} name="modelDescription" initialValue={formData?.modelDescription}>
                        <Input placeholder={preparePlaceholderText(translateContent('stockTransferIndent.label.modelDescription'))} disabled={true}></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('stockTransferIndent.label.modelCode')} name="modelCode" initialValue={formData?.modelCode}>
                        <Input placeholder={preparePlaceholderText(translateContent('stockTransferIndent.label.modelCode'))} disabled={true}></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('stockTransferIndent.label.requestedQuantity')} name="requestedQuantity" initialValue={formData?.requestedQuantity}>
                        <Input placeholder={preparePlaceholderText(translateContent('stockTransferIndent.label.requestedQuantity'))} disabled={true}></Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('stockTransferIndent.label.cancelledQuantity')} name="cancelledQuantity" initialValue={formData?.cancelledQuantity} rules={[validateRequiredInputField('Cancelled Quantity'), validationNumber('Cancelled Quantity'), { validator: (_, value) => isValidQunatity(value, editVehicleDetailsForm.getFieldValue('balancedQuantity')) }]}>
                        <Input placeholder={preparePlaceholderText(translateContent('stockTransferIndent.label.cancelledQuantity'))}></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('stockTransferIndent.label.issuedAndNotReceivedQuantity')} name="issuedAndNotReceivedQuantity" initialValue={formData?.issuedAndNotReceivedQuantity}>
                        <Input placeholder={preparePlaceholderText(translateContent('stockTransferIndent.label.issuedAndNotReceivedQuantity'))} disabled={true}></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('stockTransferIndent.label.receivedQuantity')} name="receivedQuantity" initialValue={formData?.receivedQuantity}>
                        <Input placeholder={preparePlaceholderText(translateContent('stockTransferIndent.label.receivedQuantity'))} disabled={true}></Input>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('stockTransferIndent.label.balancedQuantity')} name="balancedQuantity" initialValue={formData?.balancedQuantity}>
                        <Input placeholder={preparePlaceholderText(translateContent('stockTransferIndent.label.balancedQuantity'))} disabled={true}></Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={onCloseAction} danger>
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

export const EditVehicleDetailsModal = withModal(EditVehicleDetailsModalFrom, { width: 800 });
