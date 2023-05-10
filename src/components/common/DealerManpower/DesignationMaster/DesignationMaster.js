import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Empty, ConfigProvider, Select } from 'antd';
import { bindActionCreators } from 'redux';

import { dealerManpowerDesignationMasterDataActions } from 'store/actions/data/dealerManpower/designationMaster';
import { dealerManpowerDivisionMasterDataActions } from 'store/actions/data/dealerManpower/dealerDivisionMaster';
import { dealerManpowerEmployeeDepartmentDataActions } from 'store/actions/data/dealerManpower/dealerEmployeeDepartmentMaster';
import { roleMasterDataActions } from 'store/actions/data/dealerManpower/roleMaster';

import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { showGlobalNotification } from 'store/actions/notification';

import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';
import { AddEditForm } from './AddEditForm';
import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';

import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            DealerManpower: {
                DesignationMaster: { isLoaded: isDataLoaded = false, isLoading, data },
                DealerDivisionMaster: { isLoaded: isDivisionDataLoaded = false, isDivisionLoading, data: divisionData = [] },
                DealerEmployeeDepartmentMaster: { isLoaded: isDepartmentDataLoaded = false, isDepartmentLoading, data: departmentData = [] },
                RoleMaster: { isLoaded: isRoleDataLoaded = false, isRoleLoading, data: roleData = [] },
            },
        },
    } = state;

    // console.log(state,'STATE CHECK');

    const moduleTitle = 'Designation Master';

    let returnValue = {
        userId,
        isDataLoaded,
        data,
        isLoading,
        isDivisionDataLoaded,
        isDivisionLoading,
        isDepartmentDataLoaded,
        isDepartmentLoading,
        isRoleDataLoaded,
        isRoleLoading,
        roleData,
        departmentData,
        divisionData,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: dealerManpowerDesignationMasterDataActions.fetchList,
            saveData: dealerManpowerDesignationMasterDataActions.saveData,
            listShowLoading: dealerManpowerDesignationMasterDataActions.listShowLoading,
            fetchDivisionList: dealerManpowerDivisionMasterDataActions.fetchList,
            listDivisionShowLoading: dealerManpowerDivisionMasterDataActions.listShowLoading,
            fetchDepartmentList: dealerManpowerEmployeeDepartmentDataActions.fetchList,
            listDepartmentShowLoading: dealerManpowerEmployeeDepartmentDataActions.listShowLoading,
            fetchRoleList: roleMasterDataActions.fetchList,
            listRoleShowLoading: roleMasterDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const DesignationMasterBase = (props) => {
    const { data, saveData, fetchRoleList, listRoleShowLoading, roleData, isDivisionLoading, isRoleDataLoaded, fetchList, fetchDepartmentList, isDepartmentDataLoaded, listDepartmentShowLoading, departmentData, divisionData, fetchDivisionList, listDivisionShowLoading, isDivisionDataLoaded, userId, isDataLoaded, listShowLoading, showGlobalNotification, moduleTitle } = props;

    const [form] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [page, setPage] = useState(1);
    const [filteredDepartmentData, setFilteredDepartmentData] = useState([]);
    const [filteredRoleData, setFilteredRoleData] = useState([]);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId && !isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }
        if (!isDivisionDataLoaded) {
            fetchDivisionList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }
        if (!isDepartmentDataLoaded) {
            fetchDepartmentList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }

        if (!isRoleDataLoaded) {
            fetchRoleList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded, isDivisionDataLoaded, isDepartmentDataLoaded, isRoleDataLoaded]);

    useEffect(() => {
        if (userId && refershData) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (isDataLoaded && data && userId) {
            if (filterString) {
                const keyword = filterString?.keyword;
                const division = filterString?.division;
                const department = filterString?.department;
                const role = filterString?.role;

                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.designationCode) || filterFunction(keyword)(item?.designationDescription) : true) && (division ? filterFunction(division)(item?.divisionCode) : true) && (department ? filterFunction(department)(item?.departmentCode) : true) && (role ? filterFunction(role)(item?.roleCode) : true));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            } else {
                setSearchdata(data?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, data, userId]);

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(buttonAction === VIEW_ACTION ? { ...defaultBtnVisiblity, closeBtn: true, editBtn: true } : buttonAction === EDIT_ACTION ? { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true } : { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: true, cancelBtn: true });

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onSearchHandle = (value) => {
        setFilterString({ ...filterString, keyword: value });
    };

    const onChangeHandle = (e) => {
        setFilterString({ ...filterString, keyword: e.target.value });
    };

    const handleFilterChange = (name) => (value) => {
        if (name === 'division') {
            setFilteredDepartmentData(departmentData?.filter((i) => i?.divisionCode === value));
        }
        if (name === 'role') {
            setFilteredRoleData(roleData?.filter((i) => i?.departmentCode === value));
        }
        setFilterString({ ...filterString, [name]: value });
    };

    const onFinish = (values) => {
        let data = { ...values };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const formProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,

        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: (formActionType?.viewMode ? 'View ' : formActionType?.editMode ? 'Edit ' : 'Add ').concat('Designation'),
        tableData: searchData,
        divisionData,
        departmentData,
        roleData,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick, page?.current, page?.pageSize),
        tableData: searchData,
        setPage,
    };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.lineHeight33}>
                                        {`${moduleTitle}`}
                                    </Col>
                                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                                        <Select placeholder="Division" loading={isDivisionLoading} allowClear className={styles.headerSelectField} onChange={handleFilterChange('division')}>
                                            {divisionData?.map((item) => (
                                                <Option value={item?.code}>{item?.divisionName}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                                        <Select placeholder="Department" allowClear className={styles.headerSelectField} onChange={handleFilterChange('department')}>
                                            {filteredDepartmentData?.map((item) => (
                                                <Option value={item?.departmentCode}>{item?.departmentName}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                                        <Select placeholder="Role" allowClear className={styles.headerSelectField} onChange={handleFilterChange('role')}>
                                            {filteredRoleData?.map((item) => (
                                                <Option value={item?.roleCode}>{item?.roleDescription}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                                        <Search placeholder="Search" allowClear className={styles.headerSearchField} onSearch={onSearchHandle} onChange={onChangeHandle} />
                                    </Col>
                                </Row>
                            </Col>

                            <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />
                                <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                    Add Designation
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ConfigProvider
                        renderEmpty={() =>
                            isDataLoaded && (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        !searchData?.length ? (
                                            <span>
                                                No records found. Please add new parameter <br />
                                                using below button
                                            </span>
                                        ) : (
                                            <span> No records found.</span>
                                        )
                                    }
                                >
                                    {!searchData?.length ? (
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                                    Add Designation
                                                </Button>
                                            </Col>
                                        </Row>
                                    ) : (
                                        ''
                                    )}
                                </Empty>
                            )
                        }
                    >
                        <div className={styles.tableProduct}>
                            <DataTable isLoading={showDataLoading} {...tableProps} />
                        </div>
                    </ConfigProvider>
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const DesignationMaster = connect(mapStateToProps, mapDispatchToProps)(DesignationMasterBase);
