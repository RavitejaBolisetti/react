/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Alert, Form } from 'antd';

import { searchValidator } from 'utils/validation';
import { PlusOutlined } from '@ant-design/icons';
// import { BsDownload } from 'react-icons/bs';

import { injectParams } from 'utils/inject';
import { filteredData } from 'utils/listFilter';
import { DisableItemComponent } from 'utils/disableItemComponent';
import { sortObjectOfArray } from 'utils/sortObjectOfArray';
import { PAGINATION } from 'constants/constants';

import CurdSearchBox from './curdSearchBox';
import { ListDataTable } from 'utils/ListDataTable';

import styles from './crudListing.module.scss';
//import styles from './crudListing.module.css';

export const dependentDataLoader =
    (myKey) =>
    (fetchListAction) =>
    ({ dependentDataLoaded, setIsLoading, errorAction }) =>
    (dispatch) => {
        if (myKey in dependentDataLoaded) {
            if (!dependentDataLoaded[myKey]) {
                dispatch(
                    fetchListAction({
                        setIsLoading,
                        errorAction,
                    })
                );
            }
        }
    };
const handleAddFn = (onAddAction, siteResetCreateNew) => (e) => {
    e.preventDefault();
    if (siteResetCreateNew) {
        siteResetCreateNew();
    }
    onAddAction();
};

