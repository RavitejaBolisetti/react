/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { tableColumnMapping } from './tableColumnMapping';
import { SearchtableColumnMapping } from './searchtableColumn';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';

import { otfSoMappingSearchDataActions } from 'store/actions/data/otfSoMappingUnmapping';
import { BUTTON_NAME, OTF_SO_MAPPING_UNMAPPING_CONSTANTS, DRAWER_TITLE_CONSTANTS } from 'components/Sales/OtfSoMappingUnmapping/Constants';
import { BASE_URL_OTF_SO_MAPPING_MAIN as CustomUrl } from 'constants/routingApi';

import { AddEditForm } from './AddEditForm';

import { LANGUAGE_EN } from 'language/en';

import { ListDataTable } from 'utils/ListDataTable';

import { Form } from 'antd';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTFSoMapping: {
                OtfNumberSearch: { isLoaded: OtfNumberSearchLoaded = false, isLoading: OtfNumberSearchLoading = false, data: OtfNumberSearchData = {}, isLoadingOnSave },
                OtfSoMapping: { isLoaded: isOtfSoMappingLoaded = false, isLoading: isOtfSoMappingLoading = false, data: otfSomappingData = [] },
            },
        },

        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = DRAWER_TITLE_CONSTANTS?.MAPPING?.key;

    let returnValue = {
        collapsed,
        userId,
        moduleTitle,

        OtfNumberSearchLoaded,
        OtfNumberSearchLoading,
        OtfNumberSearchData,

        otfSomappingData,
        isOtfSoMappingLoading,
        isOtfSoMappingLoaded,

        isLoadingOnSave,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfSoMappingSearchDataActions.fetchList,
            listShowLoading: otfSoMappingSearchDataActions.listShowLoading,
            resetData: otfSoMappingSearchDataActions.reset,
            saveData: otfSoMappingSearchDataActions.saveData,

            saveFormShowLoading: otfSoMappingSearchDataActions.saveFormShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const MappingMasterMain = (props) => {
    const { dynamicPagination, showGlobalNotification, moduleTitle, selectedKey, saveFormShowLoading, isLoadingOnSave } = props;
    const { userId, listShowLoading, fetchList, OtfNumberSearchLoading } = props;
    const { otfSomappingData, isOtfSoMappingLoading, OtfNumberSearchData, resetData, saveData, advanceFilterString, setadvanceFilterString } = props;
    const [form] = Form.useForm();
    const actionButtonVisibility = { canEdit: false, canView: false, customButton: true };
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState('');
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, formBtnActive: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    useEffect(() => {
        setadvanceFilterString({ status: OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.SO_MAPPING?.key });
        return () => {
            setadvanceFilterString({});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleButtonClick = ({ record = null }) => {
        record && setFormData(record);
        setIsFormVisible(true);
    };

    const handleMap = ({ record = null, buttonAction }) => {
        const data = { otfNumber: record?.otfNumber, soNumber: formData?.soNumber || '', action: buttonAction, cancellationRemarks: '', mapStatusCode: selectedKey };

        const onSuccess = (res) => {
            setadvanceFilterString({ status: OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.SO_MAPPING?.key });
            setFormData();
            setIsFormVisible(false);
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            resetData();
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            customURL: CustomUrl,
            data,
            method: 'put',
            setIsLoading: saveFormShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const customButtonProperties = {
        icon: undefined,
        customButton: true,
        customName: BUTTON_NAME?.MAP?.name,
        customkey: BUTTON_NAME?.MAP?.key,
        handleCustomButtonClick: handleButtonClick,
        buttonType: 'primary',
    };
    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        resetData();
    };
    const onSuccessAction = (res) => {
        form.resetFields(['searchOtf']);
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const handleOtfSearch = (otfKey) => {
        if (!otfKey) return;
        const extraParams = [
            {
                key: 'otfNumber',
                title: 'otfNumber',
                value: otfKey,
            },
        ];

        fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
    };

    const tableProps = {
        dynamicPagination,
        totalRecords: otfSomappingData?.totalRecords || 'NA',
        tableColumn: tableColumnMapping({ handleButtonClick, actionButtonVisibility, customButtonProperties }),
        tableData: otfSomappingData?.paginationData || [],
        showAddButton: false,
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
        isLoading: isOtfSoMappingLoading,
        filterString: advanceFilterString,
        page: advanceFilterString,
        setPage: setadvanceFilterString,
    };

    const searchCustomButtonProperties = {
        icon: undefined,
        customButton: true,
        customName: BUTTON_NAME?.MAP?.name,
        customkey: BUTTON_NAME?.MAP?.key,
        handleCustomButtonClick: handleMap,
        buttonType: 'primary',
    };
    const SearchTableProps = {
        dynamicPagination,
        totalRecords: 1,
        pagination: false,
        showAddButton: false,
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
        tableColumn: SearchtableColumnMapping({ handleButtonClick, actionButtonVisibility, customButtonProperties: searchCustomButtonProperties }),
        tableData: Object?.keys(OtfNumberSearchData)?.length ? [OtfNumberSearchData] : [],
    };

    const formProps = {
        form,
        isVisible: isFormVisible,
        showGlobalNotification,
        onCloseAction,
        titleOverride: moduleTitle,
        handleOtfSearch,
        searchCustomButtonProperties,
        SearchTableProps,
        formData,
        buttonData,
        setButtonData,
        OtfNumberSearchLoading,
        isLoadingOnSave,
    };

    return (
        <>
            <ListDataTable {...tableProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const MappingMaster = connect(mapStateToProps, mapDispatchToProps)(MappingMasterMain);
