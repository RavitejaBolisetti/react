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

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian}>
            {/* expandIcon={({ isActive }) => (isActive ? <FaUserCircle /> : <FaUserCircle />)} */}
            <Panel
                header={
                    <>
                        <Space>
                            <Text> Indivisual Account </Text>{' '}
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

export const IndividualAccountRelatedMaster = AccountRelatedBase;
