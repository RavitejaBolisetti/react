import React, { useState } from 'react';

import { Col, Collapse, Form, Select, Space, Typography, Button } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';

import { FaUserCircle } from 'react-icons/fa';

import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import AddEditForm from './AddEditForm';

const { Panel } = Collapse;

const { Text } = Typography;

const IndividualContact = () => {
    const [form] = Form.useForm();
    const [openAccordian, setOpenAccordian] = useState('');

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const addAction = (e) => {
        // e.preventDefault();
        e.stopPropagation();
        console.log('clicked');
    };

    return (
        <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <FaUserCircle /> : <FaUserCircle />)} activeKey={openAccordian}>
            <Panel
                header={
                    <>
                        <Space>
                            <Text> Individual Contact </Text>{' '}
                            <Button onClick={addAction} icon={<PlusOutlined />} type="primary">
                                Add Contact
                            </Button>
                        </Space>
                    </>
                }
                key="1"
            >
                <AddEditForm />
            </Panel>
        </Collapse>
    );
};

export default IndividualContact;
