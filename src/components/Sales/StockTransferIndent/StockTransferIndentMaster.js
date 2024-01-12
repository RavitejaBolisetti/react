/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Col, Form, Row } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { tableColumn } from './tableColumn';
import { PARAM_MASTER } from 'constants/paramMaster';
import { STOCK_TRANSFER } from 'constants/StockTransfer';
import { VEHICLE_TYPE } from 'constants/VehicleType';
import { ADD_ACTION, VIEW_ACTION, CANCEL_ACTION } from 'utils/btnVisiblity';
import { stockTransferIndent } from 'store/actions/data/sales/stockTransfer/StockTransferIndent';
import { StockIndentIssueDataAction } from 'store/actions/data/sales/stockTransfer';
import { DealerBranchLocationDataActions } from 'store/actions/data/userManagement/dealerBranchLocation';
import { otfvehicleDetailsLovDataActions } from 'store/actions/data/otf/vehicleDetailsLov';
import { vehicleAllotment } from 'store/actions/data/vehicleAllotment/VehicleAllotment';

import { reportDataActions } from 'store/actions/data/report/reports';
import { BASE_URL_STOCK_TRANSFER as customURL, BASE_URL_USER_MANAGEMENT_DEALER as dealerURL, BASE_URL_VEHICLE_ALLOTMENT as customURLVINSearch } from 'constants/routingApi';
import { EMBEDDED_REPORTS } from 'constants/EmbeddedReports';
import { ISSUE_STATUS } from './constants/IssueStatus';

import { ListDataTable } from 'utils/ListDataTable';
import { showGlobalNotification } from 'store/actions/notification';
import { AdvancedSearch } from './AdvancedSearch';
import AdvanceFilter from './AdvanceFilter';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';

