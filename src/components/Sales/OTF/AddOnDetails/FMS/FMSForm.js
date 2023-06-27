/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const FMSForm = ({ formData, fmsForm }) => {
    const [isReadOnly, setisReadOnly] = useState(false);

    const onFieldsChange = () => {};
    const onFinishFailed = () => {};
    useEffect(() => {
        setisReadOnly(true);
        fmsForm.setFieldsValue({
            fms: formData?.fms ? formData?.fms : 'NA',
            fmsRate: formData?.fmsRate ? formData?.fmsRate : 'NA',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <Form form={fmsForm} onFieldsChange={onFieldsChange} autoComplete="off" id="shieldForm" layout="vertical" onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="FMS" name="fms">
                        <Input disabled={isReadOnly} placeholder={preparePlaceholderText('fms')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="FMS Rate" name="fmsRate">
                        <Input disabled={isReadOnly} placeholder={preparePlaceholderText('fms rate')} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default FMSForm;
