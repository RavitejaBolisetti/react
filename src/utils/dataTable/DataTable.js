import { useState } from 'react';
import { Table } from 'antd';
import { InputSkeleton } from 'components/common/Skeleton';
import { tblSerialNumberColumn } from 'utils/tableCloumn';

export default function DataTable({ isLoading, tableColumn, scroll = 'auto', tableData, rowKey = 'index', setPage = () => {}, srl = true }) {
    const showTotal = (total) => total && `Total ${total} items`;
    const [tablePagination, setPagination] = useState({ pageSize: 10, current: 1, position: ['bottomRight'], showSizeChanger: true, hideOnSinglePage: false, showTotal });

    const handleTableChange = (pagination, filters, sorter) => {
        setPage({ ...pagination });
        setPagination({ ...pagination, showTotal });
    };

    const tableSkeletonColumn = tableColumn?.map((item) => {
        return { ...item, render: () => <InputSkeleton height={40} /> };
    });

    const skeletonData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    const tableColumnWithSrl = [tblSerialNumberColumn({ page: tablePagination?.current, pageSize: tablePagination?.pageSize, width: '5%' }), ...tableColumn];

    return (
        <Table
            columns={isLoading ? tableSkeletonColumn : srl ? tableColumnWithSrl : tableColumn}
            dataSource={isLoading ? skeletonData : tableData}
            onChange={handleTableChange}
            pagination={!isLoading && tablePagination}
            rowKey={rowKey}
            scroll={{
                x: scroll,
            }}
        />
    );
}
