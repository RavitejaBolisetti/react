/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Collapse, Card, Typography, Button, Row, Divider } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { FiEdit } from 'react-icons/fi';
import { ViewDetail } from './ViewDetail';
import { FormContainer } from './FormContainer';

import dayjs from 'dayjs';
import { NoDataFound } from 'utils/noDataFound';
import { expandIcon } from 'utils/accordianExpandIcon';
import { YES_NO_FLAG } from 'constants/yesNoFlag';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onFinish, form, onChange, showForm, setShowForm, setCustomerType, relationData, VIEW_ACTION } = props;
    const { onCloseAction, isViewModeVisible, setIsViewModeVisible, familyDetailList, customerType, onSave, editedMode, setEditedMode, onSearch, isSearchLoading } = props;
    const [activeKey, setactiveKey] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [initialVal, setInitialVal] = useState(null);
    const [editedValues, setEditedValues] = useState({});

    const noDataTitle = translateContent('global.generalNotifications.noDataExist.title');
    const addDataTitle = (
        <p className={styles.textCenter}>
            Please add familiy details using <br /> <strong>“Add”</strong> button at top
        </p>
    );

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
        setCustomerType(YES_NO_FLAG?.NO?.key);
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
            relationCustomerId: values?.mnmCustomer === YES_NO_FLAG?.YES?.key ? values?.relationCustomerId : '',
            dateOfBirth: typeof values?.dateOfBirth === 'object' ? values?.dateOfBirth : dayjs(values?.dateOfBirth),
            relationAge: values?.relationAge,
            remarks: values?.remarks,
        };

        setEditedValues(Val);
        if (values?.mnmCustomer === YES_NO_FLAG?.YES?.key) {
            setCustomerType(YES_NO_FLAG?.YES?.key);
        } else if (values?.mnmCustomer === YES_NO_FLAG?.NO?.key) {
            setCustomerType(YES_NO_FLAG?.NO?.key);
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
                <Card data-testid="test-case">
                    <Row type="flex" align="middle">
                        <Typography>{translateContent('customerMaster.drawerSubHeading.familyTitle')}</Typography>
                        {!VIEW_ACTION && (
                            <Button type="primary" icon={<PlusOutlined />} onClick={addFunction} disabled={showForm || editedMode}>
                                {translateContent('global.buttons.add')}
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
                                                        className={styles.verticallyCentered}
                                                        onClick={() => {
                                                            onEdit(item, index);
                                                        }}
                                                        disabled={disabled}
                                                        style={{ color: disabled ? 'grey' : 'red' }}
                                                    >
                                                        {translateContent('global.buttons.edit')}
                                                    </Button>
                                                )}
                                            </Row>
                                            {<Text type="secondary">{item?.mnmCustomer === YES_NO_FLAG?.YES?.key ? 'M&M user' : item?.mnmCustomer === YES_NO_FLAG?.NO?.key ? 'Non-M&M user' : ''}</Text>}
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
                        <NoDataFound information={VIEW_ACTION ? noDataTitle : addDataTitle} />
                    ) : null}
                </Card>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
