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
import styles from 'components/common/Common.module.css';
import { showGlobalNotification } from 'store/actions/notification';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';

import { AddEditForm } from './AddEditForm';

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
    const { isUpdating, viewMode, onFinish, setDocumentTypesList, documentTypesList, setIsBtnDisabled, isBtnDisabled, record, handleFormValueChange } = props;
    const { employeeName, setEmployeeName, tokenValidate, setTokenValidate, tokenValidationData, showGlobalNotification } = props;
    const { selectedValueOnUpdate, setselectedValueOnUpdate, authTypeDropdownData, errorMessage, setErrorMessage, formType, setFormType, resetData, isMainForm } = props;
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    console.log('authTypeDropdownData', authTypeDropdownData);

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
                    updatedData?.splice(index, 1, { ...data, effectiveTo: isPreviousTokenNo ? record?.effectiveTo : data?.effectiveTo, effectiveFrom: isPreviousTokenNo ? record?.effectiveFrom : data?.effectiveFrom, authorityEmployeeTokenNo: tokenValidationData?.authorityEmployeeTokenNo || data?.authorityEmployeeTokenNo, employeeName: tokenValidationData?.employeeName || data?.employeeName, isModified: !!data?.id });
                    return updatedData;
                });
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
            <Card className={styles.viewCardSize}>
                <Row align="middle">
                    <Col xs={colLeft} sm={colLeft} md={colLeft} lg={colLeft} xl={colLeft} xxl={colLeft}>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                            <Text type="secondary">Authority : {getCodeValue(authTypeDropdownData, record?.authorityTypeCode)}</Text>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Text strong>{record?.employeeName + ' | ' + record?.authorityEmployeeTokenNo}</Text>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Text type="secondary">From - {checkAndSetDefaultValue(record?.effectiveFrom, false, DATA_TYPE?.DATE?.key)}</Text>
                            <Divider type="vertical" />
                            <Text type="secondary">To - {checkAndSetDefaultValue(record?.effectiveTo, false, DATA_TYPE?.DATE?.key)}</Text>
                        </Col>
                    </Col>
                    {!viewMode && (
                        <Col xs={colRight} sm={colRight} md={colRight} lg={colRight} xl={colRight} xxl={colRight}>
                            <Row justify="end">
                                {!isEditing ? (
                                    <>
                                        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                            <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(record)} />
                                        </Col>
                                        {!record?.id > 0 && (
                                            <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                                <Button disabled={isBtnDisabled} onClick={() => handleDelete(record)} type="link" icon={<FiTrash />}></Button>
                                            </Col>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Button type="link" onClick={onUpdate}>
                                                Save
                                            </Button>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Button type="link" onClick={() => onCancel()}>
                                                Cancel
                                            </Button>
                                        </Col>
                                    </>
                                )}
                            </Row>
                        </Col>
                    )}
                </Row>

                {isEditing && (
                    <Fragment>
                        <Divider />
                        <AddEditForm handleFormValueChange={handleFormValueChange} tokenValidate={tokenValidate} setEmployeeName={setEmployeeName} setTokenValidate={setTokenValidate} employeeName={employeeName} record={record} onFinish={onFinish} form={form} setDocumentTypesList={setDocumentTypesList} documentTypesList={documentTypesList} isEditing={isEditing} selectedValueOnUpdate={selectedValueOnUpdate} setselectedValueOnUpdate={setselectedValueOnUpdate} errorMessage={errorMessage} setErrorMessage={setErrorMessage} formType={formType} setFormType={setFormType} isMainForm={isMainForm} />
                    </Fragment>
                )}
            </Card>
        </>
    );
};

const AuthorityDetailCardItem = connect(mapStateToProps, mapDispatchToProps)(AuthorityCardItemMain);

export default AuthorityDetailCardItem;
