import { Table } from 'antd';
import { useState } from 'react';

export default function DataTable({ isLoading, tableColumn, tableData }) {
    const [tablePagination, setPagination] = useState({pageSize: 20, current: 1})

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination)
    };

    return (
        <Table
            loading={isLoading}
            columns={tableColumn}
            dataSource={tableData}
            onChange={handleTableChange}
            pagination={{
                position: ['bottomRight'],
                showSizeChanger: true,
                ...tablePagination
            }}
            scroll={{
                x: 'auto',
            }}
        />
    );
}
