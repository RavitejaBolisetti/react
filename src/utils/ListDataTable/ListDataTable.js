/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { DataTable } from 'utils/dataTable';
import { Button, Empty, ConfigProvider } from 'antd';
import styles from 'components/common/Common.module.css';
import { PlusOutlined } from '@ant-design/icons';
import { LANGUAGE_EN } from 'language/en';

export default function ListDataTable({ isLoading, tableColumn, tableData, handleAdd, addTitle = 'Group', scroll = 'auto', showAddButton = true, srl, noDataMessage = '' }) {
    const noDataExistTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataExistMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', addTitle);

    const noDataInformation = (
        <>
            {noDataExistTitle} <br /> {noDataExistMessage}{' '}
        </>
    );

    return (
        <>
            <ConfigProvider
                renderEmpty={() => (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        imageStyle={{
                            height: '20%',
                        }}
                        description={!tableData?.length ? <span>{noDataMessage || noDataInformation}</span> : <span> No records found.</span>}
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
                <div className={`${styles.tableProduct} ${styles.datasearh}`}>
                    <DataTable isLoading={isLoading} tableData={tableData} srl={srl} tableColumn={tableColumn} showAddButton={showAddButton} scroll={scroll} />
                </div>
            </ConfigProvider>
        </>
    );
}
