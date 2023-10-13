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
import ChargerInstallationFilter from './ChargerInstallationFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { ChargerInstallationMainConatiner } from './ChargerInstallationMainConatiner';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { CHARGER_INSTALLATION_SECTION } from 'constants/ChargerInstallationConstant';
import { QUERY_BUTTONS_CONSTANTS } from './QueryButtons';
import { BASE_URL_CHARGER_INSTALLATION as customURL } from 'constants/routingApi';
import { CHARGER_STATUS } from 'constants/ChargerStatus';
import { OTF_STATUS } from 'constants/OTFStatus';
import { FUEL_TYPE } from './Constants/FuelTypeConstant';
import { chargerInstallationDataActions } from 'store/actions/data/chargerInstallation/chargerInstallation';
import { crmCustomerVehicleDataActions } from 'store/actions/data/crmCustomerVehicle';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import { FilterIcon } from 'Icons';
import { getCodeValue } from 'utils/getCodeValue';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ChargerInstallation: {
                ChargerInstallationList: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString, detailData: chargerInstallationMasterData = [] },
            },
            CRMCustomerVehicle: { isLoaded: isCRMCustomerDataLoaded = false, isCRMCustomerLoading, data: crmCustomerVehicleData = [] },
        },
    } = state;
    const moduleTitle = 'Charger Installation';
    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        chargerStatusList: Object.values(QUERY_BUTTONS_CONSTANTS),
        moduleTitle,
        isSearchLoading,
        isSearchDataLoaded,
        filterString,
        chargerInstallationMasterData,
        isCRMCustomerDataLoaded,
        isCRMCustomerLoading,
        crmCustomerVehicleData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCustomerVehicleList: crmCustomerVehicleDataActions.fetchList,
            listCustomerVehicleShowLoading: crmCustomerVehicleDataActions.listShowLoading,

            fetchList: chargerInstallationDataActions.fetchList,
            fetchChargerDetails: chargerInstallationDataActions.fetchDetail,
            listShowLoading: chargerInstallationDataActions.listShowLoading,
            setFilterString: chargerInstallationDataActions.setFilter,
            saveData: chargerInstallationDataActions.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleInvoiceMasterBase = (props) => {
    const { data, userId, chargerInstallationMasterData, fetchList, fetchCustomerVehicleList, listCustomerVehicleShowLoading, crmCustomerVehicleData, listShowLoading, showGlobalNotification, fetchChargerDetails } = props;
    const { typeData, saveData, moduleTitle, totalRecords } = props;
    const { filterString, setFilterString, chargerStatusList, otfData, vehicleInvoiceMasterData } = props;

    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [chargerStatus, setchargerStatus] = useState(QUERY_BUTTONS_CONSTANTS.SITE_SURVEY.key);
    const [requestPayload, setRequestPayload] = useState({ chargerInstDetails: {}, chargerInstAddressDetails: {} });

    const [listFilterForm] = Form.useForm();
    const [addRequestForm] = Form.useForm();
    const [addRequestData, setAddRequestData] = useState([]);
    const [searchValue, setSearchValue] = useState();
    const [options, setOptions] = useState();

    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();
    const [selectedOtfNumber, setSelectedOtfNumber] = useState();
    const [chargerDetails, setChargerDetails] = useState(false);

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [chargerInstallationForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        saveAndNewBtn: false,
        saveAndNewBtnClicked: false,
        closeBtn: false,
        cancelBtn: false,
        formBtnActive: false,
        addRequestBtn: false,
        nextBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

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

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
                name: typeData?.[PARAM_MASTER.INV_SER.id]?.find((i) => i?.key === filterString?.searchType)?.value,
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
                key: 'fromDate',
                title: 'Start Date',
                value: filterString?.fromDate,
                name: filterString?.fromDate ? convertDateTime(filterString?.fromDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'End Date',
                value: filterString?.toDate,
                name: filterString?.toDate ? convertDateTime(filterString?.toDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: page?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: page?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'stage',
                title: 'Stage',
                value: chargerStatus,
                canRemove: false,
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
    }, [searchValue, chargerStatus, filterString, page]);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, chargerStatus, filterString, page]);

    useEffect(() => {
        const defaultSection = CHARGER_INSTALLATION_SECTION.CHARGER_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(CHARGER_INSTALLATION_SECTION);
        setSection(defaultSection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const filterActiveMenu = (items) => {
        return items;
    };

    const filterActiveSection = sectionName && filterActiveMenu(Object.values(sectionName));
    useEffect(() => {
        if (chargerInstallationMasterData?.chargerInstDetails?.requestDetails[0].requestStage === QUERY_BUTTONS_CONSTANTS?.COMMISSION?.key) {
            setButtonData((prev) => ({ ...prev, addRequestBtn: false }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chargerInstallationMasterData]);
    useEffect(() => {
        if (currentSection && sectionName) {
            const section = Object.values(sectionName)?.find((i) => i.id === currentSection);
            setSection(section);

            const nextSection = filterActiveSection?.find((i) => i?.displayOnList && i.id > currentSection);
            setLastSection(!nextSection?.id);
        }
        form.resetFields();
        form.setFieldsValue(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    useEffect(() => {
        if (userId && selectedOrderId) {
            const extraParams = [
                {
                    key: 'id',
                    title: 'id',
                    value: selectedOrderId,
                    name: 'Id',
                },
            ];
            fetchChargerDetails({ customURL, setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOtfNumber]);

    const handleBookingNumberSearch = (otfNumber) => {
        if (!otfNumber) return false;
        setSelectedOtfNumber(otfNumber);
        const extraParams = [
            {
                key: 'otfNumber',
                title: 'otfNumber',
                value: otfNumber,
                name: 'Booking Number',
            },
        ];
        const onSuccesscustomerAction = (res) => {
            chargerInstallationForm.setFieldsValue({ otfNumber: otfNumber });
            chargerInstallationForm.setFieldsValue({ bookingStatus: getCodeValue(typeData?.ORDR_STATS, crmCustomerVehicleData?.otfDetails?.orderStatus) });
            if (!(res?.data?.otfDetails?.orderStatus === OTF_STATUS?.CANCELLED?.key || res?.data?.otfDetails?.orderStatus === OTF_STATUS?.DELIVERED?.key) && res?.data?.vehicleDetails?.fuel === FUEL_TYPE?.ELECTR?.key) {
                setChargerDetails(true);
                setButtonData((prev) => ({ ...prev, formBtnActive: true }));
            } else {
                showGlobalNotification({ message: "Non-EV Booking shouldn't be accepted" });
            }
        };
        fetchCustomerVehicleList({ setIsLoading: listCustomerVehicleShowLoading, userId, extraParams, onSuccessAction: onSuccesscustomerAction, onErrorAction });
    };

    const handleBookingChange = () => {
        setSelectedOtfNumber('');
        chargerInstallationForm.setFieldValue();
        setSelectedOrder('');
        setChargerDetails(false);
        setButtonData((prev) => ({ ...prev, formBtnActive: false }));
    };

    const handleChargerTypeChange = (buttonName) => {
        setchargerStatus(buttonName?.key);
        searchForm.resetFields();
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, searchParam: value });
        setSearchValue(value);
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);

        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                chargerInstallationForm.resetFields();
                setSelectedOrderId('');
                break;
            case EDIT_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.id);
                record && setSelectedOtfNumber(record?.bookingNumber);
                openDefaultSection && setCurrentSection(defaultSection);

                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.id);
                record && setSelectedOtfNumber(record?.bookingNumber);
                defaultSection && setCurrentSection(defaultSection);

                break;
            case NEXT_ACTION:
                const nextSection = filterActiveSection?.find((i) => i?.displayOnList && i.id > currentSection);
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
            if (buttonAction === EDIT_ACTION) {
                setButtonData((prev) => ({ ...prev, nextBtn: false, addRequestBtn: false, saveBtn: true }));
                setChargerDetails(true);
                addRequestData?.length > 0 ? setAddRequestData((prev) => [chargerInstallationMasterData?.chargerInstDetails?.requestDetails[0], ...prev]) : setAddRequestData([chargerInstallationMasterData?.chargerInstDetails?.requestDetails[0]]);
            } else {
                const Visibility = btnVisiblity({ defaultBtnVisiblity, buttonAction });
                setButtonData(Visibility);
                if (buttonAction === VIEW_ACTION) {
                    if (record?.requestStatus === CHARGER_STATUS.SUCCESS?.key) {
                        setButtonData((prev) => ({ ...prev, addRequestBtn: true }));
                    }
                }
            }
        }
        setIsFormVisible(true);
    };

    const onFinishSearch = (values) => {};

    const handleResetFilter = (e) => {
        setShowDataLoading(false);
        setFilterString();
        advanceFilterForm.resetFields();
    };

    const onChargerInstallationFinish = (values) => {
        const data = { ...values, id: '' || selectedOrderId, bookingNumber: selectedOtfNumber };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
            customURL,
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
        addRequestForm.resetFields();
        setSelectedOrderId();
        setSelectedOtfNumber();
        setChargerDetails(false);
        chargerInstallationForm.resetFields();

        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
        setLastSection();
        setSelectedOrder();
        setIsFormVisible(false);
        setAddRequestData();
        setOptions();
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        setPage,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
        showAddButton: false,
        typeData,
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
        } else if (key === 'fromDate' || key === 'toDate') {
            const { fromDate, toDate, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const title = 'Charger Installation';

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        chargerStatus,
        chargerStatusList,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        // onFinish,
        onFinishFailed,
        handleResetFilter,
        advanceFilterForm,
        handleButtonClick,
        handleChange,
        handleSearch,
        handleChargerTypeChange,

        title,
        data,
        setAdvanceSearchVisible,
        typeData,
        searchForm,
        onFinishSearch,
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
        chargerStatusList,
        typeData,
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
        record: selectedOrder,
        form,
        chargerInstallationForm,
        formActionType,
        setFormActionType,
        onChargerInstallationFinish,
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
        requestPayload,
        setRequestPayload,
        chargerStatus,
        addRequestForm,
        setButtonData,
        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        selectedOrderId,
        setSelectedOrderId,
        selectedOrder,
        setSelectedOrder,
        selectedOtfNumber,
        setSelectedOtfNumber,

        otfData,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        handleFormValueChange,
        isLastSection,
        typeData,
        saveButtonName: isLastSection ? 'Submit' : 'Next',
        setLastSection,
        handleBookingNumberSearch,
        vehicleInvoiceMasterData,
        chargerDetails,
        setChargerDetails,
        crmCustomerVehicleData,
        handleBookingChange,
        showGlobalNotification,
        chargerInstallationMasterData,
        addRequestData,
        setAddRequestData,
        options,
        setOptions,
    };

    return (
        <>
            <ChargerInstallationFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleButtonClick={handleButtonClick} isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <ChargerInstallationMainConatiner {...containerProps} />
        </>
    );
};

export const ChargerInstallationMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleInvoiceMasterBase);
