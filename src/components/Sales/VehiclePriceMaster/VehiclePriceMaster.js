/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';

import { tableColumn } from './tableColumn';
import { AdvancedSearch } from './AdvancedSearch';

import ListDataTable from 'utils/ListDataTable/ListDataTable';

import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { showGlobalNotification } from 'store/actions/notification';

import { BASE_URL_VEHICLE_PRICE_MASTER_SEARCH as customURL } from 'constants/routingApi';

import { FilterIcon } from 'Icons';
import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';
import { VehiclePriceMasterUpload } from './VehiclePriceMasterUpload';

import { PARAM_MASTER } from 'constants/paramMaster';
import AdvanceVehiclePriceMasterFilter from './AdvanceVehiclePriceMasterFilter';
import { vehiclePriceMasterDataAction } from 'store/actions/data/vehiclePriceMaster';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            CustomerMaster: {
                ViewDocument: { isLoaded: isViewDataLoaded = false, data: viewDocument },
            },
            SupportingDocument: { isLoaded: isSupportingDataLoaded = false, isSupportingDataLoading, data: supportingData },

            VehiclePriceMaster: { isLoaded: isVehiclePriceDataLoaded = false, isLoading: isVehiclePriceLoading, data: vehiclePriceData = [], filter: filterString },
            Geo: {
                Country: { isLoaded: isDataCountryLoaded = false, isLoading: isCountryLoading = false, data: countryData },
                State: { isFilteredListLoaded: isStateDataLoaded = false, isLoading: isStateLoading, filteredListData: stateData },
                District: { isFilteredListLoaded: isDistrictDataLoaded = false, isLoading: isDistrictLoading, filteredListData: districtData },
                Tehsil: { isFilteredListLoaded: isTehsilDataLoaded = false, isLoading: isTehsilLoading, filteredListData: tehsilData },
                City: { isFilteredListLoaded: isCityDataLoaded = false, isLoading: isCityLoading, filteredListData: cityData },
            },
            TermCondition: {
                ProductHierarchyData: { isLoaded: isProductHierarchyDataLoaded = false, data: productHierarchyList, isProductHierarchyLoading },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Price Master';
    const finalCountryData = countryData?.map((item, index) => {
        return { ...item, default: index <= 0 || false };
    });
    const defaultCountry = finalCountryData && finalCountryData?.find((i) => i.default)?.countryCode;

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
        isCountryLoading,
        countryData: finalCountryData,
        isDataCountryLoaded,
        defaultCountry,
        isStateDataLoaded,
        isStateLoading,
        stateData,
        isCityDataLoaded,
        isCityLoading,
        cityData,
        isTehsilDataLoaded,
        isTehsilLoading,
        tehsilData,
        typeData,
        isDistrictDataLoaded,
        districtData,
        isProductHierarchyDataLoaded,
        productHierarchyList,
        isProductHierarchyLoading,
        isDistrictLoading,
        unFilteredStateData: stateData,
        filterString,
        isVehiclePriceLoading,
        isVehiclePriceDataLoaded,
        vehiclePriceData: vehiclePriceData?.vehicleSearch,
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

            fetchVehiclePriceList: vehiclePriceMasterDataAction.fetchList,
            listVehiclePriceShowLoading: vehiclePriceMasterDataAction.listShowLoading,
            setFilterString: vehiclePriceMasterDataAction.setFilter,
            saveData: vehiclePriceMasterDataAction.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehiclePriceMasterBase = (props) => {
    const { filterString, setFilterString, saveData, userId, showGlobalNotification } = props;
    const { accessToken, token, viewDocument, isViewDataLoaded, viewListShowLoading, resetViewData, fetchViewDocument } = props;
    const { isDataCountryLoaded, isCountryLoading, countryData, defaultCountry, isDistrictDataLoaded, districtData, typeData, fetchVehiclePriceList, listVehiclePriceShowLoading } = props;
    const { isStateDataLoaded, stateData, moduleTitle, vehiclePriceData, isCityDataLoaded, cityData, isProductHierarchyDataLoaded, productHierarchyList, isProductHierarchyLoading, isTehsilDataLoaded, tehsilData } = props;
    const { isSupportingDataLoaded, isSupportingDataLoading, supportingData, downloadFile, listShowLoading } = props;
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
    const [filteredStateData, setFilteredStateData] = useState([]);
    const [filteredCityData, setFilteredCityData] = useState([]);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);
    const [cityCodeValue, setCityCodeValue] = useState();

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: true, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setRefershData(false);
        setShowDataLoading(false);
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
                name: typeData?.find((i) => i?.key === filterString?.searchType)?.value,
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
                key: 'modelCode',
                title: 'Model',
                value: filterString?.modelCode,
                name: productHierarchyList?.find((i) => i?.prodctCode === filterString?.modelCode)?.prodctShrtName,
                canRemove: true,
                filter: true,
            },
            {
                key: 'stateCode',
                title: 'State',
                value: filterString?.stateCode,
                name: filteredStateData?.find((i) => i?.key === filterString?.stateCode)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'cityCode',
                title: 'City',
                value: filterString?.cityCode,
                name: filteredCityData?.find((i) => i?.key === filterString?.cityCode)?.value,
                canRemove: false,
                filter: true,
            },
            {
                key: 'priceAsOnDate',
                title: 'End Date',
                value: filterString?.priceAsOnDate,
                name: filterString?.priceAsOnDate,
                canRemove: true,
                filter: true,
            },

            {
                key: 'pageSize',
                title: 'Value',
                value: 10,
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
    }, [filterString]);

    useEffect(() => {
        if (userId) {
            fetchVehiclePriceList({ setIsLoading: listVehiclePriceShowLoading, userId, extraParams, customURL, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);
    // }, [userId, isDataCountryLoaded, isStateDataLoaded, isDataLoaded, isProductHierarchyDataLoaded, isVehiclePriceDataLoaded, defaultExtraParams]);

    useEffect(() => {
        if (isDataCountryLoaded && defaultCountry && isStateDataLoaded && isCityDataLoaded) {
            setFilterString({ countryCode: defaultCountry });
            defaultCountry ? setFilteredStateData(stateData?.filter((i) => i?.parentKey === defaultCountry)) : setFilteredStateData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataCountryLoaded, isStateDataLoaded]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        setFormData(record);
        setIsFormVisible(true);
    };

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            if (!value) {
                switch (name) {
                    case 'countryCode': {
                        setFilteredStateData();
                        setFilteredDistrictData();
                        setFilteredCityData();
                        advanceFilterForm.setFieldsValue({ stateCode: undefined });
                        advanceFilterForm.setFieldsValue({ districtCode: undefined });
                        advanceFilterForm.setFieldsValue({ cityCode: undefined });

                        break;
                    }
                    case 'stateCode': {
                        setFilteredDistrictData();
                        setFilteredCityData();
                        advanceFilterForm.setFieldsValue({ districtCode: undefined });
                        advanceFilterForm.setFieldsValue({ cityCode: undefined });
                        advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
                        break;
                    }
                    case 'districtCode': {
                        setFilteredCityData();
                        advanceFilterForm.setFieldsValue({ cityCode: undefined });
                        advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
                        break;
                    }
                    case 'cityCode': {
                        break;
                    }
                    default: {
                        break;
                    }
                }
                return;
            }
            const filterValue = type === 'text' ? value.target.value : value;

            if (name === 'countryCode') {
                setFilteredStateData(stateData?.filter((i) => i?.parentKey === filterValue));
                advanceFilterForm.setFieldsValue({ stateCode: undefined });
                advanceFilterForm.setFieldsValue({ districtCode: undefined });
                advanceFilterForm.setFieldsValue({ cityCode: undefined });
            }

            if (name === 'stateCode') {
                setFilteredCityData(cityData?.filter((i) => i?.parentKey === filterValue));
                advanceFilterForm.setFieldsValue({ districtCode: undefined });
                advanceFilterForm.setFieldsValue({ cityCode: undefined });
            }

            if (name === 'districtCode') {
                setFilteredCityData(cityData?.filter((i) => i?.parentKey === filterValue));
                advanceFilterForm.setFieldsValue({ cityCode: undefined });
            }

            if (name === 'cityCode') {
                setCityCodeValue(filterValue);
            }
        };

    const onFinish = (values) => {
        let data = { docId: uploadedFile };
        const onSuccess = (res) => {
            setIsUploadFormVisible(false);
            setEmptyList(false);
            setUploadedFile();
            setFileList();

            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };

        const onError = (res) => {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: res, placement: 'bottomRight' });
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

    const handleClearInSearch = (e) => {
        if (e.target.value.length > 2) {
            listFilterForm.validateFields(['code']);
        } else if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
            setShowDataLoading(false);
        }
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        isDataCountryLoaded,
        isCountryLoading,
        countryData,
        defaultCountry,
        districtData,
        stateData,
        isDistrictDataLoaded,

        isCityDataLoaded,
        cityData,
        handleFilterChange,
        filteredStateData,
        filteredCityData,
        filteredDistrictData,
        filterString,
        setFilterString,
        advanceFilterForm,
        // resetData,
        handleResetFilter,
        onSearchHandle,
        setAdvanceSearchVisible,
        cityCodeValue,
        isProductHierarchyDataLoaded,
        productHierarchyList,
        isProductHierarchyLoading,
        isTehsilDataLoaded,
        tehsilData,
        typeData,
    };

    const handleOnClick = () => {
        setButtonData({ ...defaultBtnVisiblity, saveAndNewBtn: false, cancelBtn: true, saveBtn: true });
        setIsUploadFormVisible(true);
    };

    const removeFilter = (key) => {
        if (key === 'countryCode') {
            setFilterString(undefined);
        } else if (key === 'stateCode') {
            const { stateCode, districtCode, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            advanceFilterForm.setFieldsValue({ keyword: undefined, code: undefined });

            if (!rest?.stateCode && !rest?.districtCode && !rest?.keyword) {
                setFilterString();
            } else {
                setFilterString({ ...rest });
            }
        }
    };
    const title = 'Vehicle Price Master';

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        handleResetFilter,
        advanceFilterForm,

        title,
        setAdvanceSearchVisible,
        typeData: typeData?.[PARAM_MASTER.VH_PRC_SRCH.id],
        searchForm,
        handleOnClick,
    };

    const uploadProps = {
        isVisible: isUploadFormVisible,
        titleOverride: 'Upload Vehicle Price Master Form',
        onCloseAction: () => {
            setIsUploadFormVisible(false);
            form.resetFields();
            setFileList();
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
        uploadButtonName: 'Upload Price Master',
        messageText: 'Click or drop your file here to upload',
        validationText: 'File type should be .xlxs and max file size to be 8Mb',
        supportedFileTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        maxSize: 8,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData: { ...defaultBtnVisiblity },
        setButtonData,
        handleButtonClick,
    };
    const viewProps = {
        titleOverride: 'View '.concat(moduleTitle),
        isVisible: isFormVisible,
        onCloseAction,
        formData,
        buttonProps,
    };
    return (
        <>
            <AdvanceVehiclePriceMasterFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className={styles.tableProduct}>
                        <ListDataTable showAddButton={false} isLoading={false} {...tableProps} />
                    </div>
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <ViewDetail {...viewProps} />
            <VehiclePriceMasterUpload {...uploadProps} />
        </>
    );
};

export const VehiclePriceMaster = connect(mapStateToProps, mapDispatchToProps)(VehiclePriceMasterBase);
