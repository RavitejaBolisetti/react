import { useState } from 'react';
import { Table} from 'antd';
import { InputSkeleton } from 'components/common/Skeleton';

export default function DataTable({ isLoading, tableColumn, tableData }) {
    const showTotal = (total) => `Total ${!isLoading ? tableData?.length : null} items`;

    const [tablePagination, setPagination] = useState({ pageSize: 10, current: 1, position: ['bottomRight'], showSizeChanger: true, hideOnSinglePage: false, showTotal });

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
            pagination={tablePagination}
            scroll={{
                x: 'auto',
            }}
        />
    );
}
