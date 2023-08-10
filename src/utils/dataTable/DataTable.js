/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
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

const { Option } = Select;

export default function DataTable({ isLoading, rowSelection = undefined, showSizeChanger = true, dynamicPagination = false, totalRecords = '10', pagination = true, removePagination = false, srl = true, srlTitle = '#', tableColumn, scroll = 'auto', tableData, rowKey = 'index', setPage = () => {} }) {
    useEffect(() => {
        if (dynamicPagination) {
            setPagination({ ...tablePagination, total: totalRecords });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dynamicPagination, totalRecords]);

    const showTotal = (total) =>
        total && (
            <>
                Total <span style={{ color: '#0b0b0c' }}> {total} </span> items
            </>
        );

    const [tablePagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ['bottomRight'],
        showSizeChanger: false,
        hideOnSinglePage: false,
        showTotal: false,
    });

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
        // if (dynamicPagination) {
        //     const sortBy = sorter?.column?.dataIndex || undefined;
        //     const sortType = sorter && sorter.order ? (sorter.order === 'descend' ? 'DESC' : 'ASC') : undefined;
        //     setPage({ ...pagination, sortBy, sortType });
        // } else {
        //     setPage({ ...pagination });
        // }
        setPagination({ ...pagination, current: page, pageSize });
        setPage({ ...pagination, current: page, pageSize });
    };

    const skeletonData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    const tableColumnWithSrl = srl ? [tblSerialNumberColumn({ page: tablePagination?.current, title: srlTitle, pageSize: tablePagination?.pageSize, width: scroll === 'auto' ? '5%' : '50px' }), ...tableColumn] : [...tableColumn];

    const tableSkeletonColumn = tableColumnWithSrl?.map((item) => {
        return { ...item, render: () => <InputSkeleton height={40} /> };
    });

    const options = [];
    for (let i = 1; i < 5; i++) {
        options.push({
            value: i * 10,
            label: `${i * 10 + '/Page'}`,
        });
    }

    const handleChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    return (
        <div className={styles.marB20}>
            {/* <Table rowSelection={rowSelection} columns={isLoading ? tableSkeletonColumn : tableColumnWithSrl} dataSource={isLoading ? skeletonData : tableData} onChange={handleTableChange} pagination={pagination ? !isLoading && tablePagination : false} rowKey={rowKey} scroll={scroll} /> */}
            <Table rowSelection={rowSelection} columns={isLoading ? tableSkeletonColumn : tableColumnWithSrl} dataSource={isLoading ? skeletonData : tableData} onChange={handleTableChange} pagination={false} rowKey={rowKey} scroll={scroll} />
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    {totalRecords && (
                        <>
                            Total <span style={{ color: '#0b0b0c' }}> {totalRecords} </span> items
                        </>
                    )}
                    <Select defaultValue="10/Page" onChange={handleChange} style={{ width: 200 }} options={options} />
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Pagination {...tablePagination} onChange={handlePageChange} />
                </Col>
            </Row>
        </div>
    );
}
