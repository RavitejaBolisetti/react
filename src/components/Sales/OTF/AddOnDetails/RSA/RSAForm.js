import React from 'react';
import { Row, Col, Input, Form, Button } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const RSAForm = ({ data }) => {
    const disableProps = { disabled: !!data?.name };
    const { form } = Form.useForm();

    const onFieldsChange = () => {};
    const onFinish = (data) => {};
    const onFinishFailed = () => {};

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="rsaForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="RSA" name="rsa">
                        <Input {...disableProps} placeholder={preparePlaceholderText('RSA')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="RSA Rate" name="rsaRate">
                        <Input {...disableProps} placeholder={preparePlaceholderText('RSA Rate')} />
                    </Form.Item>
                </Col>
            </Row>
            {!data?.name && (
                <Row gutter={20}>
                    <Button htmlType="submit" danger>
                        Save
                    </Button>
                </Row>
            )}
        </Form>
    );
};

export default RSAForm;
