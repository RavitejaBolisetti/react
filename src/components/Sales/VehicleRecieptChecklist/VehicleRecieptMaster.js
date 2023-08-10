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

import { VEHICLE_RECIEPT_CHECKLIST_SECTION } from 'constants/VehicleRecieptCheckListSection';
import { otfvehicleDetailsLovDataActions } from 'store/actions/data/otf/vehicleDetailsLov';

import { formatDateToCalenderDate } from 'utils/formatDateTime';

import { validateRequiredInputField } from 'utils/validation';
import { LANGUAGE_EN } from 'language/en';

import { PARAM_MASTER } from 'constants/paramMaster';
import { FilterIcon } from 'Icons';
import { QueryButtons, QUERY_BUTTONS_CONSTANTS } from './QueryButtons';
import { vehicleReceiptChecklistdataActions } from 'store/actions/data/VehicleReceiptCheckList/VehicleReceiptChecklistMain';
import { vehicleReceiptChecklistProfiledataActions } from 'store/actions/data/VehicleReceiptCheckList/VehicleReceiptChecklistProfile';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            VehicleReceiptChecklist: {
                VehicleReceiptMain: { isLoaded: isChecklistDataLoaded = false, isLoading: isChecklistDataLoading = true, data, filter: filterString },
                VehicleReceiptProfile: { isLoaded: isProfileDataLoaded = false, isLoading: isProfileDataLoading = true, data: ProfileData = [] },
            },
            OTF: {
                VehicleDetailsLov: { isFilteredListLoaded: isModelDataLoaded = false, isLoading: isModelDataLoading, filteredListData: vehicleModelData },
            },
        },
    } = state;
    const moduleTitle = 'Vehicle Receipt Checklist';

    let returnValue = {
        userId,
        isChecklistDataLoaded,
        isChecklistDataLoading,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        moduleTitle,
        filterString,
        isModelDataLoaded,
        isModelDataLoading,
        vehicleModelData,
        isProfileDataLoaded,
        isProfileDataLoading,
        ProfileData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleReceiptChecklistdataActions.fetchList,
            listShowLoading: vehicleReceiptChecklistdataActions.listShowLoading,
            setFilterString: vehicleReceiptChecklistdataActions.setFilter,
            resetData: vehicleReceiptChecklistdataActions.reset,
            saveData: vehicleReceiptChecklistdataActions.saveData,

            fetchModel: otfvehicleDetailsLovDataActions.fetchFilteredList,
            modelLoading: otfvehicleDetailsLovDataActions.listShowLoading,

            fetchProfile: vehicleReceiptChecklistProfiledataActions.fetchList,
            profileLoading: vehicleReceiptChecklistProfiledataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleRecieptChecklistMasterBase = (props) => {
    const { userId, isChecklistDataLoaded, isChecklistDataLoading, data, totalRecords, moduleTitle, filterString } = props;

    const { fetchList, listShowLoading, setFilterString, resetData, saveData, showGlobalNotification } = props;

    const { fetchModel, isModelDataLoaded, isModelDataLoading, vehicleModelData, modelLoading } = props;

    const { fetchProfile, profileLoading, isProfileDataLoaded, isProfileDataLoading, ProfileData } = props;

    const [listFilterForm] = Form.useForm();

    const [selectedRecord, setSelectedRecord] = useState();
    const [selectedRecordId, setSelectedRecordId] = useState();
    const [vehicleReceiptFinalFormData, setvehicleReceiptFinalFormData] = useState({ checklistDetails: {}, supportingDocument: {} });

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

    const handleButtonQuery = (item, keyName) => {
        const buttonkey = item?.key;
        setbuttonType(buttonkey);

        switch (buttonkey) {
            case QUERY_BUTTONS_CONSTANTS?.PENDING?.key: {
                setactionButtonVisibility({ EditIcon: false, EyeIcon: false, DeleteIcon: false, AddIcon: true });
                break;
            }
            case QUERY_BUTTONS_CONSTANTS?.PARTIALLY_COMPLETED?.key: {
                setactionButtonVisibility({ EditIcon: true, EyeIcon: true, DeleteIcon: false, AddIcon: false });
                break;
            }
            case QUERY_BUTTONS_CONSTANTS?.COMPLETED?.key: {
                setactionButtonVisibility({ EditIcon: false, EyeIcon: true, DeleteIcon: false, AddIcon: false });
                break;
            }
            default: {
                setactionButtonVisibility({ EditIcon: false, EyeIcon: false, DeleteIcon: false, AddIcon: true });
            }
        }
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'checklistStatus',
                title: 'checklistStatus',
                value: buttonType,
                name: buttonType,
                canRemove: false,
                filter: false,
            },
            {
                key: 'grnNumber',
                title: 'grnNumber',
                value: filterString?.grnNumber,
                name: filterString?.grnNumber,
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
    }, [filterString, page, buttonType]);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);
    useEffect(() => {
        if (userId && !isModelDataLoaded) {
            fetchModel({ setIsLoading: modelLoading, userId, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isModelDataLoaded]);

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
        setFilterString({
            ...filterString,
            grnNumber: value,
            advanceFilter: true,
        });
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
        if (record?.grnNumber && record?.chassisNumber) {
            const myParams = [
                {
                    key: 'grnNumber',
                    title: 'grnNumber',
                    value: record?.grnNumber,
                },
                {
                    key: 'chassisNumber',
                    title: 'chassisNumber',
                    value: record?.chassisNumber,
                },
            ];
            fetchProfile({ setIsLoading: profileLoading, userId, onSuccessAction, extraParams: myParams });
        }

        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                setSelectedRecord(record);
                break;
            case EDIT_ACTION:
                setSelectedRecord(record);
                record && setSelectedRecordId(record?.grnNumber ?? '');
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedRecord(record);
                record && setSelectedRecordId(record?.grnNumber ?? '');
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
        tableData: data,
        showAddButton: false,
        handleAdd: handleButtonClick,
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
        isLoading: showDataLoading,
        showAddButton: false,
    };
    console.log('filterString', filterString);
    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            if (Object.keys(rest)?.length === 1) setFilterString();
            else setFilterString({ ...rest });
        }
    };

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        filter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        title: <QueryButtons items={QUERY_BUTTONS_CONSTANTS} onClick={handleButtonQuery} currentItem={buttonType} />,
        data,
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

    const vehicleReceiptFormdataProps = {
        vehicleReceiptFinalFormData,
        setvehicleReceiptFinalFormData,
    };

    const containerProps = {
        ...vehicleReceiptFormdataProps,
        isProfileDataLoaded,
        ProfileData,
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
        onFinishSearch,
        vehicleModelData,
        isModelDataLoading,
    };

    return (
        <>
            <AdvanceFilter {...advanceFilterResultProps} />
            <AdvancedSearch {...advanceFilterProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
            <VehicleRecieptMasterMainContainer {...containerProps} />
        </>
    );
};

export const VehicleRecieptMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleRecieptChecklistMasterBase);
