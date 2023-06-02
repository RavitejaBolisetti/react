import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';
import { Button, Col, Row, Input, Space, Form, Empty, ConfigProvider } from 'antd';
import { EditIcon, ViewEyeIcon } from 'Icons';
import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];

    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize, width: '5%' }),

        tblPrepareColumns({
            title: 'Product Hierarchy',
            dataIndex: 'productCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Document Type',
            dataIndex: 'documentTypeCode',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Language',
            dataIndex: 'languageCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Description',
            dataIndex: 'documentDescription',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Version',
            dataIndex: 'version',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Effective From',
            dataIndex: 'effectiveFrom',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Effective To',
            dataIndex: 'effectiveTo',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'MFG T&C',
            width: '15%',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {
                            <Button className={styles.tableIcons} danger ghost aria-label="ai-view">
                                {/* onClick={() => handleView(record)} */}
                                <ViewEyeIcon />
                            </Button>
                        }
                    </Space>
                );
            },
        }),
        tblPrepareColumns({
            title: 'View',
            width: '15%',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {
                            <Button className={styles.tableIcons} danger ghost aria-label="ai-view">
                                {/* onClick={() => handleView(record)} */}
                                <ViewEyeIcon />
                            </Button>
                        }
                    </Space>
                );
            },
        }),

        tblStatusColumn({ styles, width: '15%' }),

        tblActionColumn({ styles, handleButtonClick, width: '10%' })
    );

    return tableColumn;
};
