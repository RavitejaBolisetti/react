import React, { useState } from 'react';

import { Col, Collapse, Form, Select, Space, Typography, Button } from 'antd';
import { UserOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { FaUserCircle, FaRegUserCircle } from 'react-icons/fa';

import { accordianExpandIcon, expandIcon } from 'utils/accordianExpandIcon';
import AddEditForm from './AddEditForm';
import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewContactDetails';
import ViewContactList from './ViewContactList';

const { Panel } = Collapse;
const { Text } = Typography;

const IndividualContactMain = ({ isViewModeVisible }) => {
    const [form] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');
    const [showAddEditForm, setShowAddEditForm] = useState(false);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const onFinish = (value) => {
        console.log('on finish value ', value);
        setContactData((prev) => {
            let formData = [...prev];
            if (formData?.length <= 1) {
                return [...prev, { ...value }];
            } else {
                formData?.forEach((contact) => {
                    if (contact?.defaultaddress === true) {
                        contact.defaultaddress = false;
                    }
                });
                return [...formData, value];
            }
        });
        setShowAddEditForm(false);
    };

    const addContactHandeler = (e) => {
        // e.preventDefault();
        e.stopPropagation();
        form.resetFields();
        console.log('clicked');
        setShowAddEditForm(true);
        setOpenAccordian('1');
    };

    const formProps = {
        setShowAddEditForm,
        setContactData,
        contactData,
        onFinish,
        styles,
        form,
    };

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <h2>Contacts</h2>
            <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
                <Panel
                    header={
                        <Space>
                            <FaRegUserCircle className={styles.userCircle} />
                            <Text strong> Individual Contact</Text>
                            {!isViewModeVisible && (
                                <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary">
                                    Add Contact
                                </Button>
                            )}
                        </Space>
                    }
                    key="1"
                >
                    {(showAddEditForm || !contactData?.length > 0) && <AddEditForm {...formProps} />}
                    <ViewContactList {...formProps} />
                </Panel>
            </Collapse>
        </Space>
    );
};

export const IndividualContact = IndividualContactMain;
