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
    const { tableData, handleButtonClick, handleAdd, addTitle = 'Record', showAddButton = true, noDataMessage = '' } = props;
    // addButtonOption = false,
    const noDataExistTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataExistMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', addTitle);
    const noDataInformation = (
        <>
            {noDataExistTitle} <br /> {showAddButton && noDataExistMessage}
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
                        {showAddButton && (
                            <Button icon={<PlusOutlined />} type="primary" danger onClick={handleButtonClick || handleAdd}>
                                {`Add`}
                            </Button>
                        )}
                    </Empty>
                )}
            >
                <DataTable {...props} />
            </ConfigProvider>
        </>
    );
}
