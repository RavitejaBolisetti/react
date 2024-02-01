/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { geoCountryDataActions } from 'store/actions/data/geo/countries';
import { tableColumn } from './tableColumn';

import { ListDataTable } from 'utils/ListDataTable';
import { filterFunction } from 'utils/filterFunction';
import { btnVisiblity } from 'utils/btnVisiblity';

import { showGlobalNotification } from 'store/actions/notification';
import { geoDistrictDataActions } from 'store/actions/data/geo/districts';
import { geoStateDataActions } from 'store/actions/data/geo/states';
import { geoCityDataActions } from 'store/actions/data/geo/cities';

import { AddEditForm } from './AddEditForm';
import { AdvancedSearch } from './AdvancedSearch';

import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { translateContent } from 'utils/translateContent';
import { drawerTitle } from 'utils/drawerTitle';
import { UploaFestiveDiscountDrawer } from './UploadFestiveSchemeDrawer';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: {},
        },
    } = state;

    const moduleTitle = 'Upload Festive Scheme';

    let returnValue = {
        userId,
        moduleTitle,
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
export const UploadFestiveSchemeMasterBase = (props) => {
    const { data, saveData, userId, resetData, showGlobalNotification, moduleTitle } = props;

    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [filteredStateData, setFilteredStateData] = useState([]);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);

    const [searchData, setSearchdata] = useState([{}]);
    const [refershData, setRefershData] = useState(false);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [uploadForm] = Form.useForm();
    const [isUploadDrawer, setIsUploadDrawer, ] = useState(false);


    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
    const VIEW_ONLY_ACTION = FROM_ACTION_TYPE?.VIEW_ONLY;

    const extraParams = [
        {
            key: 'stateCode',
            title: `${translateContent('city.title.state')}`,
            value: filterString?.stateCode,
            canRemove: true,
            name: filteredStateData?.find((i) => i?.key === filterString?.stateCode)?.value,
        },
        {
            key: 'districtCode',
            title: `${translateContent('city.title.district')}`,
            canRemove: true,
            value: filterString?.districtCode,
            name: filteredDistrictData?.find((i) => i?.key === filterString?.districtCode)?.value,
        },
    ];

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction: buttonAction === VIEW_ACTION ? VIEW_ONLY_ACTION : buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const removeFilter = (key) => {
        if (key === 'countryCode') {
            setFilterString(undefined);
            setFilteredDistrictData([]);
        } else if (key === 'stateCode') {
            const { stateCode, districtCode, ...rest } = filterString;
            setFilterString({ ...rest });
            setFilteredDistrictData([]);
        } else if (key === 'districtCode') {
            const { districtCode, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            advanceFilterForm.setFieldsValue({ keyword: undefined, code: undefined });

            if (!filterString?.countryCode && !filterString?.stateCode && !filterString?.districtCode) {
                setFilterString();
                advanceFilterForm.resetFields();
            } else {
                setFilterString({ ...rest });
            }
        }
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

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            const filterValue = type === 'text' ? value.target.value : value;
            if (!value) {
                switch (name) {
                    case 'stateCode': {
                        setFilteredDistrictData();
                        advanceFilterForm.setFieldsValue({ districtCode: undefined });
                        break;
                    }

                    default: {
                        break;
                    }
                }
                return;
            }
        };

    const onFinish = (values) => {
        let data = { ...values };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: `${translateContent('global.notificationSuccess.success')}`, message: res?.responseMessage });

            setButtonData({ ...buttonData, formBtnActive: false });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: `${translateContent('global.notificationSuccess.success')}`, message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: `${translateContent('global.notificationSuccess.success')}`, message: res?.responseMessage });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType?.editMode ? 'put' : 'post',
            // setIsLoading: listShowLoading,
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
    };

    const formProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(moduleTitle),
        tableData: data,
        data,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        handleButtonClick,
    };
    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
    };

    const handleResetFilter = () => {
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
        setFilteredDistrictData(undefined);
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        titleOverride: translateContent('city.title.advanceFilters'),
        data,
        handleFilterChange,
        filteredStateData,
        filteredDistrictData,
        filterString,
        setFilterString,
        advanceFilterForm,
        resetData,
        handleResetFilter,
        isAdvanceSearchVisible,
        setAdvanceSearchVisible,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        scroll: { x: 1600, y: 'calc(100vh - 312px)' },
        tableData: [
            {
                corporateCode: 'CC999',
                corporateName: 'Test Corp',
                corporateCategory: 'Test Category',
                corporateType: 'Type',
            },
        ],
    };

    const title = moduleTitle || translateContent('city.title.cityName');
    const handleOnClickUpload = ( ) => {
        setIsUploadDrawer(true)
    };
    const uploadProps = {
        ...props,
        isVisible: isUploadDrawer,
        titleOverride: drawerTitle,
        form: uploadForm,
        // typeData,
        userId,
        // accessToken,
        // token,
        // saveAuthorityData,
        // fetchDocumentFileDocId,
        // authorityShowLoading,
        // onFinish,
        // uploadedFile,
        // fetchList,
        // isAuthorityDataLoaded,
        // isAuthorityDataLoading,
        // authorityData,
        // isDataLoaded,
        // downloadForm,
        // setDownLoadForm,
        // resetData,
        // organizationId,
        setIsUploadDrawer,
        // listShowLoading,
        // showGlobalNotification,
        // viewDocument,
        // isViewDataLoaded,
        // uploadDocumentFile,
        // viewListShowLoading,
        // fetchViewDocument,

        onCloseAction: () => {
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            setIsUploadDrawer(false);
        },

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,

        // setUploadedFile,
        // emptyList,
        // setEmptyList,
        // fileList,
        // setFileList,
        // uploadedFileName,
        // setUploadedFileName,
        // resetViewData,
        // isLoading,
        // downloadFile,
        // supportedFileTypes,
        // maxSize,
    };

    const advanceFilterResultProps = {
        advanceFilter: false,
        filterString,
        from: listFilterForm,
        onFinish,
        extraParams,
        removeFilter,
        handleResetFilter,
        onSearchHandle,
        handleClearInSearch,
        setAdvanceSearchVisible,
        handleReferesh,
        handleButtonClick,
        advanceFilterProps,
        title,
        setFilteredDistrictData,
        tableData: searchData,
        showAddButton: true,
        showRefreshBtn: false,
        handleOnClickUpload,
        uploadBtn: true
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />
            {/* <AdvancedSearch {...advanceFilterProps} /> */}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <ListDataTable isLoading={false} {...tableProps} handleAdd={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })} />
                </Col>
            </Row>

            <AddEditForm {...formProps} />
            <UploaFestiveDiscountDrawer {...uploadProps} />
        </>
    );
};

export const UploadFestiveSchemeMaster = connect(mapStateToProps, mapDispatchToProps)(UploadFestiveSchemeMasterBase);
