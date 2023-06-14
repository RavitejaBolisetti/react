import React from 'react';
import { Row, Col, Input, Form, Button } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const ShieldForm = ({ data }) => {
    const disableProps = { disabled: !!data?.name };
    const { form } = Form.useForm();

    const onFieldsChange = () => {};
    const onFinish = (data) => {};
    const onFinishFailed = () => {};

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="shieldForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Shield" name="shield">
                        <Input {...disableProps} placeholder={preparePlaceholderText('document code')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Shield Rate" name="shieldRate">
                        <Input {...disableProps} placeholder={preparePlaceholderText('shield rate')} />
                    </Form.Item>
                </Col>
            </Row>
            {!data?.name && (
                <Row gutter={20}>
                    <Button htmlType="submit" type='primary' danger>
                        Save
                    </Button>
                </Row>
            )}
        </Form>
    );
};

export default ShieldForm;
