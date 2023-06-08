import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';
import { Button, Col, Row, Input, Space, Form, Empty, ConfigProvider } from 'antd';
import { FiEdit, FiEye } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { convertDate } from 'utils/formatDateTime';

export const tableColumn = (handleButtonClick, handleManufacturerButtonClick, page, pageSize) => {
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
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Language',
            dataIndex: 'language',
            width: '10%',
        }),

        tblPrepareColumns({
            title: 'Description',
            dataIndex: 'termConditionDescription',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Version',
            dataIndex: 'version',
            width: '5%',
        }),
        tblPrepareColumns({
            title: 'Effective From',
            dataIndex: 'effectiveFrom',
            width: '15%',
            render: (text) => convertDate(text),
        }),
        tblPrepareColumns({
            title: 'Effective To',
            dataIndex: 'effectiveTo',
            width: '15%',
            render: (text) => convertDate(text),
        }),
        // tblPrepareColumns({
        //     title: 'MFG T&C',
        //     width: '15%',
        //     sorter: false,
        //     render: (text, record, index) => {
        //         return (
        //             <Space>
        //                 {
        //                     <Button className={styles.tableIcons} danger ghost aria-label="ai-view">
        //                         {/* onClick={() => handleView(record)} */}
        //                         <ViewEyeIcon />
        //                     </Button>
        //                 }
        //             </Space>
        //         );
        //     },
        // }),
        tblPrepareColumns({
            title: 'MFG T&C',
            width: '5%',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        {record?.manufracturerTnCId !== 'NA' ? (
                            <Button data-testid="view" className={styles.tableIcons} aria-label="ai-view" onClick={(e) => handleManufacturerButtonClick({ buttonAction: FROM_ACTION_TYPE?.VIEW, record })}>
                                <FiEye />
                            </Button>
                        ) : null}
                    </Space>
                );
            },
        }),
        tblPrepareColumns({
            title: 'View',
            width: '5%',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space>
                        <Button data-testid="view" className={styles.tableIcons} aria-label="ai-view" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.VIEW, record })}>
                            <FiEye />
                        </Button>
                    </Space>
                );
            },
        })

        // tblActionColumn({ handleButtonClick, styles, fixed: 'right', width: '10%' })
    );

    return tableColumn;
};
