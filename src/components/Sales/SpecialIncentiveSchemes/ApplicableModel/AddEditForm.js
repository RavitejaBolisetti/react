/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, Select, Divider, Card, Space } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const children = [<Option key="all">All</Option>];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + ' mahindra Scorpion ' + i}</Option>);
    }

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Card style={{ backgroundColor: '#f2f2f2' }}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="model" label={'Model'}>
                                        <Select open={true} defaultOpen={true} maxTagCount={0} mode="multiple" style={{ width: '100%' }} placeholder="Please select" defaultValue={['a10', 'c12']} onChange={handleChange}>
                                            {children}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="varient" label={'Varient'}>
                                        <Select open={true} defaultOpen={true} maxTagCount={0} mode="multiple" style={{ width: '100%' }} placeholder="Please select" defaultValue={['a10', 'c12']} onChange={handleChange}>
                                            {children}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
