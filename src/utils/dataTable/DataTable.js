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
import { useState } from 'react';
import { Table } from 'antd';
import { InputSkeleton } from 'components/common/Skeleton';
import { tblSerialNumberColumn } from 'utils/tableCloumn';

export default function DataTable({ isLoading, removePagination = false, srl = true, srlTitle = '#', tableColumn, scroll = 'auto', tableData, rowKey = 'index', setPage = () => {} }) {
    const showTotal = (total) =>
        total && (
            <>
                Total <span style={{ color: '#0B0B0C' }}> {total} </span> items
            </>
        );

    const [tablePagination, setPagination] = useState({ pageSize: 10, current: 1, position: ['bottomRight'], showSizeChanger: true, hideOnSinglePage: false, showTotal });

    const handleTableChange = (pagination, filters, sorter) => {
        setPage({ ...pagination });
        setPagination({ ...pagination, showTotal });
    };

    const skeletonData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    const tableColumnWithSrl = [tblSerialNumberColumn({ page: tablePagination?.current, title: srlTitle, pageSize: tablePagination?.pageSize, width: '5%' }), ...tableColumn];

    const tableSkeletonColumn = tableColumnWithSrl?.map((item) => {
        return { ...item, render: () => <InputSkeleton height={40} /> };
    });

    return (
        <Table
            columns={isLoading ? tableSkeletonColumn : tableColumnWithSrl}
            dataSource={isLoading ? skeletonData : tableData}
            onChange={handleTableChange}
            pagination={removePagination ? false : !isLoading && tablePagination}
            rowKey={rowKey}
            scroll={{
                x: scroll,
            }}
        />
    );
}
