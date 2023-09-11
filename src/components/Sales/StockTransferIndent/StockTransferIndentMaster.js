/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Col, Form, Row } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FilterIcon } from 'Icons';

import { tableColumn } from './tableColumn';
import { PARAM_MASTER } from 'constants/paramMaster';
import { STOCK_TRANSFER } from 'constants/StockTransfer';
import { ADD_ACTION, VIEW_ACTION, CANCEL_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { stockTransferIndent } from 'store/actions/data/sales/stockTransfer/StockTransferIndent';
import { DealerBranchLocationDataActions } from 'store/actions/data/userManagement/dealerBranchLocation';
import { otfvehicleDetailsLovDataActions } from 'store/actions/data/otf/vehicleDetailsLov';
import { BASE_URL_STOCK_TRANSFER as customURL, BASE_URL_USER_MANAGEMENT_DEALER as dealerURL } from 'constants/routingApi';

import { ListDataTable } from 'utils/ListDataTable';
import { showGlobalNotification } from 'store/actions/notification';
import { AdvancedSearch } from './AdvancedSearch';
import AdvanceFilter from './AdvanceFilter';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import { CancellationIssue } from './CancellationIssue';
import { DRAWER_TITLE_CONSTANT } from './CancellationIssue/Constants';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        common: {
            Header: {
                data: { parentGroupCode },
            },
        },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            UserManagement: {
                DealerBranchLocation: { data: indentLocationList, detailData: requestedByDealerList },
            },
            stockTransferIndentData: {
                stockTransferIndent: { isLoaded: isSearchDataLoaded = false, isLoading: isOTFSearchLoading, data, filter: filterString },
            },
            OTF: {
                VehicleDetailsLov: {filteredListData: ProductHierarchyData },
            },
        },
    } = state;
    let returnValue = {
        userId,
        typeData,
        filterString,
        parentGroupCode,
        indentLocationList,
        requestedByDealerList,
        data,
        ProductHierarchyData
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchIndentLocation: DealerBranchLocationDataActions.fetchList,
            fetchRequestedByList: DealerBranchLocationDataActions.fetchDetail,

            fetchProductLov: otfvehicleDetailsLovDataActions.fetchFilteredList,
            ProductLovLoading: otfvehicleDetailsLovDataActions.listShowLoading,

            listShowLoading: stockTransferIndent.listShowLoading,
            fetchIndentList: stockTransferIndent.fetchList,
            fetchIndentDetails: stockTransferIndent.fetchDetail,
            setFilterString: stockTransferIndent.setFilter,
            resetData: stockTransferIndent.reset,

            saveData: stockTransferIndent.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const StockTransferIndentMasterBase = (props) => {
    const { data, filterString, setFilterString } = props;
    const { userId, typeData, parentGroupCode, showGlobalNotification } = props;
    const { indentLocationList, requestedByDealerList, ProductHierarchyData } = props;
    const { fetchIndentList, fetchIndentLocation, fetchIndentDetails, fetchRequestedByList, listShowLoading, saveData, ProductLovLoading, fetchProductLov } = props;

    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [addIndentDetailsForm] = Form.useForm();

    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [isAddNewIndentVisible, setIsAddNewIndentVisible] = useState(false);
    const [isViewIndentVisible, setIsViewIndentVisible] = useState(false);
    const [cancellationIssueVisible, setCancellationIssueVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState();
    const [toggleButton, settoggleButton] = useState(STOCK_TRANSFER?.RAISED.key);
    const [openAccordian, setOpenAccordian] = useState('');
    const [tableDataItem, setTableDataItem] = useState([]);
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [page, setPage] = useState({ pageSize: 10, current: 1 });
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
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const onSuccessAction = (res) => {
        setShowDataLoading(false);
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        setShowDataLoading(false);
        showGlobalNotification({ message });
    };

    useEffect(() => {
        setPage({ ...page, current: 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, toggleButton]);

    useEffect(() => {

        const onSuccessActionFetchIndLoc = (res) => {}
        const extraParamData = [
            {
                key: 'parentGroupCode',
                value: parentGroupCode,
            },
        ];
        fetchIndentLocation({ setIsLoading: listShowLoading, userId, onSuccessAction: onSuccessActionFetchIndLoc, onErrorAction, extraParams: extraParamData });
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdvanceSearchVisible]);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: 'status', //filterString?.searchType,
                //name: typeData?.[PARAM_MASTER.INDNT_TYP.id]?.find((i) => i?.key === toggleButton)?.value,
                canRemove: false,
                filter: false,
            },
            {
                key: 'searchParam',
                title: 'Type',
                value: toggleButton, //filterString?.searchType,
                name: typeData?.[PARAM_MASTER.INDNT_TYP.id]?.find((i) => i?.key === toggleButton)?.value,
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
                key: toggleButton === STOCK_TRANSFER?.RAISED.key ? 'indentRaisedTo': 'indentRaisedFrom',
                title: 'Value',
                value: filterString?.dealerLocation,
                name: filterString?.dealerLocation,
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
    }, [page, filterString]);

    useEffect(() => {
        //setFilterString({ ...filterString, pageSize: 10, current: 1 });
        if (userId) {
            setShowDataLoading(true);
            fetchIndentList({ customURL: customURL + '/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
            //fetchVehicleAllotmentSearchedList({ customURL: customURL + '/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        switch (buttonAction) {
            case ADD_ACTION:
                break;
            case VIEW_ACTION:
                const onSuccessViewIndent = (res) => {
                    //addIndentDetailsForm.resetFields();
                    //setTableDataItem([]);
                    setButtonData({ ...defaultBtnVisiblity, cancelBtn: true, saveBtn: false });
                    setIsViewIndentVisible(true);
                    setSelectedOrder(res?.data);
                    setOpenAccordian(true);
                    setButtonDataVehicleDetails({ ...btnVisiblityVehicleDetails, canView: toggleButton === STOCK_TRANSFER?.RECEIVED.key, canEdit: toggleButton === STOCK_TRANSFER?.RAISED?.key, canDelete: false, });
                };
                const extraParamData = [
                    {
                        key: 'indentNumber',
                        value: 'STR1694237964174', //record?.indentNumber,
                    },
                ];

                fetchIndentDetails({ customURL: customURL + '/indent', setIsLoading: listShowLoading, userId, onSuccessAction: onSuccessViewIndent, onErrorAction, extraParams: extraParamData });

                break;
            case CANCEL_ACTION:
                break;

            default:
                break;
        }

        if (buttonAction !== NEXT_ACTION) {
            if ([ADD_ACTION, VIEW_ACTION]?.includes(buttonAction)) {
                setFormActionType({
                    addMode: buttonAction === ADD_ACTION,
                    editMode: false,
                    viewMode: buttonAction === VIEW_ACTION,
                });
            }
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        }
    };

    const onFinish = (values) => {
        if (tableDataItem.length === 0) {
            let msg = 'Please add Vehicle Details';
            showGlobalNotification({ msg });
            return;
        }
        setIsAddNewIndentVisible(false);

        //const recordId = formData?.parentId || form.getFieldValue('parentId');
        let data = { ...values, vehicleDetails: [...tableDataItem] };

        const onSuccess = (res) => {
            // form.resetFields();
            // setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchIndentList({ customURL: customURL + '/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
            // setButtonData({ ...buttonData, formBtnActive: false });
            // setIsFormVisible(false);
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
        //setIsAddNewIndentVisible(false);
        let data = { ...selectedOrder, vehicleDetails: [{...values}] };

        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });

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
    }

    const onCloseAction = () => {
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);

        //setSelectedOrder();
        //setIsFormVisible(false);
        //setButtonData({ ...defaultBtnVisiblity });
    };

    const handleOnAddIndentClick = () => {
        const onSuccessActionFetchIndLoc = (res) => {
            addIndentDetailsForm.resetFields();
            setTableDataItem([]);
            setButtonData({ ...defaultBtnVisiblity, cancelBtn: true, saveBtn: true, formBtnActive: true });
            setButtonDataVehicleDetails({ ...btnVisiblityVehicleDetails, canView: false, canEdit: true, canDelete: true });
            setIsAddNewIndentVisible(true);
        };
        const extraParamData = [
            {
                key: 'parentGroupCode',
                value: parentGroupCode,
            },
        ];
        fetchProductLov({ setIsLoading: ProductLovLoading, userId, onErrorAction });
        fetchIndentLocation({ setIsLoading: listShowLoading, userId, onSuccessAction: onSuccessActionFetchIndLoc, onErrorAction, extraParams: extraParamData });
    };

    const handleChangeLocation = (value) => {
        let locationId = '';
        indentLocationList?.forEach(function (temp) {
            if (temp.locationCode === value) locationId = temp.id;
        });

        const onSuccessActionFetchDealer = (resp) => {};

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

    const onFinishSearch = (values) => {};

    const handleResetFilter = (e) => {
        //setSearchParamValue();
        //setShowDataLoading(true);
        setFilterString();
        advanceFilterForm.resetFields();
        searchForm.resetFields();
        setAdvanceSearchVisible(false);
    };


    const drawerTitle = useMemo(() => {
        // if (formActionType?.viewMode) {
        //     return 'View ';
        // } else if (formActionType?.editMode) {
        //     return 'Edit ';
        // } else {
        //     return 'Add New ';
        // }
        //}, [formActionType]);
    }, []);

    const tableProps = {
        dynamicPagination,
        filterString,
        totalRecords: data?.totalRecords,
        //setPage: setFilterString,
        page,
        setPage,
        isLoading: showDataLoading,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data?.paginationData,
        showAddButton: false,
        //noDataMessage: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
    };

    const advanceFilterProps = {
        extraParams,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        toggleButton,
        settoggleButton,
        onFinishFailed,
        handleResetFilter,
        setAdvanceSearchVisible,
        searchForm,
        onFinishSearch,
        handleOnAddIndentClick,
    };

    const advanceSearchFilterProps = {
        isVisible: isAdvanceSearchVisible,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        toggleButton,
        onCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        indentLocationList,
        searchList: typeData[PARAM_MASTER.INDENT.id],
    };

    const addNewIndentProps = {
        isVisible: isAddNewIndentVisible,
        titleOverride: 'Add Indent Details',
        addIndentDetailsForm,
        onFinish,
        onCloseAction: onAddIndentDetailsCloseAction,
        openAccordian,
        setOpenAccordian,
        buttonDataVehicleDetails,
        buttonData,
        setButtonData,
        indentLocationList,
        requestedByDealerList,
        tableDataItem,
        setTableDataItem,
        handleChangeLocation,
        ProductHierarchyData
    };

    const viewIndentProps = {
        isVisible: isViewIndentVisible,
        titleOverride: 'View Indent Details',
        formData: selectedOrder,
        openAccordian,
        setOpenAccordian,
        buttonDataVehicleDetails,
        onCloseAction: onCloseActionViewIndentDetails,
        buttonData,
        updateVehicleDetails,
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
            <CancellationIssue isVisible={cancellationIssueVisible} onCloseAction={() => {}} titleOverride={DRAWER_TITLE_CONSTANT?.CANCELLATION?.name} setIsFormVisible={() => {}} />
        </>
    );
};

export const StockTransferIndentMaster = connect(mapStateToProps, mapDispatchToProps)(StockTransferIndentMasterBase);
