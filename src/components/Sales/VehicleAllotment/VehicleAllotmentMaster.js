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
import { defaultPageProps } from 'utils/defaultPageProps';
import { OTF_STATUS } from 'constants/OTFStatus';

import { showGlobalNotification } from 'store/actions/notification';
import { otfDataActions } from 'store/actions/data/otf/otf';
import { vehicleAllotment } from 'store/actions/data/vehicleAllotment/VehicleAllotment';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { PARAM_MASTER } from 'constants/paramMaster';
import { VEHICLE_TYPE } from 'constants/VehicleType';
import { BASE_URL_VEHICLE_ALLOTMENT as customURL } from 'constants/routingApi';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { DisableParent, FindProductName } from 'components/common/ProductHierarchy/ProductHierarchyUtils';

import { ConfirmationModal } from 'utils/ConfirmationModal';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ProductHierarchy: { data: productHierarchyData = [] },
            OTF: {
                OtfSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isOTFSearchLoading, data, isDetailLoaded },
            },
            vehicleAllotmentData: {
                vehicleAllotment: { isLoading: isVehicleDataLoading, isDetailLoading = false, detailData: allotmentSummaryDetails, data: allotmentSearchedList, filter: filterString },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Allotment';
    let returnValue = {
        userId,
        typeData,
        isDataLoaded: isDetailLoaded,
        data: data?.otfDetails,
        totalOTFRecords: data?.totalRecords,
        otfStatusList: Object.values(OTF_STATUS),
        isLoading: true,
        moduleTitle,
        isOTFSearchLoading,
        isSearchDataLoaded,
        filterString,
        allotmentSummaryDetails,
        allotmentSearchedList,
        isVehicleDataLoading,
        productHierarchyDataList: productHierarchyData,
        isDetailLoading,
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
            resetDetail: vehicleAllotment.resetDetail,
            fetchVehicleAllotmentDetails: vehicleAllotment.fetchDetail,
            listDetailShowLoading: vehicleAllotment.listDetailShowLoading,
            saveData: vehicleAllotment.saveData,
            listShowLoading: vehicleAllotment.listShowLoading,
            fetchModelList: productHierarchyDataActions.fetchList,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleAllotmentMasterBase = (props) => {
    const { saveData, listShowLoading, userId, fetchVehicleAllotmentDetails, allotmentSummaryDetails, data, totalOTFRecords, resetData } = props;
    const { fetchVehicleAllotmentSearchedList, allotmentSearchedList, isVehicleDataLoading, resetOTFSearchedList, fetchModelList, productHierarchyDataList } = props;
    const { typeData, showGlobalNotification, resetDetail, isDetailLoading } = props;
    const { filterString, setFilterString, otfStatusList, isOTFSearchLoading, listDetailShowLoading } = props;

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
    const [resetAdvanceFilter, setResetAdvanceFilter] = useState(false);

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [productHierarchyData, setProductHierarchyData] = useState([]);

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

    useEffect(() => {
        setProductHierarchyData(productHierarchyDataList?.map((i) => DisableParent(i, 'subProdct')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyDataList]);

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

    useEffect(() => {
        if (userId) {
            const extraParams = [
                {
                    key: 'unit',
                    value: 'Sales',
                },
            ];
            fetchModelList({ setIsLoading: listShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (allotmentSummaryDetails) {
            setSelectedOrderOTFDetails();
            allotmentSummaryDetails?.allotmentStatus === VEHICLE_TYPE.ALLOTED.key && setSelectedOrderOTFDetails(allotmentSummaryDetails?.vehicleOTFDetails);
            setButtonData(allotmentSummaryDetails?.allotmentStatus === VEHICLE_TYPE.ALLOTED.key ? { cancelBtn: false, closeBtn: true, unAllot: true } : { cancelBtn: false, allotBtn: true, closeBtn: true });
            // switch (allotmentSummaryDetails?.allotmentStatus) {
            //     case VEHICLE_TYPE.ALLOTED.key: {
            //         setButtonData({ cancelBtn: true, unAllot: true });
            //         break;
            //     }
            //     case VEHICLE_TYPE.UNALLOTED.key: {
            //         setButtonData({ cancelBtn: true, allotBtn: true });
            //         break;
            //     }
            //     case OTF_STATUS.INVOICED.key: {
            //         setButtonData({ cancelBtn: true });
            //         break;
            //     }
            //     default: {
            //         setButtonData({ cancelBtn: true });
            //     }
            // }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allotmentSummaryDetails]);

    const extraParams = useMemo(() => {
        const defaultPage = defaultPageProps(filterString);
        return [
            ...defaultPage,
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
                //name: productHierarchyData?.find((i) => i?.prodctCode === filterString?.model)?.prodctShrtName,
                name: FindProductName(productHierarchyData, filterString?.model),
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
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, searchParamValue, toggleButton]);

    useEffect(() => {
        return () => {
            resetData();
            setFilterString();
            resetDetail();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId && !isOTFSearchLoading && extraParams) {
            setShowDataLoading(true);
            fetchVehicleAllotmentSearchedList({ customURL: customURL + '/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

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
                    titleOverride: translateContent('orderDeliveryVehicleAllotment.heading.titleOverride'),
                    closable: true,
                    icon: false,
                    onCloseAction: onCloseConfirmationModalAction,
                    onSubmitAction: () => handleVehicleAllotment(record, buttonAction),
                    submitText: 'Yes',
                    text: translateContent('orderDeliveryVehicleAllotment.label.unallotBooking'),
                    content: selectedOTFDetails ? selectedOTFDetails?.bookingNumber || selectedOTFDetails?.otfNumber : '',
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
                fetchVehicleAllotmentDetails({ setIsLoading: listDetailShowLoading, userId, extraParams: extraParamData, onSuccessAction, onErrorAction });
                setIsFormVisible(true);
                break;

            default:
                break;
        }
        //setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, orderStatus: record?.orderStatus }));
    };

    const onFinishSearch = (values) => {};

    const handleResetFilter = (e) => {
        const { pageSize } = filterString;
        setFilterString({ pageSize, current: 1 });
        setSearchParamValue();
        setShowDataLoading(true);
        advanceFilterForm.resetFields();
        setAdvanceSearchVisible(false);
    };

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'modelValue') {
            const { model, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'vehicleStatusValue') {
            const { vehicleStatus, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'pdiDoneValue') {
            const { pdDone, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const handleVehicleAllotment = (req, buttonAction) => {
        if (!selectedOTFDetails) {
            showGlobalNotification({ message: translateContent('orderDeliveryVehicleAllotment.validation.selectBooking') });
            return false;
        }

        let updatedStatus = '';
        if (buttonAction === FROM_ACTION_TYPE?.ALLOT) {
            updatedStatus = VEHICLE_TYPE?.ALLOTED.key;
        } else {
            updatedStatus = VEHICLE_TYPE?.UNALLOTED.key;
        }

        const { otfId, otfNumber, bookingNumber } = selectedOTFDetails;
        const { vehicleIdentificationNumber } = allotmentSummaryDetails;

        // let data = { ...allotmentSummaryDetails, vehicleOTFDetails: selectedOTFDetails, allotmentStatus: updatedStatus };
        let data = { otfId, otfNumber, bookingNumber, allotmentStatus: updatedStatus, vehicleIdentificationNumber };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title:  translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
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

            showGlobalNotification({ notificationType: 'success', title:  translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchVehicleAllotmentSearchedList({ customURL: customURL + '/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });

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
        searchForm.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        resetDetail();
        setResetAdvanceFilter(true);
        setAdvanceSearchVisible(false);

        setSelectedOrder();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        setSelectedOrderOTFDetails();
    };

    const fixedWith = toggleButton === VEHICLE_TYPE.ALLOTED.key;
    const tableProps = {
        dynamicPagination,
        filterString,
        setPage: setFilterString,
        isLoading: showDataLoading,
        tableColumn: tableColumn(handleButtonClick, toggleButton, fixedWith),
        tableData: allotmentSearchedList?.paginationData,
        totalRecords: allotmentSearchedList?.totalRecords,
        showAddButton: false,
        scroll: fixedWith ? { x: 1400 } : '',
    };

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const title = translateContent('orderDeliveryVehicleAllotment.heading.title');

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
        resetAdvanceFilter,
        setResetAdvanceFilter,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        // icon: <FilterIcon size={20} />,
        titleOverride: translateContent('global.advanceFilter.title'),
        onCloseAction: onAdvanceSearchCloseAction,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        typeData,
        onFinishSearch,
        productHierarchyData,
        resetAdvanceFilter,
        setResetAdvanceFilter,
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return translateContent('global.drawerTitle.view');
        } else if (formActionType?.editMode) {
            return translateContent('global.drawerTitle.edit');;
        } else {
            return translateContent('global.drawerTitle.addNew');
        }
    }, [formActionType]);
    const containerProps = {
        userId,
        toggleButton,
        formData: allotmentSummaryDetails,
        searchForm,

        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(translateContent('orderDeliveryVehicleAllotment.heading.allotmentDetails')),
        tableData: data,
        totalOTFRecords,
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
        resetAdvanceFilter,
        setResetAdvanceFilter,
        isVehicleDataLoading,
        isLoading: isDetailLoading || isVehicleDataLoading,
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
