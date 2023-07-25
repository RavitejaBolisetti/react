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
import { Table } from 'antd';
import { InputSkeleton } from 'components/common/Skeleton';
import { tblSerialNumberColumn } from 'utils/tableCloumn';

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
                Total <span style={{ color: '#0B0B0C' }}> {total} </span> items
            </>
        );

    const [tablePagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ['bottomRight'],
        showSizeChanger: showSizeChanger,
        hideOnSinglePage: false,
        showTotal,
    });

    const handleTableChange = (pagination, filters, sorter) => {
        if (dynamicPagination) {
            const sortBy = sorter?.column?.dataIndex || undefined;
            const sortType = sorter && sorter.order ? (sorter.order === 'descend' ? 'DESC' : 'ASC') : undefined;
            setPage({ ...pagination, sortBy, sortType });
        } else {
            setPage({ ...pagination });
        }
        setPagination({ ...pagination, showTotal });
    };

    const skeletonData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    const tableColumnWithSrl = srl ? [tblSerialNumberColumn({ page: tablePagination?.current, title: srlTitle, pageSize: tablePagination?.pageSize, width: scroll === 'auto' ? '5%' : '50px' }), ...tableColumn] : [...tableColumn];

    const tableSkeletonColumn = tableColumnWithSrl?.map((item) => {
        return { ...item, render: () => <InputSkeleton height={40} /> };
    });

    return (
        <div style={{ marginBottom: '20px' }}>
            <Table rowSelection={rowSelection} columns={isLoading ? tableSkeletonColumn : tableColumnWithSrl} dataSource={isLoading ? skeletonData : tableData} onChange={handleTableChange} pagination={pagination ? !isLoading && tablePagination : false} rowKey={rowKey} scroll={scroll} />
        </div>
    );
}
