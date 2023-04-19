import React, { Fragment, useState, useReducer } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select, DatePicker, Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy.js';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { bindActionCreators } from 'redux';
import style from 'components/common/Common.module.css';

const { Option } = Select;
const fieldNames = { label: 'applicationName', value: 'id' };
const { Search } = Input;
const { Text } = Typography;

const applicationData = [
    {
        id: '1',

        applicationName: 'APP nm 1',
    },

    {
        id: '2',

        applicationName: 'APP nm 2',
    },

    {
        id: '3',

        applicationName: 'APP nm 3',
    },
];

let apiData = [];

const mapStateToProps = (state) => {
    console.log('statye', state);
    const {
        auth: { userId },
        data: {
            ManufacturerAdminHierarchy: { isLoaded: isDataLoaded = false, data: manufacturerAdminHierarchyData = [], employeeCode = [], changeHistoryVisible, historyData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;
    // const moduleTitle = 'Manufacturer Detail';
    // const viewTitle = 'Hierarchy Details';

    apiData = state.data.ManufacturerAdminHierarchy.employeeCode;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        isChangeHistoryVisible: changeHistoryVisible,
        manufacturerAdminHierarchyData,
        isDataAttributeLoaded,
        employeeCode,
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

            hierarchyAttributesearchList: hierarchyAttributeMasterActions.searchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
            // onOpenAction: productHierarchyDataActions.changeHistoryVisible,
        },
        dispatch
    ),
});
const AuthorityFormMin = ({ onFinish, form, isEditing, isBtnDisabled, listShowLoading, saveData, searchList, setIsBtnDisabled, setDocumentTypesList, employeeCode}) => {
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    //const [active, setActive] = useState(false);
    const [userInput, isSetUserInput] = useState('');
    const [dateData, setDateData] = useState();
    const [date, setisDate] = useState(false);
    const onFinishFailed = (err) => {
        console.error(err);
    };

    const handleForm = (value) => {
        // setFormBtnDisable(true);
    };

    const onSearchHandle = (data) => {
        console.log('data', data);
        setisDate(!date);
        searchList({ setIsLoading: listShowLoading, employeeCode: data });
        // isSetUserInput(data.target.value);
    };
    console.log(employeeCode, 'CodeCheck');
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
                    <Form.Item label="Authority Type" name="authoitytype" rules={[validateRequiredInputField('Authority Type')]}>
                        <Select
                            getPopupContainer={(triggerNode) => triggerNode.parentElement}
                            labelInValue // defaultValue={name || ''} // showSearch
                            placeholder="Select Authority Type" // optionFilterProp="children"
                            fieldNames={fieldNames}
                            // filterOption={(input, option) => (option?.applicationName ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={applicationData}
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Token" name="token" rules={[validateRequiredInputField('Token Required'), validationFieldLetterAndNumber('Token Required'), 
                        {
                            required: employeeCode ? false : true,
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
                        <Text type="primary">Employee Name : {employeeCode?.employeeName} </Text>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="dateFrom" label="Effective From:" rules={[validateRequiredSelectField('Date Required')]}>
                            <DatePicker className={style.datepicker} onChange={onChange} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="dateTo" label="Effective To:" rules={[validateRequiredSelectField('Date Required')]}>
                            <DatePicker className={style.datepicker} onChange={onChange} />
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
