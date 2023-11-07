/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Button } from 'antd';
import { withModal } from 'components/withModal';

import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const ConfirmationModalFrom = (props) => {
    const { vpoCancellationForm, onFinishVPOCancellation } = props;
    const { buttonData, setButtonData, typeData, setIsCancelVisible } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
    const handleCloseModal = () => {
        setIsCancelVisible(false);
        vpoCancellationForm?.resetFields();
    };

    return (
        <Form form={vpoCancellationForm} onFinish={onFinishVPOCancellation} layout="vertical" autocomplete="off" colon="false" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item name="cancelRemarksCode" label={translateContent('vehiclePurchaseOrder.vehiclePurchaseOrderCancellation.label.cancellationReason')} rules={[validateRequiredSelectField(translateContent('vehiclePurchaseOrder.vehiclePurchaseOrderCancellation.validation.cancellationReason'))]}>
                        <Select placeholder={preparePlaceholderSelect(translateContent('vehiclePurchaseOrder.vehiclePurchaseOrderCancellation.placeholder.cancellationReason'))} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['PO_CNCL_RSN']}></Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={handleCloseModal} danger>
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

export const ConfirmationModal = withModal(ConfirmationModalFrom, {});
