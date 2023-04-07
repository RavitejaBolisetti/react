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
        applicationAction: 'uuid1',
    },
    {
        id: '2',
        applicationAction: 'uuid2',
    },
    {
        id: '3',
        applicationAction: 'uuid3',
    },
];

const ApplicationActions = ({ form, footerEdit = false,  onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable }) => {
    const [actionsList, setApplicationList] = useState([]);
    const disabledProps = { disabled: isReadOnly };

    const onFinish = (value) => {
        console.log("value",value)
    };

    const handleForm = (value) => {
        // setFormBtnDisable(true);
    };

    const handleAdd = () => {
        setApplicationList();
    };

    const handleOnChange = (val) => {
        console.log('val', val);
    };

    const fieldNames = { label: 'applicationAction', value: 'id' };

    return (
        <Fragment>
            <Form className={styles.contentHeaderBackground} form={form} onFieldsChange={handleForm} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item label="Action" name="applicationAction" rules={[validateRequiredSelectField('Application Action')]}>
                                <Row>
                                    <Select
                                        // defaultValue={record[dataIndex]}
                                        showSearch
                                        placeholder="Select accesable location"
                                        optionFilterProp="children"
                                        fieldNames={fieldNames}
                                        style={{
                                            width: '100%',
                                        }}
                                        // onChange={handleOnChange}
                                        onSelect={handleOnChange}
                                        // onSearch={onSearch}
                                        filterOption={(input, option) => (option?.applicationAction ?? '').toLowerCase().includes(input.toLowerCase())}
                                        options={applicationData}
                                    />
                                </Row>
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Status" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Button icon={<PlusOutlined />} style={{ width: '450px' }} htmlType="submit" type="primary" danger onClick={handleAdd}>
                        Add Application Action
                    </Button>
                    <CardApplicationAction />
                </Col>
            </Form>
        </Fragment>
    );
};

export default ApplicationActions;
