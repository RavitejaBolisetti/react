import React from 'react';
import { Row, Col, Input, Form, Button } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const AMCForm = ({data}) => {
    const disableProps = { disabled: !!data?.name };
    const { form } = Form.useForm();

    const onFieldsChange = () => {};
    const onFinish = (values) => { console.log(values)};
    const onFinishFailed = () => {};

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="rsaForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="AMC" name="amc">
                        <Input initialValue={data?.name} {...disableProps} placeholder={preparePlaceholderText('RSA')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="AMC Rate" name="amcRate">
                        <Input initialValue={data?.price} {...disableProps}  placeholder={preparePlaceholderText('amc rate')} />
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

export default AMCForm;
