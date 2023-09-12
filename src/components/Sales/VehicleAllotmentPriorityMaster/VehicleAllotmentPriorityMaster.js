/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { bindActionCreators } from 'redux';

import { FilterIcon } from 'Icons';
import { financialAccountHeadDataActions } from 'store/actions/data/financialAccounting/financialAccountHead';
import { documentTypeLedgerDataActions } from 'store/actions/data/financialAccounting/documentTypeLedger';
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
// import { BASE_URL_DOCUMENT_TYPE_LEDGER_SEARCH as customURL } from 'constants/routingApi';

import { showGlobalNotification } from 'store/actions/notification';
import { ListDataTable } from 'utils/ListDataTable';
import { btnVisiblity } from 'utils/btnVisiblity';
import { AddEditForm } from './AddEditForm';
import AdvanceVehicleAllotMasterFilter from './AdvanceVehicleAllotMasterFilter';
import { AdvancedSearch } from './AdvancedSearch';
import { ChangeHistory } from './ChangeHistory';
import { tncProductHierarchyDataActions } from 'store/actions/data/termsConditions/tncProductHierarchy';
import { dealerManpowerDesignationMasterDataActions } from 'store/actions/data/dealerManpower/designationMaster';
import { roleMasterDataActions } from 'store/actions/data/dealerManpower/roleMaster';
import { vehicleAllotPriorityActions } from 'store/actions/data/vehicle/vehicleAllotmentPriorityAction';
import { vehicleAllotPrioritySaveActions } from 'store/actions/data/vehicle/vehicleAllotPriorityAllotAction';


