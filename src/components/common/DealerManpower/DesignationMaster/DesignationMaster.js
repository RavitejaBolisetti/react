/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { dealerManpowerDesignationMasterDataActions } from 'store/actions/data/dealerManpower/designationMaster';
import { dealerManpowerDivisionMasterDataActions } from 'store/actions/data/dealerManpower/dealerDivisionMaster';
import { dealerManpowerEmployeeDepartmentDataActions } from 'store/actions/data/dealerManpower/dealerEmployeeDepartmentMaster';
import { MileSkillDataactions } from 'store/actions/data/dealerManpower/mileSkill';

import { roleMasterDataActions } from 'store/actions/data/dealerManpower/roleMaster';
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { showGlobalNotification } from 'store/actions/notification';
import { filterFunction } from 'utils/filterFunction';
import { btnVisiblity } from 'utils/btnVisiblity';

import { AddEditForm } from './AddEditForm';
import { AdvancedSearch } from './AdvancedSearch';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { ListDataTable } from 'utils/ListDataTable';

import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            DealerManpower: {
                DealerDivisionMaster: { isFilteredListLoaded: isDivisionDataLoaded = false, isLoading: isDivisionLoading, filteredListData: divisionData = [] },
                DealerEmployeeDepartmentMaster: { isFilteredListLoaded: isDepartmentDataLoaded = false, isLoading: isDepartmentLoading, filteredListData: departmentData = [] },
                RoleMaster: { isFilteredListLoaded: isRoleDataLoaded = false, isLoading: isRoleLoading, filteredListData: roleData = [] },
                DesignationMaster: { isLoaded: isDataLoaded = false, isLoading, data },
                MileSkill: { isFilteredListLoaded: isMileDataLoaded = false, isLoading: isMileLoading, filteredListData: mileData },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    const moduleTitle = translateContent('designationMaster.heading.mainTitle');

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
        typeData,

        isMileDataLoaded,
        isMileLoading,
        mileData,
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

            fetchDivisionLovList: dealerManpowerDivisionMasterDataActions.fetchFilteredList,
            listDivisionShowLoading: dealerManpowerDivisionMasterDataActions.listShowLoading,

            fetchDepartmentLovList: dealerManpowerEmployeeDepartmentDataActions.fetchFilteredList,
            listDepartmentShowLoading: dealerManpowerEmployeeDepartmentDataActions.listShowLoading,

            fetchRoleLovList: roleMasterDataActions.fetchFilteredList,
            listRoleShowLoading: roleMasterDataActions.listShowLoading,

            resetData: dealerManpowerDesignationMasterDataActions.reset,

            fetchMileSkill: MileSkillDataactions.fetchFilteredList,
            MileLoading: MileSkillDataactions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const DesignationMasterBase = (props) => {
    const { data, saveData, fetchRoleLovList, resetData, roleData, isDivisionLoading, isRoleDataLoaded, fetchList, fetchDepartmentLovList, isDepartmentDataLoaded, departmentData, divisionData, fetchDivisionLovList, isDivisionDataLoaded, isDepartmentLoading, isRoleLoading, userId, isDataLoaded, listShowLoading, showGlobalNotification, typeData } = props;

    const { mileData, fetchMileSkill } = props;

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);

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
        refershData && showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };
    const LoadDependentData = () => {
        fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        fetchDivisionLovList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        fetchDepartmentLovList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        fetchRoleLovList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        fetchMileSkill({ setIsLoading: listShowLoading, userId, onSuccessAction });
    };
    useEffect(() => {
        if (userId) {
            LoadDependentData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

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
                const division = filterString?.code;
                const department = filterString?.departmentCode;
                const role = filterString?.roleCode;
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.designationDescription) : true) && (division ? filterFunction(division)(item?.divisionCode) : true) && (department ? filterFunction(department)(item?.departmentCode) : true) && (role ? filterFunction(role)(item?.roleCode) : true));
                setSearchdata(filterDataItem);
                setShowDataLoading(false);
            } else {
                setSearchdata(data);
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
            name: divisionData?.find((i) => i?.key === filterString?.code)?.value,
            canRemove: true,
        },
        {
            key: 'departmentCode',
            title: 'department',
            value: filterString?.departmentCode,
            name: filteredDepartmentData?.find((i) => i?.key === filterString?.departmentCode)?.value,
            canRemove: true,
        },
        {
            key: 'roleCode',
            title: 'role',
            value: filterString?.roleCode,
            name: filteredRoleData?.find((i) => i?.key === filterString?.roleCode)?.value,
            canRemove: true,
        },
        {
            key: 'keyword',
            title: 'keyword',
            value: filterString?.keyword,
            name: filterString?.keyword,
            canRemove: true,
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
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: true, keyword: value });
            listFilterForm.setFieldsValue({ code: undefined });
        }
    };

    const handleClearInSearch = (e) => {
        if (e.target.value.length > 2) {
            listFilterForm.validateFields(['code']);
        } else if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
            setShowDataLoading(false);
        }
    };
    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            const filterValue = type === 'text' ? value.target.value : value;

            if (name === 'code') {
                setFilteredDepartmentData(departmentData?.filter((i) => i?.parentKey === filterValue));
                advanceFilterForm.setFieldsValue({ departmentCode: undefined });
                advanceFilterForm.setFieldsValue({ roleCode: undefined });
                setFilteredRoleData(undefined);
            }

            if (name === 'departmentCode') {
                setFilteredRoleData(roleData?.filter((i) => i?.parentKey === filterValue));
                advanceFilterForm.setFieldsValue({ roleCode: undefined });
            }
        };

    const onFinish = (values) => {
        let data = { ...values };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            LoadDependentData();
            setButtonData({ ...buttonData, formBtnActive: false });
            setFormData();
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
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

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return translateContent('global.drawerTitle.view');
        } else if (formActionType?.editMode) {
            return translateContent('global.drawerTitle.edit');
        } else {
            return translateContent('global.drawerTitle.add');
        }
    }, [formActionType]);

    const formProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(translateContent('designationMaster.heading.drawerTitle')),
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
        typeData,
        mileData,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: searchData,
    };

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
        setFilteredDepartmentData([]);
        setFilteredRoleData([]);
    };

    const handleResetFilter = () => {
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
        setFilterString();
        setFilteredDepartmentData(undefined);
        setFilteredRoleData(undefined);
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        setAdvanceSearchVisible,
        //icon: <FilterIcon size={20} />,
        titleOverride: translateContent('designationMaster.heading.titleOverride'),
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
        if (key === 'code') {
            setFilterString(undefined);
        } else if (key === 'departmentCode') {
            const { departmentCode, roleCode, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'roleCode') {
            const { roleCode, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            advanceFilterForm.setFieldsValue({ keyword: undefined, code: undefined });
            if (!rest?.departmentCode && !rest?.roleCode && !rest?.keyword) {
                setFilterString();
            } else {
                setFilterString({ ...rest });
            }
        }
    };

    const title = translateContent('designationMaster.heading.title');

    const advanceFilterResultProps = {
        advanceFilter: true,
        filterString,
        from: listFilterForm,
        onFinish,
        extraParams,
        removeFilter,
        handleResetFilter,
        onSearchHandle,
        handleClearInSearch,

        setAdvanceSearchVisible,
        handleReferesh,
        handleButtonClick,
        advanceFilterProps,
        title,
        tableData: searchData,
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} handleAdd={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />

            <AddEditForm {...formProps} />
        </>
    );
};

export const DesignationMaster = connect(mapStateToProps, mapDispatchToProps)(DesignationMasterBase);
