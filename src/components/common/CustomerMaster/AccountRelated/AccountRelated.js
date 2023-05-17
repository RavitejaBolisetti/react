import React, { useState } from 'react';

import { Col, Collapse, Form, Select, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { FaUserCircle } from 'react-icons/fa';

import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { AddEditForm } from './AddEditForm';

const { Panel } = Collapse;

const { Text } = Typography;

const AccountRelatedBase = ({}) => {
    const [form] = Form.useForm();
    const [openAccordian, setOpenAccordian] = useState('');
    const [isFieldDisable, setIsFieldDisable] = useState(false);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <FaUserCircle /> : <FaUserCircle />)} activeKey={openAccordian}>
            <Panel
                header={
                    <>
                        <Space>
                            <Text> Company Account </Text>{' '}
                            {/* <Button icon={<PlusOutlined />} type="primary">
                                Add Account
                            </Button> */}
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

export const AccountRelated = AccountRelatedBase;
