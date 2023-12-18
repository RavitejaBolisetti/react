/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { tableColumnUnMapping } from './tableColumnUnmapping';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';

import { otfSoMappingDataActions } from 'store/actions/data/otfSoMappingUnmapping';
import { OTF_SO_MAPPING_UNMAPPING_CONSTANTS, BUTTON_NAME, DRAWER_TITLE_CONSTANTS } from 'components/Sales/OtfSoMappingUnmapping/Constants';
import { BASE_URL_OTF_SO_MAPPING_MAIN as CustomUrl } from 'constants/routingApi';

import { AddEditForm } from './AddEditForm';

import { LANGUAGE_EN } from 'language/en';

import { ListDataTable } from 'utils/ListDataTable';

import { Form } from 'antd';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [], isLoading: isConfigurableLoading = false },
            OTFSoMapping: {
                OtfSoMapping: { isLoaded: isOtfSoMappingLoaded = false, isLoading: isOtfSoMappingLoading = false, data: otfSomappingData = [], filter: filterString },
            },
        },

        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = '';

    let returnValue = {
        collapsed,
        userId,
        moduleTitle,
        typeData,

        isOtfSoMappingLoaded,
        isOtfSoMappingLoading,
        otfSomappingData,

        isConfigurableLoading,
        filterString,
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
            showGlobalNotification,
        },
        dispatch
    ),
});

const UnmappingAndCancellationMain = (props) => {
    const { userId, dynamicPagination = true, listShowLoading, showGlobalNotification, otfSomappingData, selectedKey, saveData, isOtfSoMappingLoading, advanceFilterString, setadvanceFilterString } = props;
    const [form] = Form.useForm();

    const actionButtonVisibility = { canEdit: false, canView: false, customButton: true };

    const [isFormVisible, setIsFormVisible] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [buttonType, setButtonType] = useState(BUTTON_NAME?.UNMAP?.key);
    const [formData, setFormData] = useState('');

    useEffect(() => {
        setadvanceFilterString({ status: OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.SO_CANCELLATION?.key });
        return () => {
            setadvanceFilterString({});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        console.log('buttonAction', buttonAction, record);
        record && setFormData({ ...record, buttonAction });
        buttonAction && setButtonType(buttonAction);
        buttonAction === BUTTON_NAME?.UNMAP?.key && setButtonData({ ...buttonData, formBtnActive: true });
        setIsFormVisible(true);
    };
    const handleName = ({ record = null }) => {
        let name = '',
            key = '';
        if (record?.soStatusCode === OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.LIVE_TO_LIVE?.CRD_1) {
            name = BUTTON_NAME?.CANCEL?.tableName;
            key = BUTTON_NAME?.CANCEL?.key;
        } else if (record?.soStatusCode === OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.BILLED_TO_BILLED?.CRD_1) {
            name = BUTTON_NAME?.UNMAP?.name;
            key = BUTTON_NAME?.UNMAP?.key;
        } else {
            name = BUTTON_NAME?.UNMAP?.name;
            key = BUTTON_NAME?.UNMAP?.key;
        }
        return { name, key };
    };
    const customButtonProperties = {
        icon: undefined,
        customButton: true,
        customName: BUTTON_NAME?.UNMAP?.key,
        handleCustomButtonClick: handleButtonClick,
        buttonType: 'primary',
        handleName: handleName,
    };
    const onCloseAction = () => {
        form.resetFields();
        setFormData();
        setButtonData({ ...defaultBtnVisiblity });
        setIsFormVisible(false);
    };

    const onFinish = (values) => {
        const data = { otfNumber: values?.otfNumber, soNumber: values?.soNumber || '', action: formData?.buttonAction, cancellationRemarks: values?.cancellationRemarks, mapStatusCode: selectedKey };
        const onSuccess = (res) => {
            setadvanceFilterString({ status: OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.SO_CANCELLATION?.key });
            setFormData();
            setIsFormVisible(false);
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
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
        tableColumn: tableColumnUnMapping({ handleButtonClick, actionButtonVisibility, customButtonProperties }),
        tableData: otfSomappingData?.paginationData,
        showAddButton: false,
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
        isLoading: isOtfSoMappingLoading,
        filterString: advanceFilterString,
        page: advanceFilterString,
        setPage: setadvanceFilterString,
    };
    const formProps = {
        form,
        isVisible: isFormVisible,
        showGlobalNotification,
        onFinish,
        onCloseAction,
        titleOverride: buttonType === BUTTON_NAME?.CANCEL?.key ? DRAWER_TITLE_CONSTANTS?.CANCELLATION?.key : DRAWER_TITLE_CONSTANTS?.UNMAPPING?.key,
        buttonData,
        setButtonData,
        saveButtonName: buttonType === BUTTON_NAME?.UNMAP?.key ? BUTTON_NAME?.UNMAP?.key : BUTTON_NAME?.CANCEL?.name,
        handleFormValueChange: () => setButtonData({ ...buttonData, formBtnActive: true }),
        buttonType,
        formData,
    };

    return (
        <>
            <ListDataTable {...tableProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const UnmappingAndCancellation = connect(mapStateToProps, mapDispatchToProps)(UnmappingAndCancellationMain);
