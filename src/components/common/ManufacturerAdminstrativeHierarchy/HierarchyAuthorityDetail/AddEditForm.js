/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Form, Col, Row, Button, Select, DatePicker, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { dateFormat } from 'utils/formatDateTime';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';

import style from 'components/common/Common.module.css';

const { Search } = Input;
const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdminHierarchy: { isLoaded: isDataLoaded = false, data: manufacturerAdminHierarchyData = [], recordId: formRecordId, tokenNumber = [], errorMessage, isUpdating, changeHistoryVisible, historyData = [], authTypeDropdown: authTypeDropdownData = [], authorityVisible },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, isLoading: searchLoading, data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        formRecordId,
        isDataLoaded,
        isChangeHistoryVisible: changeHistoryVisible,
        manufacturerAdminHierarchyData,
        isDataAttributeLoaded,
        tokenNumber,
        authTypeDropdownData,
        historyData,
        authorityVisible,
        attributeData: attributeData?.filter((i) => i),
        errorMessage: errorMessage?.length ? errorMessage[0] : errorMessage,
        isUpdating,
        searchLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            searchList: manufacturerAdminHierarchyDataActions.searchList,
            saveData: manufacturerAdminHierarchyDataActions.saveData,
            listShowLoading: manufacturerAdminHierarchyDataActions.listShowLoading,
            authTypeDropdown: manufacturerAdminHierarchyDataActions.authTypeDropdown,
            errorTokenValidate: manufacturerAdminHierarchyDataActions.errorTokenValidate,

            hierarchyAttributesearchList: hierarchyAttributeMasterDataActions.searchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterDataActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,

            cardBtnDisableAction: manufacturerAdminHierarchyDataActions.cardBtnDisableAction,
        },
        dispatch
    ),
});

const AuthorityFormMin = (props) => {
    const { isUpdating, isMainForm, setTokenValidationData, handleFormValueChange, tokenValidationData, errorTokenValidate, tokenValidate, errorMessage, setTokenValidate, setEmployeeName = undefined, employeeName = '', recordId = '', formRecordId, viewMode, userId, onFinish, form, isEditing, isBtnDisabled, listShowLoading, saveData, searchList, setIsBtnDisabled, setDocumentTypesList, tokenNumber, authTypeDropdown, documentTypesList, authorityVisible, cardBtnDisableAction } = props;
    const { setselectedValueOnUpdate, authTypeDropdownData, hierarchyAttributeListShowLoading, searchLoading } = props;
    const disableAddBtn = { disabled: isBtnDisabled || !tokenNumber?.employeeName };

    const onFinishFailed = (err) => {
        console.error(err);
    };

    const errorAction = (message) => {
        errorTokenValidate({ message, isUpdating: isEditing });
    };

    const onSearchHandle = (recordId) => (data) => {
        data && searchList({ setIsLoading: hierarchyAttributeListShowLoading, tokenNumber: data, recordId, errorAction });
    };

    const onChangeHandle = (recordId) => (e) => {
        if (!isMainForm) {
            setTokenValidationData({});
        }
        if (tokenNumber?.employeeName || errorMessage) {
            errorTokenValidate({ errorMessage: '', isUpdating: isEditing });
        }
    };

    useEffect(() => {
        if (userId) {
            authTypeDropdown({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const fieldNames = { label: 'value', value: 'key' };

    return (
        <Form autoComplete="off" form={form} id="myForm" onFinish={onFinish} layout="vertical" onFieldsChange={handleFormValueChange} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Authority Type" name="authorityTypeCode" rules={[validateRequiredInputField('Authority Type')]}>
                        <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder="Select Authority Type" fieldNames={fieldNames} options={authTypeDropdownData} disabled={isBtnDisabled} onChange={(value, valueObject) => setselectedValueOnUpdate(valueObject)} allowClear />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Token" name={'authorityEmployeeTokenNo'} rules={[validateRequiredInputField('Token Required')]}>
                        <Search loading={searchLoading} className={style.tokenField} disabled={isBtnDisabled} allowClear onChange={onChangeHandle(recordId)} onSearch={onSearchHandle(recordId)} placeholder={preparePlaceholderText('Token')} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Text type="danger">{!(isUpdating && isMainForm) && errorMessage}</Text>
                </Col>
            </Row>
            {!viewMode && !(isUpdating && isMainForm) && (tokenValidationData?.employeeName || (isMainForm && tokenNumber?.employeeName && !tokenValidationData?.employeeName)) && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Text type="primary">Employee Name : {!isMainForm ? tokenValidationData?.employeeName : tokenNumber?.employeeName} </Text>
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                        <Form.Item hidden label="" name="id" initialValue={''}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                        <Form.Item hidden label="" name="isModified" initialValue={form.getFieldValue('id') ? true : false}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Effective From" name="effectiveFrom" rules={[validateRequiredSelectField('Date Required')]} initialValue={dayjs()}>
                            <DatePicker disabledDate={(date) => date < dayjs().format('YYYY-MM-DD')} format={dateFormat} className={style.datepicker} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Effective To" name="effectiveTo" rules={[validateRequiredSelectField('Date Required')]} initialValue={dayjs()}>
                            <DatePicker disabledDate={(date) => date < dayjs().format('YYYY-MM-DD')} format={dateFormat} className={style.datepicker} />
                        </Form.Item>
                    </Col>
                </Row>
            )}

            {!isEditing && authorityVisible && (
                <Button {...disableAddBtn} icon={<PlusOutlined />} type="primary" danger htmlType="submit" onClick={() => cardBtnDisableAction(true)}>
                    Add
                </Button>
            )}
        </Form>
    );
};
export const AddEditForm = connect(mapStateToProps, mapDispatchToProps)(AuthorityFormMin);
