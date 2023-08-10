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
import AdvanceFilter from './AdvanceFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { ListDataTable } from 'utils/ListDataTable';
import { VehicleRecieptMasterMainContainer } from './VehicleRecieptMasterMainContainer';
import { AdvancedSearch } from './AdvancedSearch';
import { showGlobalNotification } from 'store/actions/notification';
import { vehicleDetailDataActions } from 'store/actions/data/vehicle/vehicleDetail';

import { VEHICLE_CHECKLIST_STATUS } from 'constants/VehicleRecieptChecklistStatus';
import { VEHICLE_RECIEPT_CHECKLIST_SECTION } from 'constants/VehicleRecieptCheckListSection';
import { formatDateToCalenderDate } from 'utils/formatDateTime';

import { validateRequiredInputField } from 'utils/validation';
import { LANGUAGE_EN } from 'language/en';

import { PARAM_MASTER } from 'constants/paramMaster';
import { FilterIcon } from 'Icons';
import { QueryButtons, QUERY_BUTTONS_CONSTANTS } from './QueryButtons';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
                VehicleDetail: { data, filter: filterString },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Receipt Checklist';

    let returnValue = {
        userId,
        typeData: typeData[PARAM_MASTER.VH_RECEIT_SER.id],
        isDataLoaded: true,
        data: data?.vehicleSearch,
        totalRecords: data?.totalRecords || [],
        vehicleDetailStatusList: Object.values(VEHICLE_CHECKLIST_STATUS),
        vehicleDetailData: [],
        moduleTitle,
        isLoading: false,
        isDetailLoaded: true,
        filterString,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleDetailDataActions.fetchList,
            fetchDetail: vehicleDetailDataActions.fetchDetail,
            listShowLoading: vehicleDetailDataActions.listShowLoading,
            setFilterString: vehicleDetailDataActions.setFilter,
            resetData: vehicleDetailDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleRecieptChecklistMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, data, totalRecords, vehicleDetailData } = props;
    const { typeData, moduleTitle } = props;
    const { filterString, setFilterString, vehicleDetailStatusList } = props;

    const [listFilterForm] = Form.useForm();

    const [selectedRecord, setSelectedRecord] = useState();
    const [selectedRecordId, setSelectedRecordId] = useState();

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

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        saveAndNewBtn: false,
        saveAndNewBtnClicked: false,
        closeBtn: false,
        cancelBtn: false,
        formBtnActive: false,
        transferBtn: false,
        allotBtn: false,
        unAllotBtn: false,
        invoiceBtn: false,
        deliveryNote: false,
        cancelOtfBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const [formData, setFormData] = useState([]);
    const [otfSearchRules, setOtfSearchRules] = useState({ rules: [validateRequiredInputField('search parametar')] });
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [buttonType, setbuttonType] = useState(QUERY_BUTTONS_CONSTANTS?.PENDING?.key);
    const [actionButtonVisibility, setactionButtonVisibility] = useState({ EditIcon: false, EyeIcon: false, DeleteIcon: false, AddIcon: true });

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };
    const handleButtonQuery = (buttonName) => {
        // setbuttonType(buttonName);
        switch (buttonName) {
            case 'pending': {
                setactionButtonVisibility({ EditIcon: false, EyeIcon: false, DeleteIcon: false, AddIcon: true });
                break;
            }
            case 'partially': {
                setactionButtonVisibility({ EditIcon: true, EyeIcon: true, DeleteIcon: false, AddIcon: false });
                break;
            }
            case 'completed': {
                setactionButtonVisibility({ EditIcon: false, EyeIcon: true, DeleteIcon: false, AddIcon: false });
                break;
            }
            default: {
                break;
            }
        }
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
                name: typeData?.find((i) => i?.key === filterString?.searchType)?.value,
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
                key: 'receiptFromDate',
                title: 'Reciept From Date',
                value: filterString?.receiptFromDate,
                name: filterString?.receiptFromDate,
                canRemove: true,
                filter: true,
            },
            {
                key: 'receipttoDate',
                title: 'Reciept To Date',
                value: filterString?.receipttoDate,
                name: filterString?.receipttoDate,
                canRemove: true,
                filter: true,
            },
            {
                key: 'status',
                title: 'Status',
                value: filterString?.status,
                name: vehicleDetailStatusList?.find((i) => i?.title === filterString?.status)?.desc,
                canRemove: true,
                filter: true,
            },
            {
                key: 'model',
                title: 'Model',
                value: filterString?.model,
                name: filterString?.model,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: page?.pageSize,
                canRemove: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: page?.current,
                canRemove: true,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: page?.sortBy,
                canRemove: true,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: page?.sortType,
                canRemove: true,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, page]);

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    useEffect(() => {
        return () => {
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const defaultSection = VEHICLE_RECIEPT_CHECKLIST_SECTION.CHECKLIST_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(VEHICLE_RECIEPT_CHECKLIST_SECTION);
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

    useEffect(() => {
        if (isAdvanceSearchVisible && filterString) {
            const { receiptFromDate, receipttoDate } = filterString;
            advanceFilterForm.setFieldsValue({ ...filterString, receiptFromDate: formatDateToCalenderDate(receiptFromDate), receipttoDate: formatDateToCalenderDate(receipttoDate) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdvanceSearchVisible, filterString]);

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
    };
    const handleSearchChange = (value) => {
        const searchValue = value?.trim();
        if (!searchValue) {
            return;
        }
        searchForm.resetFields();
    };

    const handleResetFilter = (e) => {
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString();
        advanceFilterForm.resetFields();
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                break;
            case EDIT_ACTION:
                setSelectedRecord(record);
                record && setSelectedRecordId(record?.vin || record?.vehicleIdentificationNumber);
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedRecord(record);
                record && setSelectedRecordId(record?.vin || record?.vehicleIdentificationNumber);
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
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, orderStatus: record?.orderStatus }));
        }
        setIsFormVisible(true);
    };

    const onFinishSearch = (values) => {};

    const onFinish = (values) => {
        const recordId = formData?.parentId || form.getFieldValue('parentId');
        let data = { ...values, parentId: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

            setButtonData({ ...buttonData, formBtnActive: false });

            setIsFormVisible(false);
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
        return;
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        form.resetFields();
        form.setFieldsValue();
        setSelectedRecord();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        setPage,
        tableColumn: tableColumn({ handleButtonClick, actionButtonVisibility }),
        tableData: [{}],
        showAddButton: false,
        handleButtonClick,
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
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

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        vehicleDetailStatusList,
        advanceFilter: true,
        filter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        title: <QueryButtons items={QUERY_BUTTONS_CONSTANTS} handleButtonQuery={handleButtonQuery} />,
        data,
        typeData,
        otfSearchRules,
        setOtfSearchRules,
        searchForm,
        onFinishSearch,
        handleResetFilter,
        isAdvanceSearchVisible,
        setAdvanceSearchVisible,
        handleSearchChange,
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
        setIsFormVisible,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        tableData: data,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        selectedRecordId,
        setSelectedRecordId,
        selectedRecord,
        setSelectedRecord,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        setFormData,
        handleFormValueChange,
        isLastSection,
        typeData,
        vehicleDetailData,
        saveButtonName: isLastSection ? 'Submit' : 'Save & Next',
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
        typeData,
        onFinishSearch,
    };

    return (
        <>
            <AdvanceFilter {...advanceFilterResultProps} />
            <AdvancedSearch {...advanceFilterProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <VehicleRecieptMasterMainContainer {...containerProps} />
        </>
    );
};

export const VehicleRecieptMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleRecieptChecklistMasterBase);