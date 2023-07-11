/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateNumberWithTwoDecimalPlaces } from 'utils/validation';

const FMSForm = ({ formData, fmsForm, setformDataSetter, formDataSetter, formActionType, handleFormValueChange }) => {
    const [isReadOnly, setisReadOnly] = useState(false);

    const onFinishFailed = () => {};
    useEffect(() => {
        if ((formData === undefined || formData?.id === null || formData?.id === '') && !formActionType?.viewMode) {
            setisReadOnly(false);
        } else {
            setisReadOnly(true);
            fmsForm.setFieldsValue({
                fms: formData?.fms?.fms ? formData?.fms?.fms : !formActionType?.viewMode ? null : 'NA',
                fmsRate: formData?.fms?.fmsRate ? formData?.fms?.fmsRate : !formActionType?.viewMode ? null : 'NA',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);
    const onValuesChange = (values) => {
        const Myvalues = fmsForm.getFieldsValue();
        setformDataSetter({ ...formDataSetter, fms: { ...Myvalues } });
    };

    return (
        <Form form={fmsForm} onValuesChange={onValuesChange} onFieldsChange={handleFormValueChange} autoComplete="off" id="shieldForm" layout="vertical" onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="FMS" name="fms">
                        <Input disabled={isReadOnly} placeholder={preparePlaceholderText('fms')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="FMS Rate" name="fmsRate" rules={[validateNumberWithTwoDecimalPlaces('FMS Rate')]}>
                        <Input disabled={isReadOnly} placeholder={preparePlaceholderText('fms rate')} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default FMSForm;
