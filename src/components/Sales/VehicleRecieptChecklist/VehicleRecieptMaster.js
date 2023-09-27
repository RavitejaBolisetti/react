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

import { formatDateToCalenderDate, convertDateTime, dateFormatView } from 'utils/formatDateTime';

import { validateRequiredInputField } from 'utils/validation';
import { LANGUAGE_EN } from 'language/en';

import { FilterIcon } from 'Icons';
import { QueryButtons, QUERY_BUTTONS_CONSTANTS } from './QueryButtons';
import { vehicleReceiptChecklistdataActions } from 'store/actions/data/VehicleReceiptCheckList/VehicleReceiptChecklistMain';
import { vehicleReceiptChecklistProfiledataActions } from 'store/actions/data/VehicleReceiptCheckList/VehicleReceiptChecklistProfile';
import { VehicleCheclistDetailsdataActions } from 'store/actions/data/VehicleReceiptCheckList/VehicleReceiptChecklistMaster';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            VehicleReceiptChecklist: {
                VehicleReceiptMain: { isLoaded: isChecklistDataLoaded = false, isLoading: isChecklistDataLoading = true, data, filter: filterString },
                VehicleReceiptProfile: { isLoaded: isProfileDataLoaded = false, isLoading: isProfileDataLoading = false, data: ProfileData = [] },
                VehicleReceiptMaster: { data: ChecklistData = [] },
            },
            OTF: {
                VehicleDetailsLov: { isFilteredListLoaded: isModelDataLoaded = false, isLoading: isModelDataLoading, filteredListData: vehicleModelData },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ProductHierarchy: { isFilteredListLoaded: isProductHierarchyDataLoaded = false, isLoading: isProductHierarchyLoading, filteredListData: VehicleLovCodeData = [] },
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
        ChecklistData: ChecklistData['supportingDocumentList'],
        typeData: typeData['CHK_STATS'],

        isProductHierarchyDataLoaded,
        isProductHierarchyLoading,
        VehicleLovCodeData,
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
            saveData: VehicleCheclistDetailsdataActions.saveData,
            resetCheckListData: VehicleCheclistDetailsdataActions.reset,

            fetchModel: otfvehicleDetailsLovDataActions.fetchFilteredList,
            modelLoading: otfvehicleDetailsLovDataActions.listShowLoading,

            fetchProfile: vehicleReceiptChecklistProfiledataActions.fetchList,
            profileLoading: vehicleReceiptChecklistProfiledataActions.listShowLoading,
            resetProfile: vehicleReceiptChecklistProfiledataActions.reset,

            fetchProductLovCode: productHierarchyDataActions.fetchFilteredList,
            ProductLovLoading: productHierarchyDataActions.listShowLoading,
            resetCodeData: productHierarchyDataActions.resetData,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleRecieptChecklistMasterBase = (props) => {
    const { userId, data, totalRecords, moduleTitle, filterString } = props;
    const { fetchList, listShowLoading, setFilterString, resetCheckListData, saveData, showGlobalNotification } = props;
    const { fetchModel, isModelDataLoaded, isModelDataLoading, vehicleModelData, modelLoading } = props;
    const { fetchProfile, profileLoading, isProfileDataLoaded, ProfileData, resetProfile, ChecklistData, typeData } = props;
    const { isProductHierarchyDataLoaded, VehicleLovCodeData, fetchProductLovCode, ProductLovLoading, resetCodeData, isProfileDataLoading, isProductHierarchyLoading } = props;

    const [listFilterForm] = Form.useForm();

    const [selectedRecord, setSelectedRecord] = useState();
    const [selectedRecordId, setSelectedRecordId] = useState();
    const [checkListDataModified, setcheckListDataModified] = useState([]);
    const [payload, setPayload] = useState([]);
    const [deletedUpload, setdeletedUpload] = useState([]);
    const [fileList, setFileList] = useState([]);

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [previousSection, setpreviousSection] = useState(1);
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
    const pageIntialState = {
        pageSize: 10,
        current: 1,
    };
    const rulesIntialstate = {
        fromdate: false,
        todate: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [buttonType, setbuttonType] = useState(QUERY_BUTTONS_CONSTANTS?.PENDING?.key);

    const [page, setPage] = useState({ ...pageIntialState });
    const dynamicPagination = true;
    const [formData, setFormData] = useState([]);
    const [otfSearchRules, setOtfSearchRules] = useState({ rules: [validateRequiredInputField('search parametar')] });
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [actionButtonVisibility, setactionButtonVisibility] = useState({ canEdit: false, canView: false, DeleteIcon: false, canAdd: true });
    const [toolTipContent, setToolTipContent] = useState(
        <div>
            <p>
                Color - <span>NA</span>
            </p>
            <p>
                Seating - <span>NA</span>
            </p>
            <p>
                Fuel - <span>NA</span>
            </p>
            <p>
                Variant - <span>NA</span>
            </p>
            <p>
                Name - <span>NA</span>
            </p>
        </div>
    );

    const [rules, setrules] = useState({ ...rulesIntialstate });

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

    const handleButtonQuery = (item, keyName) => {
        handleResetFilter();
        const buttonkey = item?.key;
        if (item?.key === buttonType) return;
        setbuttonType(buttonkey);
        setPage({ ...pageIntialState });

        switch (buttonkey) {
            case QUERY_BUTTONS_CONSTANTS?.PENDING?.key: {
                setactionButtonVisibility({ canEdit: false, canView: false, canAdd: true });
                break;
            }
            case QUERY_BUTTONS_CONSTANTS?.PARTIALLY_COMPLETED?.key: {
                setactionButtonVisibility({ canEdit: true, canView: true, canAdd: false });
                break;
            }
            case QUERY_BUTTONS_CONSTANTS?.COMPLETED?.key: {
                setactionButtonVisibility({ canEdit: false, canView: true, canAdd: false });
                break;
            }
            default: {
                setactionButtonVisibility({ canEdit: false, canView: false, canAdd: true });
            }
        }
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'checklistStatus',
                title: 'checklistStatus',
                value: buttonType,
                canRemove: false,
                filter: false,
            },
            {
                key: 'grnNumber',
                title: 'grnNumber',
                value: filterString?.grnNumber,
                name: filterString?.grnNumber ?? null,
                canRemove: true,
                filter: true,
            },
            {
                key: 'fromDate',
                title: 'Reciept From Date',
                value: filterString?.fromDate,
                name: convertDateTime(filterString?.fromDate, dateFormatView, 'fromDate'),
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'Reciept To Date',
                value: filterString?.toDate,
                name: convertDateTime(filterString?.toDate, dateFormatView, 'toDate'),
                canRemove: false,
                filter: true,
            },
            {
                key: 'model',
                title: 'Model',
                value: filterString?.model,
                name: vehicleModelData?.find((element, index) => filterString?.model === element?.prodctCode)?.prodctShrtName,
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
            advanceFilterForm.resetFields();
            const { toDate, fromDate } = filterString;
            if (fromDate && toDate) setrules({ fromdate: true, todate: true });
            advanceFilterForm.setFieldsValue({ ...filterString, fromDate: formatDateToCalenderDate(fromDate), toDate: formatDateToCalenderDate(toDate) });
        } else {
            setrules({ fromdate: false, todate: false });
            advanceFilterForm.setFieldsValue({ ...filterString, fromDate: undefined, toDate: undefined, model: undefined });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdvanceSearchVisible, filterString]);

    useEffect(() => {
        if (VehicleLovCodeData && isProductHierarchyDataLoaded && userId) {
            setToolTipContent(
                <div>
                    <p>
                        Color - <span>{VehicleLovCodeData['0']['color'] ?? 'Na'}</span>
                    </p>
                    <p>
                        Seating - <span>{VehicleLovCodeData['0']['seatingCapacity'] ?? 'Na'}</span>
                    </p>
                    <p>
                        Fuel - <span>{VehicleLovCodeData['0']['fuel'] ?? 'Na'}</span>
                    </p>
                    <p>
                        Variant - <span>{VehicleLovCodeData['0']['variant'] ?? 'Na'}</span>
                    </p>
                    <p>
                        Name - <span>{VehicleLovCodeData['0']['name'] ?? 'Na'}</span>
                    </p>
                </div>
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [VehicleLovCodeData, isProductHierarchyDataLoaded, userId]);

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        setrules({ fromdate: false, todate: false });
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
        setrules({ ...rulesIntialstate });
        advanceFilterForm.resetFields();
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        if (!record?.chassisNumber) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Vehicle details not present' });
            return;
        }
        form.resetFields();
        form.setFieldsValue(undefined);
        const handleProfile = () => {
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

                fetchProfile({ setIsLoading: profileLoading, userId, onErrorAction, extraParams: myParams });
            }
            if (record?.modelCode) {
                const LovParams = [
                    {
                        key: 'prodctCode',
                        title: 'prodctCode',
                        value: record?.modelCode,
                        name: 'Product Code',
                    },
                ];
                fetchProductLovCode({ setIsLoading: ProductLovLoading, userId, onErrorAction, extraParams: LovParams });
            }
        };

        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                setpreviousSection(1);
                setSelectedRecord(record);
                setcheckListDataModified([]);
                setPayload([]);
                setdeletedUpload([]);
                setFileList([]);
                handleProfile();
                break;
            case EDIT_ACTION:
                setSelectedRecord(record);
                record && setSelectedRecordId(record?.grnNumber ?? '');
                openDefaultSection && setCurrentSection(defaultSection);
                !isProfileDataLoaded && handleProfile();
                setcheckListDataModified([]);
                setPayload([]);
                setdeletedUpload([]);
                setFileList([]);

                break;
            case VIEW_ACTION:
                setSelectedRecord(record);
                record && setSelectedRecordId(record?.grnNumber ?? '');
                defaultSection && setCurrentSection(defaultSection);
                !isProfileDataLoaded && handleProfile();
                setcheckListDataModified([]);
                setPayload([]);
                setdeletedUpload([]);
                setFileList([]);

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

    const onFinish = () => {
        const checklistNumber = ProfileData?.checklistNumber ?? '';
        const chassisNumber = selectedRecord?.chassisNumber ?? '';
        const checklistModifiedData = checkListDataModified
            ?.filter((element) => {
                const { ismodified, index, ...rest } = element;
                if (ismodified) return rest;
                return false;
            })
            ?.map((item) => {
                const { ismodified, index, ...rest } = item;
                return { ...rest, answerFromDate: rest?.answerFromDate?.toISOString(), answerToDate: rest?.answerToDate?.toISOString() };
            });

        const data = {
            checklistDetailList: checklistModifiedData,
            supportingDocumentList: [...payload, ...deletedUpload],
            checklistNumber: checklistNumber,
            chassisNumber: chassisNumber,
        };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            resetCheckListData();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
            setcheckListDataModified([]);
            setPayload([]);
            resetProfile();
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
        resetCodeData();
        setSelectedRecord();
        setIsFormVisible(false);
        resetCheckListData();
        setButtonData({ ...defaultBtnVisiblity });
        resetProfile();
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        tableColumn: tableColumn({ handleButtonClick, actionButtonVisibility }),
        tableData: data,
        showAddButton: false,
        handleAdd: handleButtonClick,
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
        isLoading: showDataLoading,
    };
    const removeFilter = (key) => {
        if (key === 'fromDate') {
            const { fromDate, toDate, ...rest } = filterString;
            setrules({ ...rulesIntialstate });
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
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

    const containerProps = {
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
        previousSection,
        setpreviousSection,
        formData,
        setFormData,
        handleFormValueChange,
        isLastSection,
        VehicelReceiptChecklistOnfinish: onFinish,
        supportingData: ChecklistData,
        buttonType: buttonType === QUERY_BUTTONS_CONSTANTS?.COMPLETED?.key ? true : false,
        checkListDataModified,
        setcheckListDataModified,
        addMode: formActionType?.addMode,
        editMode: formActionType?.editMode,
        payload,
        setPayload,
        deletedUpload,
        setdeletedUpload,
        fileList,
        setFileList,
        typeData,
        tooltTipText: toolTipContent,
        VehicleLovCodeData,
        data,
        isProfileDataLoading,
        isProductHierarchyLoading,
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
        rules,
        setrules,
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
