import React, { useState } from 'react';

import { Col, Collapse, Form, Select, Space, Typography } from 'antd';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import { AddEditForm } from './AddEditForm';
import style from '../../../Common.module.css';
import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;

const { Text } = Typography;

const AccountRelatedBase = (props) => {
    const [form] = Form.useForm();
    const [openAccordian, setOpenAccordian] = useState([1]);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <>
            <h2>Account Related</h2>
            <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus /> : <AiOutlinePlus />)} activeKey={openAccordian} expandIconPosition="end">
                    <Panel
                        header={
                            <div className={styles.alignUser}>
                                <FaRegUserCircle className={styles.userCircle} />
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Indivisual Account
                                </Text>
                            </div>
                        }
                        key="1"
                    >
                        <AddEditForm {...props} />
                    </Panel>
                </Collapse>
            </Space>
        </>
    );
};

export const IndividualAccountRelatedMaster = AccountRelatedBase;
