/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Form } from 'antd';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { ListDataTable } from 'utils/ListDataTable';
import { tableColumn } from './tableColumn';
import AdvanceFilter from './AdvanceFilter';
import { AdvancedSearch } from './AdvancedSearch';

import { gstIRNTransactionActions } from 'store/actions/data/financialAccounting/gstIRNTransactionPending/gstIRNTransaction';
import { VIEW_ACTION, UPLOAD_ACTION } from 'utils/btnVisiblity';
import { BASE_URL_GSTIRN_TRANSACTION_GSTIN as customURL, BASE_URL_GSTIRN_TRANSACTION_VIEW_DOC as customURLView } from 'constants/routingApi';

import { FilterIcon } from 'Icons';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            FinancialAccounting: {
                GstIRNTransaction: { isLoading: isDataLoading, data, filter: filterString },
            },
        },
    } = state;

    const moduleTitle = 'GST IRN Pending Transaction';

    let returnValue = {
        userId,
        typeData,
        moduleTitle,
        isDataLoading,
        data,
        filterString,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: gstIRNTransactionActions.fetchList,
            listShowLoading: gstIRNTransactionActions.listShowLoading,
            setFilterString: gstIRNTransactionActions.setFilter,

            fetchGSTINList: gstIRNTransactionActions.fetchGSTINList,
            viewDocument: gstIRNTransactionActions.viewDocument,
            uploadDocument: gstIRNTransactionActions.uploadDocument,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const GstIRNTransactionMain = (props) => {
    const { userId, typeData, showGlobalNotification } = props;
    const { fetchList, listShowLoading, data, filterString, setFilterString, isDataLoading } = props;
    const { fetchGSTINList, viewDocument, uploadDocument } = props;
    const [searchForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [advanceFilterForm] = Form.useForm();
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [isGSTINListLoading, setIsGSTINListLoading] = useState(false);
    const [gSTINList, setGSTINList] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    const dynamicPagination = true;

    const onSuccessAction = (res) => {
        setShowDataLoading(false);
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        setShowDataLoading(false);
        showGlobalNotification({ message });
    };

    useEffect(() => {
        setFilterString({ ...filterString, pageSize: 10, current: 1 });
        return () => {
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
                canRemove: false,
                filter: false,
            },
            {
                key: 'searchParam',
                title: 'value',
                value: filterString?.searchParam,
                name: filterString?.searchParam,
                canRemove: true,
                filter: true,
            },
            {
                key: 'irnStatus',
                title: 'value',
                value: filterString?.irnStatus,
                name: typeData?.[PARAM_MASTER?.IRN_PEND_TRN_STATUS.id]?.find((i) => i?.key === filterString?.irnStatus)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'gstin',
                title: 'value',
                value: filterString?.gstin,
                name: gSTINList?.find((i) => i?.key === filterString?.gstin)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize,
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

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams, refreshData]);

    useEffect(() => {
        const onSuccessActionFetchGSTIN = (resp) => {
            setGSTINList(resp?.data);
        };

        if (userId) {
            fetchGSTINList({ customURL: customURL, setIsLoading: setIsGSTINListLoading, userId, onSuccessAction: onSuccessActionFetchGSTIN, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        switch (buttonAction) {
            case VIEW_ACTION:
                viewDocument({ customURL: customURLView + '?docId=' + record?.id, setIsLoading: setIsGSTINListLoading, userId, onSuccessAction, onErrorAction });
                break;
            case UPLOAD_ACTION:
                const onSuccessActionUpload = (res) => {
                    showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                    setRefreshData(true);
                };
                uploadDocument({ customURL: customURLView + '?docId=' + record?.id, setIsLoading: setIsGSTINListLoading, userId, onSuccessAction: onSuccessActionUpload, onErrorAction });
                break;

            default:
                break;
        }
    };

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
    };

    const title = 'Search';

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'gstin') {
            const { gstin, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'irnStatus') {
            const { irnStatus, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const handleResetFilter = () => {
        const { pageSize } = filterString;
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString({ pageSize, current: 1 });
        advanceFilterForm.resetFields();
        searchForm.resetFields();
        setAdvanceSearchVisible(false);
    };
    const setCurrentPage = (page) => {
        setFilterString({ ...filterString, ...page });
    };

    const tableProps = {
        dynamicPagination,
        filterString,
        totalRecords: data?.totalRecords,
        setPage: setCurrentPage,
        isLoading: isDataLoading,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data?.paginationData,
        showAddButton: false,
    };

    const ListDataTableProps = {
        ...tableProps,
    };

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        filter: true,
        filterString,
        setFilterString,
        handleResetFilter,
        advanceFilterForm,

        title,
        setAdvanceSearchVisible,
        typeData,
        searchForm,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,

        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',

        onCloseAction: onAdvanceSearchCloseAction,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        typeData,
        gSTINList,
        isGSTINListLoading,
    };

    return (
        <>
            <AdvanceFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...ListDataTableProps} showAddButton={false} />
                </Col>
            </Row>

            <AdvancedSearch {...advanceFilterProps} />
        </>
    );
};

export const GstIRNTransaction = connect(mapStateToProps, mapDispatchToProps)(GstIRNTransactionMain);
