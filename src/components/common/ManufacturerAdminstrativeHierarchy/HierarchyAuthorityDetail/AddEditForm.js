import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Form, Col, Row, Button, Select, DatePicker, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';

import style from 'components/common/Common.module.css';

const { Search } = Input;
const { Text } = Typography;

let apiData = [];

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdminHierarchy: { isLoaded: isDataLoaded = false, data: manufacturerAdminHierarchyData = [], recordId: formRecordId, tokenNumber = [], changeHistoryVisible, historyData = [], authTypeDropdown = [], authorityVisible },
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

            hierarchyAttributesearchList: hierarchyAttributeMasterActions.searchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,

            cardBtmDisableAction: manufacturerAdminHierarchyDataActions.cardBtmDisableAction,
        },
        dispatch
    ),
});

const AuthorityFormMin = ({ recordId = '', formRecordId, viewMode, userId, onFinish, form, isEditing, isBtnDisabled, listShowLoading, saveData, searchList, setIsBtnDisabled, setDocumentTypesList, tokenNumber, authTypeDropdown, documentTypesList, authorityVisible, cardBtmDisableAction }) => {
    const onFinishFailed = (err) => {
        console.error(err);
    };
    console.log('formRecordId', formRecordId);

    const onSearchHandle = (recordId) => (data) => {
        searchList({ setIsLoading: listShowLoading, tokenNumber: data, recordId });
    };

    useEffect(() => {
        if (userId) {
            authTypeDropdown({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return (
        <Form
            form={form}
            id="myForm"
            onFinish={onFinish}
            layout="vertical"
            onFinishFailed={onFinishFailed}
            style={{
                backgroundColor: '#F2F2F2',
            }}
        >
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Authority Type" name={'authorityTypeCode' + recordId} rules={[validateRequiredInputField('Authority Type')]}>
                        <Select
                            getPopupContainer={(triggerNode) => triggerNode.parentElement}
                            labelInValue // defaultValue={name || ''} // showSearch
                            placeholder="Select Authority Type" // optionFilterProp="children"
                            options={apiData}
                            //onChange={handleChange}
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        label="Token"
                        name={'authorityEmployeeTokenNo' + recordId}
                        rules={[
                            validateRequiredInputField('Token Required'),
                            validationFieldLetterAndNumber('Token Required'),
                            {
                                required: tokenNumber.length !== 0 ? false : true,
                                message: 'No Result found',
                            },
                        ]}
                    >
                        <Search allowClear onSearch={onSearchHandle(recordId)} maxLength={50} placeholder={preparePlaceholderText('Token')} />
                    </Form.Item>
                </Col>
            </Row>
            tokenNumber - {recordId}
            <br />
            {form?.getFieldValue('authorityEmployeeTokenNo' + recordId)}
            {!viewMode && form?.getFieldValue('authorityEmployeeTokenNo' + recordId) !== 0 && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item>
                            <Text type="primary">Employee Name : {tokenNumber?.employeeName} </Text>
                        </Form.Item>
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                        <Form.Item label="" name={'EmployeeName' + recordId} initialValue={tokenNumber?.employeeName}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                        <Form.Item label="" name={'id' + recordId} initialValue={''}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                        <Form.Item label="" name={'isModified' + recordId} initialValue={false}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Effective From" name={'dateFrom' + recordId} rules={[validateRequiredSelectField('Date Required')]}>
                            <DatePicker format="YYYY-MM-DD" className={style.datepicker} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Effective To" name={'dateTo' + recordId} rules={[validateRequiredSelectField('Date Required')]}>
                            <DatePicker format="YYYY-MM-DD" className={style.datepicker} />
                        </Form.Item>
                    </Col>
                </Row>
            )}
            {!isEditing && (
                <Button disabled={isBtnDisabled} icon={<PlusOutlined />} type="primary" danger htmlType="submit" onClick={() => cardBtmDisableAction(false)}>
                    Add
                </Button>
            )}
        </Form>
    );
};
export const AddEditForm = connect(mapStateToProps, mapDispatchToProps)(AuthorityFormMin);
