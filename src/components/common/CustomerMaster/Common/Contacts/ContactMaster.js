import React, { useState } from 'react';

import { Collapse, Form, Space, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FaRegUserCircle } from 'react-icons/fa';
import { expandIcon } from 'utils/accordianExpandIcon';
import AddEditForm from './AddEditForm';
import ViewContactList from './ViewContactList';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const ContactMain = ({ isViewModeVisible, toggleButton }) => {
    const [form] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    console.log('isEditing', isEditing);

    const onFinish = (value) => {
        console.log('onSave ', value, 'isEditing', isEditing);
        if (isEditing) {
            console.log(' isEditing block')
            setContactData((prev) => {
                let formData = [...prev];
                // if (value?.defaultaddress && formData?.length > 1) {
                    formData?.forEach((contact) => {
                        if (contact?.defaultaddress === true) {
                            contact.defaultaddress = false;
                        }
                    });
                    const index = formData?.findIndex((el) => el?.purposeOfContact === editingData?.purposeOfContact && el?.mobileNumber === editingData?.mobileNumber && el?.FirstName === editingData?.FirstName);
                    console.log("index", index)
                    formData.splice(index, 1, { ...value });
                    return [...formData];
                // } else {
                //     return [...prev, { ...value }];
                // }
            });
        } else {
            setContactData((prev) => {
                let formData = [...prev];
                if (value?.defaultaddress && formData?.length >= 1) {
                    formData?.forEach((contact) => {
                        if (contact?.defaultaddress === true) {
                            contact.defaultaddress = false;
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

    const deleteContactHandeler = (data) => {
        console.log('delete Data', data);
        setContactData((prev) => {
            const updatedList = [...prev];
            const index = prev?.findIndex((el) => el?.contactMobileNumber === data?.contactMobileNumber && el?.contactNameFirstName === data?.contactNameFirstName);
            updatedList.splice(index, 1);
            return [...updatedList];
        });
    };

    const addBtnContactHandeler = (e) => {
        e.stopPropagation();
        form.resetFields();
        setShowAddEditForm(true);
        setOpenAccordian('1');
    };

    const formProps = {
        setShowAddEditForm,
        showAddEditForm,
        setContactData,
        contactData,
        onFinish,
        styles,
        form,
        isEditing,
        setIsEditing,
        deleteContactHandeler,
        isViewModeVisible,
        setEditingData,
    };

    return (
        <>
            <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
                <Panel
                    header={
                        <Space>
                            <Text strong> {toggleButton === 'Individual' ? 'Individual Contact' : 'Company Contact'}</Text>
                            {!isViewModeVisible && (
                                <Button onClick={addBtnContactHandeler} icon={<PlusOutlined />} type="primary">
                                    Add Contact
                                </Button>
                            )}
                        </Space>
                    }
                    key="1"
                >
                    {!isViewModeVisible && (showAddEditForm || !contactData?.length > 0) && <AddEditForm {...formProps} />}
                    <ViewContactList {...formProps} />
                </Panel>
            </Collapse>
        </>
    );
};

export const IndividualContact = ContactMain;
