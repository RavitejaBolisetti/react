import React from 'react';
import { Row, Col, Input, Form } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const AMCForm = () => {
    const disableProps = { disabled: true };
    const { form } = Form.useForm();

    const onFieldsChange = () => {};
    const onFinish = (data) => {};
    const onFinishFailed = () => {};

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="rsaForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="AMC" name="amc">
                        <Input {...disableProps} placeholder={preparePlaceholderText('RSA')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="AMC Rate" name="amcRate">
                        <Input {...disableProps}  placeholder={preparePlaceholderText('amc rate')} />
                    </Form.Item>
                </Col>
            </Row>
          
        </Form>
    );
};

export default AMCForm;
