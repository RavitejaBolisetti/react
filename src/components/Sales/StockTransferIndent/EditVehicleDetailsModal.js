/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { withModal } from 'components/withModal';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validationNumber } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';

export const EditVehicleDetailsModalFrom = (props) => {
    const { onCloseAction, formData, editVehicleDetailsForm, onFinish } = props;
    return (

        <Form autoComplete="off" layout="vertical" form={editVehicleDetailsForm} onFinish={onFinish}>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Model Description" name="modelDescription" initialValue={formData?.modelDescription}>
                        <Input placeholder={preparePlaceholderText('Model Description')} disabled={true}></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Model Code" name="modelCode" initialValue={formData?.modelCode}> 
                        <Input placeholder={preparePlaceholderText('Model Code')} disabled={true}></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Requested Quantity" name="requestedQuantity" initialValue={formData?.requestedQuantity}>
                        <Input placeholder={preparePlaceholderText('Requested Quantity')} disabled={true}></Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Cancelled Quantity" name="cancelledQuantity" initialValue={0}  rules={[validateRequiredInputField('Cancelled Quantity'), validationNumber('Cancelled Quantity')]}>
                        <Input placeholder={preparePlaceholderText('Cancelled Quantity')}></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Issued And Not Received Quantity" name="issuedAndNotReceivedQuantity" initialValue={formData?.issuedAndNotReceivedQuantity}> 
                        <Input placeholder={preparePlaceholderText('Issued And Not Received Quantity')} disabled={true}></Input>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Received Quantity" name="receivedQuantity" initialValue={formData?.receivedQuantity}>
                        <Input placeholder={preparePlaceholderText('Received Quantity')} disabled={true}></Input>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Balanced Quantity" name="balancedQuantity" initialValue={formData?.balancedQuantity} >
                        <Input placeholder={preparePlaceholderText('Balanced Quantity')} disabled={true}></Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={onCloseAction} danger>
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

export const EditVehicleDetailsModal = withModal(EditVehicleDetailsModalFrom, {width: 800});
