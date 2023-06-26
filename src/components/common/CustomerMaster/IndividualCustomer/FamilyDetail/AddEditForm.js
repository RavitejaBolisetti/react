/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Collapse, Space, Card, Typography, Button, Row } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { ViewDetail } from './ViewDetail';
import { FiEdit } from 'react-icons/fi';
import { FormContainer } from './FormContainer';
import dayjs from 'dayjs';

import styles from 'components/common/Common.module.css';

const { Text } = Typography;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onFinish, onFinishFailed, form, onChange, showForm, setShowForm, setCustomerType, relationData, VIEW_ACTION } = props;
    const { onCloseAction, isViewModeVisible, setIsViewModeVisible, familyDetailList, customerType, onSave, editedMode, setEditedMode, onSearch, isSearchLoading } = props;
    const [activeKey, setactiveKey] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [initialVal, setInitialVal] = useState(null);
    const [editedValues, setEditedValues] = useState({});

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const onCollapseChange = (values) => {
        if (editedMode) return;
        setactiveKey((prev) => (prev === values ? '' : values));
    };

    const addFunction = () => {
        form.resetFields();
        setShowForm(true);
        setCustomerType('Yes');
        let id = Math.floor(Math.random() * 100000000 + 1);
        form.setFieldsValue({
            editedId: id,
        });
    };

    const onEdit = (values, index) => {
        setEditedMode(true);
        setactiveKey(index);
        setShowForm(false);

        setInitialVal(values?.mnmCustomer);

        const Val = {
            id: values?.id,
            mnmCustomer: values?.mnmCustomer,
            customerId: values?.customerId,
            customerName: values?.customerName,
            editedId: values?.editedId,
            relationship: values?.relationship,
            relationCode: values?.relationCode,
            relationCustomerId: values?.mnmCustomer === "Yes" ? values?.relationCustomerId : "",
            dateOfBirth: typeof values?.dateOfBirth === 'object' ? values?.dateOfBirth : dayjs(values?.dateOfBirth),
            relationAge: values?.relationAge,
            remarks: values?.remarks,
        };

        setEditedValues(Val);
        if (values?.mnmCustomer === 'Yes') {
            setCustomerType('Yes');
        } else if (values?.mnmCustomer === 'No') {
            setCustomerType('No');
        }
        form.setFieldsValue(Val);

    };

    const onCancel = (values) => {
        setEditedMode(false);
        setShowForm(false);
        form.setFieldsValue({
            mnmCustomer: values?.mnmCustomer,
            customerId: values?.customerId,
            customerName: values?.customerName,
            editedId: values?.editedId,
            relationship: values?.relationship,
            relationCode: values?.relationCode,
            relationCustomerId: values?.relationCustomerId,
            dateOfBirth: typeof values?.dateOfBirth === 'object' ? values?.dateOfBirth : dayjs(values?.dateOfBirth),
            relationAge: values?.relationAge,
            remarks: values?.remarks,
        });
    };

    useEffect(() => {
        if (editedMode) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editedMode]);

    const viewProps = {
        activeKey,
        setactiveKey,
        onChange,
        styles,
        onCloseAction,
        handleEdit,
        customerType,
    };

    const formProps = {
        onFinish,
        onFinishFailed,
        form,
        onChange,
        onSave,
        customerType,
        relationData,
        onSearch,
        isSearchLoading,
        onCancel,
        showForm,
        initialVal,
        editedValues,
        setEditedValues,
    };

    return (
        <>
            {!isViewModeVisible ? (
                <Card className="">
                    <Row type="flex" align="middle" style={{ margin: showForm || familyDetailList?.length > 0 ? '0 0 16px 0' : '0' }}>
                        <Typography>Family Details</Typography>
                        {!VIEW_ACTION && (
                            <Button type="primary" icon={<PlusOutlined />} onClick={addFunction} disabled={showForm || editedMode} style={{ margin: '0 0 0 12px' }}>
                                Add
                            </Button>
                        )}
                    </Row>
                    <Space direction="vertical" style={{ width: '100%' }} className={styles.accordianContainer}>
                        {showForm && !editedMode && <FormContainer {...formProps} />}
                        {familyDetailList?.length > 0 &&
                            familyDetailList?.map((item, index) => (
                                <Collapse
                                    expandIcon={() => {
                                        if (activeKey === index) {
                                            return <MinusOutlined style={{ color: '#FF3E5B', width: '19.2px', height: '19.2px', margin: '8px 0 0 0' }} />;
                                        } else {
                                            return <PlusOutlined style={{ color: '#FF3E5B', width: '19.2px', height: '19.2px', margin: '8px 0 0 0' }} />;
                                        }
                                    }}
                                    activeKey={activeKey}
                                    onChange={() => onCollapseChange(index)}
                                    expandIconPosition="end"
                                >
                                    <Panel
                                        header={
                                            <Row type="flex" justify="space-between" align="middle" size="large" style={{ margin: '0 13px' }}>
                                                <Row type="flex" justify="space-around" align="middle">
                                                    <Typography>
                                                        {item?.customerName} | {item?.relationship}
                                                    </Typography>

                                                    {!VIEW_ACTION && !showForm && (
                                                        <Button
                                                            type="secondary"
                                                            icon={<FiEdit />}
                                                            onClick={() => {
                                                                onEdit(item, index);
                                                            }}
                                                            disabled={disabled}
                                                            style={{ color: disabled ? 'grey' : 'red' }}
                                                        >
                                                            Edit
                                                        </Button>
                                                    )}
                                                </Row>
                                                {item?.mnmCustomer === 'Yes' ? (
                                                    <Text type="secondary" style={{ fontWeight: '400', fontSize: '14px' }}>
                                                        {' '}
                                                        M&M user{' '}
                                                    </Text>
                                                ) : item?.mnmCustomer === 'No' ? (
                                                    <Text type="secondary" style={{ fontWeight: '400', fontSize: '14px' }}>
                                                        Non-M&M user
                                                    </Text>
                                                ) : null}
                                            </Row>
                                        }
                                        key={index}
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                                    >
                                        {editedMode && !showForm ? <FormContainer {...formProps} item /> : <ViewDetail {...viewProps} mnmCustomer={item?.mnmCustomer} customerId={item?.customerId} customerName={item?.customerName} relationship={item?.relationship} relationCode={item?.relationCode} dateOfBirth={item?.dateOfBirth} relationAge={item?.relationAge} remarks={item?.remarks} relationCustomerId={item?.relationCustomerId}/>}
                                    </Panel>
                                </Collapse>
                            ))}
                    </Space>
                </Card>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
