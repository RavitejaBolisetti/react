import { Table } from 'antd';
import { useState } from 'react';
import { InputSkeleton } from 'components/common/Skeleton';

export default function DataTable({ isLoading, tableColumn, tableData }) {
    const showTotal = (total) => `Total ${!isLoading ? tableData?.length : null} items`;

    const [tablePagination, setPagination] = useState({ pageSize: 10, current: 1, position: ['bottomRight'], showSizeChanger: true, showTotal });

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination({ ...pagination, showTotal });
    };

    const tableSkeletonColumn = tableColumn?.map((item) => {
        return { ...item, render: () => <InputSkeleton height={40} /> };
    });

    const skeletonData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    return (
        <Table
            columns={isLoading ? tableSkeletonColumn : tableColumn}
            dataSource={isLoading ? skeletonData : tableData}
            onChange={handleTableChange}
            pagination={tableData?.length > 10 ? tablePagination : false}
            scroll={{
                x: 'auto',
            }}
        />
    );
}