const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            FinancialAccounting: {
                // DocumentTypeLedger: { isLoaded: isDocumentTypeLedgerLoaded = false, isLoading: isDocumentTypeLedgerLoading = false, data: docTypeLedgerData = [] },
                // FinancialAccountHead: { isLoaded: isFinancialAccountHeadLoaded = false, data: financialAccount = [] },
            },
            TermCondition: {
                ProductHierarchyData: { data: productHierarchyList },
            },
            Vehicle: {
                VehicleAllotPriorityDetail: { data:vehicleAllotData, filter: filterString },                
                VehicleAllotPriorDetail: { data:viewVehicleAllotData },
            },
            DealerManpower: {
                // DealerDivisionMaster: { isFilteredListLoaded: isDivisionDataLoaded = false, isLoading: isDivisionLoading, filteredListData: divisionData = [] },
                // DealerEmployeeDepartmentMaster: { isFilteredListLoaded: isDepartmentDataLoaded = false, isLoading: isDepartmentLoading, filteredListData: departmentData = [] },
                RoleMaster: { filteredListData: roleData = [] },
                DesignationMaster: { data },
                // MileSkill: { isFilteredListLoaded: isMileDataLoaded = false, isLoading: isMileLoading, filteredListData: mileData },
            },
        
        },
    } = state;

    const moduleTitle = 'Vehicle Allotment Priority Master';
    const ChangeHistoryTitle = 'Vehicle Priority Master History ';

    let returnValue = {
        userId,
        moduleTitle,
        // isDocumentTypeLedgerLoaded,
        // isDocumentTypeLedgerLoading,
        // isFinancialAccountHeadLoaded,
        typeData: typeData,    
        // financialAccount,
        // docTypeLedgerData: docTypeLedgerData?.paginationData,
        // totalRecords: docTypeLedgerData?.totalRecords,
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
            resetData:vehicleAllotPrioritySaveActions.reset,
            listShowAllotLoading: vehicleAllotPrioritySaveActions.listShowLoading,

            fetchFinancialAccountHead: financialAccountHeadDataActions.fetchList,

            fetchVehicleAllotList: vehicleAllotPriorityActions.fetchList,
            resetDataList:vehicleAllotPriorityActions.reset,

            fetchList: dealerManpowerDesignationMasterDataActions.fetchList,
            // saveData: dealerManpowerDesignationMasterDataActions.saveData,
            listShowLoadingDesignation: dealerManpowerDesignationMasterDataActions.listShowLoading,

            fetchRoleLovList: roleMasterDataActions.fetchFilteredList,
            listShowLoadingRole: roleMasterDataActions.listShowLoading,

            // listShowLoadingVAP: vehicleAllotPriorityActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleAllotmentPriorityMasterMain = (props) => {
    const { moduleTitle, ChangeHistoryTitle, saveData, userId, showGlobalNotification, typeData, taxChargeCategoryTypeData, totalRecords, } = props;
    const {fetchProductList, productHierarchyList, listShowLoading, listShowAllotLoading, saveDataAllot,} = props;
    const { resetDataList,vehicleAllotData, fetchVehicleAllotList, fetchVehicleList,viewVehicleAllotData,} = props;
    const { data, fetchList, roleData, fetchRoleLovList, } = props;
    // const { filterString, setFilterString, resetDataList} = props;
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
    const [ChangeHistoryVisible, setChangeHistoryVisible] = useState(false);

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
        // let obj = {
        //     chargeCode: null,
        //     chargeDescription: null,
        // };
        // if (formEdit) {
        //     editForm?.setFieldsValue(obj);
        // } else {
        //     taxChargeCalForm?.setFieldsValue(obj);
        // }    
        const designationArray = data;
        designationArray.forEach((item) => {
            if (item.roleCode === value) {                        
                matchDesignationList.push(item);                  
            } else {
                notificationDetailForm.setFieldValue('designationCode', undefined );
            }
        });
        setFilterDesignationList(matchDesignationList);
        console.log('setFilterDesignationList',filterDesignationList);
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
                name: filterString?.oldModelGroup,
                canRemove: false,
                filter: false,
            },
            {
                key: 'newModelGroup',
                title: 'New Model',
                value: filterString?.newModelGroup,
                name: filterString?.newModelGroup,
                canRemove: false,
                filter: false,
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
            fetchRoleLovList({setIsLoading: listShowLoading, userId, onSuccessAction });
            fetchList({setIsLoading: listShowLoading, userId, onSuccessAction });
        }
    }, [userId]);
     
    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
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
    }, [userId, formData] ); 


    const onFinish = (values) => {
        console.log('docTypeHeadMappingList',docTypeHeadMappingList);
        // const recordId = formData?.id || '';
        const tempdata = { ...values, id: formData?.id || '', roleData: docTypeHeadMappingList };
        const { applicationName, documentTypeName, documentTypeCode, ...data } = tempdata;
        const onSuccess = (res) => {
            console.log('res',res);
            form.resetFields();
            setShowDataLoading(true);
            setIsFormVisible(false);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            setButtonData({ ...buttonData, formBtnActive: false });             
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: data?.roleData?.find((i) => i?.id) ? 'put' : 'post',
            setIsLoading: listShowAllotLoading,
            userId,
            onError,
            onSuccess,
        };
        saveDataAllot(requestData);
        
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
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
        setAdvanceSearchVisible(false);
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

    // const handleResetFilter = () => {
    //     setFilterString();
    //     advanceFilterForm.resetFields();
    // };

    const handleChangeHistory = () => {
        setChangeHistoryVisible(true);
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
        // financialAccount,
        typeData,
        productHierarchyList,
        viewVehicleAllotData,
        handleRoleFunction,
        data, fetchList, roleData, fetchRoleLovList,
        filterDesignationList,
        setFilterDesignationList,
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
        onFinishFailed,
        advanceFilterForm,
        setAdvanceSearchVisible,
        typeData: typeData?.['VEH_PR_MOD_GR'],    
        searchForm,
        handleChangeHistory,
        removeFilter,
        handleResetFilter,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',

        filterString,
        setFilterString,
        advanceFilterForm,
        // resetData,
        handleResetFilter,
        onSearchHandle,
        setAdvanceSearchVisible,
        productHierarchyList,
    };

    const ChangeHistoryProps = {
        isVisible: ChangeHistoryVisible,
        onCloseAction: () => {
            setChangeHistoryVisible(false);
        },
        titleOverride: ChangeHistoryTitle,
        formData,
        setIsFormVisible,
        buttonData,
        ChangeHistoryTitle,
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        // isLoading: showDataLoading,
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
            <ChangeHistory {...ChangeHistoryProps} />
        </>
    );
};

export const VehicleAllotmentPriorityMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleAllotmentPriorityMasterMain);

