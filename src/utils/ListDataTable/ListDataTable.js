/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { DataTable } from 'utils/dataTable';
import { Button, Empty, ConfigProvider } from 'antd';
import styles from 'components/common/Common.module.css';
import { PlusOutlined } from '@ant-design/icons';

export default function ListDataTable({
    isLoading,
    tableColumn,
    tableData,
    handleAdd,
    addTitle = 'Group',
    scroll = 'auto',
    showAddButton = true,
    srl,
    noDataMessage = (
        <>
            No records found. Please add new parameter <br />
            using below button
        </>
    ),
}) {
    return (
        <>
            <ConfigProvider
                renderEmpty={() => (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        imageStyle={{
                            height: '20%',
                        }}
                        description={!tableData?.length ? <span>{noDataMessage}</span> : <span> No records found.</span>}
                    >
                        {!tableData?.length
                            ? showAddButton && (
                                  <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                      {`Add`}
                                  </Button>
                              )
                            : ''}
                    </Empty>
                )}
            >
                <div className={styles.tableProduct}>
                    <DataTable isLoading={isLoading} tableData={tableData} srl={srl} tableColumn={tableColumn} scroll={scroll} />
                </div>
            </ConfigProvider>
        </>
    );
}
