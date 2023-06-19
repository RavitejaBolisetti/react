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

const ContactMain = ({ isViewModeVisible, formActionType }) => {
    const [form] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const onFinish = (value) => {
        form.validateFields()
            .then((data) => console.log('data', data))
            .catch((error) => console.error(error));

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
        setShowAddEditForm(false);
        setIsEditing(false);
    };

    const deleteContactHandeler = (data) => {
        console.log('delete Data', data);
        // setContactData()
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
    };

    return (
        <>
            <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
                <Panel
                    header={
                        <Space>
                            <FaRegUserCircle className={styles.userCircle} />
                            <Text strong> Individual Contact</Text>
                            {formActionType?.viewMode && (
                                <Button onClick={addBtnContactHandeler} icon={<PlusOutlined />} type="primary">
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
        </>
    );
};

export const IndividualContact = ContactMain;
