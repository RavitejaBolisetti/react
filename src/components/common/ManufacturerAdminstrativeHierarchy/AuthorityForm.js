import React, { useState, useEffect } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select, DatePicker, Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy.js';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { bindActionCreators } from 'redux';
import style from 'components/common/Common.module.css';

const { Search } = Input;
const { Text } = Typography;

let apiData = [];

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdminHierarchy: { isLoaded: isDataLoaded = false, data: manufacturerAdminHierarchyData = [], employeeCode = [], changeHistoryVisible, historyData = [], authTypeDropdown = [] },
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
        isDataLoaded,
        isChangeHistoryVisible: changeHistoryVisible,
        manufacturerAdminHierarchyData,
        isDataAttributeLoaded,
        employeeCode,
        authTypeDropdown,
        // moduleTitle,
        historyData,
        // viewTitle,
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

            // onOpenAction: productHierarchyDataActions.changeHistoryVisible,
        },
        dispatch
    ),
});
const AuthorityFormMin = ({ userId, onFinish, form, isEditing, isBtnDisabled, listShowLoading, saveData, searchList, setIsBtnDisabled, setDocumentTypesList, employeeCode, authTypeDropdown }) => {
    const authObj = {
        authType: '',
        name: '',
        tokken: '',
        fromDate: '',
        toDate: '',
    };

    const [authData, isSetAuthData] = useState(authObj);

    const onFinishFailed = (err) => {
        console.error(err);
    };

    const handleChange = (data) => {
        authData.authType = data.value;
        isSetAuthData({ ...authData });
    };

    const onSearchHandle = (data) => {
        searchList({ setIsLoading: listShowLoading, employeeCode: data });
        authData.tokken = data;
        isSetAuthData({ ...authData });
    };

    const handleSelectDateFrom = (data) => {
        authData.fromDate = data;
        isSetAuthData({ ...authData });
    };

    const handleSelectDateTo = (data) => {
        authData.toDate = data;
        isSetAuthData({ ...authData });
    };

    useEffect(() => {
        if (userId) {
            authTypeDropdown({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    // useEffect(() => {
    //     console.log(authData, 'useState');

    // }, [authData]);

    useEffect(() => {
        authData.name = employeeCode?.employeeName;
        isSetAuthData({ ...authData });
    }, [employeeCode]);

    return (
        <Form
            form={form}
            id="myForm"
            onFinish={onFinish}
            layout="vertical"
            onFinishFailed={onFinishFailed}
            style={{
                // width: 440,
                backgroundColor: '#F2F2F2',
            }}
        >
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Authority Type" name="authoritytype" rules={[validateRequiredInputField('Authority Type')]}>
                        <Select
                            getPopupContainer={(triggerNode) => triggerNode.parentElement}
                            labelInValue // defaultValue={name || ''} // showSearch
                            placeholder="Select Authority Type" // optionFilterProp="children"
                            options={apiData}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        label="Token"
                        name="tokken"
                        rules={[
                            validateRequiredInputField('Token Required'),
                            validationFieldLetterAndNumber('Token Required'),
                            {
                                required: employeeCode.length !== 0 ? false : true,
                                message: 'No Result found',
                            },
                        ]}
                    >
                        <Search allowClear onSearch={onSearchHandle} maxLength={50} placeholder={preparePlaceholderText('Token')} />
                    </Form.Item>
                </Col>
            </Row>

            {employeeCode.length !== 0 && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item>
                            <Text type="primary">Employee Name : {employeeCode?.employeeName} </Text>
                        </Form.Item>
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={0} >
                        <Form.Item label="" name='EmployeeName' initialValue={employeeCode?.employeeName}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="dateFrom" label="Effective From" rules={[validateRequiredSelectField('Date Required')]}>
                            <DatePicker format="YYYY-MM-DD" className={style.datepicker} onChange={handleSelectDateFrom} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="dateTo" label="Effective To" rules={[validateRequiredSelectField('Date Required')]}>
                            <DatePicker format="YYYY-MM-DD" className={style.datepicker} onChange={handleSelectDateTo} />
                        </Form.Item>
                    </Col>
                </Row>
            )}

            {!isEditing && (
                <Button disabled={isBtnDisabled} icon={<PlusOutlined />} type="primary" danger htmlType="submit">
                    Add
                </Button>
            )}
        </Form>
    );
};

// export default AuthorityForm;
export const AuthorityForm = connect(mapStateToProps, mapDispatchToProps)(AuthorityFormMin);