export const crudListingBase = ({
    extraParams = [],
    title = '',
    applyFilterList = [],
    advanceFilter,
    removeFilter,
    handleResetFilter,
    handleButtonClick,
    handleReferesh,
    listFilter = false,
    mapStateToProps,
    moduleName,
    tableColumnList,
    filterFunction,
    dependentDataLoaders,
    handleAdd = handleAddFn,
    mapDispatchToProps,
    addButtonIcon = undefined,
    addButtonTitle = undefined,
    addButtonRoute = undefined,
    additionalFilters = undefined,
    exportData = false,
    isAddButtonHide = false,
    isModalShown = false,
    dynamicComponent = undefined,
    showSearch = true,
    dynamicPagination = false,
    successAction = undefined,
    setAdvanceSearchVisible = undefined,
}) => {
    const ListPage = (props) => {
        const [listFilterForm] = Form.useForm();
        const { dispatch, fetchlist, listShowLoading, listFetchError, filterString, listSetFilterString, moduleType, userId, applyFilterList, showGlobalNotification } = props;

        const { data, isError, message, canEditMaster, additionalFilterValues, canAddMaster, closeActionError, sortingString = undefined, sortingStringOrder = 'asc', paginatedProps } = props;

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        let fetchListProps = {
            studySpecific: false,
            setIsLoading: listShowLoading,
            errorAction: listFetchError,
            moduleType,
            userId: userId,
            onError,
            onSuccessAction: (res) => {
                // setIsLoading(false);
                showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            },
        };

        if (dynamicPagination) {
            fetchListProps = { ...fetchListProps, pageNumber: PAGINATION.PAGE, offset: PAGINATION.DEFAULT_PAGE_SIZE };
        }

        useEffect(() => {
            if (userId) {
                fetchlist(fetchListProps);

                if (dependentDataLoaders && dependentDataLoaders.length > 0) {
                    const dependentDataLoaded = props.dependentDataLoaded;
                    dependentDataLoaders.map((fn) =>
                        fn({
                            dependentDataLoaded,
                            setIsLoading: listShowLoading,
                            errorAction: listFetchError,
                        })(dispatch)
                    );
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [userId]);

        const handleReferesh = () => {
            fetchlist(fetchListProps);
        };

        // const onClickExportToExcel = () => {
        //     const { exportToExcel, listShowLoading: setIsLoading, applyFilterList, filterString } = props;
        //     const keyword = (applyFilterList ? applyFilterList : '') + (filterString ? 'keyword=' + filterString + '&' : '');

        //     exportToExcel({
        //         setIsLoading,
        //         errorAction: () => {},
        //         applyFilterList: keyword,
        //     });
        // };

        // const handleOnChange = (e) => {
        //     const { listSetFilterString } = props;
        //     listSetFilterString(e.target.value);
        // };

        // const handleSearch = (value) => {
        //     listSetFilterString(filterString);
        //     if (value?.trim()?.length >= 3) {
        //         listSetFilterString({ ...filterString, advanceFilter: true, keyword: value });
        //         listFilterForm.setFieldsValue({ keyword: undefined });
        //     }
        // };

        const removeFilter = (key) => {
            const { [key]: names, ...rest } = filterString;
            listSetFilterString({ ...rest, advanceFilter: false });
        };

        data &&
            Array.isArray(data) &&
            data.sort((a, b) => {
                a = new Date(a.createdDate);
                b = new Date(b.createdDate);
                return a > b ? -1 : a < b ? 1 : 0;
            });

        let dataList = listFilter && data ? filteredData(additionalFilters, additionalFilterValues)(data) : data;
        if (!dynamicPagination && sortingString) dataList = dataList && dataList.sort(sortObjectOfArray(sortingString, sortingStringOrder));
        if (!dynamicPagination && filterString && filterString?.keyword) {
            dataList = dataList && dataList.filter(filterFunction(filterString?.keyword));
        }

        // const handleDynamicSearchClick = (e) => {
        //     const { listSetFilterString } = props;
        //     const keyword = e.target.value;
        //     listSetFilterString(keyword);

        //     if (!keyword) {
        //         const customProps = { ...fetchListProps, keyword, postSucessCallback: () => successAction && successAction(props) };
        //         data && fetchlist(customProps);
        //     }
        // };

        // const handleDynamicSearch = (e) => {
        //     const { filterString: keyword } = props;
        //     const customProps = { ...fetchListProps, keyword, postSucessCallback: () => successAction && successAction(props) };
        //     data && fetchlist(customProps);
        // };

        const columns = injectParams(props)(tableColumnList(props));

        // const downloadBtn = exportData && (
        //     <span onClick={onClickExportToExcel} className={styles.exportData}>
        //         <BsDownload className={styles.excelIcon} title="Export to Excel" />
        //     </span>
        // );

        const sortFn = (pagination, filters, sorter, extra) => {
            const { filterString: keyword, data } = props;
            const sortType = sorter?.columnKey?.split('.').pop() || sorter.columnKey || undefined;
            const sortOrder = sorter && sorter.order ? (sorter.order === 'descend' ? 'DESC' : 'ASC') : undefined;
            const customProps = { ...fetchListProps, keyword, pageNumber: pagination.current, sortType: sortType, sortOrder: sortOrder };
            data && fetchlist(customProps);
        };

        const paginationTableProps = (dynamicPagination && { current: paginatedProps?.currentPage, total: paginatedProps?.totalRecords || PAGINATION.DEFAULT_PAGE_SIZE }) || {};

        const addButtonOption =
            !isAddButtonHide &&
            (canAddMaster || canEditMaster ? (
                addButtonRoute ? (
                    <Link to={addButtonRoute}>
                        <Button icon={<PlusOutlined />} type="primary" danger>
                            {addButtonTitle ? addButtonTitle : 'Add '}
                        </Button>
                    </Link>
                ) : (
                    <Button icon={<PlusOutlined />} type="primary" danger onClick={handleAdd(props.onAddAction)}>
                        {addButtonTitle ? addButtonTitle : 'Add '}
                    </Button>
                )
            ) : (
                <DisableItemComponent />
            ));

        const onFinish = (values) => {};
        const onFinishFailed = () => {};

        const onSearchHandle = (value) => {
            if (value?.trim()?.length >= 3) {
                listSetFilterString({ ...filterString, advanceFilter: true, keyword: value });
                listFilterForm.setFieldsValue({ code: undefined });
            }
        };

        const handleClearInSearch = (e) => {
            if (e.target.value.length > 2) {
                listFilterForm.validateFields(['code']);
            }
        };

        const title = 'State Name';
        const advanceFilterResultProps = {
            advanceFilter: true,
            filterString,
            form: listFilterForm,
            onFinish,
            onFinishFailed,
            extraParams: applyFilterList,
            listSetFilterString,
            removeFilter,
            handleResetFilter,
            onSearchHandle,
            handleClearInSearch,
            setAdvanceSearchVisible,
            handleReferesh,
            handleButtonClick,
            title,
            validator: searchValidator,
            addButtonOption,
        };

        const tableProps = {
            tableColumn: columns,
            tableData: dataList,
            onChange: dynamicPagination ? sortFn : undefined,
            paginationTableProps,
            addButtonOption,
        };

        return (
            <div className={styles.dataTable} key={'crudlistingParent'}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <CurdSearchBox {...advanceFilterResultProps} />
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        {isError ? <Alert type="error" message={message} closable={true} onClose={closeActionError} /> : ''}
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <ListDataTable isLoading={props.isLoading} {...tableProps} addTitle={title} />
                    </Col>
                </Row>
            </div>
        );
    };
    return connect(mapStateToProps, mapDispatchToProps)(ListPage);
};
