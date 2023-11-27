/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Form, Row } from 'antd';
import { bindActionCreators } from 'redux';
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { ListDataTable } from 'utils/ListDataTable';
import { ManufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy/manufacturerAdminHierarchy';
import AdvanceFilter from './AdvanceFilter';
import { AdvancedSearch } from './AdvancedSearch';
import { VehicleSalesSchemeMasterUpload } from './VehicleSalesSchemeMasterUpload';
import { vehicleSalesSchemeMaster } from 'store/actions/data/vehicleSalesSchemeMaster';
import { convertDateTime, dateFormatView, formattedCalendarDate } from 'utils/formatDateTime';
import { BASE_URL_VEHICLE_SALES_SCHEME_MASTER_DETAILS as customURL, BASE_URL_VEHICLE_SALES_SCHEME_MASTER_UPLOAD as customUploadURL } from 'constants/routingApi';
import { PARAM_MASTER } from 'constants/paramMaster';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { vehicleSalesSchemeMasterUpload } from 'store/actions/data/vehicleSalesSchemeMasterUpload';
import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';
import { tncProductHierarchyDataActions } from 'store/actions/data/termsConditions/tncProductHierarchy';
import { NEXT_ACTION } from 'utils/btnVisiblity';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { DisableParent } from 'components/common/ProductHierarchy/ProductHierarchyUtils';
import { zoneMasterDataAction } from 'store/actions/data/zoneMaster';
import { areaOfficeDataAction } from 'store/actions/data/areaOfficeLov';
import { amcSchemeCategoryDataAction } from 'store/actions/data/amcSchemeCategoryLov';
import { rsaSchemeCategoryDataAction } from 'store/actions/data/rsaSchemeCategoryLov';
import { shieldSchemeCategoryDataAction } from 'store/actions/data/shieldSchemeCategoryLov';
import { translateContent } from 'utils/translateContent';
import { ENCASH_CONSTANTS } from './constants/encashContants';
import { SCHEME_TYPE_CONSTANTS } from './constants/schemeTypeConstants';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ProductHierarchy: { data: productHierarchyData = [] },
            AMCSchemeCategoryLov: { isLoaded: isAmcSchemeCategoryDataLoaded = false, isLoading: isAmcSchemeCategoryLoading, data: amcSchemeCategoryData = [] },
            RSASchemeCategoryLov: { isLoaded: isRsaSchemeCategoryDataLoaded = false, isLoading: isRsaSchemeCategoryLoading, data: rsaSchemeCategoryData = [] },
            ShieldSchemeCategoryLov: { isLoaded: isShieldSchemeCategoryDataLoaded = false, isLoading: isShieldSchemeCategoryLoading, data: shieldSchemeCategoryData = [] },
            ZoneMaster: { isLoaded: isZoneMasterDataLoaded = false, isLoading: isZoneMasterLoading, data: zoneMasterData = [] },
            AreaOffice: { isLoaded: isAreaOfficeDataLoaded = false, isLoading: isAreaOfficeLoading, data: areaOfficeData = [] },

            ManufacturerAdmin: {
                ManufacturerAdminHierarchy: { isDataLoaded: isManufacturerAdminLoaded = false, isLoading: ManufacturerAdminHierarchyLoading, data: manufacturerAdminHierarchyData = [] },
            },
            ManufacturerOrgHierarchy: { isLoaded: isManufacturerOrgLoaded = false, isLoading: isDataOrgLoading, data: manufacturerOrgHierarchyData = [] },
            CustomerMaster: {
                ViewDocument: { isLoaded: isViewDataLoaded = false, data: viewDocument },
            },
            VehicleSalesSchemeMaster: { isLoaded: isVehicleSalesSchemeDataLoaded = false, isLoading: isVehicleSalesSchemeLoading = false, data, detailData: vehicleSalesSchemeDetails = [] },
            VehicleSalesSchemeMasterUpload: { isLoaded: isVehicleSalesSchemeUploadDataLoaded = false, isLoading: isVehicleSalesSchemeUploadDataLoading = false, data: vehicleSalesSchemeUploadData = [] },
        },
    } = state;
    const moduleTitle = translateContent('vehicleSalesSchemeMaster.heading.moduleTitle');
    let returnValue = {
        userId,
        isVehicleSalesSchemeDataLoaded,
        isVehicleSalesSchemeLoading,
        vehicleSalesSchemeData: data?.paginationData,
        productHierarchyDataList: productHierarchyData,
        isManufacturerAdminLoaded,
        ManufacturerAdminHierarchyLoading,
        manufacturerAdminHierarchyData,
        totalRecords: data?.totalRecords || [],
        moduleTitle,
        typeData,
        schemeTypeData: typeData[PARAM_MASTER.SCHEME_TYPE?.id],
        offerTypeData: typeData[PARAM_MASTER.OFFER_TYPE?.id],
        encashTypeData: typeData[PARAM_MASTER.ENCASH?.id],
        isViewDataLoaded,
        viewDocument,
        isVehicleSalesSchemeUploadDataLoaded,
        isVehicleSalesSchemeUploadDataLoading,
        vehicleSalesSchemeUploadData,
        vehicleSalesSchemeDetails,
        isManufacturerOrgLoaded,
        manufacturerOrgHierarchyData,
        isDataOrgLoading,
        isAmcSchemeCategoryDataLoaded,
        isAmcSchemeCategoryLoading,
        amcSchemeCategoryData,
        isRsaSchemeCategoryDataLoaded,
        isRsaSchemeCategoryLoading,
        rsaSchemeCategoryData,
        isShieldSchemeCategoryDataLoaded,
        isShieldSchemeCategoryLoading,
        shieldSchemeCategoryData,
        isZoneMasterDataLoaded,
        isZoneMasterLoading,
        zoneMasterData,
        isAreaOfficeDataLoaded,
        isAreaOfficeLoading,
        areaOfficeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchAdminList: ManufacturerAdminHierarchyDataActions.fetchList,
            DetailLoading: ManufacturerAdminHierarchyDataActions.listShowLoading,

            fetchProductList: productHierarchyDataActions.fetchList,
            listProductMainShowLoading: productHierarchyDataActions.listShowLoading,

            fetchViewDocument: documentViewDataActions.fetchList,
            viewListShowLoading: documentViewDataActions.listShowLoading,
            resetViewData: documentViewDataActions.reset,

            uploadDocumentFile: supportingDocumentDataActions.uploadFile,
            downloadFile: supportingDocumentDataActions.downloadFile,
            downloadShowLoading: supportingDocumentDataActions.listShowLoading,

            manufacturerOrgFetchList: manufacturerOrgHierarchyDataActions.fetchList,
            manufacturerOrgListShowLoading: manufacturerOrgHierarchyDataActions.listShowLoading,

            fetchDocumentFileDocId: vehicleSalesSchemeMasterUpload.fetchList,
            saveVehicleSalesSchemeData: vehicleSalesSchemeMasterUpload.saveData,
            vehicleSalesSchemelistShowLoading: vehicleSalesSchemeMasterUpload.listShowLoading,
            resetUploadSalesSchemeData: vehicleSalesSchemeMasterUpload.reset,

            fetchModelList: productHierarchyDataActions.fetchList,

            fetchProductLovList: tncProductHierarchyDataActions.fetchList,
            listProductShowLoading: tncProductHierarchyDataActions.listShowLoading,

            fetchAmcSchemeCategoryLovList: amcSchemeCategoryDataAction.fetchList,
            listAmcSchemeCategoryLovListShowLoading: amcSchemeCategoryDataAction.listShowLoading,

            fetchRsaSchemeCategoryLovList: rsaSchemeCategoryDataAction.fetchList,
            listRsaSchemeCategoryLovListShowLoading: rsaSchemeCategoryDataAction.listShowLoading,

            fetchShieldSchemeCategoryLovList: shieldSchemeCategoryDataAction.fetchList,
            listShieldSchemeCategoryLovListShowLoading: shieldSchemeCategoryDataAction.listShowLoading,

            fetchZoneMasterList: zoneMasterDataAction.fetchList,
            listZoneMasterShowLoading: zoneMasterDataAction.listShowLoading,

            fetchAreaOfficeList: areaOfficeDataAction.fetchList,
            listAreaOfficeListShowLoading: areaOfficeDataAction.listShowLoading,

            fetchList: vehicleSalesSchemeMaster.fetchList,
            fetchDetail: vehicleSalesSchemeMaster.fetchDetail,
            listShowLoading: vehicleSalesSchemeMaster.listShowLoading,
            saveData: vehicleSalesSchemeMaster.saveData,
            resetDetailData: vehicleSalesSchemeMaster.resetDetail,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleSalesSchemeMasterBase = (props) => {
    const { data, saveData, fetchList, userId, fetchProductLovList, listShowLoading, showGlobalNotification, fetchDetail, amcSchemeCategoryData, shieldSchemeCategoryData } = props;
    const { isVehicleSalesSchemeDataLoaded, listProductShowLoading, vehicleSalesSchemeData, schemeTypeData, encashTypeData, offerTypeData, rsaSchemeCategoryData } = props;
    const { typeData, resetViewData, fetchViewDocument, viewDocument, viewListShowLoading, isViewDataLoaded, isVehicleSalesSchemeUploadDataLoaded, isVehicleSalesSchemeUploadDataLoading, vehicleSalesSchemeUploadData, downloadFile, resetUploadSalesSchemeData, totalRecords, downloadShowLoading, manufacturerOrgHierarchyData, DetailLoading, fetchAmcSchemeCategoryLovList, listAmcSchemeCategoryLovListShowLoading } = props;
    const { accessToken, resetDetailData, token, vehicleSalesSchemeDetails, fetchDocumentFileDocId, saveVehicleSalesSchemeData, vehicleSalesSchemelistShowLoading, manufacturerOrgFetchList, manufacturerOrgListShowLoading, fetchModelList, productHierarchyDataList, fetchRsaSchemeCategoryLovList, fetchShieldSchemeCategoryLovList, listRsaSchemeCategoryLovListShowLoading, listShieldSchemeCategoryLovListShowLoading, fetchZoneMasterList, listZoneMasterShowLoading, fetchAreaOfficeList, listAreaOfficeListShowLoading, zoneMasterData, areaOfficeData } = props;
    const DEFAULT_PAGINATION = { pageSize: 10, current: 1 };

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [productHierarchyForm] = Form.useForm();
    const [addZoneAreaForm] = Form.useForm();
    const [addSchemeForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [refershData, setRefershData] = useState(false);
    const [searchValue, setSearchValue] = useState(false);
    const [filterString, setFilterString] = useState(DEFAULT_PAGINATION);
    const [formData, setFormData] = useState({});

    const [isFormVisible, setIsFormVisible] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [openAccordian, setOpenAccordian] = useState('');
    const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);
    const [isViewDetailVisible, setIsViewDetailVisible] = useState(false);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [tableDataItem, setTableDataItem] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [emptyList, setEmptyList] = useState(true);
    const [uploadedFileName, setUploadedFileName] = useState();
    const [uploadedFile, setUploadedFile] = useState();
    const [schemeCategoryList, setSchemeCategoryList] = useState({ amc: false, rsa: false, shield: false });
    const [schemeData, isSchemeData] = useState([]);

    const [productAddMode, setProductAddMode] = useState(false);
    const [saleService, setSaleService] = useState({ sales: false, service: false });
    const [page, setPage] = useState({});
    const [organizationId, setOrganizationId] = useState('');
    const [selectedTreeData, setSelectedTreeData] = useState();
    const [productHierarchyData, setProductHierarchyData] = useState([]);
    const [zoneTableDataItem, setZoneTableDataItem] = useState([]);
    const [zone, setZone] = useState();
    const [productSelectedData, setProductSelectedData] = useState();
    const [schemeCategorySelect, setSchemeCategorySelect] = useState();
    const [disableAmountTaxField, setDisableAmountTaxField] = useState(false);
    const [taxField, setTaxField] = useState();
    const [singleDisabled, setSingleDisabled] = useState(false);

    const dynamicPagination = true;
    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const fieldNames = { title: 'manufactureOrgShrtName', key: 'id', children: 'subManufactureOrg' };

    const onRemove = () => {
        setFileList([]);
        setUploadedFile();
        setSingleDisabled(false);
    };

    const makeExtraparms = (Params) => {
        const extraParams = [];
        Params?.map((element) => {
            const { key, title, value, name } = element;
            extraParams.push({
                key: key,
                title: title,
                value: value,
                name: name,
            });
            return undefined;
        });
        return extraParams;
    };

    useEffect(() => {
        setProductHierarchyData(productHierarchyDataList?.map((i) => DisableParent(i, 'subProdct')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyDataList]);

    useEffect(() => {
        if (isVehicleSalesSchemeDataLoaded) {
            setFormData(vehicleSalesSchemeDetails);
            vehicleSalesSchemeDetails && addSchemeForm.setFieldsValue({ ...vehicleSalesSchemeDetails, validityFromDate: formattedCalendarDate(vehicleSalesSchemeDetails?.validityFromDate), validityToDate: formattedCalendarDate(vehicleSalesSchemeDetails?.validityToDate), vehicleInvoiceFromDate: formattedCalendarDate(vehicleSalesSchemeDetails?.vehicleInvoiceFromDate), vehicleInvoiceToDate: formattedCalendarDate(vehicleSalesSchemeDetails?.vehicleInvoiceToDate) });
            setSchemeCategorySelect(vehicleSalesSchemeDetails?.schemeType);
            handleSchemeCategory(vehicleSalesSchemeDetails?.schemeType);
            vehicleSalesSchemeDetails?.offerType && setTaxField(vehicleSalesSchemeDetails?.offerType);
        }
        if (vehicleSalesSchemeDetails?.productDetails) {
            setTableDataItem(vehicleSalesSchemeDetails?.productDetails?.map((i) => ({ ...i, status: true })));
        }

        if (vehicleSalesSchemeDetails?.zoneAreaDetails) {
            setZoneTableDataItem(vehicleSalesSchemeDetails?.zoneAreaDetails?.map((i) => ({ ...i, status: true })));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVehicleSalesSchemeDataLoaded, vehicleSalesSchemeDetails]);

    useEffect(() => {
        if (userId) {
            setFilterString({ ...filterString, pageSize: 10, current: 1 });
            manufacturerOrgFetchList({ setIsLoading: manufacturerOrgListShowLoading, userId, errorAction: onErrorAction });
            fetchProductLovList({ setIsLoading: listProductShowLoading, userId });
            fetchZoneMasterList({ setIsLoading: listZoneMasterShowLoading, userId });

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
        if (schemeCategoryList?.amc) {
            fetchAmcSchemeCategoryLovList({ setIsLoading: listAmcSchemeCategoryLovListShowLoading, userId });
        } else if (schemeCategoryList?.rsa) {
            fetchRsaSchemeCategoryLovList({ setIsLoading: listRsaSchemeCategoryLovListShowLoading, userId });
        } else if (schemeCategoryList?.shield) {
            fetchShieldSchemeCategoryLovList({ setIsLoading: listShieldSchemeCategoryLovListShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schemeCategoryList]);

    useEffect(() => {
        if (schemeCategoryList?.amc && amcSchemeCategoryData?.length > 0) {
            isSchemeData(amcSchemeCategoryData);
        } else if (schemeCategoryList?.rsa && rsaSchemeCategoryData?.length > 0) {
            isSchemeData(rsaSchemeCategoryData);
        } else if (schemeCategoryList?.shield && shieldSchemeCategoryData?.length > 0) {
            isSchemeData(shieldSchemeCategoryData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amcSchemeCategoryData, rsaSchemeCategoryData, shieldSchemeCategoryData]);

    useEffect(() => {
        if (userId && organizationId) {
            if (!organizationId) return;
            manufacturerOrgFetchList({ setIsLoading: DetailLoading, extraParams: makeExtraparms([{ key: 'manufacturerOrgId', title: 'manufacturerOrgId', value: organizationId, name: 'manufacturerOrgId' }]), userId, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organizationId, userId]);

    const defaultExtraParam = useMemo(() => {
        return [
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
    }, [filterString]);

    const extraParams = useMemo(() => {
        if (filterString) {
            return [
                ...defaultExtraParam,
                {
                    key: 'searchType',
                    title: 'Search Type',
                    value: filterString?.searchType,
                    name: typeData?.[PARAM_MASTER.SCHEME_CODE.id]?.find((i) => i?.key === filterString?.searchType)?.value,
                    canRemove: false,
                    filter: true,
                },
                {
                    key: 'searchParam',
                    title: 'Search Param',
                    value: filterString?.searchParam,
                    name: filterString?.searchParam,
                    canRemove: true,
                    filter: true,
                },
                {
                    key: 'schemeType',
                    title: 'Scheme Type',
                    value: filterString?.schemeType,
                    name: schemeTypeData?.find((i) => i?.key === filterString?.schemeType)?.value,
                    canRemove: true,
                    filter: true,
                },
                {
                    key: 'encash',
                    title: 'Encash',
                    value: filterString?.encash,
                    name: encashTypeData?.find((i) => i?.key === filterString?.encash)?.value,
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
            ];
        } else {
            return defaultExtraParam;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, searchValue, defaultExtraParam]);

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    const downloadReport = (documentId) => {
        const onSuccessAction = (res) => {
            setFileList([]);
            setUploadedFile();
            setUploadedFileName();
            resetUploadSalesSchemeData();
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage, placement: 'bottomRight' });
        };

        const onErrorAction = (res) => {
            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: res, placement: 'bottomRight' });
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
        resetUploadSalesSchemeData();
    };

    const onFinishUploadScheme = (values) => {
        let data = { docId: uploadedFile };

        const onSuccess = (res) => {
            setIsUploadFormVisible(false);
            setEmptyList(false);
            setUploadedFile();
            setFileList([]);
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        };

        const onError = (res, data) => {
            let message = res;
            if (data?.docId) {
                message = (
                    <>
                        {message}
                        <Button type="link" onClick={() => downloadReport(data?.docId)}>
                            {translateContent('vehicleSalesSchemeMaster.label.downloadHere')}
                        </Button>
                    </>
                );
            }

            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: message });
        };

        const requestData = {
            data: data,
            method: values?.id ? 'put' : 'post',
            setIsLoading: vehicleSalesSchemelistShowLoading,
            userId,
            onError,
            onSuccess,
            customURL: customUploadURL,
        };
        saveVehicleSalesSchemeData(requestData);
        form.resetFields();
        setSingleDisabled(false);
    };

    const handleSchemeCategory = (value) => {
        const disabledAmountField = value !== '';

        if (value === SCHEME_TYPE_CONSTANTS?.AMC_FOC?.key) {
            setSchemeCategoryList({ amc: true, rsa: false, shield: false });
            setDisableAmountTaxField(disabledAmountField);
        } else if (value === SCHEME_TYPE_CONSTANTS?.RSA_FOC?.key) {
            setSchemeCategoryList({ amc: false, rsa: true, shield: false });
            setDisableAmountTaxField(disabledAmountField);
        } else if (value === SCHEME_TYPE_CONSTANTS?.SHIELD_FOC?.key) {
            setSchemeCategoryList({ amc: false, rsa: false, shield: true });
            setDisableAmountTaxField(disabledAmountField);
        } else {
            setDisableAmountTaxField(!disabledAmountField);
        }
        setSchemeCategorySelect(value);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        addSchemeForm.resetFields();
        setTableDataItem([]);
        if (buttonAction === VIEW_ACTION || buttonAction === EDIT_ACTION) {
            //setFormData([])
            const extraParams = [
                {
                    key: 'id',
                    title: 'id',
                    value: record?.id,
                    name: 'id',
                },
            ];

            fetchDetail({ setIsLoading: listShowLoading, userId, extraParams, customURL, onErrorAction });
        }

        if (buttonAction !== NEXT_ACTION && !(buttonAction === VIEW_ACTION)) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData({ ...buttonData, closeBtn: true, cancelBtn: false, saveBtn: true, formBtnActive: true, buttonAction, saveAndNewBtn: false });
        } else if (buttonAction === VIEW_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData({ closeBtn: true });
        }

        //setFormData(record);
        setIsFormVisible(true);
        setIsViewDetailVisible(true);
    };

    const handleZoneChange = (value) => {
        const extraParams = [
            {
                key: 'zone',
                value: value,
            },
        ];
        fetchAreaOfficeList({ setIsLoading: listAreaOfficeListShowLoading, userId, extraParams });
    };

    const onSearchHandle = (value) => {
        setPage({ ...page, current: 1 });
        setFilterString({ ...filterString, advanceFilter: true, searchParam: value });
        setSearchValue(value);
    };

    const handleResetFilter = (e) => {
        setFilterString((prev) => ({ current: 1, pageSize: prev?.pageSize }));
        setShowDataLoading(false);
        advanceFilterForm.resetFields();
    };

    const handleClearInSearch = (e) => {
        if (e?.target?.value === '') {
            setFilterString((prev) => ({ current: 1, pageSize: prev?.pageSize }));
            searchForm.resetFields();
            setShowDataLoading(false);
        } else if (e.target.value.length > 2) {
            searchForm.validateFields(['code']);
        }
    };
    const handleOnClick = () => {
        setButtonData({ ...defaultBtnVisiblity, saveAndNewBtn: false, cancelBtn: true, saveBtn: true });
        setIsUploadFormVisible(true);
    };

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            const { id: key } = node;
            dataList.push({
                key,
                data: node,
            });
            if (node[fieldNames?.children]) {
                generateList(node[fieldNames?.children]);
            }
        }
        return dataList;
    };

    const flatternData = generateList(manufacturerOrgHierarchyData);

    const handleTreeViewClick = (keys) => {
        setButtonData({ ...defaultBtnVisiblity });
        setSelectedTreeSelectKey([]);
        setSelectedTreeData([]);

        setFormActionType(FROM_ACTION_TYPE.VIEW);
        if (keys && keys.length > 0) {
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            setSelectedTreeSelectKey(keys);
        }
        if (formData) {
            const manufactureOrgShortName = flatternData.find((i) => formData?.data?.manufactureOrganizationId === i.key)?.data?.manufactureAdminShortName;
            setSelectedTreeData({ ...formData?.data, parentName: manufactureOrgShortName });
        }
    };

    const handleSelectTreeClick = (value, name) => {
        setProductSelectedData({ value, name });
        let obj = {
            modelCode: value,
        };
        productHierarchyForm.setFieldsValue(obj);
        setSelectedTreeSelectKey(value);
    };
    const encashTypeFn = (values) => {
        let encash = '';
        if (values?.sales && values?.service) {
            encash = ENCASH_CONSTANTS.ALL?.key;
        } else if (values?.sales && !values?.service) {
            encash = ENCASH_CONSTANTS.SALES?.key;
        } else if (!values?.sales && values?.service) {
            encash = ENCASH_CONSTANTS.SERVICE?.key;
        } else if (!values?.sales && !values?.service) {
            encash = ENCASH_CONSTANTS.NO?.key;
        }

        return encash;
    };

    const onFinish = (values) => {
        if (tableDataItem?.length === 0 && zoneTableDataItem?.length === 0) {
            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('vehicleSalesSchemeMaster.label.errorMessage3') });
            return;
        } else if (zoneTableDataItem?.length === 0 && tableDataItem?.length !== 0) {
            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('vehicleSalesSchemeMaster.label.errorMessage2') });
            return;
        } else if (zoneTableDataItem?.length !== 0 && tableDataItem?.length === 0) {
            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('vehicleSalesSchemeMaster.label.errorMessage1') });
            return;
        }
        let data = { ...values, id: values?.id || '', productDetails: tableDataItem, zoneAreaDetails: zoneTableDataItem, moHierarchyMstId: organizationId, encash: encashTypeFn(values) };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });

            setButtonData({ ...buttonData, formBtnActive: false });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            }
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
            customURL,
        };

        saveData(requestData);
    };

    const onCloseAction = () => {
        addSchemeForm.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setTaxField(undefined);
        setZoneTableDataItem([]);
    };

    const onAdvanceSearchCloseAction = () => {
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const onCloseActionViewDetails = () => {
        setIsViewDetailVisible(false);
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return translateContent('global.drawerTitle.view');
        } else if (formActionType?.editMode) {
            return translateContent('global.drawerTitle.edit');
        } else {
            return translateContent('global.drawerTitle.add');
        }
    }, [formActionType]);

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'toDate' || key === 'fromDate') {
            setFilterString();
            advanceFilterForm.resetFields();
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const showAddButton = false;
    const formProps = {
        form,
        formData,
        setFormData,
        formActionType,
        setFormActionType,
        onFinish,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(" ").concat(translateContent('vehicleSalesSchemeMaster.heading.moduleTitle')),
        buttonData,
        setButtonData,
        handleButtonClick,
        handleResetFilter,
        listShowLoading,
        showGlobalNotification,
        openAccordian,
        setOpenAccordian,
        productHierarchyData,
        selectedTreeSelectKey,
        setSelectedTreeSelectKey,
        handleSelectTreeClick,
        productHierarchyForm,
        addZoneAreaForm,
        addSchemeForm,
        typeData,
        vehicleSalesSchemeData,
        tableDataItem,
        zoneTableDataItem,
        setZoneTableDataItem,
        setTableDataItem,
        isViewDetailVisible,
        onCloseActionViewDetails,
        schemeTypeData,
        offerTypeData,
        encashTypeData,
        filterString,
        advanceFilterForm,
        fetchDocumentFileDocId,
        saveVehicleSalesSchemeData,
        vehicleSalesSchemelistShowLoading,
        saleService,
        setSaleService,
        fieldNames,
        manufacturerOrgHierarchyData,
        organizationId,
        setOrganizationId,
        handleTreeViewClick,
        selectedTreeData,
        flatternData,
        zoneMasterData,
        areaOfficeData,
        zone,
        setZone,
        handleZoneChange,
        productHierarchyDataList,
        schemeCategoryList,
        setSchemeCategoryList,
        schemeData,
        productSelectedData,
        setProductSelectedData,
        schemeCategorySelect,
        setSchemeCategorySelect,
        handleSchemeCategory,
        disableAmountTaxField,
        taxField,
        setTaxField,
        resetDetailData,
        productAddMode,
        setProductAddMode,
    };

    const tableProps = {
        tableColumn: tableColumn({ handleButtonClick, schemeTypeData, encashTypeData, formActionType }),
        tableData: vehicleSalesSchemeData,
        showAddButton,
        page: filterString,
        setPage: setFilterString,
        totalRecords,
        dynamicPagination,
    };

    const title = translateContent('vehicleSalesSchemeMaster.heading.title');

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        titleOverride: translateContent('global.advanceFilter.title'),
        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        searchForm,
        onFinishUploadScheme,
        onSearchHandle,
        handleClearInSearch,
        handleButtonClick,
        setAdvanceSearchVisible,
        advanceFilterForm,
        title,
        typeData,
        extraParams,
    };
    const advanceFilterResultProps = {
        advanceFilterForm,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        searchForm,
        setAdvanceSearchVisible,
        productHierarchyForm,
        onFinish,
        handleButtonClick,
        handleResetFilter,
        showAddButton: true,
        title,
        data,
        handleOnClick,
        typeData,
        schemeTypeData,
        encashTypeData,
        extraParams,
        removeFilter,
    };
    const uploadProps = {
        isVisible: isUploadFormVisible,
        titleOverride: title.concat(translateContent('global.buttons.upload')),
        onCloseAction: () => {
            setIsUploadFormVisible(false);
            form.resetFields();
            setFileList([]);
            resetViewData();
            setSingleDisabled(false);
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
        onFinishUploadScheme,
        uploadedFileName,
        setUploadedFileName,
        isViewDataLoaded,
        isVehicleSalesSchemeUploadDataLoaded,
        isVehicleSalesSchemeUploadDataLoading,
        vehicleSalesSchemeUploadData,
        downloadFile,
        listShowLoading,

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
        uploadButtonName: translateContent('vehicleSalesSchemeMaster.button.upload'),
        messageText: translateContent('vehicleSalesSchemeMaster.text.messageText'),
        validationText: translateContent('vehicleSalesSchemeMaster.text.validationText'),
        supportedFileTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        maxSize: 8,
        downloadShowLoading,
        singleDisabled,
        setSingleDisabled,
        onRemove,
        single: true,
    };

    return (
        <>
            <AdvanceFilter {...advanceFilterResultProps} />
            <AdvancedSearch {...advanceFilterProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} handleAdd={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })} addTitle={title} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />

            <VehicleSalesSchemeMasterUpload {...uploadProps} />
        </>
    );
};

export const VehicleSalesSchemeMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleSalesSchemeMasterBase);
