/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Form, Col, Row, Button, Select, DatePicker, Typography } from 'antd';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';

import { dateFormat, formattedCalendarDate, convertDateToCalender } from 'utils/formatDateTime';
import { validateRequiredInputField, validateRequiredSelectField, duplicateValidator } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { ManufactureAdminValidateToken } from 'store/actions/data/manufacturerAdminHierarchy/manufactureAdminValidateToken';

import styles from 'assets/sass/app.module.scss';

const { Search } = Input;
const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, isLoading: searchLoading },
            ManufacturerAdmin: {
                ManufactureAdminValidateToken: { data: tokenValidationData },
                AuthorityHierarchy: { data: authTypeDropdownData = [] },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataAttributeLoaded,
        searchLoading,
        tokenValidationData: tokenValidationData?.userSearchResponse?.userDetails?.[0],
        authTypeDropdownData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            searchList: ManufactureAdminValidateToken.fetchList,
            saveData: ManufactureAdminValidateToken.saveData,
            listShowLoading: ManufactureAdminValidateToken.listShowLoading,
            resetData: ManufactureAdminValidateToken.reset,

            hierarchyAttributesearchList: hierarchyAttributeMasterDataActions.searchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterDataActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,
        },
        dispatch
    ),
});

const AuthorityFormMin = (props) => {
    const { isMainForm, handleFormValueChange, tokenValidationData, recordId = '', viewMode, userId, onFinish, form, isEditing, isBtnDisabled, listShowLoading, searchList, documentTypesList } = props;
    const { setselectedValueOnUpdate, searchLoading, authTypeDropdownData, errorMessage, setErrorMessage, formType, setFormType, resetData, record } = props;
    const disableAddBtn = { disabled: isBtnDisabled || !tokenValidationData?.manufacturerUserName };

    const onErrorAction = (message) => {
        setErrorMessage(message);
    };

    const onSearchHandle = () => (data) => {
        setFormType(isMainForm);
        const extraParams = [
            {
                key: 'userType',
                title: 'userType',
                value: 'MNM',
                name: 'userType',
            },
            {
                key: 'employeeCode',
                title: 'employeeCode',
                value: data,
                name: 'employeeCode',
            },
        ];
        data && searchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
    };

    const onChangeHandle = (recordId) => (e) => {
        setFormType(isMainForm);
        resetData();
        setErrorMessage();
    };

    const fieldNames = { label: 'value', value: 'key' };

    return (
        <Form autoComplete="off" form={form} id="myForm" onFinish={onFinish} layout="vertical" onFieldsChange={handleFormValueChange}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Authority Type" name="authorityTypeCode" rules={[validateRequiredInputField('Authority Type'), { validator: (rule, value) => duplicateValidator(value, 'authorityTypeCode', documentTypesList, record?.authorityTypeCode) }]}>
                        <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder="Select Authority Type" fieldNames={fieldNames} options={authTypeDropdownData} disabled={isBtnDisabled} onChange={(value, valueObject) => setselectedValueOnUpdate(valueObject)} allowClear />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Token" name={'authorityEmployeeTokenNo'} rules={[validateRequiredInputField('Token Required'), { validator: (rule, value) => duplicateValidator(value, 'authorityEmployeeTokenNo', documentTypesList, record?.authorityEmployeeTokenNo) }]}>
                        <Search loading={searchLoading} disabled={isBtnDisabled} allowClear onChange={onChangeHandle(recordId)} onSearch={onSearchHandle(recordId)} placeholder={preparePlaceholderText('Token')} />
                    </Form.Item>
                </Col>
                {formType === isMainForm && errorMessage && (
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Text type="danger">{errorMessage}</Text>
                    </Col>
                )}
                <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                    <Form.Item hidden label="" name="id" initialValue={''}>
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="employeeName">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            {!viewMode && formType === !!isMainForm && (
                <Row gutter={20}>
                    {tokenValidationData?.manufacturerUserName && (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                            <Text strong>Employee Name : {tokenValidationData?.manufacturerUserName} </Text>
                        </Col>
                    )}

                    {(record?.effectiveTo || tokenValidationData?.manufacturerUserName) && (
                        <>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item label="Effective From" name="effectiveFrom" rules={[validateRequiredSelectField('Date Required')]} initialValue={convertDateToCalender(record?.effectiveFrom)}>
                                    <DatePicker onChange={() => form.setFieldsValue({ effectiveTo: undefined })} disabledDate={(current) => current.isBefore(moment().subtract(1, 'day'))} format={dateFormat} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item label="Effective To" name="effectiveTo" rules={[validateRequiredSelectField('Date Required')]} initialValue={formattedCalendarDate(record?.effectiveTo)}>
                                    <DatePicker disabledDate={(current) => current < form?.getFieldValue('effectiveFrom')} format={dateFormat} />
                                </Form.Item>
                            </Col>
                        </>
                    )}
                </Row>
            )}

            {!isEditing && (
                <Button {...disableAddBtn} icon={<PlusOutlined />} type="primary" onClick={onFinish} className={styles.marB20}>
                    Add
                </Button>
            )}
        </Form>
    );
};
export const AddEditForm = connect(mapStateToProps, mapDispatchToProps)(AuthorityFormMin);
