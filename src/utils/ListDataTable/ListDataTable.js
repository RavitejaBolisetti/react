/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { DataTable } from 'utils/dataTable';
import { Button, Empty, ConfigProvider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { translateContent } from 'utils/translateContent';

export default function ListDataTable(props) {
    const { tableData, handleButtonClick, handleAdd, addTitle = 'Record', showAddButton = true, noDataMessage = '' } = props;
   
    const noDataInformation = (
        <>
            {translateContent('global.generalMessage.noRecordsFound')} <br /> {showAddButton && translateContent('global.generalMessage.noRecordsFoundAddNew').replace('{NAME}', addTitle)}
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
                        description={!tableData?.length ? <span>{noDataMessage || noDataInformation}</span> : <span>{translateContent('global.generalMessage.noRecordsFound')}</span>}
                    >
                        {showAddButton && (
                            <Button icon={<PlusOutlined />} type="primary" danger onClick={handleButtonClick || handleAdd}>
                                {translateContent('global.buttons.add')}
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
