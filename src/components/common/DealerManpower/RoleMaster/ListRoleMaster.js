import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';

import { dealerManpowerDivisionMasterDataActions } from 'store/actions/data/dealerManpower/dealerDivisionMaster';
import { dealerManpowerEmployeeDepartmentDataActions } from 'store/actions/data/dealerManpower/dealerEmployeeDepartmentMaster';
import { roleMasterDataActions } from 'store/actions/data/dealerManpower/roleMaster';

import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { showGlobalNotification } from 'store/actions/notification';

import { ListDataTable } from 'utils/ListDataTable';
import { filterFunction } from 'utils/filterFunction';
import { btnVisiblity } from 'utils/btnVisiblity';
import { AddEditForm } from './AddEditForm';
import { AdvancedSearch } from './AdvancedSearch';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';

import { FilterIcon } from 'Icons';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            DealerManpower: {
                DealerDivisionMaster: { isFilteredListLoaded: isDivisionDataLoaded = false, isLoading: isDivisionLoading, filteredListData: divisionData = [] },
                DealerEmployeeDepartmentMaster: { isFilteredListLoaded: isDepartmentDataLoaded = false, isLoading: isDepartmentLoading, filteredListData: departmentData = [] },
                RoleMaster: { isLoaded: isDataLoaded = false, isLoading, data },
            },
        },
    } = state;

    const moduleTitle = 'Role Master';

    let returnValue = {
        userId,
        isDataLoaded,
        data,

        isDivisionDataLoaded,
        isDivisionLoading,
        divisionData,

        isDepartmentDataLoaded,
        isDepartmentLoading,
        departmentData,

        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchDivisionLovList: dealerManpowerDivisionMasterDataActions.fetchFilteredList,
            listDivisionShowLoading: dealerManpowerDivisionMasterDataActions.listShowLoading,
            fetchDepartmentLovList: dealerManpowerEmployeeDepartmentDataActions.fetchFilteredList,
            listDepartmentShowLoading: dealerManpowerEmployeeDepartmentDataActions.listShowLoading,
            fetchList: roleMasterDataActions.fetchList,
            saveData: roleMasterDataActions.saveData,
            listShowLoading: roleMasterDataActions.listShowLoading,
            resetData: roleMasterDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const ListRoleMasterBase = (props) => {
    const { data, saveData, fetchList, resetData, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;
    const { isDivisionDataLoaded, listDivisionShowLoading, fetchDivisionLovList, isDivisionLoading, divisionData } = props;
    const { isDepartmentDataLoaded, listDepartmentShowLoading, fetchDepartmentLovList, isDepartmentLoading, departmentData } = props;

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [filteredDepartmentData, setFilteredDepartmentData] = useState([]);

    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [page, setPage] = useState(1);

    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

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
        if (userId) {
            if (!isDivisionDataLoaded) {
                fetchDivisionLovList({ setIsLoading: listDivisionShowLoading, userId });
            }

            if (!isDepartmentDataLoaded) {
                fetchDepartmentLovList({ setIsLoading: listDepartmentShowLoading, userId });
            }

            if (!isDataLoaded) {
                fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDivisionDataLoaded, isDepartmentDataLoaded, isDataLoaded]);

    useEffect(() => {
        if (isDataLoaded && data && userId && filterString) {
            const keyword = filterString?.code ? filterString?.code : filterString?.keyword;
            const division = filterString?.divisionCode;
            const department = filterString?.departmentCode;
            const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.roleDescription) : true) && (division ? filterFunction(division)(item?.divisionCode) : true) && (department ? filterFunction(department)(item?.departmentCode) : true));
            setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
            setShowDataLoading(false);
        } else {
            setSearchdata(data?.map((el, i) => ({ ...el, srl: i + 1 })));
            setShowDataLoading(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, data, userId]);

    const extraParams = [
        {
            key: 'divisionCode',
            title: 'Division Name',
            value: filterString?.divisionCode,
            name: divisionData?.find((i) => i?.key === filterString?.divisionCode)?.value,
            canRemove: true,
        },
        {
            key: 'departmentCode',
            title: 'Department Name',
            value: filterString?.departmentCode,
            name: departmentData?.find((i) => i?.key === filterString?.departmentCode)?.value,
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

    useEffect(() => {
        if (userId && filterString) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams: extraParams, onSuccessAction });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, userId]);

    useEffect(() => {
        if (userId && refershData) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams: extraParams, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

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
        }
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            const filterValue = type === 'text' ? value.target.value : value;

            if (name === 'code') {
                setFilteredDepartmentData(departmentData?.filter((i) => i?.patentKey === filterValue));
                advanceFilterForm.setFieldsValue({ departmentCode: undefined });
            }
        };

    const onFinish = (values) => {
        let data = { ...values };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

            setButtonData({ ...buttonData, formBtnActive: false });
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

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add ';
        }
    }, [formActionType]);

    const formProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,

        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat('Role'),
        tableData: searchData,

        isDivisionDataLoaded,
        divisionData,

        isDepartmentDataLoaded,
        departmentData,

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
        setFilterString();
        resetData();
        listFilterForm.resetFields();
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,

        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        resetData,
        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        divisionData,
        departmentData,
        handleFilterChange,
        isDivisionDataLoaded,
        isDivisionLoading,
        isDepartmentDataLoaded,
        isDepartmentLoading,
        filteredDepartmentData,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
    };

    const removeFilter = (key) => {
        if (key === 'divisionCode') {
            const { divisionCode, departmentCode, ...rest } = filterString;
            if (!filterString?.keyword) {
                setFilterString();
            } else {
                setFilterString({ ...rest });
            }
        } else if (key === 'departmentCode') {
            const { departmentCode, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            advanceFilterForm.setFieldsValue({ keyword: undefined, divisionCode: undefined });
            if (!filterString?.keyword && !filterString?.divisionCode && !filterString?.departmentCode) {
                setFilterString();
            } else {
                setFilterString({ ...rest });
            }
        }
    };

    const title = 'Role Name';
    const advanceFilterResultProps = {
        advanceFilter: true,
        filterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
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

export const ListRoleMaster = connect(mapStateToProps, mapDispatchToProps)(ListRoleMasterBase);
