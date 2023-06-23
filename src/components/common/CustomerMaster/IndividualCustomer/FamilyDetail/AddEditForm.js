/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Collapse, Space, Card, Typography, Button, Divider } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { ViewDetail } from './ViewDetail';
import { FiEdit } from 'react-icons/fi';
import { FormContainer } from './FormContainer';
import dayjs from 'dayjs';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onFinish, onFinishFailed, form, onChange, showForm, setShowForm, setCustomerType, relationData, VIEW_ACTION } = props;
    const { onCloseAction, isViewModeVisible, setIsViewModeVisible, familyDetailList, customerType, onSave, editedMode, setEditedMode, onSearch, isSearchLoading } = props;
    const [activeKey, setactiveKey] = useState([]);

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const onCollapseChange = (values) => {
        if (VIEW_ACTION) {
            setactiveKey(values);
        } else {
            if (typeof values === 'number') {
                setactiveKey([values]);
                return;
            }
            activeKey?.includes(values) ? setactiveKey('') : setactiveKey(values[values?.length - 1]);
        }
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

    const onEdit = (values) => {
        setEditedMode(true);
        setShowForm(false);
        if (values?.mnmCustomer === 'Yes') {
            setCustomerType(true);
        } else if (values?.mnmCustomer === 'No') {
            setCustomerType(false);
        }

        form.setFieldsValue({
            mnmCustomer: values?.mnmCustomer,
            customerId: values?.customerId,
            customerName: values?.customerName,
            editedId: values?.editedId,
            relationship: values?.relationship,
            relationCode: values?.relationCode,
            dateOfBirth: typeof values?.dateOfBirth === 'object' ? values?.dateOfBirth : dayjs(values?.dateOfBirth),
            relationAge: values?.relationAge,
            remarks: values?.remarks,
        });
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
            dateOfBirth: typeof values?.dateOfBirth === 'object' ? values?.dateOfBirth : dayjs(values?.dateOfBirth),
            relationAge: values?.relationAge,
            remarks: values?.remarks,
        });
    };

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
        editedMode,
        onSave,
        customerType,
        relationData,
        onSearch,
        isSearchLoading,
        onCancel,
    };

    return (
        <>
            {!isViewModeVisible ? (
                <Card className="">
                    <Space align="center" size={30}>
                        <Typography>Family Details</Typography>
                        {!VIEW_ACTION && (
                            <Button type="primary" icon={<PlusOutlined />} onClick={addFunction} disabled={showForm || editedMode}>
                                Add
                            </Button>
                        )}
                    </Space>
                    {showForm || familyDetailList?.length > 0 ? <Divider /> : null}
                    <Space direction="vertical" style={{ width: '100%' }} className={styles.accordianContainer}>
                        {showForm && !editedMode && <FormContainer {...formProps} />}
                        {console.log(familyDetailList, 'FamilyList')}
                        {familyDetailList?.length > 0 &&
                            familyDetailList?.map((item, index) => (
                                <Collapse
                                    expandIcon={() => {
                                        if (activeKey.includes(item?.editedId)) {
                                            return <MinusOutlined style={{ color: '#FF3E5B', width: '19.2px', height: '19.2px' }} />;
                                        } else {
                                            return <PlusOutlined style={{ color: '#FF3E5B', width: '19.2px', height: '19.2px' }} />;
                                        }
                                    }}
                                    activeKey={activeKey}
                                    onChange={(key) => onCollapseChange(key)}
                                    expandIconPosition="end"
                                    collapsible={editedMode ? 'disabled' : 'icon'}
                                >
                                    <Panel
                                        header={
                                            <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} size="large">
                                                <Space>
                                                    <Typography>
                                                        {item?.customerName} | {item?.relationship}
                                                    </Typography>

                                                    {!VIEW_ACTION && !showForm && (
                                                        // <Space
                                                        //     style={{ cursor: 'pointer' }}
                                                        //     onClick={(key) => {
                                                        //         onEdit(item);
                                                        //         // onCollapseChange(item?.editedId);
                                                        //         onCollapseChange(index);
                                                        //     }}
                                                        //     // onChange={(key) => onCollapseChange(key)}
                                                        // >
                                                        //     <span className={styles.editButton}>
                                                        //     <FiEdit />
                                                        //     <Typography >Edit</Typography>
                                                        //     </span>
                                                        // </Space>
                                                        <Button
                                                            onClick={(key) => {
                                                                onEdit(item);
                                                                // onCollapseChange(item?.editedId);
                                                                onCollapseChange(index);
                                                            }}
                                                            icon={<FiEdit />}
                                                            type="link"
                                                            className="buttomEdit"
                                                        >
                                                            Edit
                                                        </Button>
                                                    )}
                                                </Space>
                                                <span className="headerTxt">{item?.mnmCustomer === 'Yes' ? <Typography>M&M user </Typography> : item?.mnmCustomer === 'No' ? <Typography>Non-M&M user</Typography> : null}</span>
                                            </Space>
                                        }
                                        key={index}
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                                    >
                                        {editedMode && !showForm ? <FormContainer {...formProps} item /> : <ViewDetail mnmCustomer={item?.mnmCustomer} customerId={item?.customerId} customerName={item?.customerName} relationship={item?.relationship} relationCode={item?.relationCode} dateOfBirth={item?.dateOfBirth} relationAge={item?.relationAge} remarks={item?.remarks} />}
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
