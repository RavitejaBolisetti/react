import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Form, Col, Row, Button, Select, DatePicker, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';

import style from 'components/common/Common.module.css';

const { Search } = Input;
const { Text } = Typography;

let apiData = [];

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdminHierarchy: { isLoaded: isDataLoaded = false, data: manufacturerAdminHierarchyData = [], recordId: formRecordId, tokenNumber = [], errorMessage, changeHistoryVisible, historyData = [], authTypeDropdown = [], authorityVisible },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    apiData = state.data.ManufacturerAdminHierarchy.authTypeDropdown;

    let returnValue = {
        collapsed,
        userId,
        formRecordId,
        isDataLoaded,
        isChangeHistoryVisible: changeHistoryVisible,
        manufacturerAdminHierarchyData,
        isDataAttributeLoaded,
        tokenNumber,
        authTypeDropdown,
        historyData,
        authorityVisible,
        attributeData: attributeData?.filter((i) => i),
        errorMessage,
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

const AuthorityFormMin = ({handleFormValueChange, tokenValidationData,  errorTokenValidate, tokenValidate, errorMessage, setTokenValidate, setEmployeeName = undefined, employeeName = '', recordId = '', formRecordId, viewMode, userId, onFinish, form, isEditing, isBtnDisabled, listShowLoading, saveData, searchList, setIsBtnDisabled, setDocumentTypesList, tokenNumber, authTypeDropdown, documentTypesList, authorityVisible, cardBtnDisableAction }) => {
    const disableAddBtn = { disabled: isBtnDisabled || !tokenNumber?.employeeName };

    const onFinishFailed = (err) => {
        console.error(err);
    };
    console.log('tokenValidate', tokenValidate, 'errorMessage', errorMessage);

    const errorAction = (message) => {
        errorTokenValidate(message);
    };

    const onSearchHandle = (recordId) => (data) => {
        setTokenValidate({ ['tokenVisible' + recordId]: true });
        data && searchList({ setIsLoading: listShowLoading, tokenNumber: data, recordId, errorAction });
    };

    const onChangeHandle = (recordId) => (e) => {
        setTokenValidate({ tokenVisible: !!e.target.value });
        if (tokenNumber?.employeeName || errorMessage) {
            errorTokenValidate('');
        }

        form.setFieldsValue({
            EffectiveTo: '',
            EffectiveFrom: '',
        });
    };

    useEffect(() => {
        if (userId) {
            authTypeDropdown({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return (
        <Form
            autoComplete="off"
            form={form}
            id="myForm"
            onFinish={onFinish}
            layout="vertical"
            onFieldsChange={handleFormValueChange}
            onFinishFailed={onFinishFailed}
            style={{
                backgroundColor: '#F2F2F2',
            }}
        >
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Authority Type" name="authorityTypeCode" rules={[validateRequiredInputField('Authority Type')]}>
                        <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder="Select Authority Type" options={apiData} disabled={isBtnDisabled} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Token" name={'authorityEmployeeTokenNo'} rules={[validateRequiredInputField('Token Required'), validationFieldLetterAndNumber('Token Required')]}>
                        <Search disabled={isBtnDisabled} allowClear onChange={onChangeHandle(recordId)} onSearch={onSearchHandle(recordId)} maxLength={50} placeholder={preparePlaceholderText('Token')} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Text type="danger">{errorMessage}</Text>
                </Col>
            </Row>
            {((!viewMode &&
                // tokenValidate?.['tokenVisible' + recordId] &&
                tokenNumber?.employeeName) ||
                isEditing) && (
                <Row gutter={20}>
                    {!isEditing && (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item>
                                <Text type="primary">Employee Name : {tokenNumber?.employeeName} </Text>
                            </Form.Item>
                        </Col>
                    )}

                    <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                        <Form.Item label="" name="employeeName" initialValue={tokenNumber?.employeeName}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                        <Form.Item hidden label="" name="id" initialValue={''}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                        <Form.Item hidden label="" name="isModified" initialValue={isEditing ? true : false} >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Effective From" name="effectiveFrom" rules={[validateRequiredSelectField('Date Required')]} initialValue={dayjs()}>
                            <DatePicker format="YYYY-MM-DD" className={style.datepicker} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Effective To" name="effectiveTo" rules={[validateRequiredSelectField('Date Required')]} initialValue={dayjs()}>
                            <DatePicker format="YYYY-MM-DD" className={style.datepicker} />
                        </Form.Item>
                    </Col>
                </Row>
            )}
            {console.log('authorityVisible', authorityVisible)}
            {!isEditing && authorityVisible && (
                <Button {...disableAddBtn} icon={<PlusOutlined />} type="primary" danger htmlType="submit" onClick={() => cardBtnDisableAction(true)}>
                    Add
                </Button>
            )}
        </Form>
    );
};
export const AddEditForm = connect(mapStateToProps, mapDispatchToProps)(AuthorityFormMin);
