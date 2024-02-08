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
import { FUEL_TYPE, REQUEST_STAGE_CONSTANTS } from './Constants/FuelTypeConstant';
import { chargerInstallationDataActions } from 'store/actions/data/chargerInstallation/chargerInstallation';
import { crmCustomerVehicleDataActions } from 'store/actions/data/crmCustomerVehicle';
import { chargerInstallationGuestDetailsDataActions } from 'store/actions/data/chargerInstallation/chargerInstallationGuestDetails';
import { vehicleModelDetailsDataActions } from 'store/actions/data/vehicle/modelDetails';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { getCodeValue } from 'utils/getCodeValue';
import { BASE_URL_PRODUCT_MODEL_GROUP, BASE_URL_PRODUCT_VARIENT } from 'constants/routingApi';
import { vehicleVariantDetailsDataActions } from 'store/actions/data/vehicle/variantDetails';

import { translateContent } from 'utils/translateContent';
import { drawerTitle } from 'utils/drawerTitle';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ChargerInstallation: {
                ChargerInstallationList: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString, detailData: chargerInstallationMasterData = [], isDetailLoading = false },
                ChargerInstallationGuestDetails: { isLoaded: isGuestDataLoaded = false, isLoading: isGuestLoading, data: chargerInstallationGuestDetailsData = [] },
            },
            CRMCustomerVehicle: { isLoaded: isCRMCustomerDataLoaded = false, isLoading: isChargerSearchLoading, data: crmCustomerVehicleData = [] },
            Vehicle: {
                ModelVehicleDetails: { isLoaded: isModelDataLoaded = false, isLoading: isModelLoading, data: modelData = [] },
                VariantVehicleDetails: { isLoaded: isVariantDataLoaded = false, isLoading: isVariantLoading, data: variantData = [] },
            },
        },
    } = state;

    const moduleTitle = translateContent('chargerInstallationProcess.heading.mainTitle');
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
        crmCustomerVehicleData,
        isGuestDataLoaded,
        isGuestLoading,
        chargerInstallationGuestDetailsData,
        isDetailLoading,
        isChargerSearchLoading,

        isModelDataLoaded,
        isModelLoading,
        modelData,

        isVariantDataLoaded,
        isVariantLoading,
        variantData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCustomerVehicleList: crmCustomerVehicleDataActions.fetchList,
            listCustomerVehicleShowLoading: crmCustomerVehicleDataActions.listShowLoading,
            resetCustomerVehicleData: crmCustomerVehicleDataActions.reset,

            fetchList: chargerInstallationDataActions.fetchList,
            listShowLoading: chargerInstallationDataActions.listShowLoading,
            fetchChargerDetails: chargerInstallationDataActions.fetchDetail,
            listDetailShowLoading: chargerInstallationDataActions.listDetailShowLoading,
            resetDetailData: chargerInstallationDataActions.resetDetail,
            setFilterString: chargerInstallationDataActions.setFilter,
            saveData: chargerInstallationDataActions.saveData,

            fetchGuestDetails: chargerInstallationGuestDetailsDataActions.fetchList,
            listGuestShowLoading: chargerInstallationGuestDetailsDataActions.listShowLoading,

            fetchModelLovList: vehicleModelDetailsDataActions.fetchList,
            listModelShowLoading: vehicleModelDetailsDataActions.listShowLoading,
            resetModel: vehicleModelDetailsDataActions.reset,

            fetchVariantLovList: vehicleVariantDetailsDataActions.fetchList,
            listVariantShowLoading: vehicleVariantDetailsDataActions.listShowLoading,
            resetVariant: vehicleModelDetailsDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const ChargerInstallationMasterBase = (props) => {
    const { data, userId, isChargerSearchLoading, isDetailLoading, resetDetailData, listDetailShowLoading, chargerInstallationMasterData, fetchGuestDetails, listGuestShowLoading, fetchList, fetchCustomerVehicleList, listCustomerVehicleShowLoading, crmCustomerVehicleData, listShowLoading, showGlobalNotification, fetchChargerDetails } = props;
    const { typeData, saveData, moduleTitle, totalRecords } = props;
    const { resetCustomerVehicleData, filterString, setFilterString, chargerStatusList, otfData, vehicleInvoiceMasterData, chargerInstallationGuestDetailsData } = props;
    const { fetchModelLovList, listModelShowLoading, fetchVariantLovList, listVariantShowLoading, modelData, variantData } = props;

    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [chargerStatus, setchargerStatus] = useState(QUERY_BUTTONS_CONSTANTS.SITE_SURVEY.key);
    const [requestPayload, setRequestPayload] = useState({ chargerInstDetails: {}, chargerInstAddressDetails: {} });
    const [disabled, setDisabled] = useState(false);

    const [listFilterForm] = Form.useForm();
    const [addRequestForm] = Form.useForm();
    const [addRequestData, setAddRequestData] = useState([]);
    const [searchValue, setSearchValue] = useState();
    const [options, setOptions] = useState();
    const [modal, setModal] = useState(false);

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
                name: typeData?.[PARAM_MASTER.CH_SER.id]?.find((i) => i?.key === filterString?.searchType)?.value,
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

    const handleChargerCall = (id) => {
        if (id && !selectedOrderId) {
            fetchChargerDetails({
                customURL,
                setIsLoading: listDetailShowLoading,
                userId,
                extraParams: [
                    {
                        key: 'id',
                        title: 'id',
                        value: id,
                        name: 'Id',
                    },
                ],
                onErrorAction,
            });
        }
    };

    const onHandleModal = (record) => {
        setModal(true);
        const extraParams = [
            {
                key: 'id',
                title: 'id',
                value: record?.id,
                name: 'Id',
            },
        ];
        fetchGuestDetails({ setIsLoading: listGuestShowLoading, userId, extraParams, onErrorAction });
    };

    const makeExtraParams = (key, title, value, name) => {
        const extraParams = [
            {
                key: key,
                title: title,
                value: value,
                name: name,
            },
        ];
        return extraParams;
    };

    const handleBookingNumberSearch = (otfNumber) => {
        if (!otfNumber) return false;
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
            if (!(res?.data?.otfDetails?.orderStatus === OTF_STATUS?.CANCELLED?.key || res?.data?.otfDetails?.orderStatus === OTF_STATUS?.DELIVERED?.key) && res?.data?.vehicleDetails?.fuel === FUEL_TYPE?.ELECTR?.key) {
                fetchModelLovList({ customURL: BASE_URL_PRODUCT_MODEL_GROUP.concat('/lov'), setIsLoading: listModelShowLoading, userId });
                fetchVariantLovList({ customURL: BASE_URL_PRODUCT_VARIENT.concat('/lov'), setIsLoading: listVariantShowLoading, userId, extraParams: makeExtraParams('modelGroupCode', 'modelGroupCode', res?.data?.vehicleDetails?.modelGroup, 'modelGroupCode') });
                setChargerDetails(true);
                setButtonData((prev) => ({ ...prev, formBtnActive: true }));
                chargerInstallationForm.setFieldsValue({ bookingStatus: getCodeValue(typeData?.ORDR_STATS, crmCustomerVehicleData?.otfDetails?.orderStatus) });
                setSelectedOtfNumber(otfNumber);
            } else {
                showGlobalNotification({ message: translateContent('chargerInstallationProcess.notification.globalNotification') });
                resetCustomerVehicleData();
                setChargerDetails(false);
                setAddRequestData([]);
                setTimeout(() => {
                    resetCustomerVehicleData();
                }, 100);
            }
        };
        fetchCustomerVehicleList({ setIsLoading: listCustomerVehicleShowLoading, userId, extraParams, onSuccessAction: onSuccesscustomerAction, onErrorAction });
    };

    const handleBookingChange = () => {
        setSelectedOtfNumber('');
        setSelectedOrder('');
        setChargerDetails(false);
        setButtonData((prev) => ({ ...prev, formBtnActive: false }));
        chargerInstallationForm.setFieldsValue();
        setAddRequestData([]);
        resetCustomerVehicleData();
        setDisabled(false);
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
        handleChargerCall(record?.id);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                chargerInstallationForm.resetFields();
                setSelectedOrderId('');
                setDisabled(false);
                break;
            case EDIT_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.id);
                record && setSelectedOtfNumber(record?.bookingNumber);
                openDefaultSection && setCurrentSection(defaultSection);
                setDisabled(false);
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
                addRequestData?.length > 0 ? setAddRequestData((prev) => [...prev, ...chargerInstallationMasterData?.chargerInstDetails?.requestDetails]) : setAddRequestData([...chargerInstallationMasterData?.chargerInstDetails?.requestDetails]);
            } else {
                const Visibility = btnVisiblity({ defaultBtnVisiblity, buttonAction });
                setButtonData(Visibility);
            }
        }
        setIsFormVisible(true);
    };
    const handleResetFilter = () => {
        setShowDataLoading(false);
        setFilterString();
        advanceFilterForm.resetFields();
    };

    const onChargerInstallationFinish = (values) => {
        const data = { ...values, id: '' || selectedOrderId, bookingNumber: selectedOtfNumber };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...defaultBtnVisiblity });
            setIsFormVisible(false);
            resetCustomerVehicleData();
            resetDetailData();
            setSelectedOrder();
            setSelectedOrderId();
        };
        const onError = (message) => showGlobalNotification({ message });

        const requestData = {
            data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
            customURL,
        };
        saveData(requestData);
    };
    const handleFormValueChange = () => setButtonData({ ...buttonData, formBtnActive: true });

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
        setAddRequestData([]);
        setOptions();
        setButtonData({ ...defaultBtnVisiblity });
        resetDetailData();
        resetCustomerVehicleData();
    };
    const tableProps = {
        dynamicPagination,
        totalRecords,
        setPage,
        tableColumn: tableColumn(handleButtonClick, typeData),
        tableData: data,
        showAddButton: false,
        typeData,
    };

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        addRequestForm.resetFields();
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

    const title = translateContent('chargerInstallationProcess.heading.title');

    const RequestStage = useMemo(() => {
        const requestDetailsLength = Array?.isArray(chargerInstallationMasterData?.chargerInstDetails?.requestDetails) && chargerInstallationMasterData?.chargerInstDetails?.requestDetails?.length;
        const status = chargerInstallationMasterData?.chargerInstDetails?.requestDetails?.[requestDetailsLength - 1]?.response === CHARGER_STATUS.SUCCESS?.key;
        const statusType = chargerInstallationMasterData?.chargerInstDetails?.requestDetails?.[requestDetailsLength - 1]?.stageType;
        if (statusType === REQUEST_STAGE_CONSTANTS?.COMMISSIONING?.key) {
            setButtonData((prev) => ({ ...prev, addRequestBtn: false }));
            return REQUEST_STAGE_CONSTANTS?.COMMISSIONING?.key;
        }
        if (typeData?.[PARAM_MASTER?.CHRGR_INST_STG_TYPE?.id]?.length > 0) {
            if (formActionType?.addMode) {
                return REQUEST_STAGE_CONSTANTS?.SITE_SURVEY?.key;
            } else if (formActionType?.editMode || formActionType?.viewMode) {
                if (status) {
                    formActionType?.viewMode && setButtonData((prev) => ({ ...prev, addRequestBtn: true }));
                    switch (statusType) {
                        case REQUEST_STAGE_CONSTANTS?.SITE_SURVEY?.key: {
                            return REQUEST_STAGE_CONSTANTS?.SITE_VALIDATION?.key;
                        }
                        case REQUEST_STAGE_CONSTANTS?.SITE_VALIDATION?.key: {
                            return REQUEST_STAGE_CONSTANTS?.INSTALLATION?.key;
                        }
                        case REQUEST_STAGE_CONSTANTS?.INSTALLATION?.key: {
                            return REQUEST_STAGE_CONSTANTS?.COMMISSIONING?.key;
                        }
                        case REQUEST_STAGE_CONSTANTS?.COMMISSIONING?.key: {
                            return REQUEST_STAGE_CONSTANTS?.COMMISSIONING?.key;
                        }
                        default: {
                            return false;
                        }
                    }
                }
                return undefined;
            } else {
                return false;
            }
        }
        return undefined;
    }, [formActionType, typeData, chargerInstallationMasterData]);

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
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        titleOverride: translateContent('chargerInstallationProcess.heading.titleOverride'),
        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        chargerStatusList,
        typeData,
    };

    const containerProps = {
        record: selectedOrder,
        form,
        chargerInstallationForm,
        formActionType,
        setFormActionType,
        onChargerInstallationFinish,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(moduleTitle),
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
        disabled,
        setDisabled,

        otfData,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        handleFormValueChange,
        isLastSection,
        typeData,
        saveButtonName: isLastSection ? translateContent('global.buttons.submit') : translateContent('global.buttons.next'),
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
        modal,
        setModal,
        onHandleModal,
        chargerInstallationGuestDetailsData,
        isLoading: isDetailLoading,
        isChargerSearchLoading,
        RequestStage,
        modelData,
        variantData,
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

export const ChargerInstallationMaster = connect(mapStateToProps, mapDispatchToProps)(ChargerInstallationMasterBase);
