/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';
import { tableColumn } from './tableColumn';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { AddEditForm } from './AddEditForm';
import { SearchBox } from 'components/utils/SearchBox';

import { ListDataTable } from 'utils/ListDataTable';
import { convertDateTime, monthDateFormat } from 'utils/formatDateTime';
import { receiptDataActions } from 'store/actions/data/receipt/receipt';
import { receiptDetailDataActions } from 'store/actions/data/receipt/receiptDetails';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'components/common/Common.module.css';

import { showGlobalNotification } from 'store/actions/notification';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Receipt: {
                ReceiptSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString },
                ReceiptDetails: { isLoaded: isDetailedDataLoaded = false, isLoading, data: receiptDetailData = [] },
            },
        },
    } = state;
    const moduleTitle = 'Map New Digital Signature';
    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        receiptDetailData,
        isLoading,
        moduleTitle,
        isSearchLoading,
        isSearchDataLoaded,
        isDetailedDataLoaded,
        filterString,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchReceiptDetails: receiptDetailDataActions.fetchList,
            saveData: receiptDataActions.saveData,
            setFilterString: receiptDataActions.setFilter,
            resetData: receiptDataActions.reset,
            fetchList: receiptDataActions.fetchList,
            listShowLoading: receiptDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const DigitalSignatureMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, fetchReceiptDetails, data, resetData } = props;
    const { typeData, moduleTitle, totalRecords, showGlobalNotification } = props;
    const { filterString, setFilterString } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const [searchValue, setSearchValue] = useState();

    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        saveAndNewBtn: false,
        saveAndNewBtnClicked: false,
        closeBtn: false,
        cancelBtn: false,
        formBtnActive: false,
        deliveryNote: false,
        nextBtn: false,
        cancelReceiptBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [formData, setFormData] = useState([]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
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
                key: 'pageNumber',
                title: 'Value',
                value: page?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: page?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'searchType',
                title: 'Value',
                value: 'receiptNumber',
                canRemove: false,
                filter: false,
            },
            {
                key: 'searchParam',
                title: 'searchParam',
                value: searchValue,
                name: searchValue,
                canRemove: false,
                filter: false,
            },
            {
                key: 'fromDate',
                title: 'Start Date',
                value: filterString?.fromDate,
                name: filterString?.fromDate ? convertDateTime(filterString?.fromDate, monthDateFormat) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'End Date',
                value: filterString?.toDate,
                name: filterString?.toDate ? convertDateTime(filterString?.toDate, monthDateFormat) : '',
                canRemove: true,
                filter: true,
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
    }, [searchValue, filterString, page]);

    useEffect(() => {
        if (userId) {
            // setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, filterString, page]);

    useEffect(() => {
        if (userId && selectedOrderId) {
            const extraParams = [
                {
                    key: 'id',
                    title: 'id',
                    value: selectedOrderId,
                    name: 'id',
                },
            ];
            fetchReceiptDetails({ setIsLoading: listShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, saveAndNewBtn: false }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onFinish = (values) => {
        const data = { ...values };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage + 'Receipt No.:' + res?.data?.receiptsDetails?.receiptNumber });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            errorData: true,
            onSuccess,
        };

        saveData(requestData);
    };

    const onCloseAction = () => {
        resetData();
        fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        form.resetFields();
        form.setFieldsValue();
        setSelectedOrderId();

        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);

        setSelectedOrder();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
        showAddButton: false,
        typeData,
    };

    const title = 'Dealer Sig-Dealer Code Mapping';

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add New ';
        }
    }, [formActionType]);

    const searchBoxProps = {
        searchForm,
        filterString,
        optionType: typeData[PARAM_MASTER?.CUST_VEH_SEARCH?.id],
        setFilterString,
        selectWide: true,
    };

    const formProps = {
        isVisible: isFormVisible,
        titleOverride: drawerTitle.concat(moduleTitle),
        handleButtonClick,
        formActionType,
        onCloseAction,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        typeData,
        formData,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                <SearchBox {...searchBoxProps} />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleButtonClick={handleButtonClick} isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>

            <AddEditForm {...formProps} />
        </>
    );
};

export const DigitalSignatureMaster = connect(mapStateToProps, mapDispatchToProps)(DigitalSignatureMasterBase);
