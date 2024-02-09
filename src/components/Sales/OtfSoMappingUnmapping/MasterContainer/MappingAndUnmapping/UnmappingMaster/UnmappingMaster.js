/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { tableColumnUnMapping } from './tableColumnUnmapping';

import { showGlobalNotification } from 'store/actions/notification';

import { otfSoMappingDataActions } from 'store/actions/data/otfSoMappingUnmapping';
import { BUTTON_NAME, DRAWER_TITLE_CONSTANTS, OTF_SO_MAPPING_UNMAPPING_CONSTANTS } from 'components/Sales/OtfSoMappingUnmapping/Constants';
import { BASE_URL_OTF_SO_MAPPING_MAIN as CustomUrl } from 'constants/routingApi';
import { AddEditForm } from './AddEditForm';

import { LANGUAGE_EN } from 'language/en';

import { ListDataTable } from 'utils/ListDataTable';
import { translateContent } from 'utils/translateContent';

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
            saveFormShowLoading: otfSoMappingDataActions.saveFormShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const MappingMasterMain = (props) => {
    const { dynamicPagination, otfSomappingData, userId, showGlobalNotification, moduleTitle, isOtfSoMappingLoading, selectedKey } = props;
    const { saveFormShowLoading, saveData, advanceFilterString, setadvanceFilterString, isLoadingOnSave } = props;
    const [form] = Form.useForm();

    const actionButtonVisibility = { canEdit: false, canView: false, customButton: true };
    const [isFormVisible, setIsFormVisible] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, formBtnActive: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [formData, setFormData] = useState('');

    useEffect(() => {
        setadvanceFilterString({ status: OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.SO_UNMAPPING?.key });
        return () => {
            setadvanceFilterString({});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            setadvanceFilterString({ status: OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.SO_UNMAPPING?.key });
            setFormData();
            setIsFormVisible(false);
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data,
            customURL: CustomUrl,
            method: 'put',
            setIsLoading: saveFormShowLoading,
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
        titleOverride: moduleTitle,
        buttonData,
        setButtonData,
        saveButtonName: BUTTON_NAME?.UNMAP?.name,
        formData,
        multipleForm: false,

        isLoadingOnSave,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const UnMappingMaster = connect(mapStateToProps, mapDispatchToProps)(MappingMasterMain);
