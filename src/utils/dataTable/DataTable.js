/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { useState, useEffect } from 'react';
import { Table, Row, Col, Select, Pagination } from 'antd';
import { InputSkeleton } from 'components/common/Skeleton';
import { tblSerialNumberColumn } from 'utils/tableColumn';

import styles from 'components/common/Common.module.css';

export default function DataTable({ isLoading, rowSelection = undefined, showSizeChanger = true, dynamicPagination = false, totalRecords = '10', pagination = true, removePagination = false, srl = true, srlTitle = '#', tableColumn, scroll = 'auto', tableData, rowKey = 'index', page = undefined, setPage = () => {} }) {
    const [tablePagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        showSizeChanger: false,
        hideOnSinglePage: false,
        showTotal: false,
    });

    useEffect(() => {
        if (dynamicPagination) {
            setPagination({ ...tablePagination, total: totalRecords });
        } else {
            setPagination({ ...tablePagination, total: tableData?.length });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dynamicPagination, totalRecords, tableData, page]);

    const handleTableChange = (pagination, filters, sorter) => {
        if (dynamicPagination) {
            const sortBy = sorter?.column?.dataIndex || undefined;
            const sortType = sorter && sorter.order ? (sorter.order === 'descend' ? 'DESC' : 'ASC') : undefined;
            setPage({ ...pagination, sortBy, sortType });
        } else {
            setPage({ ...pagination });
        }
        // setPagination({ ...pagination, showTotal });
    };

    const handlePageChange = (page, pageSize) => {
        setPagination({ ...tablePagination, current: page, pageSize });
        setPage({ ...tablePagination, current: page, pageSize });
    };

    const skeletonData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    const tableColumnWithSrl = srl ? [tblSerialNumberColumn({ page: tablePagination?.current, title: srlTitle, pageSize: tablePagination?.pageSize, width: scroll === 'auto' ? '5%' : '80px' }), ...tableColumn] : [...tableColumn];

    const tableSkeletonColumn = tableColumnWithSrl?.map((item) => {
        return { ...item, render: () => <InputSkeleton height={40} /> };
    });

    const optionValue = [1, 2, 5, 10];
    const options = optionValue?.map((i) => {
        return { ...i, value: i * 10, label: `${i * 10 + ' / page'}` };
    });

    const handleChange = (pageSize) => {
        setPagination({ ...tablePagination, current: 1, pageSize });
        setPage({ ...tablePagination, current: 1, pageSize });
    };

    const showPaginator = tableData?.length > 0;
    console.log('tablePagination', tablePagination);
    return (
        <div className={styles.marB20}>
            <div className={styles.mainDataTable}>
                <Table rowSelection={rowSelection} pagination={pagination ? { ...tablePagination } : false} columns={isLoading ? tableSkeletonColumn : tableColumnWithSrl} dataSource={isLoading ? skeletonData : tableData} onChange={handleTableChange} rowKey={rowKey} scroll={scroll} />
            </div>
            {!isLoading && pagination && showPaginator && (
                <Row gutter={20} className={styles.marT20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        {tablePagination?.total && (
                            <>
                                <span className={`${styles.marR20} ${styles.tableTextColor54}`}>
                                    Total <span style={{ color: '#0b0b0c' }}> {tablePagination?.total} </span> {tablePagination?.total > 1 ? 'items' : 'item'}
                                </span>
                                <Select defaultValue={tablePagination?.pageSize} onChange={handleChange} options={options} />
                            </>
                        )}
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                        <Pagination {...tablePagination} onChange={handlePageChange} />
                    </Col>
                </Row>
            )}
        </div>
    );
}
