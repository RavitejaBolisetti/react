/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';
import { tableColumn } from './tableColumn';
import VehicleReceiptFilter from './VehicleReceiptFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import { VehicleReceiptMainConatiner } from './VehicleReceiptMainConatiner';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { VEHICLE_RECEIPT_STATUS } from 'constants/VehicleReceiptStatus';
import { VEHICLE_RECEIPT_SECTION } from 'constants/VehicleReceiptSection';

import { showGlobalNotification } from 'store/actions/notification';
import { vehicleReceiptDataActions } from 'store/actions/data/vehicleReceipt/vehicleReceipt';
import { vehicleDetailDataActions } from 'store/actions/data/vehicleReceipt/vehicleDetails';
import { PARAM_MASTER } from 'constants/paramMaster';

import { FilterIcon } from 'Icons';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleReceipt: {
                VehicleReceiptSearch: { isLoaded: isSearchDataLoaded = false, isLoading: isOTFSearchLoading, data, filter: filterString },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Receipt';
    let returnValue = {
        userId,
        typeData: typeData[PARAM_MASTER.GRN_STATS.id],
        grnTypeData: typeData[PARAM_MASTER.GRN_TYPE.id],
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        vehicleReceiptStatusList: Object.values(VEHICLE_RECEIPT_STATUS),
        moduleTitle,
        isOTFSearchLoading,
        isSearchDataLoaded,
        filterString,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchVehicleReceiptList: vehicleReceiptDataActions.fetchList,
            setFilterString: vehicleReceiptDataActions.setFilter,
            resetData: vehicleReceiptDataActions.reset,
            saveData: vehicleDetailDataActions.saveData,
            listShowLoading: vehicleReceiptDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleReceiptMasterBase = (props) => {
    const { fetchVehicleReceiptList, saveData, listShowLoading, userId, data, totalRecords, resetData, showGlobalNotification } = props;
    const { typeData, grnTypeData, moduleTitle } = props;
    const { filterString, setFilterString, vehicleReceiptStatusList } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const [listFilterForm] = Form.useForm();
    const [receiptType, setReceiptType] = useState(VEHICLE_RECEIPT_STATUS.IN_TRANSIT.key);
    const [searchValue, setSearchValue] = useState();

    const tableActions = { EyeIcon: false, EditIcon: false, DeleteIcon: false, AddIcon: true };
    const tableActionsFalse = { EyeIcon: false, EditIcon: false, DeleteIcon: false, AddIcon: false };

    const [tableIconsVisibility, setTableIconsVisibility] = useState({ ...tableActions });

    const [selectedRecord, setSelectedRecord] = useState();
    const [selectedId, setSelectedId] = useState();
    const [finalData, setFinalData] = useState([]);

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const dynamicPagination = true;

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        saveAndNewBtn: false,
        saveAndNewBtnClicked: false,
        closeBtn: false,
        cancelBtn: false,
        formBtnActive: false,
        deliveryNote: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [currentItem, setCurrentItem] = useState(VEHICLE_RECEIPT_STATUS?.IN_TRANSIT?.key);

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [formData, setFormData] = useState([]);

    useEffect(() => {
        setFilterString({ ...filterString, pageSize: 10, current: 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: 'status',
                canRemove: false,
                filter: false,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: receiptType,
                name: typeData?.[PARAM_MASTER?.GRN_STATS?.id]?.find((i) => i?.key === receiptType)?.value,
                canRemove: false,
                filter: false,
            },
            {
                key: 'grnNumber',
                title: 'grnNumber',
                value: filterString?.grnNumber,
                name: filterString?.grnNumber,
                // searchValue
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'grnFromDate',
                title: 'Start Date',
                value: filterString?.grnFromDate,
                name: filterString?.grnFromDate ? convertDateTime(filterString?.grnFromDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'grnToDate',
                title: 'End Date',
                value: filterString?.grnToDate,
                name: filterString?.grnToDate ? convertDateTime(filterString?.grnToDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'grnType',
                title: 'GRN Type',
                value: filterString?.grnType,
                name: grnTypeData?.find((i) => i?.key === filterString?.grnType)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: filterString?.sortBy,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: filterString?.sortType,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiptType, searchValue, filterString]);

    useEffect(() => {
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId && extraParams?.find((i) => i.key === 'pageNumber')?.value > 0) {
            setShowDataLoading(true);
            fetchVehicleReceiptList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, receiptType, filterString]);

    useEffect(() => {
        const defaultSection = VEHICLE_RECEIPT_SECTION.SUPPLIER_INVOICE_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(VEHICLE_RECEIPT_SECTION);
        setSection(defaultSection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currentSection && sectionName) {
            const section = Object.values(sectionName)?.find((i) => i.id === currentSection);
            setSection(section);

            const nextSection = Object.values(sectionName)?.find((i) => i?.displayOnList && i.id > currentSection);
            setLastSection(!nextSection?.id);
        }
        form.resetFields();
        form.setFieldsValue(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                record && setSelectedId(record?.supplierInvoiceNumber);
                break;
            case EDIT_ACTION:
                setSelectedRecord(record);
                record && setSelectedId(record?.supplierInvoiceNumber);
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedRecord(record);
                record && setSelectedId(record?.supplierInvoiceNumber);
                defaultSection && setCurrentSection(defaultSection);
                break;
            case NEXT_ACTION:
                const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
                section && setCurrentSection(nextSection?.id);
                setLastSection(!nextSection?.id);
                break;

            default:
                break;
        }

        if (buttonAction !== NEXT_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        }
        setIsFormVisible(true);
    };

    const onFinishSearch = (values) => {};

    const handleResetFilter = (e) => {
        const { pageSize } = filterString;
        setShowDataLoading(false);
        setFilterString({ pageSize, current: 1 });
        advanceFilterForm.resetFields();
    };

    const changeObjtoArr = (data) => {
        const FinalArr = [];
        Object?.entries(data)?.map(([key, value]) => {
            FinalArr.push(value);
            return undefined;
        });
        return FinalArr;
    };

    const onFinish = (values) => {
        const data = { supplierInvoiceNumber: selectedId, vehicleDetails: changeObjtoArr(finalData) };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchVehicleReceiptList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });

            setButtonData({ ...buttonData, formBtnActive: false });

            setIsFormVisible(false);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        form.resetFields();
        form.setFieldsValue();

        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);

        setSelectedRecord();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        dynamicPagination,
        filterString,
        totalRecords,
        setPage: setFilterString,
        tableColumn: tableColumn({ handleButtonClick, tableIconsVisibility }),
        tableData: data,
        showAddButton: false,
        handleAdd: handleButtonClick,
        receiptType,
    };

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
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

    const handleReceiptTypeChange = (buttonName) => {
        setCurrentItem(buttonName?.key);

        const buttonkey = buttonName?.key;

        switch (buttonkey) {
            case VEHICLE_RECEIPT_STATUS?.IN_TRANSIT?.key: {
                setTableIconsVisibility({ ...tableActionsFalse, AddIcon: true, EyeIcon: false });
                break;
            }
            case VEHICLE_RECEIPT_STATUS?.PARTIALLY_RECEIVED?.key: {
                setTableIconsVisibility({ ...tableActionsFalse, EyeIcon: false });
                break;
            }
            case VEHICLE_RECEIPT_STATUS?.RECEIVED?.key: {
                setTableIconsVisibility({ ...tableActionsFalse, EyeIcon: true });
                break;
            }
            case VEHICLE_RECEIPT_STATUS?.RETURNED?.key: {
                setTableIconsVisibility({ ...tableActionsFalse, EyeIcon: true });
                break;
            }
            default: {
                break;
            }
        }
        setReceiptType(buttonkey);
        searchForm.resetFields();
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, grnNumber: value, advanceFilter: true });
        setSearchValue(value);
    };

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        vehicleReceiptStatusList: VEHICLE_RECEIPT_STATUS,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        handleResetFilter,
        advanceFilterForm,
        data,
        setAdvanceSearchVisible,
        typeData,
        searchForm,
        onFinishSearch,
        receiptType,
        handleReceiptTypeChange,
        handleChange,
        handleSearch,
        currentItem,
        setCurrentItem,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,

        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',

        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        vehicleReceiptStatusList,
        grnTypeData,
        onFinishSearch,
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add New ';
        }
    }, [formActionType]);

    const containerProps = {
        record: selectedRecord,
        form,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        tableData: data,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        buttonData,
        setIsFormVisible,
        finalData,
        setFinalData,

        setButtonData,
        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        selectedId,
        setSelectedId,
        selectedRecord,
        setSelectedRecord,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        formData,
        setFormData,
        handleFormValueChange,
        isLastSection,
        typeData,
        saveButtonName: isLastSection ? 'Submit' : 'Next',
        receiptType,
    };

    return (
        <>
            <VehicleReceiptFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <VehicleReceiptMainConatiner {...containerProps} />
        </>
    );
};

export const VehicleReceiptMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleReceiptMasterBase);
