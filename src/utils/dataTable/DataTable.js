import { Button, Table } from 'antd';
import React from 'react';
import styles from './DataTable.module.css';

const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
        return (
            <Button danger className={styles.previousPage}>
                Previous
            </Button>
        );
    }
    if (type === 'next') {
        return (
            <Button danger className={styles.nextPage}>
                Next
            </Button>
        );
    }
    return originalElement;
};

export default function DataTable({ isLoading, tableColumn, tableData }) {
    return (
        <Table
            loading={isLoading}
            columns={tableColumn}
            dataSource={tableData}
            pagination={{
                position: ['bottomRight'],
                itemRender,
            }}
            scroll={{
                x: 'auto',
            }}
        />
    );
}
