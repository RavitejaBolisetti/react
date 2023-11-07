/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { tableColumnUnMapping } from './tableColumnUnmapping';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';

import { otfSoMappingDataActions } from 'store/actions/data/otfSoMappingUnmapping';
import { BUTTON_NAME, DRAWER_TITLE_CONSTANTS, OTF_SO_MAPPING_UNMAPPING_CONSTANTS } from 'components/Sales/OtfSoMappingUnmapping/Constants';
import { BASE_URL_OTF_SO_MAPPING_MAIN as CustomUrl } from 'constants/routingApi';
import { AddEditForm } from './AddEditForm';

import { LANGUAGE_EN } from 'language/en';

import { ListDataTable } from 'utils/ListDataTable';
import { translateContent } from 'utils/translateContent';

import { Form } from 'antd';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [], isLoading: isConfigurableLoading = false },
            OTFSoMapping: {
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
        typeData,

        isOtfSoMappingLoaded,
        isOtfSoMappingLoading,
        otfSomappingData,

        isConfigurableLoading,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfSoMappingDataActions.fetchList,
            listShowLoading: otfSoMappingDataActions.listShowLoading,
            saveData: otfSoMappingDataActions.saveData,
            resetData: otfSoMappingDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

const MappingMasterMain = (props) => {
    const { otfSomappingData, userId, dynamicPagination = true, showGlobalNotification, moduleTitle, isOtfSoMappingLoading, selectedKey } = props;
    const { listShowLoading, MappingUnmapping, resetData, saveData } = props;
    const [form] = Form.useForm();

    const pageIntialState = {
        pageSize: 10,
        current: 1,
    };
    const actionButtonVisibility = { canEdit: false, canView: false, customButton: true };

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [page, setPage] = useState({ ...pageIntialState });
    const defaultBtnVisiblity = { editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, formBtnActive: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [formData, setFormData] = useState('');

    const handleButtonClick = ({ record = null, buttonAction }) => {
        record && setFormData({ ...record, buttonAction });
        setIsFormVisible(true);
    };

    const customButtonProperties = {
        icon: undefined,
        customButton: true,
        customName: BUTTON_NAME?.UNMAP?.key,
        customkey: BUTTON_NAME?.UNMAP?.key,
        handleCustomButtonClick: handleButtonClick,
        buttonType: 'primary',
    };
    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
    };

    const onFinish = () => {
        const data = { otfNumber: formData?.otfNumber, soNumber: formData?.soNumber || '', action: formData?.buttonAction, cancellationRemarks: '', mapStatusCode: selectedKey };
        const onSuccess = (res) => {
            MappingUnmapping(OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.SO_UNMAPPING?.key);
            setFormData();
            setIsFormVisible(false);
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            resetData();
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            customURL: CustomUrl,
            data: data,
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const tableProps = {
        dynamicPagination,
        totalRecords: otfSomappingData?.totalRecords || 'NA',
        page,
        setPage,
        tableColumn: tableColumnUnMapping({ handleButtonClick, actionButtonVisibility, customButtonProperties }),
        tableData: otfSomappingData?.paginationData,
        showAddButton: false,
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
        isLoading: isOtfSoMappingLoading,
    };
    const formProps = {
        form,
        isVisible: isFormVisible,
        showGlobalNotification,
        onFinish,
        onCloseAction,
        titleOverride: moduleTitle,
        buttonData,
        setButtonData,
        saveButtonName: BUTTON_NAME?.UNMAP?.name,
        formData,
    };

    return (
        <>
            <ListDataTable {...tableProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const UnMappingMaster = connect(mapStateToProps, mapDispatchToProps)(MappingMasterMain);
