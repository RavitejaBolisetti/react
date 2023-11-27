/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { bindActionCreators } from 'redux';

import { accountCategoryDataActions } from 'store/actions/data/financialAccounting/accountCategory/accountCategory';
import { applicationMenuDataActions } from 'store/actions/data/financialAccounting/accountCategory/applicationMenu';
import { financialAccountHeadDataActions } from 'store/actions/data/financialAccounting/financialAccountHead';
import { accountCategoryDocumentDescriptionDataActions } from 'store/actions/data/financialAccounting/accountCategory/accountCategoryDocumentDescription';

import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { BASE_URL_FINANCIAL_ACC_ACCOUNT_CATEGORY_SEARCH as customURL } from 'constants/routingApi';
import { showGlobalNotification } from 'store/actions/notification';

import { ListDataTable } from 'utils/ListDataTable';
import { btnVisiblity } from 'utils/btnVisiblity';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { AddEditForm } from './AddEditForm';
import { translateContent } from 'utils/translateContent';
import { drawerTitle } from 'utils/drawerTitle';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            FinancialAccounting: {
                AccountCategory: { isLoaded: isAccountCategoryLoaded = false, isLoading: isAccountCategoryLoading, data: accountCategoryData = [] },
                ApplicationMenu: { isLoaded: isApplicationMenuLoaded = false, data: applicationMenuData = [] },
                FinancialAccountHead: { isLoaded: isFinancialAccountHeadLoaded = false, data: financialAccountData = [] },
                AccountCategoryDocumentDescription: { isLoaded: isAccountCategoryDocumentDescriptionLoaded = false, data: accountCategoryDocumentDescription = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,
        moduleTitle: translateContent('accountCategory.heading.pageTitle'),
        isAccountCategoryLoaded,
        isAccountCategoryLoading,
        accountCategoryData: accountCategoryData?.paginationData,
        totalRecords: accountCategoryData?.totalRecords,
        isApplicationMenuLoaded,
        applicationMenuData,
        isFinancialAccountHeadLoaded,
        financialAccountData,
        isAccountCategoryDocumentDescriptionLoaded,
        documentDescriptionData: accountCategoryDocumentDescription,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchAccountCategory: accountCategoryDataActions.fetchList,
            listShowLoadingAccountCategory: accountCategoryDataActions.listShowLoading,
            saveData: accountCategoryDataActions.saveData,

            fetchApplicationMenu: applicationMenuDataActions.fetchList,
            listShowLoadingApplicationMenu: applicationMenuDataActions.listShowLoading,

            fetchFinancialAccountHead: financialAccountHeadDataActions.fetchList,
            listShowLoadingFinancialAccountHead: financialAccountHeadDataActions.listShowLoading,

            fetchDocumentDescription: accountCategoryDocumentDescriptionDataActions.fetchList,
            listShowLoadingDocumentDescription: accountCategoryDocumentDescriptionDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const AccountCategoryMain = (props) => {
    const { moduleTitle, userId, showGlobalNotification, taxChargeCategoryCodeData, totalRecords, fetchAccountCategory, listShowLoadingAccountCategory, saveData, accountCategoryData, fetchApplicationMenu, applicationMenuData, listShowLoadingApplicationMenu, fetchFinancialAccountHead, isFinancialAccountHeadLoaded, listShowLoadingFinancialAccountHead, financialAccountData, isDocumentDescriptionLoaded, documentDescriptionData, fetchDocumentDescription, listShowLoadingDocumentDescription, pageTitle } = props;
    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [refershData, setRefershData] = useState(false);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const [editForm] = Form.useForm();
    const [accDocMapForm] = Form.useForm();
    const [formEdit, setFormEdit] = useState(false);
    const [accountDocumentMaps, setAccountDocumentMaps] = useState([]);
    const [dropdownItems, setDropdownItems] = useState([]);
    const [userApplicationId, setUserApplicationId] = useState(' No Data ');
    const [accountCategory, setAccountCategory] = useState(null);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState(null);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
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
                key: 'searchType',
                title: 'Search Type',
                value: 'accountCategoryCode',
                name: 'accountCategoryCode',
            },
            {
                key: 'searchParam',
                title: 'Search Param',
                value: filterString?.keyword,
                name: 'Search',
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
            fetchAccountCategory({ setIsLoading: listShowLoadingAccountCategory, userId, customURL, extraParams, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData, extraParams]);

    useEffect(() => {
        const extraParams = [
            {
                key: 'screenId',
                title: 'screenId',
                value: 'APPMST',
                name: 'screenId',
            },
            {
                key: 'moduleName',
                title: 'moduleName',
                value: 'Finance',
                name: 'moduleName',
            },
        ];

        if (userId) {
            fetchApplicationMenu({ setIsLoading: listShowLoadingApplicationMenu, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        let extraApplicationParams = [
            {
                key: 'applicationId',
                title: 'applicationId',
                value: userApplicationId ? userApplicationId : ' No Data ',
                name: 'applicationId',
            },
        ];

        if (!isDocumentDescriptionLoaded && userId) {
            fetchDocumentDescription({ setIsLoading: listShowLoadingDocumentDescription, userId, extraParams: extraApplicationParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDocumentDescriptionLoaded, userApplicationId]);

    useEffect(() => {
        if (formEdit) {
            fetchDocumentDescription({ setIsLoading: listShowLoadingDocumentDescription, userId, extraParams: [{ key: 'applicationId', title: 'applicationId', value: selectedTreeSelectKey, name: 'applicationId' }] });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTreeSelectKey]);

    useEffect(() => {
        if (!isFinancialAccountHeadLoaded && userId) {
            fetchFinancialAccountHead({ setIsLoading: listShowLoadingFinancialAccountHead, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFinancialAccountHeadLoaded, userId]);

    useEffect(() => {
        if (accountCategory?.[0]?.accountDocumentMaps?.length > 0) {
            setAccountDocumentMaps(() => []);
            let len = accountCategory?.[0]?.accountDocumentMaps?.length;
            for (let i = 0; i < len; i++) {
                let internalId = Math.floor(Math.random() * 100000000 + 1);
                setAccountDocumentMaps((item) => [...item, { ...accountCategory?.[0]?.accountDocumentMaps[i], internalId: internalId }]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountCategory]);

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
            setPage({ ...page, current: 1 });
            setFilterString({ ...filterString, advanceFilter: false, keyword: value });
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

    const onFinish = (values) => {
        let data = { ...values, id: formData?.id, accountDocumentMaps };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchAccountCategory({ setIsLoading: listShowLoadingAccountCategory, userId, customURL, extraParams, onSuccessAction });

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
            setIsLoading: listShowLoadingAccountCategory,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onCloseAction = () => {
        setFormEdit(false);
        form.resetFields();
        accDocMapForm.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        setAccountDocumentMaps(() => []);
        setDropdownItems(() => []);
    };

    const formProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,

        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(" ").concat(moduleTitle),
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
        taxChargeCategoryCodeData,
        editForm,
        accDocMapForm,
        formEdit,
        setFormEdit,
        accountDocumentMaps,
        setAccountDocumentMaps,
        dropdownItems,
        setDropdownItems,
        accountCategoryData,
        applicationMenuData,
        financialAccountData,
        documentDescriptionData,
        setUserApplicationId,
        accountCategory,
        setAccountCategory,
        selectedTreeSelectKey,
        setSelectedTreeSelectKey,
    };

    const tableProps = {
        addTitle: moduleTitle,
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        isLoading: showDataLoading,
        tableColumn: tableColumn(handleButtonClick),
        tableData: accountCategoryData,
        handleButtonClick: () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD }),
    };

    const advanceFilterResultProps = {
        advanceFilter: false,
        filterString,
        from: listFilterForm,
        onFinish,
        onSearchHandle,
        handleClearInSearch,
        handleReferesh,
        handleButtonClick,
        title: translateContent('accountCategory.label.accountCategoryCode'),
        tableData: accountCategoryData,
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const AccountCategory = connect(mapStateToProps, mapDispatchToProps)(AccountCategoryMain);
