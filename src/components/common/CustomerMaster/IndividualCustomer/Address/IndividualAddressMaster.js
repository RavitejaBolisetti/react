import React, { useState } from 'react';

import { Col, Collapse, Row, Button, Form, Input, Select, Space, Typography } from 'antd';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { PlusOutlined } from '@ant-design/icons';

import styles from '../../../Common.module.css';

import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validationFieldLetteNumberandPeriod, validateRequiredSelectField, validateAlphanumericWithSpace } from 'utils/validation';
import { AddEditForm } from './AddEditForm';

const { Panel } = Collapse;
const { Text } = Typography;

const IndividualAddressMasterBase = () => {
    const [form] = Form.useForm();
    const [openAccordian, setOpenAccordian] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [codeIsReadOnly, setcodeIsReadOnly] = useState(false);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus /> : <AiOutlinePlus />)} activeKey={openAccordian} expandIconPosition="end">
            <Panel
                header={
                    <>
                        <Space>
                            <BiUserCircle className={styles.userCircle} />
                            <Text strong> Individual Address</Text>{' '}
                            <Button icon={<PlusOutlined />} type="primary">
                                Add Address
                            </Button>
                        </Space>
                    </>
                }
                suffix={<PlusOutlined />}
                key="1"
            >
                <AddEditForm form={form} />
            </Panel>
        </Collapse>
    );
};

export const IndividualAddressMaster= IndividualAddressMasterBase;
