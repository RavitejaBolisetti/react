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
import { translateContent } from 'utils/translateContent';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { apportionList, setApportionList, apportionForm, documentDescriptionList, formActionType, isReadOnly, showApportionForm, setShowApportionForm, receiptDetailData, handleDocumentNumberChange, handleDocumentNumberSearch, handleFormValueChange, documentAmount, setDocumentAmount, receivedAmount, setReceivedAmount, totalReceivedAmount, ApportionLoading } = props;
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

    const handleButtonClick = ({ record, index, buttonAction = FROM_ACTION_TYPE?.EDIT }) => {
        switch (buttonAction) {
            case FROM_ACTION_TYPE?.EDIT: {
                setApportionTableFormData({ ...record, index: index });
                setModalApportionVisible(true);
                setisEditing(true);
                apportionForm.resetFields();
                setShowApportionForm(record);
                setTotalApportionAmount(parseFloat(totalApportionAmount) - parseFloat(record?.apportionedAmount));
                break;
            }
            case FROM_ACTION_TYPE?.DELETE: {
                setApportionList([...apportionList?.filter((_, i) => index !== i)]);
                break;
            }
            default: {
                break;
            }
        }
    };

    // const pagination = false;

    const onApportionCloseAction = () => {
        setModalApportionVisible(false);
        setisEditing(false);
        apportionForm.resetFields();
        setShowApportionForm();
    };

    const handleAddApportion = () => {
        apportionForm.validateFields().then((values) => {
            if (!isEditing) {
                const data = { ...values, id: '', apportionedAmount: parseFloat(values?.apportionedAmount), writeOffAmount: parseFloat(values?.writeOffAmount) };
                setApportionList([data, ...apportionList]);
                apportionForm.resetFields();
                setModalApportionVisible(false);
            } else {
                const data = { ...values, id: '', apportionedAmount: parseFloat(values?.apportionedAmount), writeOffAmount: parseFloat(values?.writeOffAmount), balanceAmount: Number(values?.balanceAmount), receivedAmount: Number(values?.receivedAmount) };
                const newarr = [...apportionList];
                newarr[apportionTableFormData?.index] = data;
                setApportionList(newarr);
                setModalApportionVisible(false);
                setisEditing(false);
            }
            handleFormValueChange();
            setApportionTableFormData();
            setShowApportionForm();
        });
    };

    const handleCancel = () => {
        setModalApportionVisible(false);
        setisEditing(false);
        apportionForm.resetFields();
        setShowApportionForm();
    };

    const apportionDetailProps = {
        isVisible: isModalApportionVisible,
        titleOverride: isEditing ? translateContent('receipts.label.apportionDetails.editApportion') : translateContent('receipts.label.apportionDetails.addApportion'),
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
        setShowApportionForm,
        ApportionLoading,
    };

    return (
        <Card>
            <Row gutter={20} className={styles.marB10}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Text strong>{translateContent('receipts.label.apportionDetails.apportionDetailsText')}</Text>
                    {parseFloat(totalApportionAmount) < parseFloat(totalReceivedAmount) && (
                        <Button onClick={handleApportionAdd} icon={<PlusOutlined />} type="primary" disabled={isReadOnly} className={styles.marB20}>
                            {translateContent('global.buttons.add')}
                        </Button>
                    )}
                </Col>
            </Row>

            {(showApportionTable || apportionList.length > 0) && (
                <>
                    <Divider />
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <DataTable tableColumn={tableColumnApportion({ handleButtonClick, formActionType, documentDescriptionList })} scroll={{ x: 1000 }} tableData={apportionList} pagination={false} />
                        </Col>
                    </Row>
                </>
            )}
            <ModalApportionDetail {...apportionDetailProps} />
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
