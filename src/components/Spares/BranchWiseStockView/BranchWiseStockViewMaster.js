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
import { showGlobalNotification } from 'store/actions/notification';

import { BASE_URL_VEHICLE_PRICE_MASTER_SEARCH as customURL } from 'constants/routingApi';
import { ViewDetail } from './ViewDetail';
import { VehiclePriceMasterUpload } from './VehiclePriceMasterUpload';

import { PARAM_MASTER } from 'constants/paramMaster';
import AdvanceVehiclePriceMasterFilter from './AdvanceVehiclePriceMasterFilter';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';
import { DisableParent, FindProductName } from 'components/common/ProductHierarchy/ProductHierarchyUtils';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        common: {
            Header: { data: loginUserData = [], dealerLocationId },
        },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },

        },
    } = state;

    let returnValue = {
        userId,
        accessToken,
        token,
        userType: loginUserData?.userType,

        moduleTitle: 'Branch Wise Stock',
        data: [{}],
        typeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
          

            showGlobalNotification,
        },
        dispatch
    ),
});

export const BranchWiseStockViewMasterBase = (props) => {
    const { filterString,typeData,moduleTitle, setFilterString, saveData, userId, showGlobalNotification } = props;
    const { data, resetData, downloadFile, listShowLoading, userType } = props;
    
    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [searchForm] = Form.useForm();

    const [uploadedFile, setUploadedFile] = useState();
    const [emptyList, setEmptyList] = useState(true);

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
    const [singleDisabled, setSingleDisabled] = useState(false);
    const [productHierarchyData, setProductHierarchyData] = useState([]);
    const [resetAdvanceFilter, setResetAdvanceFilter] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: true, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const onRemove = () => {
        setFileList([]);
        setUploadedFile();
        setSingleDisabled(false);
    };

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setRefershData(false);
        setShowDataLoading(false);
    };

    const onErrorAction = (res) => {
        showGlobalNotification({ message: res });
        setShowDataLoading(false);
    };

    const paramMasterId = 'VH_PRC_SRCH';

    useEffect(() => {
        if (filterString) {
            setPage({ ...page, current: 1 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);



    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: translateContent('vehiclePriceMaster.label.type'),
                value: filterString?.searchType,
                // name: typeData[paramMasterId]?.find((i) => i?.key === filterString?.searchType)?.value,
                canRemove: false,
                filter: true,
            },
            {
                key: 'searchParam',
                title: translateContent('vehiclePriceMaster.label.value'),
                value: filterString?.searchParam,
                name: filterString?.searchParam,
                canRemove: true,
                filter: true,
            },
            {
                key: 'modelCode',
                title: translateContent('vehiclePriceMaster.label.model'),
                value: FindProductName(productHierarchyData, filterString?.model, 'oemModelCode'),
                name: FindProductName(productHierarchyData, filterString?.model),
                canRemove: true,
                filter: true,
            },

            {
                key: 'stateCode',
                title: translateContent('vehiclePriceMaster.label.state'),
                value: filterString?.stateCode,
                name: filteredStateData?.find((i) => i?.key === filterString?.stateCode)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'cityCode',
                title: translateContent('vehiclePriceMaster.label.city'),
                value: filterString?.cityCode,
                name: filteredCityData?.find((i) => i?.code === filterString?.cityCode)?.name,
                canRemove: true,
                filter: true,
            },

            {
                key: 'priceAsOnDate',
                title: translateContent('vehiclePriceMaster.label.endDate'),
                value: filterString?.priceAsOnDate,
                name: filterString?.priceAsOnDate ? convertDateTime(filterString?.priceAsOnDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageSize',
                title: translateContent('vehiclePriceMaster.label.value'),
                value: page?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: translateContent('vehiclePriceMaster.label.value'),
                value: page?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortBy',
                title: translateContent('vehiclePriceMaster.label.sortBy'),
                value: page?.sortBy,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortIn',
                title: translateContent('vehiclePriceMaster.label.sortType'),
                value: page?.sortType,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, page]);



    const handleButtonClick = ({ record = null, buttonAction }) => {
        setFormData(record);
        setIsFormVisible(true);
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
                        //advanceFilterForm.setFieldsValue({ districtCode: undefined });
                        advanceFilterForm.setFieldsValue({ cityCode: undefined });

                        break;
                    }
                    case 'stateCode': {
                        setFilteredDistrictData();
                        setFilteredCityData();
                        //advanceFilterForm.setFieldsValue({ districtCode: undefined });
                        advanceFilterForm.setFieldsValue({ cityCode: undefined });
                        //advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
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
        };

    const onFinish = () => {
        let data = { docId: uploadedFile };
        const onSuccess = (res) => {
            setShowDataLoading(true);

            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        };

        const onError = (res, data) => {
            let message = res;
            // if (data?.docId) {
            //     message = (
            //         <>
            //             {message}
            //             <Button type="link" onClick={() => downloadReport(data?.docId)}>
            //                 {translateContent('vehiclePriceMaster.label.downloadHere')}
            //             </Button>
            //         </>
            //     );
            // }

            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: message });
        };

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: false,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };
    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        setResetAdvanceFilter(true);
    };

    const tableProps = {
        dynamicPagination,
        totalRecords: data.length,
        page,
        setPage,
        isLoading: false,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
    };

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
    };

    const handleResetFilter = () => {
        if (filterString) {
            setShowDataLoading(true);
        }
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
        titleOverride: translateContent('vehiclePriceMaster.label.advanceFilters'),
    
        handleFilterChange,
        filteredStateData,
        filteredCityData,
        filteredDistrictData,
        filterString,
        setFilterString,
        advanceFilterForm,
        handleResetFilter,
        onSearchHandle,
        setAdvanceSearchVisible,
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
    const title = translateContent('vehiclePriceMaster.heading.mainTitle');

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        handleResetFilter,
        advanceFilterForm,

        title,
        setAdvanceSearchVisible,
        typeData: typeData?.[PARAM_MASTER.VH_PRC_SRCH.id],
        searchForm,
        handleOnClick,
        resetAdvanceFilter,
        setResetAdvanceFilter,
        userType,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData: { ...defaultBtnVisiblity },
        setButtonData,
        handleButtonClick,
    };
    const viewProps = {
        titleOverride: translateContent('global.drawerTitle.view').concat(' ').concat(moduleTitle),
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
                    <ListDataTable showAddButton={false} isLoading={false} {...tableProps} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <ViewDetail {...viewProps} />
        </>
    );
};

export const BranchWiseStockViewMaster = connect(mapStateToProps, mapDispatchToProps)(BranchWiseStockViewMasterBase);
