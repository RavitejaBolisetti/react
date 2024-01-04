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
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, CANCEL_INVOICE, btnVisiblity } from 'utils/btnVisiblity';

import { ListDataTable } from 'utils/ListDataTable';
import { showGlobalNotification } from 'store/actions/notification';
import { CO_DEALER_SECTIONS } from 'components/Sales/CoDealerInvoiceGeneration/constants';

import { CentralFameSubsidyFilter } from './CentralFameSubsidyFilter';
import { CoDealerSearchDataActions, CoDealerVinNumberDataActions } from 'store/actions/data/CoDealerInvoice';
import { dealerParentLovDataActions } from 'store/actions/data/dealer/dealerParentsLov';
import { translateContent } from 'utils/translateContent';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDateTime, dateFormatView, formatDateToCalenderDate } from 'utils/formatDateTime';
import { getCodeValue } from 'utils/getCodeValue';
import { vehicleInvoiceGenerationDataActions } from 'store/actions/data/sales/vehicleInvoiceGeneration';
import { otfvehicleDetailsDataActions } from 'store/actions/data/otf/vehicleDetails';
import { geoStateDataActions } from 'store/actions/data/geo/states';
import { geoCityDataActions } from 'store/actions/data/geo/cities';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
        OTF: {
            VehicleDetailsLov: { data, isLoading: isModelDataLoading, filteredListData: vehicleModelData },
        },
    } = state;

    const moduleTitle = translateContent('centralFameSubsidy.heading.title');

    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData || [],
        totalRecords: data?.totalRecords || [],
        moduleTitle,
        isModelDataLoading,
        vehicleModelData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCoDealerInvoice: CoDealerSearchDataActions.fetchList,
            resetCoDealerData: CoDealerSearchDataActions.reset,
            listShowCoDealerLoading: CoDealerSearchDataActions.listShowLoading,
            setFilterString: CoDealerSearchDataActions.setFilter,
            fetchCoDealerProfileData: vehicleInvoiceGenerationDataActions.fetchData,
            saveData: CoDealerSearchDataActions.saveData,

            fetchCoDealerDetails: CoDealerSearchDataActions.fetchDetail,
            resetCoDealerDetailData: CoDealerSearchDataActions.resetDetail,
            listCoDealerDetailShowLoading: CoDealerSearchDataActions.listDetailShowLoading,

            fetchDealerParentsLovList: dealerParentLovDataActions.fetchFilteredList,
            listShowDealerLoading: dealerParentLovDataActions.listShowLoading,

            fetchVin: CoDealerVinNumberDataActions.fetchList,
            listVinLoading: CoDealerVinNumberDataActions.listShowLoading,
            resetVinData: CoDealerVinNumberDataActions.reset,

            resetTaxDetails: otfvehicleDetailsDataActions.reset,

            CancelInvoiceGenerated: vehicleInvoiceGenerationDataActions.saveData,
            restCancellationData: vehicleInvoiceGenerationDataActions.reset,

            generateIrn: vehicleInvoiceGenerationDataActions.saveData,
            listIrnLoading: vehicleInvoiceGenerationDataActions.listShowLoading,

            fetchStateLovList: geoStateDataActions.fetchFilteredList,
            listStateLoading: geoStateDataActions.listShowLoading,
            fetchCityLovList: geoCityDataActions.fetchFilteredList,
            listCityLoading: geoCityDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const CentralFameSubsidyMain = ({ filterString, setFilterString, totalRecords, data }) => {
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [cancelInvoiceForm] = Form.useForm();

    const [showdataLoading, setShowDataLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(false);

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        saveAndNewBtn: false,
        saveAndNewBtnClicked: false,
        closeBtn: false,
        cancelBtn: false,
        formBtnActive: false,
        deliveryNote: false,
        nextBtn: false,
        cancelDeliveryNoteBtn: false,
        printInvoiceBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const onSuccessAction = () => {
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
                // name: getCodeValue(CoDealerInvoiceStateMaster?.TYPE_DATA_INV_SEARCH, filterString?.searchType, 'value', false),
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
                key: 'dealerParentCode',
                title: 'IndentParent',
                value: filterString?.dealerParentCode,
                // name: getCodeValue(indentToDealerData, filterString?.dealerParentCode, 'value', false),
                canRemove: true,
                filter: true,
            },
            {
                key: 'fromDate',
                title: 'Invoice From Date',
                value: filterString?.invoiceFromDate,
                // name: convertDateTime(filterString?.invoiceFromDate, dateFormatView, 'NA'),
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'Invoice To Date',
                value: filterString?.invoiceToDate,
                // name: convertDateTime(filterString?.invoiceToDate, dateFormatView, 'NA'),
                canRemove: true,
                filter: true,
            },
            {
                key: 'invoiceStatus',
                title: 'Indent Status',
                value: filterString?.currentQuery,
                canRemove: false,
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
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize,
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
    }, [filterString]);

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        setFormActionType({ addMode: buttonAction === FROM_ACTION_TYPE?.ADD_ACTION, viewMode: FROM_ACTION_TYPE?.VIEW_ACTION, editMode: FROM_ACTION_TYPE?.EDIT_ACTION });
        setIsFormVisible(true);
    };

    const onCloseAction = () => {
        setIsFormVisible(false);
    };

    const tableProps = {
        dynamicPagination: true,
        totalRecords,
        setPage: setFilterString,
        page: filterString,
        tableColumn: tableColumn({ handleButtonClick }),
        tableData: data,
        handleButtonClick,
        isLoading: showdataLoading,
        showAddButton: false,
        filterString,
    };

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'invoiceToDate' || key === 'invoiceFromDate') {
            const { invoiceToDate, invoiceFromDate, status, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'dealerParentCode') {
            const { dealerParentCode, status, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
        advanceFilterForm.resetFields();
    };

    const CoDealerInvoiceFilterProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        onFinish: () => {},
        advanceFilterForm,
        handleButtonClick,
        data,
        searchForm,
    };
    const formProps = {
        formActionType,
    };

    return (
        <>
            <CentralFameSubsidyFilter {...CoDealerInvoiceFilterProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>

            {formActionType?.viewMode ? <ViewDetail {...formProps} /> : <AddEditForm {...formProps} />}
        </>
    );
};

export const CentralFameSubsidyMaster = connect(mapStateToProps, mapDispatchToProps)(CentralFameSubsidyMain);
