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
                        {!tableData?.length ? (
                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                {`Add`}
                            </Button>
                        ) : (
                            ''
                        )}
                    </Empty>
                )}
            >
                <div className={styles.tableProduct}>
                    <DataTable isLoading={isLoading} tableData={tableData} tableColumn={tableColumn} scroll={scroll} />
                </div>
            </ConfigProvider>
        </>
    );
}
