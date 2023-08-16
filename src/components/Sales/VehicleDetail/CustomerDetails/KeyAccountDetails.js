/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';

export const KeyAccountDetails = (props) => {
    const { formType, formData } = props;

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'keyAccountCode']} label="Key Account Code" initialValue={formData?.keyAccountCode}>
                        <Input maxLength={6} placeholder={preparePlaceholderText('Key Account Code')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'keyAccountName']} label="Key Account Name" initialValue={formData?.keyAccountName}>
                        <Input placeholder={preparePlaceholderText('Key Account Name')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'accountSegment']} label="Account Segment" initialValue={formData?.accountSegment}>
                        <Input placeholder={preparePlaceholderText('Account Segment')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'keyAccountClientName']} label="Key Account Client Name" initialValue={formData?.keyAccountClientName}>
                        <Input placeholder={preparePlaceholderText('Key Account Client Name')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'keyAccountMappingDate']} label="Key Account Mapping Date" initialValue={formData?.keyAccountMappingDate}>
                        <Input placeholder={preparePlaceholderText('Key Account Mapping Date')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};
