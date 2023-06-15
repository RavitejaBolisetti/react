import React from 'react';
import { Row, Col, Input, Form, Button } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const FMSForm = ({ data }) => {
    const disableProps = { disabled: !!data?.name };
    const { form } = Form.useForm();

    const onFieldsChange = () => {};
    const onFinish = (data) => {};
    const onFinishFailed = () => {};

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="shieldForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="FMS" name="fms">
                        <Input {...disableProps} placeholder={preparePlaceholderText('fms')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="FMS Rate" name="shieldRate">
                        <Input {...disableProps} placeholder={preparePlaceholderText('fms rate')} />
                    </Form.Item>
                </Col>
            </Row>
            {!data?.name && (
                <Row gutter={20}>
                    <Button htmlType="submit" danger type="primary">
                        Save
                    </Button>
                </Row>
            )}
        </Form>
    );
};

export default FMSForm;
