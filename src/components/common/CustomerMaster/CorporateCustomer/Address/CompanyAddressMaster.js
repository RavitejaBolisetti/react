/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Collapse, Divider, Form, Space, Typography, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { expandIcon } from 'utils/accordianExpandIcon';

import ViewAddressList from './ViewAddressList';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const CompanyAddressMasterBase = (props) => {
    const { section, isViewModeVisible } = props;
    const { buttonData, setButtonData, formActionType, setFormActionType, defaultBtnVisiblity } = props;

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
        if (isEditing) {
            setAddressData((prev) => {
                let formData = [...prev];
                formData?.forEach((address) => {
                    if (address?.defaultaddress === true) {
                        address.defaultaddress = true;
                    }
                });
                const index = formData?.findIndex((el) => el?.addressType === editingData?.addressType && el?.address === editingData?.address && el?.pincode === editingData?.pincode && el?.defaultaddress === editingData?.defaultaddress);
                formData.splice(index, 1, { ...value });
                return [...formData];
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

    const onFinishFailed = (errorInfo) => {
        return;
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

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title} </h2>
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
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <CustomerFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const CompanyAddressMaster = CompanyAddressMasterBase;
