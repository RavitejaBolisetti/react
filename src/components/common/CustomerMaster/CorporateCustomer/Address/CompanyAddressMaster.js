import React, { useState } from 'react';

import { Collapse, Divider, Form, Space, Typography, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { FaRegUserCircle } from 'react-icons/fa'

import { expandIcon } from 'utils/accordianExpandIcon';

import styles from 'components/common/Common.module.css';

import ViewAddressList from './ViewAddressList';
import AddEditForm from './AddEditForm';

const { Panel } = Collapse;
const { Text } = Typography;

// const formData = [
//     {
//         id: '076da86e-010c-445c-ac6c-6b905ca29338',
//         addressType: '9876543856',
//         address: 'offers',
//         address2: 'brother',
//         pincode: '09:00AM',
//         tehsil: '06:00AM',
//         city: 'mr',
//         district: 'jhon',
//         state: 'little',
//         contactpersonName: 'hashn',
//         contactmobilenumber: 'Male',
//         defaultaddress: true,
//     },
// ];

const CompanyAddressMasterBase = ({ isViewModeVisible, toggleButton, props }) => {
    const [form] = Form.useForm();
    const [addressData, setAddressData] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const onFinish = (value) => {
        console.log('onSave ', value, 'isEditing', isEditing);
        if (isEditing) {
            console.log(' isEditing block')
            setAddressData((prev) => {
                let formData = [...prev];
                // if (value?.defaultaddress && formData?.length > 1) {
                    formData?.forEach((address) => {
                        if (address?.defaultaddress === true) {
                            address.defaultaddress = true;
                        }
                    });
                    const index = formData?.findIndex((el) => el?.addressType === editingData?.addressType && el?.address === editingData?.address && el?.pincode === editingData?.pincode && el?.defaultaddress === editingData?.defaultaddress);
                    console.log("index", index)
                    formData.splice(index, 1, { ...value });
                    return [...formData];
                // } else {
                //     return [...prev, { ...value }];
                // }
            });
        } else {
            setAddressData((prev) => {
                let formData = [...prev];
                if (value?.defaultaddress && formData?.length >= 1) {
                    formData?.forEach((address) => {
                        if (address?.defaultaddress === true) {
                            address.defaultaddress = false;
                        }
                    });
                    return [...formData, value];
                } else {
                    return [...prev, { ...value }];
                }
            });
        }
        setShowAddEditForm(false);
        setIsEditing(false);
        setEditingData({});
        form.resetFieldsValue();
    };

    const addAddressHandeler = (e) => {
        e.stopPropagation();
        form.resetFields();
        setShowAddEditForm(true);
        setOpenAccordian('1');
    };


    const formProps = {
        setShowAddEditForm,
        showAddEditForm,
        styles,
        addressData,
        setAddressData,
        onFinish,
        form,
        isEditing,
        setIsEditing,
        setEditingData,
    };

    return (
        <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
            <Panel
                header={
                    <>
                        <Space>
                            <Text strong>Company Address</Text>
                            {!isViewModeVisible && (
                                <Button onClick={addAddressHandeler} icon={<PlusOutlined />} type="primary">
                                    Add
                                </Button>
                            )}
                        </Space>
                        <Divider type="vertical" />
                    </>
                }
                key="1"

            >
                {(showAddEditForm || !addressData?.length > 0) && <AddEditForm {...formProps} />}
                <ViewAddressList {...formProps} />
            </Panel>
        </Collapse>
    );
};

export const CompanyAddressMaster = CompanyAddressMasterBase;
