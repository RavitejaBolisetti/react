/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Modal, Col, Form, Row, DatePicker } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import { dateFormat } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';

export const ExportCOA = (props) => {
    const { modalOpen, setModalOpen, exportCoaForm, onCoaFinish } = props;
    return (
        <Modal title={translateContent('chartOfAccount.heading.exportCoa')} centered open={modalOpen} onOk={onCoaFinish} onCancel={() => setModalOpen(false)} okText={translateContent('global.buttons.download')} cancelText={translateContent('global.buttons.cancel')}>
            <Form autoComplete="off" form={exportCoaForm} layout="vertical" onFinish={onCoaFinish}>
                <Row xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label={translateContent('chartOfAccount.label.fromDate')} name="fromDate" rules={[validateRequiredSelectField(translateContent('chartOfAccount.validation.fromDate'))]}>
                            <DatePicker placeholder={translateContent('chartOfAccount.placeholder.fromDate')} format={dateFormat} disabledDate={(current) => current > new Date()} getPopupContainer={(triggerNode) => triggerNode.parentElement} />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label={translateContent('chartOfAccount.label.toDate')} name="toDate" rules={[validateRequiredSelectField(translateContent('chartOfAccount.validation.toDate'))]}>
                            <DatePicker placeholder={translateContent('chartOfAccount.placeholder.toDate')} format={dateFormat} disabledDate={(current) => current < exportCoaForm?.getFieldValue('fromDate') || current > new Date()} getPopupContainer={(triggerNode) => triggerNode.parentElement} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};
