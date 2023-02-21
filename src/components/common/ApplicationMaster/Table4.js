import React, { useState } from 'react';
import { Table, Collapse, Input, Form, Button, Space, Card, Switch, Row, Col } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';


const { Panel } = Collapse;
const onFinish = (values) => {
    console.log(values);
};
const Table4 = () => {
    const [keyval, setKeyVal] = useState(2);
    const rendFunction = (data) => {
        return (
            <Form.Item
                label=""
                name={data.key}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
        );
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Action',
            dataIndex: '',
            render: (data) => rendFunction(data),
        },
    ];
    const [data, setData] = useState([
        {
            key: 'Name1',
            name: 'John Brown',
        },
    ]);

    const handledata = () => {
        const newdata = {
            key: 'Name' + keyval,
            name: 'John Brown',
        };

        setData((data) => data.concat(newdata));
        setKeyVal(keyval + 1);
    };
    return <></>;
};

export default Table4;
