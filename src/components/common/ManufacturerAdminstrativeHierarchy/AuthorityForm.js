import React, { Fragment, useState, useReducer } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select, DatePicker, Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

// import style from 'pages/common/Common.module.css';

const { Option } = Select;
const fieldNames = { label: 'applicationName', value: 'id' };
const { Search } = Input;
const { Text } = Typography;

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
const AuthorityForm = ({ onFinish, form, isEditing, isBtnDisabled, setIsBtnDisabled, setDocumentTypesList }) => {
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    const [active, setActive] = useState(false);
    const [date, setisDate] = useState(false);
    const onFinishFailed = (err) => {
        console.error(err);
    };

    const handleForm = (value) => {
        // setFormBtnDisable(true);
    };

    const onSearchHandle = () => {
        setisDate(!date);
        console.log('hello');
    };

    return (
        <Form form={form} id="myForm" onFinish={onFinish} layout="vertical" onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Authority Type" name="authoitytype" rules={[validateRequiredInputField('Authority Type')]}>
                        <Select
                            getPopupContainer={(triggerNode) => triggerNode.parentElement}
                            labelInValue // defaultValue={name || ''} // showSearch
                            placeholder="Select Authority Type" // optionFilterProp="children"
                            fieldNames={fieldNames}
                            style={{
                                width: '100%',
                            }} // filterOption={(input, option) => (option?.applicationName ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={applicationData}
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Token" name="token" rules={[validateRequiredInputField('Token Required'), validationFieldLetterAndNumber('Token Required')]}>
                        <Search allowClear onSearch={onSearchHandle} maxLength={50} placeholder={preparePlaceholderText('Token')} />
                    </Form.Item>
                </Col>
            </Row>
            {date && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Text type="primary">Employee Name : xxxxxx</Text>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="dateFrom" label="Date From:">
                            <DatePicker onChange={onChange} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="dateTo" label="Date To:">
                            <DatePicker onChange={onChange} />
                        </Form.Item>
                    </Col>
                </Row>
            )}

            {!isEditing && (
                <Button disabled={isBtnDisabled} icon={<PlusOutlined />} type="primary" danger htmlType="submit">
                    Add
                </Button>
            )}
        </Form>
    );
};

export default AuthorityForm;
