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
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { ViewDetail } from './ViewDetail';
import { ListDataTable } from 'utils/ListDataTable';
import { OTF_STATUS } from 'constants/OTFStatus';
import { VEHICLE_RECEIPT_SECTION } from 'constants/VehicleReceiptSection';

import { showGlobalNotification } from 'store/actions/notification';
import { otfDataActions } from 'store/actions/data/otf/otf';
import { vehicleAllotment } from 'store/actions/data/vehicleAllotment/VehicleAllotment';
import { PARAM_MASTER } from 'constants/paramMaster';
import { VEHICLE_TYPE } from 'constants/VehicleType';
import { BASE_URL_VEHICLE_ALLOTMENT as customURL } from 'constants/routingApi';

import { FilterIcon } from 'Icons';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            OTF: {
                OtfSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isOTFSearchLoading, data, filter: filterString, isDetailLoaded, detailData: otfData = [] },
            },
            vehicleAllotmentData: {
                vehicleAllotment: { isLoaded, isLoading, detailData: allotmentSummaryDetails, data: allotmentSearchedList },
            },
        },
    } = state;

    
    
    const moduleTitle = 'Vehicle Receipt';
    let returnValue = {
        userId,
        typeData,
        isDataLoaded: isDetailLoaded,
        data: data?.otfDetails,
        otfStatusList: Object.values(OTF_STATUS),
        otfData,
        isLoading: !isDetailLoaded,
        moduleTitle,
        isOTFSearchLoading,
        isSearchDataLoaded,
        filterString,
        allotmentSummaryDetails,
        allotmentSearchedList
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchOTFSearchedList: otfDataActions.fetchList,
            fetchVehicleAllotmentSearchedList: vehicleAllotment.fetchList,
            setFilterString: vehicleAllotment.setFilter,
            resetData: vehicleAllotment.reset,
            fetchVehicleAllotmentDetails: vehicleAllotment.fetchDetail,
            //saveData: vehicleAllotment.saveData,
            listShowLoading: vehicleAllotment.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleAllotmentMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, fetchVehicleAllotmentDetails, allotmentSummaryDetails, data, otfData, resetData } = props;
    const { fetchOTFSearchedList, fetchVehicleAllotmentSearchedList, allotmentSearchedList } = props;
    const { typeData, moduleTitle } = props;
    const { filterString, setFilterString, otfStatusList } = props;
    const { filterStringOTFSearch, setFilterStringOTFSearch } = useState();
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [toggleButton, settoggleButton] = useState(VEHICLE_TYPE?.UNALLOTED.id);
    const [searchParamValue, setSearchParamValue] = useState('');
    const [listFilterForm] = Form.useForm();

    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();

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
        deliveryNote: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [formData, setFormData] = useState([]);

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
                value: toggleButton,
                name: typeData?.[PARAM_MASTER.OTF_SER.id]?.find((i) => i?.key === toggleButton)?.value,
                canRemove: false,
                filter: true,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: searchParamValue,
                name: searchParamValue,
                canRemove: true,
                filter: true,
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
    }, [filterString, searchParamValue, toggleButton]);

    useEffect(() => {
        return () => {
            resetData();
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ChangeSearchHandler = (e) => {
        if (e.target.value.length > 2) {
            setSearchParamValue(e.target.value);
        } else if (e?.target?.value === '') {
            
        }
    };

    useEffect(() => {
        if (userId) {
            fetchVehicleAllotmentSearchedList({ customURL:customURL+'/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, searchParamValue, toggleButton]);



    const searchOTFExtraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterStringOTFSearch?.searchType,
                name: typeData?.[PARAM_MASTER.OTF_SER.id]?.find((i) => i?.key === filterString?.searchType)?.value
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: filterStringOTFSearch?.searchParam
            }
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterStringOTFSearch]);

    useEffect(() => {
        if (userId) {
            fetchOTFSearchedList({ setIsLoading: listShowLoading, userId, extraParams: searchOTFExtraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchOTFExtraParams]);

    useEffect(() => {
       console.log(filterString, " filterStringOTFSearch ", filterStringOTFSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterStringOTFSearch]);

    useEffect(() => {
        const defaultSection = VEHICLE_RECEIPT_SECTION.SUPPLIER_INVOICE_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(VEHICLE_RECEIPT_SECTION);
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

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                break;
            case EDIT_ACTION:
                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.otfNumber);
                defaultSection && setCurrentSection(defaultSection);
                const extraParamData = [
                    {
                        key: 'vin',
                        value: 'MA2047182', //record?.vin,
                    }
                ]
                fetchVehicleAllotmentDetails({ setIsLoading: listShowLoading, userId, extraParams: extraParamData, onSuccessAction, onErrorAction });
                setIsFormVisible(true);
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
    };

    const onFinishSearch = (values) => {};

    const handleResetFilter = (e) => {
        setShowDataLoading(true);
        setFilterString();
        advanceFilterForm.resetFields();
        setAdvanceSearchVisible(false);
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

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
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

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
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
        otfStatusList,
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
        formData: allotmentSummaryDetails,
        searchForm,
        filterString,
        setFilterString,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat('Allotment Details'),
        tableData: data,
        ChangeSearchHandler,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        selectedOrderId,
        setSelectedOrderId,
        selectedOrder,
        setSelectedOrder,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        setFormData,
        handleFormValueChange,
        isLastSection,
        typeData,
        otfData,
        saveButtonName: !selectedOrderId ? 'Create Customer ID' : isLastSection ? 'Submit' : 'Save & Next',
    };

    return (
        <>
            <AdvanceFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleAdd={handleButtonClick} isLoading={showDataLoading} {...tableProps} showAddButton={true} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <ViewDetail {...containerProps} /> 
        </>
    );
};

export const VehicleAllotmentMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleAllotmentMasterBase);
