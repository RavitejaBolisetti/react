import React, { useState } from 'react';

import { Col, Collapse, Form, Select, Space, Typography, Button } from 'antd';
import { UserOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { FaUserCircle, FaRegUserCircle } from 'react-icons/fa';

import { accordianExpandIcon } from 'utils/accordianExpandIcon';

import styles from 'components/common/Common.module.css';

// import { ViewIndividualAddressDetails } from './ViewIndividualAddressDetails';

import SchemeList from './SchemeList';
import AddEditForm from './AddEditForm';

const { Panel } = Collapse;

const { Text } = Typography;

const formData = [
    {
        schemecatagory: 'Based On',
        schemeamount: '25000',
        validfrom: '25/06/2023',
        validto: '30/6/2023',
        description: 'Hello Ji Kidaan Fir',
    },
];

const SchemeDetailsMasterBase = (props) => {
    const { isViewModeVisible } = props;
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
        setOpenAccordian('1');
    };

    const formProps = {
        styles,
        contactData,
        setContactData,
        formData,
        onFinish,
        form,
        ...props,
    };

    return (
        <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end">
            {/* expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian} */}
            <Panel
                header={
                    <Space>
                        <FaRegUserCircle className={styles.userCircle} />
                        <Text strong> Scheme</Text>{' '}
                        <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary">
                            Add Scheme
                        </Button>
                    </Space>
                }
                key="1"
            >
                {showAddEditForm && <AddEditForm {...formProps} />}
                <SchemeList {...formProps} />
            </Panel>
        </Collapse>
    );
};

export const SchemeDetailsMaster = SchemeDetailsMasterBase;
