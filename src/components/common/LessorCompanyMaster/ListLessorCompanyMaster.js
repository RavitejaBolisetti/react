/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { bindActionCreators } from 'redux';

import { lessorCompanyMasterDataActions } from 'store/actions/data/lessorCompanyMaster';

import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { ListDataTable } from 'utils/ListDataTable';
import { btnVisiblity } from 'utils/btnVisiblity';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';

import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { translateContent } from 'utils/translateContent';
import { drawerTitle } from 'utils/drawerTitle';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            LessorCompanyMaster: { isLoaded: isDataLoaded = false, isLoading, data },
        },
    } = state;

    const moduleTitle = translateContent('LessorCompanyMaster.heading.pageTitle');

    let returnValue = {
        userId,
        isDataLoaded,
        data: data.customerLessorCompanyMasterResponses,
        isLoading,
        moduleTitle,
        totalRecords: data?.totalRecords || [],
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: lessorCompanyMasterDataActions.fetchList,
            saveData: lessorCompanyMasterDataActions.saveData,
            listShowLoading: lessorCompanyMasterDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const ListLessorCompanyMasterBase = (props) => {
    const { data, saveData, fetchList, userId, listShowLoading, showGlobalNotification, moduleTitle, totalRecords } = props;
    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const DEFAULT_PAGINATION = { pageSize: 10, current: 1 };

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [refershData, setRefershData] = useState(false);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState(DEFAULT_PAGINATION);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const dynamicPagination = true;

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onErrorAction = () => {
        return;
    };

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

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
                    key: 'companyName',
                    title: 'Search Param',
                    value: filterString?.companyName,
                    name: filterString?.companyName,
                    canRemove: true,
                    filter: true,
                },
            ];
        } else {
            return defaultExtraParam;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, defaultExtraParam]);

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, current: 1, pageSize: 10, advanceFilter: false, companyName: value });
        }
    };

    const handleClearInSearch = (e) => {
        if (e?.target?.value === '') {
            setFilterString((prev) => ({ current: 1, pageSize: 10 }));
            listFilterForm.resetFields();
            setShowDataLoading(false);
        } else if (e.target.value.length > 2) {
            listFilterForm.validateFields(['code']);
        }
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';

        let data = { ...values, id: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });

            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage, placement: 'bottomRight' });
                setButtonData({ saveBtn: true, saveAndNewBtn: true, cancelBtn: true });
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
        };

        saveData(requestData);
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const handleAdd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });

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

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
        setPage: setFilterString,
        filterString,
        totalRecords,
        dynamicPagination,
    };

    const title = translateContent('LessorCompanyMaster.heading.title');

    const advanceFilterResultProps = {
        advanceFilter: false,
        filterString,
        from: listFilterForm,

        onSearchHandle,
        handleClearInSearch,
        handleReferesh,
        handleButtonClick,
        title,
        tableData: data,
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} handleAdd={handleAdd} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const ListLessorCompanyMaster = connect(mapStateToProps, mapDispatchToProps)(ListLessorCompanyMasterBase);
