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
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';

import { showGlobalNotification } from 'store/actions/notification';

import { DataTable } from 'utils/dataTable';
import { searchValidator } from 'utils/validation';
import { filterFunction } from 'utils/filterFunction';
import { AddEditForm } from './AddEditForm';
import { PlusOutlined } from '@ant-design/icons';
import { AdvancedSearch } from './AdvancedSearch';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { TfiReload } from 'react-icons/tfi';

import styles from 'components/common/Common.module.css';
import { ListDataTable } from 'utils/ListDataTable';

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
            resetData: dealerManpowerDesignationMasterDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const DesignationMasterBase = (props) => {
    const { data, saveData, fetchRoleList, resetData, listRoleShowLoading, roleData, isDivisionLoading, isRoleDataLoaded, fetchList, fetchDepartmentList, isDepartmentDataLoaded, listDepartmentShowLoading, departmentData, divisionData, fetchDivisionList, listDivisionShowLoading, isDivisionDataLoaded, isDepartmentLoading, isRoleLoading, userId, isDataLoaded, listShowLoading, showGlobalNotification, moduleTitle } = props;

    const [form] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [page, setPage] = useState(1);
    const [filteredDepartmentData, setFilteredDepartmentData] = useState([]);
    const [filteredRoleData, setFilteredRoleData] = useState([]);

    const [formData, setFormData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [filterString, setFilterString] = useState({ advanceFilter: false });

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
            fetchList({ setIsLoading: listShowLoading, userId, extraParams: extraParams, onSuccessAction });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (isDataLoaded && data && userId) {
            console.log(filterString);
            if (filterString) {
                const keyword = filterString?.keyword;
                const division = filterString?.code;
                const department = filterString?.departmentCode;
                const role = filterString?.roleCode;

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

    const extraParams = [
        {
            key: 'code',
            title: 'division',
            value: filterString?.code,
            name: divisionData?.find((i) => i?.code === filterString?.code)?.divisionName,
        },
        {
            key: 'departmentCode',
            title: 'department',
            value: filterString?.departmentCode,
            name: filteredDepartmentData?.find((i) => i?.departmentCode === filterString?.departmentCode)?.departmentName,
        },
        {
            key: 'roleCode',
            title: 'role',
            value: filterString?.roleCode,
            name: filteredRoleData?.find((i) => i?.roleCode === filterString?.roleCode)?.roleDescription,
        },
        {
            key: 'keyword',
            title: 'keyword',
            value: filterString?.keyword,
            name: filterString?.keyword,
        },
    ];

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
        advanceFilterForm
            .validateFields()
            .then(() => {
                value ? setFilterString({ ...filterString, advanceFilter: true, keyword: value }) : handleResetFilter();
            })
            .catch((err) => {
                console.log(err);
                return;
            });
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            const filterValue = type === 'text' ? value.target.value : value;

            if (name === 'code') {
                setFilteredDepartmentData(departmentData?.filter((i) => i?.divisionCode === filterValue));
                advanceFilterForm.setFieldsValue({ departmentCode: undefined });
                advanceFilterForm.setFieldsValue({ roleCode: undefined });
            }

            if (name === 'departmentCode') {
                setFilteredRoleData(roleData?.filter((i) => i?.departmentCode === filterValue));
                advanceFilterForm.setFieldsValue({ roleCode: undefined });
            }
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

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
    };

    const handleResetFilter = () => {
        resetData();
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
        setAdvanceSearchVisible(false);
        setFilterString();
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        setAdvanceSearchVisible,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        isDivisionDataLoaded,
        isDivisionLoading,
        isDepartmentDataLoaded,
        isDepartmentLoading,
        isRoleDataLoaded,
        isRoleLoading,
        divisionData,
        departmentData,
        roleData,
        handleFilterChange,
        filteredDepartmentData,
        filteredRoleData,
        filterString,
        setFilterString,
        advanceFilterForm,
        resetData,
        handleResetFilter,
    };

    const removeFilter = (key) => {
        advanceFilterForm.resetFields();
        const { [key]: names, ...rest } = filterString;
        setFilterString({ ...rest });
    };

    const advanceFilterResultProps = {
        filterString,
        extraParams,
        removeFilter,
        handleResetFilter,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={19} lg={19} xl={19} className={styles.subheading}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form colon={false} form={advanceFilterForm} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                            <Form.Item label="Designation Master" initialValue={filterString?.code} name="keyword" rules={[{ validator: searchValidator }]}>
                                                <Search placeholder="Search" allowClear className={styles.headerSearchField} onSearch={onSearchHandle} />
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                        <Button icon={<FilterIcon />} type="link" className={styles.filterBtn} onClick={() => setAdvanceSearchVisible(true)} danger>
                                            Advanced Filters
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>

                            <Col className={styles.addGroup} xs={24} sm={24} md={5} lg={5} xl={5}>
                                <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />
                                <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                    Add Designation
                                </Button>
                            </Col>
                        </Row>
                        <AppliedAdvanceFilter {...advanceFilterResultProps} />
                    </div>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} scroll={2400} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />

            <AddEditForm {...formProps} />
        </>
    );
};

export const DesignationMaster = connect(mapStateToProps, mapDispatchToProps)(DesignationMasterBase);
