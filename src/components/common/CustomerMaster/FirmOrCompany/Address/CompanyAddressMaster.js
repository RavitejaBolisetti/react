import React, { useState } from 'react';

import { Col, Collapse, Form, Select, Space, Typography, Button } from 'antd';
import { UserOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { FaUserCircle, FaRegUserCircle } from 'react-icons/fa';

import { accordianExpandIcon, expandIcon } from 'utils/accordianExpandIcon';

import styles from 'components/common/Common.module.css';


import ViewAddressList from './ViewAddressList';
import AddEditForm from './AddEditForm';



const { Panel } = Collapse;

const { Text } = Typography;

const formData = {
    id: '076da86e-010c-445c-ac6c-6b905ca29338',
    addressType: '9876543856',
    address: 'offers',
    address2: 'brother',
    pincode: '09:00AM',
    tehsil: '06:00AM',
    city: 'mr',
    district: 'jhon',
    state: 'little',
    contactpersonName: 'hashn',
    contactmobilenumber: 'Male',
    defaultaddress: true,
};




const CompanyAddressMasterBase = () => {
    const [form] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');
    const [showAddEditForm, setShowAddEditForm] = useState(false);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const onFinish = (value) => {
        console.log('on finish value ', value);
        setContactData((prev) => [...prev, { ...value }]);
        setShowAddEditForm(false);
    };

    const addContactHandeler = (e) => {
        // e.preventDefault();
        e.stopPropagation();
        form.resetFields();
        console.log('clicked');
        setShowAddEditForm(true);
        setOpenAccordian('1')
    };

    const formProps = {
        styles,
        contactData,
        setContactData,
        formData,
        onFinish,
        form
    };

    return (
        <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
            <Panel
                header={
                    <Space>
                        <FaRegUserCircle className={styles.userCircle} />
                        <Text strong>Company Address</Text>
                        <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary">
                            Add Address
                        </Button>
                    </Space>
                }
                key="1"
            >
                {showAddEditForm && <AddEditForm {...formProps} />}
                <ViewAddressList {...formProps} />
            </Panel>
        </Collapse>
    );
};

export const CompanyAddressMaster = CompanyAddressMasterBase;
