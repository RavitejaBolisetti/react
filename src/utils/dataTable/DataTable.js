import { Table } from 'antd';
import React from 'react';

export default function DataTable({ isLoading, tableColumn, tableData }) {
    return (
        <Table
            loading={isLoading}
            columns={tableColumn}
            dataSource={tableData}
            pagination={{
                position: ['bottomRight'],
                pageSize: 10,
                showSizeChanger: true,
            }}
            scroll={{
                x: 'auto',
            }}
        />
    );
}