import { IssueIndentMaster } from 'components/Sales/StockTransferIndent/IssueIndent';
import { INDENT_ACTION_LIST } from './constants';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { defaultPageProps } from 'utils/defaultPageProps';
import { ReportModal } from 'components/common/ReportModal/ReportModal';
import { translateContent } from 'utils/translateContent';
import { dealerParentDataActions } from 'store/actions/data/dealer/dealerParent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        common: {
            Header: {
                data: { dealerLocations = [], parentGroupCode },
            },
        },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            UserManagement: {
                DealerBranchLocation: { isLoading: isLoadingDealerLoc, data: indentLocationList, detailData: requestedByDealerList },
            },
            stockTransferIndentData: {
                stockTransferIndent: { isLoading: isFetchDataLoading, data, filter: filterString },
                IndentIssue: { isLoaded: indentIssueDataLoaded = false, isLoading: indentIssueDataLoading, data: indentIssueData },
            },
            OTF: {
                VehicleDetailsLov: { filteredListData: productHierarchyData },
            },
            DealerHierarchy: {
                DealerParent: { filteredListData: dealerParentsLovList },
            },
            Report: {
                Reports: { data: reportData },
            },
            vehicleAllotmentData: {
                vehicleAllotment: { isLoading: vehicleVinDataLoading = false, data: vehicleVinData },
            },
        },
    } = state;

    let returnValue = {
        DEFAULT_PAGINATION: { pageSize: 10, current: 1 },
        userId,
        dealerLocations,
        typeData,
        filterString,
        parentGroupCode,

        indentLocationList,
        requestedByDealerList,
        isLoadingDealerLoc,

        isFetchDataLoading,
        data,
        productHierarchyData,
        vehicleVinData,
        indentIssueData,
        indentIssueDataLoading,
        indentIssueDataLoaded,

        vehicleVinDataLoading,
        dealerParentsLovList,

        reportData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchIndentLocation: DealerBranchLocationDataActions.fetchList,
            indentLocationLoading: DealerBranchLocationDataActions.listShowLoading,
            fetchRequestedByList: DealerBranchLocationDataActions.fetchDetail,

            fetchProductLov: otfvehicleDetailsLovDataActions.fetchFilteredList,
            ProductLovLoading: otfvehicleDetailsLovDataActions.listShowLoading,

            listShowLoading: stockTransferIndent.listShowLoading,
            fetchIndentList: stockTransferIndent.fetchList,
            fetchIndentDetails: stockTransferIndent.fetchDetail,
            // setFilterString: stockTransferIndent.setFilter,
            resetData: stockTransferIndent.reset,
            saveData: stockTransferIndent.saveData,
            fetchVinDetails: vehicleAllotment.fetchList,
            resetVinDetails: vehicleAllotment.reset,

            fetchIssueList: StockIndentIssueDataAction.fetchList,
            listIssueLoading: StockIndentIssueDataAction.listShowLoading,

            saveIssueDetail: StockIndentIssueDataAction.saveData,
            resetIssueList: StockIndentIssueDataAction.reset,

            fetchReportDetail: reportDataActions.fetchData,
            listReportShowLoading: reportDataActions.listShowLoading,

            fetchDealerParentsLovList: dealerParentDataActions.fetchFilteredList,
            listDealerParentShowLoading: dealerParentDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const StockTransferIndentMasterBase = (props) => {
    const { data, DEFAULT_PAGINATION, resetData, isFetchDataLoading, dealerLocations } = props;
    const { userId, typeData, showGlobalNotification, fetchDealerParentsLovList, listDealerParentShowLoading, dealerParentsLovList } = props;
    const { indentLocationList, requestedByDealerList, productHierarchyData, isLoadingDealerLoc } = props;
    const { fetchIndentList, fetchIndentLocation, fetchIndentDetails, fetchRequestedByList, listShowLoading, saveData, ProductLovLoading, fetchProductLov, fetchVinDetails, vehicleVinData, saveIssueDetail, resetVinDetails, fetchIssueList, resetIssueList, listIssueLoading } = props;
    const { indentIssueData, indentIssueDataLoading, indentIssueDataLoaded } = props;
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [addIndentDetailsForm] = Form.useForm();

    const [change, setChange] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [isAddNewIndentVisible, setIsAddNewIndentVisible] = useState(false);
    const [isViewIndentVisible, setIsViewIndentVisible] = useState(false);
    const [cancellationIssueVisible, setCancellationIssueVisible] = useState(false);
    const [cancellationData, setCancellationData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState();
    const [toggleButton, setToggleButton] = useState(STOCK_TRANSFER?.RAISED.key);
    const [openAccordian, setOpenAccordian] = useState('');
    const [tableDataItem, setTableDataItem] = useState([]);
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [showVinLoading, setshowVinLoading] = useState(false);
    const [filterString, setFilterString] = useState(DEFAULT_PAGINATION);
    const [additionalReportParams, setAdditionalReportParams] = useState();
    const [isReportVisible, setReportVisible] = useState();
    const [selectedRecord, setSelectedRecord] = useState();
    const [refershIndentData, setRefershIndentData] = useState();
    const [recordType, setRecordType] = useState();
    const [reportDetail, setReportDetail] = useState();
    const defaultDealerLocationCode = dealerLocations?.find((i) => i?.isDefault)?.locationCode;

    const dynamicPagination = true;

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        cancelBtn: false,
        closeBtn: false,
        formBtnActive: false,
    };

    const btnVisiblityVehicleDetails = {
        canView: false,
        canEdit: false,
        canDelete: false,
    };

    const [buttonDataVehicleDetails, setButtonDataVehicleDetails] = useState({ ...btnVisiblityVehicleDetails });
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const onSuccessAction = (res) => {
        setshowVinLoading(false);
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        setShowDataLoading(false);
        setshowVinLoading(false);
        showGlobalNotification({ message });
    };

    useEffect(() => {
        setFilterString(DEFAULT_PAGINATION);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleButton]);

    useEffect(() => {
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId) {
            fetchProductLov({ setIsLoading: ProductLovLoading, userId, onErrorAction });
            fetchDealerParentsLovList({ setIsLoading: listDealerParentShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (userId && selectedRecord?.indentNumber) {
            const onSuccessViewIndent = (res) => {
                setSelectedOrder(res?.data);
                setOpenAccordian(true);
            };
            const extraParamData = [
                {
                    key: 'indentNumber',
                    value: selectedRecord?.indentNumber,
                },
            ];
            fetchIndentDetails({ customURL: customURL + '/indent', setIsLoading: listShowLoading, userId, onSuccessAction: onSuccessViewIndent, onErrorAction, extraParams: extraParamData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershIndentData, selectedRecord]);

    const extraParams = useMemo(() => {
        const defaultPage = defaultPageProps(filterString);
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
                title: 'Type',
                value: toggleButton,
                name: typeData?.[PARAM_MASTER?.INDNT_TYP.id]?.find((i) => i?.key === toggleButton)?.value,
                canRemove: false,
                filter: true,
            },
            {
                key: 'indentNo',
                title: 'Value',
                value: filterString?.searchParam,
                name: filterString?.searchParam,
                canRemove: true,
                filter: true,
            },
            {
                key: toggleButton === STOCK_TRANSFER?.RAISED.key ? 'indentRaisedTo' : 'indentRaisedFrom',
                title: 'Value',
                value: filterString?.dealerLocation,
                name: indentLocationList?.find((i) => i?.locationCode === filterString?.dealerLocation)?.dealerLocationName,
                canRemove: true,
                filter: true,
            },
            {
                key: 'fromDate',
                title: 'Value',
                value: filterString?.fromDate,
                name: filterString?.fromDate ? convertDateTime(filterString?.fromDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'Value',
                value: filterString?.toDate,
                name: filterString?.toDate ? convertDateTime(filterString?.toDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            ...defaultPage,
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchIndentList({ customURL: customURL + '/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams, defaultDealerLocationCode]);
    const handleButtonClick = ({ record = null, buttonAction }) => {
        switch (buttonAction) {
            case ADD_ACTION:
                break;
            case VIEW_ACTION:
                setButtonData({ ...defaultBtnVisiblity, cancelBtn: true, saveBtn: false });
                setButtonDataVehicleDetails({ ...btnVisiblityVehicleDetails, canView: true, canEdit: toggleButton === STOCK_TRANSFER?.RAISED?.key, canDelete: false });
                setIsViewIndentVisible(true);
                setRefershIndentData(!refershIndentData);
                setSelectedRecord(record);
                break;
            case CANCEL_ACTION:
                break;

            default:
                break;
        }
    };

    const onFinish = (values) => {
        if (tableDataItem.length === 0) {
            let msg = translateContent('stockTransferIndent.validation.vehicleLengthValidation');
            showGlobalNotification({ msg });
            return;
        }
        let data = { ...values, vehicleDetails: [...tableDataItem] };

        const onSuccess = (res) => {
            setIsAddNewIndentVisible(false);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchIndentList({ customURL: customURL + '/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            customURL: customURL + '/indent',
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const updateVehicleDetails = (values) => {
        let data = { ...selectedOrder, vehicleDetails: [{ ...values }] };

        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });

            const onSuccessViewIndent = (res) => {
                setSelectedOrder(res?.data);
            };

            const extraParamData = [
                {
                    key: 'indentNumber',
                    value: selectedOrder?.indentNumber,
                },
            ];
            fetchIndentDetails({ customURL: customURL + '/indent', setIsLoading: listShowLoading, userId, onSuccessAction: onSuccessViewIndent, onErrorAction, extraParams: extraParamData });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            customURL: customURL + '/indent',
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onCloseAction = () => {
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const handleOnAddIndentClick = () => {
        addIndentDetailsForm.resetFields();
        setTableDataItem([]);
        setButtonData({ ...defaultBtnVisiblity, cancelBtn: true, saveBtn: true, formBtnActive: true });
        setButtonDataVehicleDetails({ ...btnVisiblityVehicleDetails, canView: false, canEdit: true, canDelete: true });
        setIsAddNewIndentVisible(true);
    };

    const handleChangeLocation = (value) => {
        let locationId = '';
        addIndentDetailsForm.setFieldsValue({ requestedBy: userId });
        indentLocationList?.forEach(function (temp) {
            if (temp.locationCode === value) locationId = temp.id;
        });

        const extraParamData = [
            {
                key: 'locationId',
                value: locationId,
            },
        ];

        fetchRequestedByList({ setIsLoading: listShowLoading, userId, onErrorAction, extraParams: extraParamData, customURL: dealerURL + '/employees' });
    };

    const onAddIndentDetailsCloseAction = () => {
        setIsAddNewIndentVisible(false);
        addIndentDetailsForm.resetFields();
        handleChangeLocation('');
    };

    const onCloseActionViewIndentDetails = () => {
        setIsViewIndentVisible(false);
    };

    const removeFilter = (key) => {
        if (key === 'indentNo') {
            const { indentNo, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'indentRaisedTo' || key === 'indentRaisedFrom') {
            const { dealerLocation, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'fromDate' || key === 'toDate') {
            if (key === 'fromDate') {
                const { fromDate, ...rest } = filterString;
                setFilterString({ ...rest });
            }
            if (key === 'toDate') {
                const { toDate, ...rest } = filterString;
                setFilterString({ ...rest });
            }
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const onFinishSearch = (values) => {};

    const handleResetFilter = (e) => {
        setFilterString({ current: 1, pageSize: 10 });
        advanceFilterForm.resetFields();
        searchForm.resetFields();
        setAdvanceSearchVisible(false);
    };

    const handleDealerParentChange = (parentGroupCode) => {
        const extraParamData = [
            {
                key: 'parentGroupCode',
                value: parentGroupCode,
            },
        ];

        fetchIndentLocation({ setIsLoading: listShowLoading, userId, onErrorAction, extraParams: extraParamData });
    };

    const handleVinSearch = (vinNumber) => {
        if (!vinNumber) return;
        const extraParams = [
            {
                key: 'searchType',
                title: 'Type',
                value: VEHICLE_TYPE.UNALLOTED.key,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: vinNumber,
            },
            // {
            //     key: 'status',
            //     title: 'Value',
            //     value: VEHICLE_TYPE.UNALLOTED.key,
            // },
            {
                key: 'modelValue',
                title: 'Value',
                value: cancellationData?.modelCode,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: 100,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: 1,
            },
        ];
        setshowVinLoading(true);
        fetchVinDetails({ customURL: customURLVINSearch + '/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
    };

    const handlePrintDownload = (record) => {
        setRecordType(record?.issueStatus);
        setChange(() => !change);
        setReportVisible(true);
        setAdditionalReportParams([
            {
                key: 'vehicle_identification_number',
                value: record?.vin,
            },
        ]);
    };

    // useEffect(() => {
    //     if (toggleButton === STOCK_TRANSFER?.RAISED?.key) setReportDetail(EMBEDDED_REPORTS?.STOCK_TRANSFER_ISSUE_NOTE_DOCUMENT);
    //     else if (toggleButton === STOCK_TRANSFER?.RECEIVED?.key) setReportDetail(EMBEDDED_REPORTS?.STOCK_TRANSFER_RECEIVE_NOTE_DOCUMENT);
    //     else setReportDetail(null);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [toggleButton]);

    useEffect(() => {
        if (recordType === ISSUE_STATUS?.ISSUED?.key || (toggleButton === STOCK_TRANSFER?.RAISED.key && (recordType === ISSUE_STATUS?.PARTIALLY_RECEIEVED?.key || recordType === ISSUE_STATUS?.RECEIEVED?.key))) setReportDetail(EMBEDDED_REPORTS?.STOCK_TRANSFER_ISSUE_NOTE_DOCUMENT);
        else if (toggleButton === STOCK_TRANSFER?.RECEIVED.key && (recordType === ISSUE_STATUS?.PARTIALLY_RECEIEVED?.key || recordType === ISSUE_STATUS?.RECEIEVED?.key)) setReportDetail(EMBEDDED_REPORTS?.STOCK_TRANSFER_RECEIVE_NOTE_DOCUMENT);
        else setReportDetail(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordType, change]);

    const tableProps = {
        dynamicPagination,
        filterString,
        totalRecords: data?.totalRecords,
        setPage: setFilterString,
        isLoading: showDataLoading,
        tableColumn: tableColumn({ handleButtonClick, toggleButton, dealerParentsLovList }),
        tableData: data?.paginationData,
        showAddButton: false,
        scroll: { x: 1800 },
    };

    const advanceFilterProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        toggleButton,
        setToggleButton,
        handleResetFilter,
        setAdvanceSearchVisible,
        searchForm,
        onFinishSearch,
        handleOnAddIndentClick,
    };

    const advanceSearchFilterProps = {
        isVisible: isAdvanceSearchVisible,
        // icon: <FilterIcon size={20} />,
        titleOverride: translateContent('global.advanceFilter.title'),
        toggleButton,
        onCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        indentLocationList,
        searchList: typeData[PARAM_MASTER?.INDENT.id],
        dealerParentsLovList,
        handleDealerParentChange,
    };

    const addNewIndentProps = {
        handleDealerParentChange,
        dealerParentsLovList,
        toggleButton,
        isVisible: isAddNewIndentVisible,
        titleOverride: translateContent('stockTransferIndent.heading.addIndentDetails'),
        addIndentDetailsForm,
        onFinish,
        onCloseAction: onAddIndentDetailsCloseAction,
        openAccordian,
        setOpenAccordian,
        buttonDataVehicleDetails,
        buttonData,
        setButtonData,
        indentLocationList,
        isLoadingDealerLoc,
        requestedByDealerList,
        tableDataItem,
        setTableDataItem,
        handleChangeLocation,
        productHierarchyData,
        defaultDealerLocationCode,
    };

    const viewIndentProps = {
        isVisible: isViewIndentVisible,
        titleOverride: translateContent('stockTransferIndent.heading.viewIndentDetails'),
        isLoading: isFetchDataLoading,
        formData: selectedOrder,
        openAccordian,
        setOpenAccordian,
        buttonDataVehicleDetails,
        onCloseAction: onCloseActionViewIndentDetails,
        buttonData,
        updateVehicleDetails,
        cancellationData,
        setCancellationData,
        cancellationIssueVisible,
        setCancellationIssueVisible,
        typeData,
        toggleButton,
        refershIndentData,
        setRefershIndentData,
    };

    const IndentIssueProps = {
        isVisible: cancellationIssueVisible,
        formData: selectedOrder,
        onCloseAction: () => {
            setCancellationData([]);
            resetIssueList();
            setCancellationIssueVisible(false);
        },
        titleOverride: INDENT_ACTION_LIST.CANCELLATION?.name,
        cancellationData,
        setCancellationData,
        cancellationIssueVisible,
        setCancellationIssueVisible,
        handleVinSearch,
        vehicleVinData,
        saveIssueDetail,
        resetVinDetails,
        showGlobalNotification,
        listShowLoading: listIssueLoading,
        userId,
        fetchIssueList,
        indentIssueData,
        indentIssueDataLoading,
        indentIssueDataLoaded,
        resetIssueList,
        typeData,
        toggleButton,
        vehicleVinDataLoading: showVinLoading,
        handlePrintDownload,
        refershIndentData,
        setRefershIndentData,
        setReportDetail,
    };

    const reportProps = {
        isVisible: isReportVisible,
        titleOverride: reportDetail?.title,
        additionalParams: additionalReportParams,
        onCloseAction: () => {
            setReportVisible(false);
        },
    };

    return (
        <>
            <AdvanceFilter {...advanceFilterProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleAdd={handleButtonClick} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceSearchFilterProps} />
            <AddEditForm {...addNewIndentProps} />
            <ViewDetail {...viewIndentProps} />
            <IssueIndentMaster {...IndentIssueProps} />
            <ReportModal {...reportProps} reportDetail={reportDetail} />
        </>
    );
};

export const StockTransferIndentMaster = connect(mapStateToProps, mapDispatchToProps)(StockTransferIndentMasterBase);
