import React, { useState } from 'react';
import { Collapse, Space, Typography } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import { AddEditForm } from './AddEditForm';

const { Panel } = Collapse;
const { Text } = Typography;

const FamilyDetailsBase = () => {
    const [openAccordian, setOpenAccordian] = useState('');

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <FaUserCircle style={{color:'red'}} /> : <FaUserCircle />)} activeKey={openAccordian}>
            <Panel
                header={
                    <>
                        <Space>
                            <Text> Family Details </Text>{' '}
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

export const FamilyDetails = FamilyDetailsBase;
