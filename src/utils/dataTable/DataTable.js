import { Table } from 'antd';
import { useState } from 'react';

export default function DataTable({ isLoading, tableColumn, tableData }) {
    const [tablePagination, setPagination] = useState({ pageSize: 10, current: 1, position: ['bottomRight'], showSizeChanger: true });

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
    };

    return (
        <Table
            loading={isLoading}
            columns={tableColumn}
            dataSource={tableData}
            onChange={handleTableChange}
            pagination={tableData?.length > 10 ? tablePagination : false}
            scroll={{
                x: 'auto',
            }}
        />
    );
}
