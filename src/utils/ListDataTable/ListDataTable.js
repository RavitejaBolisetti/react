/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { DataTable } from 'utils/dataTable';
import { Button, Empty, ConfigProvider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LANGUAGE_EN } from 'language/en';

export default function ListDataTable(props) {
    const { tableData, handleButtonClick, addTitle = 'Record', showAddButton = true, noDataMessage = '', addButtonOption = false, styles = '' } = props;
    const noDataExistTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataExistMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', addTitle);
    console.log(addButtonOption);

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
                            ? // ? addButtonOption
                              // : addButtonOption
                              showAddButton && (
                                  <Button icon={<PlusOutlined />} type="primary" danger onClick={handleButtonClick}>
                                      {`Add`}
                                  </Button>
                              )
                            : ''}
                    </Empty>
                )}
            >
                <div className={`${styles.tableProduct} ${styles.datasearh}`}>
                    <DataTable {...props} />
                </div>
            </ConfigProvider>
        </>
    );
}
