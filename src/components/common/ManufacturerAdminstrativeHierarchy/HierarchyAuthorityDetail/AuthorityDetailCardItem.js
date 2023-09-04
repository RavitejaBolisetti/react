/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { Col, Card, Row, Button, Divider, Typography, Form } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import dayjs from 'dayjs';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';

import { getCodeValue } from 'utils/getCodeValue';
import { AddEditForm } from './AddEditForm';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        data: {
            ManufacturerAdmin: {
                ManufactureAdminValidateToken: { data: tokenValidationData },
            },
        },
    } = state;

    let returnValue = {
        tokenValidationData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            showGlobalNotification,
        },
        dispatch
    ),
});

const AuthorityCardItemMain = (props) => {
    const { forceUpdate, viewMode, onFinish, setDocumentTypesList, documentTypesList, setIsBtnDisabled, isBtnDisabled, record, handleFormValueChange } = props;
    const { employeeName, setEmployeeName, tokenValidate, setTokenValidate, tokenValidationData, showGlobalNotification } = props;
    const { selectedValueOnUpdate, setselectedValueOnUpdate, authTypeDropdownData, errorMessage, setErrorMessage, formType, setFormType, resetData, isMainForm } = props;
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    const onEdit = () => {
        form.setFieldsValue({ ...record, effectiveTo: dayjs(record?.effectiveTo), effectiveFrom: dayjs(record?.effectiveFrom) });
        resetData();
        setFormType(!!isMainForm);
        setErrorMessage('');
        setIsEditing(true);
        setIsBtnDisabled(true);
    };

    const onUpdate = () => {
        const tokenNo = form.getFieldValue('authorityEmployeeTokenNo');
        const isPreviousTokenNo = record?.authorityEmployeeTokenNo === tokenNo;

        if (!isPreviousTokenNo && !tokenValidationData?.employeeName) {
            return showGlobalNotification({ notificationType: 'warning', title: 'Warning', message: 'Validate token to proceed' });
        }

        form.validateFields()
            .then((data) => {
                setDocumentTypesList((prev) => {
                    const updatedData = [...prev];
                    const index = updatedData?.findIndex((el) => el?.authorityEmployeeTokenNo === record?.authorityEmployeeTokenNo);
                    updatedData?.splice(index, 1, { ...data, effectiveTo: data?.effectiveTo, effectiveFrom: data?.effectiveFrom, authorityEmployeeTokenNo: tokenValidationData?.authorityEmployeeTokenNo || data?.authorityEmployeeTokenNo, employeeName: tokenValidationData?.employeeName || data?.employeeName, isModified: !!data?.id });
                    return updatedData;
                });
                forceUpdate();
                setIsEditing(false);
                setIsBtnDisabled(false);
                resetData();
            })
            .catch((error) => console.error(error));
    };

    const handleDelete = (val) => {
        setDocumentTypesList((prev) => {
            const newList = [...prev];
            const indx = newList?.findIndex((el) => el?.authorityEmployeeTokenNo === val?.authorityEmployeeTokenNo && el?.authorityTypeCode === val?.authorityTypeCode);
            newList?.splice(indx, 1);
            return newList;
        });

        setIsEditing(false);
        setIsBtnDisabled(false);
        form.resetFields();
    };

    const onCancel = () => {
        setIsEditing(false);
        setIsBtnDisabled(false);
        resetData();
    };

    const colLeft = viewMode ? 24 : 18;
    const colRight = viewMode ? 24 : 6;

    return (
        <>
            <Card className={viewMode ? styles.cardView : ''}>
                <Row align="middle" className={!viewMode ? styles.marB20 : ''}>
                    <Col xs={colLeft} sm={colLeft} md={colLeft} lg={colLeft} xl={colLeft} xxl={colLeft}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textWrap}>
                            <Text type="secondary">Authority : {getCodeValue(authTypeDropdownData, record?.authorityTypeCode)}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Text strong>{record?.employeeName + ' | ' + record?.authorityEmployeeTokenNo}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textWrap}>
                            <Text type="secondary">From - {record?.effectiveFrom ? dayjs(record?.effectiveFrom).format('DD-MM-YYYY') : '-'}</Text>
                            <Divider type="vertical" />
                            <Text type="secondary">To - {record?.effectiveTo ? dayjs(record?.effectiveTo).format('DD-MM-YYYY') : '-'}</Text>
                        </Col>
                    </Col>
                    {!viewMode && (
                        <Col xs={colRight} sm={colRight} md={colRight} lg={colRight} xl={colRight} xxl={colRight} className={styles.buttonsGroupRight}>
                            {!isEditing ? (
                                <>
                                    <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(record)} />
                                    {!record?.id > 0 && <Button disabled={isBtnDisabled} onClick={() => handleDelete(record)} type="link" icon={<FiTrash />}></Button>}
                                </>
                            ) : (
                                <>
                                    <Button type="link" onClick={onUpdate}>
                                        Save
                                    </Button>
                                    <Button type="link" onClick={() => onCancel()}>
                                        Cancel
                                    </Button>
                                </>
                            )}
                        </Col>
                    )}
                </Row>

                {isEditing && (
                    <>
                        <Divider />
                        <AddEditForm handleFormValueChange={handleFormValueChange} tokenValidate={tokenValidate} setEmployeeName={setEmployeeName} setTokenValidate={setTokenValidate} employeeName={employeeName} record={record} onFinish={onFinish} form={form} setDocumentTypesList={setDocumentTypesList} documentTypesList={documentTypesList} isEditing={isEditing} selectedValueOnUpdate={selectedValueOnUpdate} setselectedValueOnUpdate={setselectedValueOnUpdate} errorMessage={errorMessage} setErrorMessage={setErrorMessage} formType={formType} setFormType={setFormType} isMainForm={isMainForm} />
                    </>
                )}
            </Card>
        </>
    );
};

const AuthorityDetailCardItem = connect(mapStateToProps, mapDispatchToProps)(AuthorityCardItemMain);

export default AuthorityDetailCardItem;
