import React, { Fragment, useState } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import CardApplicationAction from './CardApplicationAction';
import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'pages/common/Common.module.css';


const applicationData = [
    {
        id: '1',
        applicationName: 'APP nm 1',
    },
    {
        id: '2',
        applicationName: 'APP nm 2',
    },
    {
        id: '3',
        applicationName: 'APP nm 3',
    },
];

const ApplicationActions = ({ footerEdit = false, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable }) => {
    const [actionsList, setApplicationList] = useState([]);
    const disabledProps = { disabled: isReadOnly };

    const [form] = Form.useForm();

    const onFinish = (val) => {
        console.log('value', val);
        const { value, label } = val?.applicationAction;
        setApplicationList((prev) => [...prev, { applicationName: label, id: value, status: val.status }]);
    };

    const handleForm = (value) => {
        // setFormBtnDisable(true);
    };

    const fieldNames = { label: 'applicationName', value: 'id' };

    return (
        <Form className={styles.contentHeaderBackground} form={form} onFieldsChange={handleForm} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label="Action" name="applicationAction" rules={[validateRequiredSelectField('Application Action')]}>
                        <Select
                            labelInValue
                            // defaultValue={record[dataIndex]}
                            showSearch
                            placeholder="Select Application Action"
                            optionFilterProp="children"
                            fieldNames={fieldNames}
                            style={{
                                width: '100%',
                            }}
                            filterOption={(input, option) => (option?.applicationName ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={applicationData}
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Status" valuePropName="checked">
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>

            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Button icon={<PlusOutlined />} style={{ width: '450px' }} htmlType="submit" type="primary" danger>
                    Add Application Action
                </Button>
                {
                    actionsList.length && 
                    actionsList.map((action) => {
                        return <CardApplicationAction {...action} />
                    })
                }
            </Col>
        </Form>
    );
};

export default ApplicationActions;
