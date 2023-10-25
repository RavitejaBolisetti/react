/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { bindActionCreators } from 'redux';

import { financialAccountHeadDataActions } from 'store/actions/data/financialAccounting/financialAccountHead';
import { documentTypeLedgerDataActions } from 'store/actions/data/financialAccounting/documentTypeLedger';
import { tncProductHierarchyDataActions } from 'store/actions/data/termsConditions/tncProductHierarchy';
import { dealerManpowerDesignationMasterDataActions } from 'store/actions/data/dealerManpower/designationMaster';
import { roleMasterDataActions } from 'store/actions/data/dealerManpower/roleMaster';
import { vehicleAllotPriorityActions } from 'store/actions/data/vehicle/vehicleAllotmentPriorityAction';
import { vehicleAllotPrioritySaveActions } from 'store/actions/data/vehicle/vehicleAllotPriorityAllotAction';
import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { tableColumn } from './tableColumn';
import { AdvancedSearch } from './AdvancedSearch';
import AdvanceVehicleAllotMasterFilter from './AdvanceVehicleAllotMasterFilter';

import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { ListDataTable } from 'utils/ListDataTable';
import { btnVisiblity } from 'utils/btnVisiblity';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            TermCondition: {
                ProductHierarchyData: { data: productHierarchyList },
            },
            Vehicle: {
                VehicleAllotPriorityDetail: { data: vehicleAllotData, filter: filterString },
                VehicleAllotPriorDetail: { data: viewVehicleAllotData },
            },
            DealerManpower: {
                RoleMaster: { filteredListData: roleData = [] },
                DesignationMaster: { data },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Allotment Priority Master';
    let returnValue = {
        userId,
        moduleTitle,
        typeData: typeData,
        totalRecords: vehicleAllotData?.totalRecords,
        productHierarchyList,
        vehicleAllotData,
        viewVehicleAllotData,
        filterString,
        roleData,
        data,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchDocTypeLedger: documentTypeLedgerDataActions.fetchList,
            listShowLoadingDocTypeLedger: documentTypeLedgerDataActions.listShowLoading,
            saveData: documentTypeLedgerDataActions.saveData,

            fetchProductList: tncProductHierarchyDataActions.fetchList,
            listShowLoading: tncProductHierarchyDataActions.listShowLoading,

            fetchVehicleList: vehicleAllotPrioritySaveActions.fetchList,
            saveDataAllot: vehicleAllotPrioritySaveActions.saveData,
            resetData: vehicleAllotPrioritySaveActions.reset,
            listShowAllotLoading: vehicleAllotPrioritySaveActions.listShowLoading,

            fetchFinancialAccountHead: financialAccountHeadDataActions.fetchList,

            fetchVehicleAllotList: vehicleAllotPriorityActions.fetchList,
            resetDataList: vehicleAllotPriorityActions.reset,

            fetchList: dealerManpowerDesignationMasterDataActions.fetchList,
            listShowLoadingDesignation: dealerManpowerDesignationMasterDataActions.listShowLoading,

            fetchRoleLovList: roleMasterDataActions.fetchFilteredList,
            listShowLoadingRole: roleMasterDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleAllotmentPriorityMasterMain = (props) => {
    const { moduleTitle, userId, showGlobalNotification, typeData, taxChargeCategoryTypeData, totalRecords } = props;
    const { fetchProductList, productHierarchyList, listShowLoading, listShowAllotLoading, saveDataAllot } = props;
    const { resetDataList, vehicleAllotData, fetchVehicleAllotList, fetchVehicleList, viewVehicleAllotData } = props;
    const { data, fetchList, roleData, fetchRoleLovList } = props;

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [refershData, setRefershData] = useState(false);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [filterDesignationList, setFilterDesignationList] = useState();

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const [editForm] = Form.useForm();
    const [notificationDetailForm] = Form.useForm();
    const [formEdit, setFormEdit] = useState(false);
    const [docTypeHeadMappingList, setDocTypeHeadMappingList] = useState([]);
    const [dropdownItems, setDropdownItems] = useState([]);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [filterDesignationDropdownList, setFilterDesignationDropdownList] = useState();

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        searchForm.resetFields();
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (filterString) {
            setPage({ ...page, current: 1 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    useEffect(() => {
        if (userId) {
            fetchProductList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const matchDesignationList = [];

    const handleRoleFunction = (value) => {
        const designationArray = data;
        designationArray.forEach((item) => {
            if (item.roleCode === value) {
                matchDesignationList.push(item);
            }
        });
        if (matchDesignationList.length > 0) {
            setFilterDesignationList(matchDesignationList);
            setFilterDesignationDropdownList(matchDesignationList);
        } else {
            notificationDetailForm.setFieldValue('designationCode', undefined);
            setFilterDesignationList();
            onErrorAction('Designations are not exist.');
        }
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
                name: typeData?.['VEH_PR_MOD_GR']?.find((i) => i?.key === filterString?.searchType)?.value,
                canRemove: false,
                filter: true,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: filterString?.searchParam,
                name: filterString?.searchParam,
                canRemove: true,
                filter: true,
            },
            {
                key: 'oldModelGroup',
                title: 'Old Model',
                value: filterString?.oldModelGroup,
                name: productHierarchyList?.find((i) => i?.prodctCode === filterString?.oldModelGroup)?.prodctShrtName,
                canRemove: true,
                filter: true,
            },
            {
                key: 'newModelGroup',
                title: 'New Model',
                value: filterString?.newModelGroup,
                name: productHierarchyList?.find((i) => i?.prodctCode === filterString?.newModelGroup)?.prodctShrtName,
                canRemove: true,
                filter: true,
            },
            {
                key: 'effectiveFromDate',
                title: 'From Date',
                value: filterString?.effectiveFromDate,
                name: filterString?.effectiveFromDate,
                canRemove: true,
                filter: true,
            },
            {
                key: 'effectiveToDate',
                title: 'To Date',
                value: filterString?.effectiveToDate,
                name: filterString?.effectiveToDate,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: page?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: page?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: page?.sortBy,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: page?.sortType,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, page]);

    useEffect(() => {
        return () => {
            resetDataList();
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchVehicleAllotList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    useEffect(() => {
        if (userId) {
            fetchRoleLovList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        if (buttonAction === 'view') {
            setButtonData({ ...defaultBtnVisiblity, editBtn: false, closeBtn: true });
        }
        if (buttonAction === 'add') {
            setButtonData({ ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: false, closeBtn: true });
        }
        record && setFormData(record);
        setIsFormVisible(true);
        setFormBtnActive(false);
    };

    useEffect(() => {
        if (userId && formData.id) {
            const extraParams = [
                {
                    key: 'id',
                    title: 'id',
                    value: formData.id,
                    name: 'vehicle Allot Id',
                },
            ];
            fetchVehicleList({ setIsLoading: listShowLoading, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, formData]);

    const onFinish = (values) => {
        const reqdata = { ...values, id: formData?.id || '', roleData: docTypeHeadMappingList };
        if (reqdata?.roleData?.length <= 0) {
            onErrorAction('Please select role and designation.');
            return false;
        }

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            setIsFormVisible(false);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchVehicleAllotList({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction });

            setButtonData({ ...buttonData, formBtnActive: false });
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: reqdata,
            method: reqdata?.roleData?.find((i) => i?.id) ? 'put' : 'post',
            setIsLoading: listShowAllotLoading,
            userId,
            onError,
            onSuccess,
        };
        saveDataAllot(requestData);
    };

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };
    const handleResetFilter = (e) => {
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString();
        advanceFilterForm.resetFields();
    };
    const onCloseAction = () => {
        setFormEdit(false);
        form.resetFields();
        notificationDetailForm.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        setDocTypeHeadMappingList(() => []);
        setDropdownItems(() => []);
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: false, keyword: value });
        }
    };

    const handleClearInSearch = (e) => {
        if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
        } else if (e.target.value.length > 2) {
            listFilterForm.validateFields(['code']);
        }
    };

    const handleReferesh = () => {
        setRefershData(!refershData);
    };

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
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
        setFilterString,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
        taxChargeCategoryTypeData,
        editForm,
        notificationDetailForm,
        formEdit,
        setFormEdit,
        docTypeHeadMappingList,
        setDocTypeHeadMappingList,
        dropdownItems,
        setDropdownItems,
        isFormBtnActive,
        typeData,
        productHierarchyList,
        viewVehicleAllotData,
        handleRoleFunction,
        data,
        fetchList,
        roleData,
        fetchRoleLovList,
        filterDesignationList,
        setFilterDesignationList,
        matchDesignationList,
        filterDesignationDropdownList,
        setFilterDesignationDropdownList,
    };

    const title = 'Vehicle Allotment List';

    const advanceFilterResultProps = {
        advanceFilter: true,
        otfFilter: true,
        filterString,
        from: listFilterForm,
        onSearchHandle,
        handleClearInSearch,
        handleReferesh,
        handleButtonClick,
        title,
        extraParams,
        setFilterString,
        onFinish,
        advanceFilterForm,
        setAdvanceSearchVisible,
        typeData: typeData?.['VEH_PR_MOD_GR'],
        searchForm,
        removeFilter,
        handleResetFilter,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        titleOverride: 'Advance Filters',

        filterString,
        setFilterString,
        advanceFilterForm,
        handleResetFilter,
        onSearchHandle,
        setAdvanceSearchVisible,
        productHierarchyList,
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        tableColumn: tableColumn(handleButtonClick),
        tableData: vehicleAllotData?.paginationData,
        showAddButton: false,
    };

    return (
        <>
            <AdvanceVehicleAllotMasterFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} handleAdd={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const VehicleAllotmentPriorityMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleAllotmentPriorityMasterMain);
