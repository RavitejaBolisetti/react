/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Modal, Col, Form, Row, DatePicker } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { dateFormat } from 'utils/formatDateTime';

export const ExportCOA = (props) => {
    const { modalOpen, setModalOpen, exportCoaForm, onCoaFinish, onFinishFailed } = props;
    return (
        <Modal title="Export COA" centered open={modalOpen} onOk={onCoaFinish} onCancel={() => setModalOpen(false)} okText="Download" cancelText="Cancel">
            <Form autoComplete="off" form={exportCoaForm} layout="vertical" onFinish={onCoaFinish} onFinishFailed={onFinishFailed}>
                <Row xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label="From Date" name="fromDate" rules={[validateRequiredSelectField('From Date')]}>
                            <DatePicker 
                                placeholder={preparePlaceholderSelect('From Date')}
                                format={dateFormat}
                                disabledDate={(current) => current > new Date()}
                                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label="To Date" name="toDate" rules={[validateRequiredSelectField('To Date')]}>
                            <DatePicker
                                placeholder={preparePlaceholderSelect('To Date')}
                                format={dateFormat}
                                disabledDate={(current) => current < exportCoaForm?.getFieldValue('fromDate') || current > new Date()}
                                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};
