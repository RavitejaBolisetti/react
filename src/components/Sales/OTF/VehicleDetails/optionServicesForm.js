/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Space, Collapse, Typography, Divider } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FiEdit } from 'react-icons/fi';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'components/common/Common.module.css';

import { DataTable } from 'utils/dataTable';
import { taxDetailsColumn, optionalServicesColumns } from './tablecolumn';
import { ActiveText, dynamicExpandIcon } from 'utils/accordianExpandIcon';
const { Text } = Typography;

const { Option } = Select;
const { Panel } = Collapse;

const OptionServicesFormMain = (props) => {
    const [optionForm] = Form.useForm();

    useEffect(() => {
        if (formActionType?.editMode && formData) {
            form.setFieldsValue({
                usageType: formData?.vehicleUsageType,
                model: formData?.model,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);
    const onFinish = (values) => {
        console.log('values', Values);
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form autoComplete="off" layout="vertical" form={optionForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item label="Service Name" name="serviceName">
                                <Input placeholder={preparePlaceholderText('Service Name')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item label="Amount" name="amount">
                                <Input placeholder={preparePlaceholderText('Amount')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Button onClick={addContactHandeler} type="primary">
                                Save
                            </Button>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Button onClick={addContactHandeler} danger>
                                Canel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};

export const OptionServicesForm = OptionServicesFormMain;
