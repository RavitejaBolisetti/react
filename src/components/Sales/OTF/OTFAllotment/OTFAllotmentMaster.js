/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'antd';

import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { PARAM_MASTER } from 'constants/paramMaster';
import { VEHICLE_TYPE } from 'constants/VehicleType';

import { vehicleAllotment } from 'store/actions/data/vehicleAllotment/VehicleAllotment';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { BASE_URL_VEHICLE_ALLOTMENT as customURL } from 'constants/routingApi';
import { tableColumn } from './tableColumn';

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
    const moduleTitle = 'OTF Allotment';

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
            fetchModelList: productHierarchyDataActions.fetchFilteredList,
            showGlobalNotification,
        },
        dispatch
    ),
});

const OTFAllotmentMasterBase = (props) => {
    const { listShowLoading, userId } = props;
    const { fetchVehicleAllotmentSearchedList, allotmentSearchedList, fetchModelList, productHierarchyData } = props;
    const { typeData, showGlobalNotification } = props;
    const { filterString, setFilterString } = props;

    const { selectedOrder, moduleTitle } = props;

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, transferOTFBtn: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [searchParamValue, setSearchParamValue] = useState('');
    const [toggleButton, settoggleButton] = useState(VEHICLE_TYPE?.ALLOTED.key);
    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const handleButtonClick = ({ record = null, buttonAction }) => {};
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const [advanceFilterForm] = Form.useForm();
    const dynamicPagination = true;

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
        if (userId) {
            fetchVehicleAllotmentSearchedList({ customURL: customURL + '/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, filterString, searchParamValue, toggleButton, extraParams]);

    useEffect(() => {
        fetchModelList({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

        setAdvanceSearchVisible,
        advanceFilterForm,
        typeData,
        productHierarchyData,
    };

    return <AddEditForm {...formProps} />;
};

export const OTFAllotmentMaster = connect(mapStateToProps, mapDispatchToProps)(OTFAllotmentMasterBase);
