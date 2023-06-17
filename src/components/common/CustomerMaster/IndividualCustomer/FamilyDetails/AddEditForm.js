import React, { useState } from 'react';
import { Collapse, Space, Card, Typography, Button, Divider } from 'antd';
import styles from 'components/common/Common.module.css';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { ViewDetail } from './ViewFamilyDetails';
import { FiEdit } from 'react-icons/fi';
import { FormContainer } from './FormContainer';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onFamilyFinish, onFinishFailed, familyForm, onChange, showForm, setShowForm, setCustomerType, relationData } = props;
    const { onCloseAction, isViewModeVisible, setIsViewModeVisible, familyDetailList, customerType, onSave, editedMode, setEditedMode } = props;
    const [activeKey, setactiveKey] = useState([null]);

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const onCollapseChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const addFunction = () => {
        setShowForm(true);
        setCustomerType('Yes');
        familyForm.resetFields();
    };

    const onEdit = (values) => {
        setEditedMode(true);
        familyForm.setFieldsValue({
            mnmCustomer: values?.mnmCustomer,
            customerId: values?.customerId,
            customerName: values?.customerName,
            relationship: values?.relationship,
            dateOfBirth: values?.dateOfBirth,
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
        onFamilyFinish,
        onFinishFailed,
        familyForm,
        onChange,
        editedMode,
        onSave,
        customerType,
        relationData,
    };

    return (
        <>
            {!isViewModeVisible ? (
                <Card className="">
                    <Space align="center" size={30}>
                        <Typography>Family Details</Typography>
                        <Button type="primary" icon={<PlusOutlined />} onClick={addFunction} disabled={showForm}>
                            Add
                        </Button>
                    </Space>
                    {showForm || familyDetailList?.length > 0 ? <Divider /> : null}
                    <Space direction="vertical" style={{ width: '100%' }} className={styles.accordianContainer}>
                        {showForm && <FormContainer {...formProps} />}
                        {console.log(familyDetailList,'Trash')}
                        {familyDetailList?.length > 0 &&
                            familyDetailList?.map((item) => (
                                <Collapse
                                    expandIcon={() => {
                                        if (activeKey.includes(item?.id)) {
                                            return <MinusOutlined style={{ color: '#FF3E5B', width: '19.2px', height: '19.2px' }} />;
                                        } else {
                                            return <PlusOutlined style={{ color: '#FF3E5B', width: '19.2px', height: '19.2px' }} />;
                                        }
                                    }}
                                    activeKey={activeKey}
                                    onChange={() => onCollapseChange(item?.id)}
                                    expandIconPosition="end"
                                    collapsible={editedMode ? 'disabled' : 'icon'}
                                >
                                    <Panel
                                        header={
                                            <Space style={{ width: '100%',display:'flex',justifyContent:'space-between' }} size="large">
                                                <Space>
                                                    <Typography>
                                                        {item?.customerName} | {item?.relationship}
                                                    </Typography>
                                                    <Space
                                                        style={{ pointerEvents: editedMode ? 'none' : null }}
                                                        onClick={() => {
                                                            onEdit(item);
                                                            if (!activeKey.includes(item?.customerId)) {
                                                                onCollapseChange(item?.customerId);
                                                            }
                                                        }}
                                                    >
                                                        <FiEdit color={editedMode ? 'grey' : '#ff3e5b'} style={{ margin: '0.25rem 0 0 0' }} />
                                                        <Typography style={{ fontSize: '14px', margin: '0 0 0 0.5rem', color: editedMode ? 'grey' : '#ff3e5b' }}>Edit</Typography>
                                                    </Space>
                                                </Space>

                                                {customerType ? <Typography>M&M user </Typography> : !customerType ? <Typography>Non-M&M user</Typography> : null}
                                            </Space>
                                        }
                                        key={item?.id}
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                                    >
                                        {editedMode ? <FormContainer {...formProps} item /> : <ViewDetail mnmCustomer={item?.mnmCustomer} customerId={item?.customerId} customerName={item?.customerName} relationship={item?.relationship} dateOfBirth={item?.dateOfBirth} relationAge={item?.relationAge} remarks={item?.remarks} />}
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
