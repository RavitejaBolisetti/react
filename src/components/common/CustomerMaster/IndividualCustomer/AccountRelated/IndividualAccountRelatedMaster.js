import React, { useState } from 'react';

import { Col, Collapse, Form, Select, Space, Typography } from 'antd';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';


import { AddEditForm } from './AddEditForm';
import style from '../../../Common.module.css';
import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;

const { Text } = Typography;

const AccountRelatedBase = ({}) => {
    const [form] = Form.useForm();
    const [openAccordian, setOpenAccordian] = useState('');

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
                                <div style={{ paddingLeft: '10px', paddingTop: '3px' }}> Indivisual Account</div>
                            </div>
                        }
                        key="1"
                    >
                        <AddEditForm />
                    </Panel>
                </Collapse>
            </Space>
        </>
    );
};

export const IndividualAccountRelatedMaster = AccountRelatedBase;
