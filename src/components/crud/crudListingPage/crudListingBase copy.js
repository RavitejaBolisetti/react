/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withSpinner } from '../../withSpinner';

import { Table, Input, Col, Row, Button, Alert, ConfigProvider, Empty, Form } from 'antd';

import Icon from '@ant-design/icons';

import { RxCross2 } from 'react-icons/rx';
import { FilterIcon } from 'Icons';

import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { BsDownload } from 'react-icons/bs';

import { injectParams } from 'utils/inject';
import { Link } from 'react-router-dom';

import { DisableItemComponent } from 'utils/disableItemComponent';
import { filteredData } from 'utils/listFilter';
import { sortObjectOfArray } from 'utils/sortObjectOfArray';
import { DataTable } from 'utils/dataTable';

import { searchValidator } from 'utils/validation';

import { PAGINATION } from 'constants/constants';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

// import styles from './crudListing.module.css';

import styles from 'components/common/Common.module.css';

const { Search } = Input;

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

export const crudListingBase = ({ advanceFilter = false, handleButtonClick, handleReferesh, listFilter = false, mapStateToProps, moduleName, tableColumnList, filterFunction, dependentDataLoaders, handleAdd = handleAddFn, mapDispatchToProps, addButtonIcon = undefined, addButtonTitle = undefined, addButtonRoute = undefined, additionalFilters = undefined, exportData = false, isAddButtonHide = false, isModalShown = false, isLockModalShown = false, dynamicComponent = undefined, showSearch = true, dynamicPagination = false, successAction = undefined }) => {
    class ListPage extends Component {
        constructor() {
            super();
            this.state = { isLoading: false, fetchListProps: undefined };
        }

        //  const [form] = form.useForm();

        componentDidMount() {
            const { fetchlist, listShowLoading, listFetchError, moduleType, userId, isPendingCourseURL = false } = this.props;
            let fetchListProps = {
                studySpecific: false,
                setIsLoading: listShowLoading,
                errorAction: listFetchError,
                // studyId: studySpecific || queryStringStudySpecific ? match && match.params && match?.params?.studyId : studyId,
                moduleType,
                userId: userId,
                postSucessCallback: successAction && successAction(this.props),
                isPendingCourseURL,
            };

            if (dynamicPagination) {
                fetchListProps = { ...fetchListProps, pageNumber: PAGINATION.PAGE, offset: PAGINATION.DEFAULT_PAGE_SIZE };
            }

            this.setState({ ...this.state, fetchListProps: fetchListProps });
            fetchlist(fetchListProps);
        }

        componentDidUpdate() {
            const { fetchlist, listShowLoading, listFetchError, dispatch } = this.props;

            if (!this.props.isLoaded && !this.state.isLoading) {
                this.setState({ ...this.state, isLoading: true });

                fetchlist({
                    studySpecific: false,
                    setIsLoading: this.props.listShowLoading,
                    errorAction: this.props.listFetchError,
                    moduleType: this.props.moduleType,
                    userId: this.props.userId,
                    postSucessCallback: () => {
                        this.setState({ isLoading: false });
                        successAction && successAction(this.props);
                    },
                });

                if (dependentDataLoaders && dependentDataLoaders.length > 0) {
                    const dependentDataLoaded = this.props.dependentDataLoaded;
                    dependentDataLoaders.map((fn) =>
                        fn({
                            dependentDataLoaded,
                            setIsLoading: listShowLoading,
                            errorAction: listFetchError,
                        })(dispatch)
                    );
                }
            }
        }

        componentWillUnmount() {
            const { listSetFilterString } = this.props;
            listSetFilterString(undefined);
        }

        onClickExportToExcel = () => {
            const { exportToExcel, listShowLoading: setIsLoading, extraParams, filterString } = this.props;
            const keyword = (extraParams ? extraParams : '') + (filterString ? 'keyword=' + filterString + '&' : '');

            exportToExcel({
                setIsLoading,
                errorAction: () => {},
                extraParams: keyword,
            });
        };

        handleOnChange = (e) => {
            const { listSetFilterString } = this.props;
            listSetFilterString(e.target.value);
        };

        handleSearch = () => {
            const { filterString, listSetFilterString } = this.props;
            listSetFilterString(filterString);
        };

        render() {
            const { data, filterString, selectedData, isError, message, match, canEditData = true, showAddButton = true, canEditMaster, additionalFilterValues, canAddMaster, closeActionError, sortingString = undefined, sortingStringOrder = 'asc', hideModuleLabel = false, studyId = undefined, overRiddenModuleName = undefined, paginatedProps, study = undefined, isPendingCourseURL = false } = this.props;

            data &&
                Array.isArray(data) &&
                data.sort((a, b) => {
                    a = new Date(a.createdDate);
                    b = new Date(b.createdDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                });

            let dataList = listFilter && data ? filteredData(additionalFilters, additionalFilterValues)(data) : data;

            if (!dynamicPagination && sortingString) dataList = dataList && dataList.sort(sortObjectOfArray(sortingString, sortingStringOrder));

            if (!dynamicPagination && filterString) {
                dataList = dataList && dataList.filter(filterFunction(filterString));
            }

            const handleDynamicSearchClick = (e) => {
                const { listSetFilterString } = this.props;
                const keyword = e.target.value;
                listSetFilterString(keyword);

                if (!keyword) {
                    const customProps = { ...this.state.fetchListProps, keyword, postSucessCallback: () => successAction && successAction(this.props) };
                    data && this.props.fetchlist(customProps);
                }
            };

            const handleDynamicSearch = (e) => {
                const { filterString: keyword } = this.props;

                const customProps = { ...this.state.fetchListProps, keyword, postSucessCallback: () => successAction && successAction(this.props) };
                data && this.props.fetchlist(customProps);
            };

            const columns = injectParams(this.props)(tableColumnList(this.props));

            const colLeft = 18;
            const colRight = 6;

            const downloadBtn = exportData && (
                <span onClick={this.onClickExportToExcel} className={styles.exportData}>
                    <BsDownload className={styles.excelIcon} title="Export to Excel" />
                </span>
            );

            const sortFn = (pagination, filters, sorter, extra) => {
                const { filterString: keyword, data } = this.props;
                const sortType = sorter?.columnKey?.split('.').pop() || sorter.columnKey || undefined;
                const sortOrder = sorter && sorter.order ? (sorter.order === 'descend' ? 'DESC' : 'ASC') : undefined;
                const customProps = { ...this.state.fetchListProps, keyword, pageNumber: pagination.current, sortType: sortType, sortOrder: sortOrder };
                data && this.props.fetchlist(customProps);
            };

            const pagincationTableProps = (dynamicPagination && { current: paginatedProps?.currentPage, total: paginatedProps?.totalRecords || PAGINATION.DEFAULT_PAGE_SIZE }) || {};

            const tableProps = {
                // tableColumn: tableColumn(handleButtonClick, page?.current, page?.pageSize),
                tableColumn: columns,
                tableData: dataList,
            };

            const addButtonOption =
                !isAddButtonHide &&
                (canAddMaster || canEditMaster ? (
                    addButtonRoute ? (
                        <Link to={addButtonRoute}>
                            <Button icon={<PlusOutlined />} type="primary" danger>
                                {addButtonTitle ? addButtonTitle : 'Add ' + moduleName}
                            </Button>
                        </Link>
                    ) : (
                        <Button icon={<PlusOutlined />} type="primary" danger onClick={handleAdd(this.props.onAddAction)}>
                            {addButtonTitle ? addButtonTitle : 'Add ' + moduleName}
                        </Button>
                        // <Button icon={<PlusOutlined />} type="primary" danger onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                    )
                ) : (
                    <DisableItemComponent />
                ));

            return (
                <div className={styles.dataTable} key={'crudlistingParent'}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            {isError ? <Alert type="error" message={message} closable={true} onClose={closeActionError} /> : ''}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            {/* <div className={styles.contentHeaderBackground}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                                <Form autoComplete="off" colon={false} form={form} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                                    <Form.Item
                                                        label={`${title} List`}
                                                        name="code"
                                                        rules={[
                                                            {
                                                                validator: searchValidator,
                                                            },
                                                        ]}
                                                        validateTrigger={['onSearch']}
                                                    >
                                                        <Search placeholder="Search" allowClear className={styles.headerSearchField} onSearch={onSearchHandle} />
                                                    </Form.Item>
                                                </Form>
                                            </Col>
                                            {advanceFilter && (
                                                <Col xs={24} sm={12} md={10} lg={10} xl={10}>
                                                    <Button icon={<FilterIcon />} type="link" className={styles.filterBtn} onClick={() => setAdvanceSearchVisible(true)} danger>
                                                        Advanced Filters
                                                    </Button>
                                                </Col>
                                            )}
                                        </Row>
                                    </Col>

                                    <Col className={styles.buttonsGroupRight} xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />
                                        <Button icon={<PlusOutlined />} type="primary" danger onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                            Add
                                        </Button>
                                    </Col>
                                </Row>
                                {advanceFilter && filterString?.advanceFilter && (
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                                    <div className={styles.advanceFilterTitle}>Applied Advance Filters : </div>
                                                    {extraParams?.map((filter) => {
                                                        return (
                                                            filter?.value && (
                                                                <div className={styles.advanceFilterItem} key={filter?.key}>
                                                                    {filter?.name}
                                                                    {filter?.canRemove && (
                                                                        <span>
                                                                            <RxCross2 onClick={() => removeFilter(filter?.key)} />
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )
                                                        );
                                                    })}
                                                </Col>
                                                <Col xs={24} sm={2} md={2} lg={2} xl={2} className={styles.advanceFilterClear}>
                                                    <Button className={styles.clearBtn} onClick={handleResetFilter} danger>
                                                        Clear
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                )}
                            </div> */}
                            <div className={styles.contentHeaderBackground}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4} className={styles.lineHeight33}>
                                                State List
                                            </Col>
                                            {showSearch && (
                                                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                                    <Search placeholder="Search" allowClear className={styles.headerSearchField} value={filterString} onChange={dynamicPagination ? handleDynamicSearchClick : this.handleOnChange} onSearch={dynamicPagination ? handleDynamicSearch : this.handleSearch} />
                                                </Col>
                                            )}
                                            {dynamicComponent && (
                                                <Col xs={12} sm={10} md={10} lg={10} xl={6}>
                                                    {dynamicComponent(this.props)}
                                                </Col>
                                            )}
                                        </Row>
                                    </Col>

                                    <Col className={styles.buttonsGroupRight} xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />
                                        {addButtonOption}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <ConfigProvider
                                renderEmpty={() =>
                                    this.props.isLoaded && (
                                        <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                            imageStyle={{
                                                height: 60,
                                            }}
                                            description={
                                                !dataList?.length ? (
                                                    <span>
                                                        No records found. Please add new parameter <br />
                                                        using below button
                                                    </span>
                                                ) : (
                                                    <span> No records found.</span>
                                                )
                                            }
                                        >
                                            {!dataList?.length ? (
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        {addButtonOption}
                                                    </Col>
                                                </Row>
                                            ) : (
                                                ''
                                            )}
                                        </Empty>
                                    )
                                }
                            >
                                <div className={styles.tableProduct}>
                                    <DataTable isLoading={this.props.isLoading} {...tableProps} />
                                </div>
                            </ConfigProvider>
                        </Col>
                    </Row>

                    {/* <div className={styles.tableList}>
                        <Table
                            columns={columns}
                            dataSource={dataList}
                            rowKey="id"
                            onHeaderRow={() => ({ className: styles.tableHeader })}
                            rowClassName={styles.tableRow}
                            scroll={{ x: 'max-content' }}
                            onChange={dynamicPagination ? sortFn : undefined}
                            pagination={{
                                ...pagincationTableProps,
                                defaultPageSize: PAGINATION.DEFAULT_PAGE_SIZE,
                                showSizeChanger: false,
                                showTotal: (total, range) => `Show ${range[0]} to ${range[1]} of ${total} entries`,
                            }}
                        />
                    </div> */}
                </div>
            );
        }
    }
    const withSpinnerPage = connect(mapStateToProps, mapDispatchToProps)(withSpinner(ListPage));
    return withSpinnerPage;
};
