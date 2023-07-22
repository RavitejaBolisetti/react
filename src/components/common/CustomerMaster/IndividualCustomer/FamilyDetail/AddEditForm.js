/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Collapse, Space, Card, Typography, Button, Row, Empty, Divider } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { FiEdit } from 'react-icons/fi';

import { ViewDetail } from './ViewDetail';
import { FormContainer } from './FormContainer';

import dayjs from 'dayjs';
import { LANGUAGE_EN } from 'language/en';

import { expandIcon } from 'utils/accordianExpandIcon';

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

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;

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
            relationCustomerId: values?.mnmCustomer === 'Yes' ? values?.relationCustomerId : '',
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
                    <Row type="flex" align="middle">
                        <Typography>Family Details</Typography>
                        {!VIEW_ACTION && (
                            <Button type="primary" icon={<PlusOutlined />} onClick={addFunction} disabled={showForm || editedMode}>
                                Add
                            </Button>
                        )}
                    </Row>
                    <Divider className={styles.marT20} />
                    {showForm && !editedMode && <FormContainer {...formProps} />}
                    {familyDetailList?.length > 0 ? (
                        familyDetailList?.map((item, index) => (
                            <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onCollapseChange(index)} expandIconPosition="end">
                                <Panel
                                    header={
                                        <Row type="flex" justify="space-between" align="middle" size="large">
                                            <Row type="flex" justify="space-around" align="middle">
                                                <Typography>
                                                    {item?.customerName} | {item?.relationship}
                                                </Typography>

                                                {!VIEW_ACTION && !showForm && (
                                                    <Button
                                                        type="link"
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
                                            {
                                                <Text type="secondary" style={{ fontWeight: '400', fontSize: '14px' }}>
                                                    {item?.mnmCustomer === 'Yes' ? 'M&M user' : item?.mnmCustomer === 'No' ? 'Non-M&M user' : ''}
                                                </Text>
                                            }
                                        </Row>
                                    }
                                    key={index}
                                >
                                    <Divider />
                                    {editedMode && !showForm ? <FormContainer {...formProps} item /> : <ViewDetail {...viewProps} mnmCustomer={item?.mnmCustomer} customerId={item?.customerId} customerName={item?.customerName} relationship={item?.relationship} relationCode={item?.relationCode} dateOfBirth={item?.dateOfBirth} relationAge={item?.relationAge} remarks={item?.remarks} relationCustomerId={item?.relationCustomerId} />}
                                </Panel>
                            </Collapse>
                        ))
                    ) : !showForm && !editedMode ? (
                        <>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={<span>{noDataTitle}</span>}
                            ></Empty>
                        </>
                    ) : null}
                </Card>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
