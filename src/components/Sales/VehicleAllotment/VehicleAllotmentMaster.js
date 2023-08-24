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
import { AdvancedSearch } from './AdvancedSearch';
import { VIEW_ACTION, ALLOT, UNALLOT } from 'utils/btnVisiblity';

import { ViewDetail } from './ViewDetail';
import { ListDataTable } from 'utils/ListDataTable';
import { OTF_STATUS } from 'constants/OTFStatus';

import { showGlobalNotification } from 'store/actions/notification';
import { otfDataActions } from 'store/actions/data/otf/otf';
import { vehicleAllotment } from 'store/actions/data/vehicleAllotment/VehicleAllotment';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { PARAM_MASTER } from 'constants/paramMaster';
import { VEHICLE_TYPE } from 'constants/VehicleType';
import { BASE_URL_VEHICLE_ALLOTMENT as customURL } from 'constants/routingApi';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ConfirmationModal } from 'utils/ConfirmationModal';

import { FilterIcon } from 'Icons';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ProductHierarchy: { filteredListData: productHierarchyData = [] },
            OTF: {
                OtfSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isOTFSearchLoading, data, isDetailLoaded },
            },
            vehicleAllotmentData: {
                vehicleAllotment: { detailData: allotmentSummaryDetails, data: allotmentSearchedList, filter: filterString },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Allotment';
    let returnValue = {
        userId,
        typeData,
        isDataLoaded: isDetailLoaded,
        data: data?.otfDetails,
        otfStatusList: Object.values(OTF_STATUS),
        isLoading: !isDetailLoaded,
        moduleTitle,
        isOTFSearchLoading,
        isSearchDataLoaded,
        filterString,
        allotmentSummaryDetails,
        // allotmentSummaryDetails: { ...allotmentSummaryDetails, allotmentStatus: allotmentSummaryDetails?.allotmentStatus || 'D' },
        allotmentSearchedList,
        productHierarchyData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchOTFSearchedList: otfDataActions.fetchList,
            resetOTFSearchedList: otfDataActions.reset,
            fetchVehicleAllotmentSearchedList: vehicleAllotment.fetchList,
            setFilterString: vehicleAllotment.setFilter,
            resetData: vehicleAllotment.reset,
            fetchVehicleAllotmentDetails: vehicleAllotment.fetchDetail,
            saveData: vehicleAllotment.saveData,
            listShowLoading: vehicleAllotment.listShowLoading,
            fetchModelList: productHierarchyDataActions.fetchFilteredList,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleAllotmentMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, fetchVehicleAllotmentDetails, allotmentSummaryDetails, data, resetData } = props;
    const { fetchOTFSearchedList, fetchVehicleAllotmentSearchedList, allotmentSearchedList, resetOTFSearchedList, fetchModelList, productHierarchyData } = props;
    const { typeData, showGlobalNotification } = props;
    const { filterString, setFilterString, otfStatusList } = props;
    const [filterStringOTFSearch, setFilterStringOTFSearch] = useState('');
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [toggleButton, settoggleButton] = useState(VEHICLE_TYPE?.UNALLOTED.key);
    const [searchParamValue, setSearchParamValue] = useState('');
    const [confirmRequest, setConfirmRequest] = useState();

    const [listFilterForm] = Form.useForm();

    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();
    const [selectedOTFDetails, setSelectedOrderOTFDetails] = useState();

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

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
        deliveryNote: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: true };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [formData, setFormData] = useState([]);

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId) {
            fetchModelList({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (allotmentSummaryDetails) {
            allotmentSummaryDetails?.allotmentStatus === VEHICLE_TYPE.ALLOTED.key && setSelectedOrderOTFDetails(allotmentSummaryDetails?.vehicleOTFDetails);
            setButtonData(allotmentSummaryDetails?.allotmentStatus === VEHICLE_TYPE.ALLOTED.key ? { cancelBtn: true, unAllot: true } : { cancelBtn: true, allotBtn: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allotmentSummaryDetails]);

    useEffect(() => {
        setPage({ ...page, current: 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, toggleButton]);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: toggleButton,
                name: typeData?.[PARAM_MASTER.ALT_ACTN.id]?.find((i) => i?.key === toggleButton)?.value,
                canRemove: false,
                filter: false,
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
                key: 'modelValue',
                title: 'Model',
                value: filterString?.model,
                name: productHierarchyData?.find((i) => i?.prodctCode === filterString?.model)?.prodctShrtName,
                canRemove: true,
                filter: true,
            },
            {
                key: 'vehicleStatusValue',
                title: 'Vehicle Status',
                value: filterString?.vehicleStatus,
                name: typeData[PARAM_MASTER.VEHCL_STATS.id]?.find((i) => i?.key === filterString?.vehicleStatus)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pdiDoneValue',
                title: 'PD Done',
                value: filterString?.pdDone,
                name: typeData[PARAM_MASTER.PD_DONE.id]?.find((i) => i?.key === filterString?.pdDone)?.value,
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
    }, [page, filterString, searchParamValue, toggleButton]);

    useEffect(() => {
        return () => {
            resetData();
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ChangeSearchHandler = (e) => {
        setSearchParamValue(e.target.value);
    };

    const onSearchHandle = (value) => {
        if (value.length > 2) {
            setSearchParamValue(value);
            setFilterString({ ...value, toggleButton, advanceFilter: true });
        } else if (value === '') {
        }
    };

    useEffect(() => {
        if (userId) {
            resetOTFSearchedList();
            fetchVehicleAllotmentSearchedList({ customURL: customURL + '/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, filterString, searchParamValue, toggleButton, extraParams]);

    const searchOTFExtraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterStringOTFSearch?.searchType,
                //name: typeData?.[PARAM_MASTER.VECH_ALLOT_SER.id]?.find((i) => i?.key === filterString?.searchType)?.value
                name: toggleButton,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: filterStringOTFSearch?.searchParam,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: 100,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: 1,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterStringOTFSearch]);

    useEffect(() => {
        if (userId && searchOTFExtraParams[1]?.value) {
            fetchOTFSearchedList({ setIsLoading: listShowLoading, userId, extraParams: searchOTFExtraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchOTFExtraParams]);

    const onCloseConfirmationModalAction = () => {
        setConfirmRequest({
            ...confirmRequest,
            isVisible: false,
        });
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ALLOT:
                handleVehicleAllotment(record, buttonAction);
                break;
            case UNALLOT:
                setConfirmRequest({
                    isVisible: true,
                    titleOverride: 'Un-Allot OTF',
                    closable: true,
                    icon: false,
                    onCloseAction: onCloseConfirmationModalAction,
                    onSubmitAction: () => handleVehicleAllotment(record, buttonAction),
                    submitText: 'Yes',
                    text: 'Are you sure want to Un-allot this OTF? ',
                    content: selectedOTFDetails ? selectedOTFDetails?.otfNumber : '',
                });

                break;
            case VIEW_ACTION:
                resetOTFSearchedList();
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.otfNumber);
                const extraParamData = [
                    {
                        key: 'vin',
                        value: record?.vehicleIdentificationNumber, //record?.vehicleIdentificationNumber,
                    },
                ];
                fetchVehicleAllotmentDetails({ setIsLoading: listShowLoading, userId, extraParams: extraParamData, onSuccessAction, onErrorAction });
                setIsFormVisible(true);
                break;

            default:
                break;
        }
        //setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, orderStatus: record?.orderStatus }));
    };

    const onFinishSearch = (values) => {};

    const handleResetFilter = (e) => {
        setSearchParamValue();
        setShowDataLoading(true);
        setFilterString();
        advanceFilterForm.resetFields();
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

    const handleVehicleAllotment = (req, buttonAction) => {
        if (!selectedOTFDetails) {
            showGlobalNotification({ message: 'Please select OTF' });
            return false;
        }

        let updatedStatus = '';
        if (buttonAction === FROM_ACTION_TYPE?.ALLOT) {
            updatedStatus = VEHICLE_TYPE?.ALLOTED.key;
        } else {
            updatedStatus = VEHICLE_TYPE?.UNALLOTED.key;
        }

        let data = { ...allotmentSummaryDetails, vehicleOTFDetails: selectedOTFDetails, allotmentStatus: updatedStatus };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchVehicleAllotmentSearchedList({ customURL: customURL + '/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
            setConfirmRequest({
                ...confirmRequest,
                isVisible: false,
            });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: buttonAction === FROM_ACTION_TYPE?.ALLOT ? 'post' : 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

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

    const onCloseAction = () => {
        form.resetFields();
        form.setFieldsValue();

        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);

        setSelectedOrder();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        dynamicPagination,
        totalRecords: allotmentSearchedList?.totalRecords,
        page,
        setPage,
        isLoading: showDataLoading,
        tableColumn: tableColumn(handleButtonClick),
        tableData: allotmentSearchedList?.paginationData,
        showAddButton: false,
    };

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const title = 'Search OTF';

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        otfStatusList,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        toggleButton,
        settoggleButton,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        handleResetFilter,
        advanceFilterForm,
        ChangeSearchHandler,
        onSearchHandle,
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
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        typeData,
        onFinishSearch,
        productHierarchyData,
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
        userId,
        formData: allotmentSummaryDetails,
        searchForm,
        filterStringOTFSearch,
        setFilterStringOTFSearch,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat('Allotment Details'),
        tableData: data,
        buttonData,
        setButtonData,
        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        selectedOrderId,
        setSelectedOrderId,
        selectedOrder,
        setSelectedOrder,
        setFormData,
        typeData,
        selectedOTFDetails,
        setSelectedOrderOTFDetails,
    };

    return (
        <>
            <AdvanceFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleAdd={handleButtonClick} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <ViewDetail {...containerProps} />
            <ConfirmationModal {...confirmRequest} />
        </>
    );
};

export const VehicleAllotmentMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleAllotmentMasterBase);
