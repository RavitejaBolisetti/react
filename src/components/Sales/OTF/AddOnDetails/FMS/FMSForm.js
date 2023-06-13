import React from 'react';
import { Row, Col, Input, Form, Button } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';

const FMSForm = () => {
    const disableProps = { disabled: true };
    const { form } = Form.useForm();

    const onFieldsChange = () => {};
    const onFinish = (data) => {};
    const onFinishFailed = () => {};
    const onCloseAction = () => {};

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
                        <Input {...disableProps}  placeholder={preparePlaceholderText('fms rate')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20} >
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Button htmlType="submit" danger>
                        Save
                    </Button>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Button danger onClick={onCloseAction}>
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default FMSForm;
