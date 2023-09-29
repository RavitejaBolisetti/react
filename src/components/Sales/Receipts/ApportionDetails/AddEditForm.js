/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Card, Divider, Button, Typography } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { DataTable } from 'utils/dataTable';
import { tableColumnApportion } from './tableColumnApportion';

import { ModalApportionDetail } from './ModalApportionDetail';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { apportionList, setApportionList, apportionForm, documentDescriptionList, formActionType, isReadOnly, showApportionForm, setShowApportionForm, receiptDetailData, handleDocumentNumberChange, handleDocumentNumberSearch, handleFormValueChange, documentAmount, setDocumentAmount, receivedAmount, setReceivedAmount, totalReceivedAmount } = props;
    const [modalForm] = Form.useForm();
    const [isModalApportionVisible, setModalApportionVisible] = useState(false);
    const [showApportionTable, setApportionTable] = useState(false);

    const [totalApportionAmount, setTotalApportionAmount] = useState();
    const [apportionTableFormData, setApportionTableFormData] = useState();
    const [isEditing, setisEditing] = useState(false);

    useEffect(() => {
        if (receiptDetailData?.apportionDetails) {
            setApportionTable(true);
            setApportionList(receiptDetailData?.apportionDetails);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiptDetailData]);

    useEffect(() => {
        const totalVal = apportionList?.reduce((prev, curr) => Number(prev) + Number(curr?.apportionedAmount), 0);
        setTotalApportionAmount(totalVal);
    }, [apportionList]);

    const handleApportionAdd = () => {
        setApportionTable(true);
        setModalApportionVisible(true);
        apportionForm.resetFields();
    };

    const handleButtonClick = ({ record, index }) => {
        setApportionTableFormData({ ...record, index: index });
        setModalApportionVisible(true);
        setisEditing(true);
        apportionForm.resetFields();
        setShowApportionForm(record);
        setTotalApportionAmount(parseFloat(totalApportionAmount) - parseFloat(record?.apportionedAmount));
    };

    // const pagination = false;

    const onApportionCloseAction = () => {
        setModalApportionVisible(false);
        setisEditing(false);
        apportionForm.resetFields();
        setShowApportionForm();
    };

    const handleAddApportion = () => {
        apportionForm
            .validateFields()
            .then(() => {
                const values = apportionForm.getFieldsValue();

                if (!isEditing) {
                    const data = { ...values, id: '' };
                    setApportionList([data, ...apportionList]);
                    apportionForm.resetFields();
                    setModalApportionVisible(false);
                } else {
                    const data = { ...values, id: '' };
                    const newarr = [...apportionList];

                    newarr[apportionTableFormData?.index] = data;
                    setApportionList(newarr);
                    setModalApportionVisible(false);
                    setisEditing(false);
                }
                handleFormValueChange();
                setApportionTableFormData();
                setShowApportionForm();
            })
          
    };

    const handleCancel = () => {
        setModalApportionVisible(false);
        setisEditing(false);
        apportionForm.resetFields();
        setShowApportionForm();
    };

    const apportionDetailProps = {
        isVisible: isModalApportionVisible,
        titleOverride: isEditing ? 'Edit Apportion Details' : 'Add Apportion Details',
        onCloseAction: onApportionCloseAction,
        handleCancel,
        handleAddApportion,
        form: modalForm,
        apportionForm,
        totalApportionAmount,
        documentDescriptionList,
        handleDocumentNumberChange,
        handleDocumentNumberSearch,
        apportionTableFormData,
        setApportionTableFormData,
        isEditing,
        setisEditing,
        showApportionForm,
        documentAmount,
        setDocumentAmount,
        receivedAmount,
        setReceivedAmount,
        totalReceivedAmount,
        apportionList,
    };

    return (
        <Card>
            {/* <Collapse expandIcon={expandIcon} expandIconPosition="end" collapsible="icon"> */}
            {/* <Panel
                header={ */}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Text strong>Apportion Details</Text>
                    {parseFloat(totalApportionAmount) < parseFloat(totalReceivedAmount) && (
                        <Button onClick={handleApportionAdd} icon={<PlusOutlined />} type="primary" disabled={isReadOnly} className={styles.marB20}>
                            Add
                        </Button>
                    )}
                </Col>
            </Row>
            {/* key="2">
            </Panel>
            </Collapse> */}
            {(showApportionTable || apportionList.length > 0) && (
                <>
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <DataTable tableColumn={tableColumnApportion({ handleButtonClick, formActionType })} scroll={{ x: 1000 }} tableData={apportionList} pagination={false} />
                            {parseFloat(totalApportionAmount) === parseFloat(totalReceivedAmount) && <p className={styles.marB20}>The entire paid amount has been apportioned. Cannot be apportioned further.</p>}
                            {/* <ListDataTable handleAdd={handleButtonClick} {...tableApportionProps} showAddButton={false} /> */}
                        </Col>
                    </Row>
                </>
            )}
            <ModalApportionDetail {...apportionDetailProps} />
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
