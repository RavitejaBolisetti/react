import React, { useState } from 'react';

import { Col, Collapse, Form, Select, Space, Typography, Button } from 'antd';
import { UserOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { FaUserCircle, FaRegUserCircle } from 'react-icons/fa';

import { accordianExpandIcon, expandIcon } from 'utils/accordianExpandIcon';
import AddEditForm from './AddEditForm';
import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewContactDetails';

const { Panel } = Collapse;

const { Text } = Typography;

const formData = 
{
    id: '076da86e-010c-445c-ac6c-6b905ca29338',
    contactMobileNumber: '9876543856',
    purposeOfContact: 'offers',
    relationwithCustomer: 'brother',
    PreferredFollowUpTimeFrom: '09:00AM',
    PreferredFollowUpTimeTo: '06:00AM',
    contactNameTitle: 'mr',
    contactNameFirstName: 'jhon',
    contactNameMiddleName: 'little',
    contactNameLastName: 'hashn',
    gender: 'Male',
    alternativeMobileNumber: '6789034567',
    contactEmail: 'abc435@gmail.com',
    alternativeEmail: 'cfdc321@gmail.com',
    facebook: 'ABC18',
    twitter: 'ABC18',
    instagram: 'ABC18',
    youtube: 'ABC18',
    teamBhp: 'Team 1',
    defaultcontact: true,
};

const IndividualContactMain = () => {
    const [form] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('');

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const onFinish = (value) => {
        console.log('on finish value ', value);
        setContactData(prev => [...prev, {...value}]);
    };

    const addAction = (e) => {
        // e.preventDefault();
        e.stopPropagation();
        console.log('clicked');
    };

    const formProps = {
        styles,
        contactData,
        setContactData,
        formData,
        onFinish
    };

    return (
        <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
            <Panel
                header={
                    <Space>
                        <FaRegUserCircle className={styles.userCircle} />
                        <Text strong> Individual Contact</Text>{' '}
                        <Button onClick={addAction} icon={<PlusOutlined />} type="primary">
                            Add Contact
                        </Button>
                    </Space>
                }
                key="1"
            >
                <AddEditForm {...formProps} />
                <ViewDetail {...formProps} />
            </Panel>
        </Collapse>
    );
};

export const IndividualContact = IndividualContactMain;
