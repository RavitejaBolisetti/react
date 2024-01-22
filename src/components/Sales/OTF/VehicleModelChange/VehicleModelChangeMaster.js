/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useState, useMemo } from 'react';
import { Form } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AddEditForm } from './AddEditForm';
import { tableColumn } from './tableColumn';

import { showGlobalNotification } from 'store/actions/notification';
import { vehicleAllotment } from 'store/actions/data/vehicleAllotment/VehicleAllotment';

import { BASE_URL_VEHICLE_ALLOTMENT as customURL } from 'constants/routingApi';
import { PARAM_MASTER } from 'constants/paramMaster';
import { VEHICLE_TYPE } from 'constants/VehicleType';

import { ALLOT } from 'utils/btnVisiblity';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ProductHierarchy: { filteredListData: productHierarchyData = [] },
            vehicleAllotmentData: {
                vehicleAllotment: { data: allotmentSearchedList, filter: filterString },
            },
        },
    } = state;
    const moduleTitle = translateContent('bookingManagement.heading.bookingAllotment');

    let returnValue = {
        userId,
        typeData,
        moduleTitle,
        filterString,
        allotmentSearchedList,
        productHierarchyData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchVehicleAllotmentSearchedList: vehicleAllotment.fetchList,
            setFilterString: vehicleAllotment.setFilter,
            resetData: vehicleAllotment.reset,
            fetchVehicleAllotmentDetails: vehicleAllotment.fetchDetail,
            saveData: vehicleAllotment.saveData,
            listShowLoading: vehicleAllotment.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleModelChangeMasterBase = (props) => {
    const { listShowLoading, userId } = props;
    const { fetchVehicleAllotmentSearchedList, allotmentSearchedList, productHierarchyData } = props;
    const { typeData, showGlobalNotification, saveData, setIsAllotVisible, refreshData, setRefreshData, setIsFormVisible, setShowDataLoading: setShowOTFDataLoading } = props;
    const { filterString, setFilterString } = props;

    const { selectedOrder, moduleTitle } = props;
    const defaultBtnVisiblity = { cancelBtn: true, allotBtn: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [searchParamValue, setSearchParamValue] = useState('');
    const [toggleButton, settoggleButton] = useState(VEHICLE_TYPE?.UNALLOTED.key);
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [selectedVINDetails, setSelectedOrderVINDetails] = useState();

    const [advanceFilterForm] = Form.useForm();
    const dynamicPagination = true;

    useEffect(() => {
        setFilterString({ ...filterString, pageSize: 10, current: 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
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
                value: selectedOrder?.modelCode,
                // name: productHierarchyData?.find((i) => i?.prodctCode === selectedOrder?.model)?.prodctShrtName,
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
                value: filterString?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current,
                canRemove: true,
                filter: false,
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
    }, [filterString, searchParamValue, toggleButton]);

    useEffect(() => {
        if (userId && extraParams?.find((i) => i.key === 'pageNumber')?.value > 0) {
            fetchVehicleAllotmentSearchedList({ customURL: customURL + '/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, filterString, searchParamValue, toggleButton, extraParams]);

    useEffect(() => {
        if (allotmentSearchedList?.paginationData?.length > 0) {
            setButtonData({ ...buttonData, formBtnActive: true });
        } else {
            setButtonData({ ...buttonData, formBtnActive: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allotmentSearchedList]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        switch (buttonAction) {
            case ALLOT:
                handleVehicleAllotment(record, buttonAction);
                break;

            default:
                break;
        }
    };

    const handleVehicleAllotment = (req, buttonAction) => {
        if (!selectedVINDetails) {
            showGlobalNotification({ message: translateContent('bookingManagement.validation.mandatoryVINSelect') });
            return false;
        }

        let updatedStatus = '';
        if (buttonAction === FROM_ACTION_TYPE?.ALLOT) {
            updatedStatus = VEHICLE_TYPE?.ALLOTED.key;
        } else {
            updatedStatus = VEHICLE_TYPE?.UNALLOTED.key;
        }

        const { otfId, otfNumber, bookingNumber = undefined } = selectedOrder;
        const { vehicleIdentificationNumber } = selectedVINDetails;

        let data = { otfId, otfNumber, bookingNumber, allotmentStatus: updatedStatus, vehicleIdentificationNumber };

        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            setShowOTFDataLoading(true);
            setRefreshData(!refreshData);
            setIsAllotVisible(false);
            setIsFormVisible(false);
            handleResetFilter();
            setSelectedOrderVINDetails();
            setButtonData({ ...buttonData, formBtnActive: false });
        };

        const onError = (message) => {
            setSelectedOrderVINDetails();
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

    const handleResetFilter = (e) => {
        setSearchParamValue();
        setShowDataLoading(true);
        setFilterString({ pageSize: 10, current: 1 });
        setSelectedOrderVINDetails();
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

    const rowSelection = {
        selectedRowKeys: [selectedVINDetails?.vehicleIdentificationNumber],
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedOrderVINDetails(selectedRows?.[0]);
        },
    };

    const tableProps = {
        srl: false,
        dynamicPagination,
        totalRecords: allotmentSearchedList?.totalRecords,
        filterString,
        setPage: setFilterString,
        isLoading: showDataLoading,
        tableColumn: tableColumn(handleButtonClick),
        tableData: allotmentSearchedList?.paginationData,
        showAddButton: false,
        rowKey: 'vehicleIdentificationNumber',
        rowSelection: {
            ...rowSelection,
        },
    };

    const formProps = {
        ...props,
        titleOverride: moduleTitle,
        selectedOrder,
        buttonData,
        setButtonData,
        handleButtonClick,
        tableProps,
        filterString,
        setFilterString,
        toggleButton,
        settoggleButton,
        isAdvanceSearchVisible,
        extraParams,
        removeFilter,

        setAdvanceSearchVisible,
        advanceFilterForm,
        typeData,
        productHierarchyData,
        handleResetFilter,
        setSelectedOrderVINDetails,
    };

    return <AddEditForm {...formProps} />;
};

export const VehicleModelChangeMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleModelChangeMasterBase);
