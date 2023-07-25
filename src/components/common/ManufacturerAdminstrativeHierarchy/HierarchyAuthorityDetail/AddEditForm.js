/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Form, Col, Row, Button, Select, DatePicker, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { validateRequiredInputField, validateRequiredSelectField, duplicateValidator } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { ManufactureAdminValidateToken } from 'store/actions/data/manufacturerAdminHierarchy/manufactureAdminValidateToken';
import style from 'components/common/Common.module.css';

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
        tokenValidationData,
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
    const { isMainForm, handleFormValueChange, tokenValidationData, recordId = '', viewMode, userId, onFinish, form, isEditing, isBtnDisabled, listShowLoading, searchList, setIsBtnDisabled, setDocumentTypesList, documentTypesList, cardBtnDisableAction } = props;
    const { setselectedValueOnUpdate, searchLoading, authTypeDropdownData, errorMessage, setErrorMessage, formType, setFormType, resetData, record } = props;
    const disableAddBtn = { disabled: isBtnDisabled || !tokenValidationData?.employeeName };
    const onFinishFailed = (err) => {
        console.error(err);
    };

    const onErrorAction = (message) => {
        setErrorMessage(message);
    };

    const onSearchHandle = (recordId) => (data) => {
        setFormType(isMainForm);

        const extraParams = [
            {
                key: 'tokenNumber',
                title: 'tokenNumber',
                value: data,
                name: 'tokenNumber',
            },
        ];
        data && searchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
    };

    const onChangeHandle = (recordId) => (e) => {
        setFormType(isMainForm);
        resetData();
        setErrorMessage();
    };
    const CheckDateEffectiveTo = (value, effectiveFrom) => {
        const bool = dayjs(value).format('YYYY-DD-MM') >= dayjs(effectiveFrom).format('YYYY-DD-MM');
        if (bool) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Date cant be less than Effective from date'));
    };
    const checkEffectiveFrom = (value) => {
        const todaDate = new Date();
        const day = todaDate.getDate();
        const month = todaDate.getMonth() + 1;
        const year = todaDate.getFullYear();
        const date = [year, month, day];

        const bool = dayjs(value).format('YYYY-DD-MM') > date?.join('-');
        if (bool) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(`Date cant be less than today's date`));
    };

    const fieldNames = { label: 'value', value: 'key' };

    return (
        <Form autoComplete="off" form={form} id="myForm" onFinish={onFinish} layout="vertical" onFieldsChange={handleFormValueChange} onFinishFailed={onFinishFailed}>
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
            {!viewMode && formType === !!isMainForm && tokenValidationData?.employeeName && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Text type="primary">Employee Name : {tokenValidationData?.employeeName} </Text>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Effective From"
                            name="effectiveFrom"
                            rules={[
                                validateRequiredSelectField('Date Required'),
                                {
                                    validator: (_, value) => checkEffectiveFrom(value),
                                },
                            ]}
                            initialValue={dayjs(record?.effectiveFrom)}
                        >
                            <DatePicker disabledDate={(date) => date < dayjs().format('YYYY-MM-DD')} format={dateFormat} className={style.datepicker} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Effective To"
                            name="effectiveTo"
                            rules={[
                                validateRequiredSelectField('Date Required'),
                                {
                                    validator: (_, value) => CheckDateEffectiveTo(value, form?.getFieldValue('effectiveFrom')),
                                },
                            ]}
                            initialValue={dayjs(record?.effectiveTo)}
                        >
                            <DatePicker disabledDate={(date) => date < dayjs().format('YYYY-MM-DD')} format={dateFormat} className={style.datepicker} />
                        </Form.Item>
                    </Col>
                </Row>
            )}

            {!isEditing && (
                <Button {...disableAddBtn} icon={<PlusOutlined />} type="primary" onClick={onFinish}>
                    Add
                </Button>
            )}
        </Form>
    );
};
export const AddEditForm = connect(mapStateToProps, mapDispatchToProps)(AuthorityFormMin);
