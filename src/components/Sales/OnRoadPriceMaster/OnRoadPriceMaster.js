/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Form, Row, Button } from 'antd';
import { tableColumn } from './tableColumn';
import { AdvancedSearch } from './AdvancedSearch';
import ListDataTable from 'utils/ListDataTable/ListDataTable';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { showGlobalNotification } from 'store/actions/notification';
import { FilterIcon } from 'Icons';
import { ViewDetail } from './ViewDetail';
import { OnRoadPriceMasterUpload } from './OnRoadPriceMasterUpload';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, CANCEL_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import AdvanceOnRoadPriceMasterFilter from './AdvanceOnRoadPriceMasterFilter';
import { onRoadPriceMasterAction } from 'store/actions/data/vehicle/onRoadPriceMasterAction';
import { AddEditForm } from './AddEditForm';
import { viewOnRoadPriceDetailAction } from 'store/actions/data/vehicle/viewOnRoadPriceDetailAction';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            CustomerMaster: {
                ViewDocument: { isLoaded: isViewDataLoaded = false, data: viewDocument },
            },
            SupportingDocument: { isLoaded: isSupportingDataLoaded = false, isSupportingDataLoading, data: supportingData },
            Vehicle: {
                OnRoadPriceMasterDetails: { isLoaded: isVehiclePriceDataLoaded = false, isLoading: isVehiclePriceLoading, data: vehiclePriceData = [], filter: filterString },
                ViewOnRoadPriceDetails: { detailData },
            },
            Geo: {
                City: { isFilteredListLoaded: isCityDataLoaded = false, isLoading: isCityLoading, filteredListData: cityData },
            },
        },
    } = state;

    const moduleTitle = 'On Road Price Master';

    let returnValue = {
        userId,
        accessToken,
        token,
        viewDocument,
        isViewDataLoaded,
        isSupportingDataLoaded,
        isSupportingDataLoading,
        supportingData,
        moduleTitle,
        isCityDataLoaded,
        isCityLoading,
        cityData,
        typeData,
        filterString,
        isVehiclePriceLoading,
        isVehiclePriceDataLoaded,
        vehiclePriceData: vehiclePriceData?.paginationData,
        totalRecords: vehiclePriceData?.totalRecords,
        detailData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchViewDocument: documentViewDataActions.fetchList,
            viewListShowLoading: documentViewDataActions.listShowLoading,
            resetViewData: documentViewDataActions.reset,

            downloadFile: supportingDocumentDataActions.downloadFile,
            listShowLoading: supportingDocumentDataActions.listShowLoading,

            fetchOnRoadPriceList: onRoadPriceMasterAction.fetchList,
            listVehiclePriceShowLoading: onRoadPriceMasterAction.listShowLoading,
            setFilterString: onRoadPriceMasterAction.setFilter,

            fetchOnRoadViewPriceDetail: viewOnRoadPriceDetailAction.fetchDetail,
            listOnRoadViewPriceShowLoading: viewOnRoadPriceDetailAction.listShowLoading,
            saveData: viewOnRoadPriceDetailAction.saveData,
            resetData: viewOnRoadPriceDetailAction.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const OnRoadPriceMasterBase = (props) => {
    const { filterString, setFilterString, saveData, userId, showGlobalNotification, fetchOnRoadViewPriceDetail } = props;
    const { accessToken, token, viewDocument, isViewDataLoaded, viewListShowLoading, resetViewData, fetchViewDocument } = props;
    const { typeData, listVehiclePriceShowLoading, fetchOnRoadPriceList } = props;
    const { moduleTitle, vehiclePriceData, totalRecords, isCityDataLoaded, cityData } = props;
    const { resetData, isSupportingDataLoaded, isSupportingDataLoading, supportingData, downloadFile, listShowLoading } = props;
    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [uploadedFile, setUploadedFile] = useState();
    const [emptyList, setEmptyList] = useState(true);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [fileList, setFileList] = useState([]);
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [refershData, setRefershData] = useState(false);
    const [formData, setFormData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();
    const [currentSection, setCurrentSection] = useState();
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [isCancelVisible, setIsCancelVisible] = useState(false);
    const [vehiclePrice, setVehiclePrice] = useState();
    const [isLoading, showLoading] = useState(true);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setRefershData(false);
        setShowDataLoading(false);
    };

    const onErrorAction = (res) => {
        showGlobalNotification({ message: res });
    };

    useEffect(() => {
        if (filterString) {
            setPage({ ...page, current: 1 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);
    const extraParams = useMemo(() => {
        return [
            {
                key: 'priceType',
                title: 'Pricing Type',
                value: filterString?.priceType,
                name: typeData['PRICING_TYPE']?.find((i) => i?.key === filterString?.priceType)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'model',
                title: 'Model',
                value: filterString?.model,
                name: filterString?.model,
                canRemove: true,
                filter: true,
            },

            {
                key: 'pricingCity',
                title: 'Pricing City',
                value: filterString?.pricingCity,
                name: cityData?.find((i) => i?.code === filterString?.pricingCity)?.name,
                canRemove: true,
                filter: true,
            },

            {
                key: 'changeInExShowroomOrg',
                title: 'Change EX ShowRoom Org',
                value: filterString?.changeInExShowroomOrg,
                name: typeData['CHNG_EX_ORG']?.find((i) => i?.key === filterString?.changeInExShowroomOrg)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'status',
                title: 'Status',
                value: filterString?.status,
                name: typeData['ON_ROAD_STATUS']?.find((i) => i?.key === filterString?.status)?.value,
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
    }, [filterString, page]);

    useEffect(() => {
        if (userId) {
            fetchOnRoadPriceList({ setIsLoading: listVehiclePriceShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    useEffect(() => {
        if (formData?.id) {
            fetchOnRoadViewPriceDetail({
                setIsLoading: () => {},
                userId,
                extraParams: [
                    {
                        key: 'id',
                        value: formData?.id,
                    },
                ],
                onSuccessAction: (res) => {
                    setVehiclePrice(res.data);
                    showLoading(false);
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        showLoading(true);
        setFormData(record);
        setIsFormVisible(true);
        if (buttonAction === 'edit') {
            setCurrentPage('edit');
        } else {
            setCurrentPage('view');
        }
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                break;
            case EDIT_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.id);
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.id);
                defaultSection && setCurrentSection(defaultSection);
                break;
            case CANCEL_ACTION:
                setIsCancelVisible(true);
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
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, orderStatus: record?.status }));
        }
    };

    const downloadReport = (documentId) => {
        const onSuccessAction = (res) => {
            setFileList([]);
            setUploadedFile();
            setUploadedFileName();
            resetData();
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
        };

        const onErrorAction = (res) => {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: res, placement: 'bottomRight' });
        };

        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: documentId,
                name: 'docId',
            },
        ];
        downloadFile({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        resetData();
    };

    const onFinish = (values) => {
        let data = { docId: uploadedFile };
        const onSuccess = (res) => {
            setIsUploadFormVisible(false);
            setEmptyList(false);
            setUploadedFile();
            setFileList([]);

            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };

        const onError = (res, data) => {
            let message = res;
            if (data?.docId) {
                message = (
                    <>
                        {message}
                        <Button type="link" onClick={() => downloadReport(data?.docId)}>
                            Download Here
                        </Button>
                    </>
                );
            }

            showGlobalNotification({ notificationType: 'error', title: 'Error', message: message });
        };

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listVehiclePriceShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        isLoading: showDataLoading,
        tableColumn: tableColumn(handleButtonClick),
        tableData: vehiclePriceData,
    };

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
    };

    const handleResetFilter = () => {
        setFilterString();
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: true, keyword: value });
            listFilterForm.setFieldsValue({ code: undefined });
        }
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        isCityDataLoaded,
        cityData,

        filterString,
        setFilterString,
        advanceFilterForm,
        // resetData,
        handleResetFilter,
        onSearchHandle,
        setAdvanceSearchVisible,

        typeData,
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
    const handleOnClick = () => {
        setButtonData({ ...defaultBtnVisiblity, saveAndNewBtn: false, cancelBtn: false, saveBtn: true });
        setIsUploadFormVisible(true);
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
    const title = 'On Road Price Master';

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        onRoadFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        handleResetFilter,
        advanceFilterForm,
        title,
        setAdvanceSearchVisible,
        typeData,
        searchForm,
        handleOnClick,
    };

    const uploadProps = {
        isVisible: isUploadFormVisible,
        titleOverride: 'Upload OnRoad Price Master Form',
        onCloseAction: () => {
            setIsUploadFormVisible(false);
            form.resetFields();
            setFileList([]);
            resetViewData();
        },
        buttonData,
        setButtonData,
        form,
        typeData,
        userId,
        accessToken,
        token,
        saveData,
        onFinish,
        uploadedFileName,
        setUploadedFileName,
        isViewDataLoaded,
        isSupportingDataLoaded,
        isSupportingDataLoading,
        supportingData,
        downloadFile,
        listShowLoading,
        listVehiclePriceShowLoading,
        showGlobalNotification,
        viewDocument,
        viewListShowLoading,
        fileList,
        setFileList,
        uploadedFile,
        setUploadedFile,
        emptyList,
        setEmptyList,
        fetchViewDocument,
        resetViewData,
        uploadButtonName: 'Upload OnRoad Price Master',
        messageText: 'Click or drop your file here to upload',
        validationText: 'File type should be .xlxs and max file size to be 8Mb',
        supportedFileTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        maxSize: 8,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData: { ...defaultBtnVisiblity },
        // buttonData,
        setButtonData,
        handleButtonClick,
    };
    const viewProps = {
        titleOverride: drawerTitle.concat(moduleTitle),
        isVisible: isFormVisible,
        onCloseAction,
        formData,
        buttonProps,
        buttonData,
        setButtonData,
        onErrorAction,
        vehiclePrice,
        setVehiclePrice,
        isLoading,
        fetchOnRoadViewPriceDetail,
        saveData,
        handleButtonClick,
        userId,
        listShowLoading,
        form,
        NEXT_ACTION,
        isFormVisible,
        setIsFormVisible,
        showGlobalNotification,
    };

    return (
        <>
            <AdvanceOnRoadPriceMasterFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable showAddButton={false} isLoading={false} {...tableProps} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            {currentPage === 'edit' ? <AddEditForm {...viewProps} /> : <ViewDetail {...viewProps} />}
            <OnRoadPriceMasterUpload {...uploadProps} />
        </>
    );
};

export const OnRoadPriceMaster = connect(mapStateToProps, mapDispatchToProps)(OnRoadPriceMasterBase);
