import { tblPrepareColumns } from 'utils/tableCloumn';
import { Button, Space } from 'antd';
import { FiEye } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { convertDate } from 'utils/formatDateTime';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];

    tableColumn.push(
        //tblSerialNumberColumn({ page, pageSize, width: '5%' }),

        tblPrepareColumns({
            title: 'Product Hierarchy',
            dataIndex: 'productName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Document Type',
            dataIndex: 'documentType',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Language',
            dataIndex: 'languageDesc',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Description',
            dataIndex: 'termsconditiondescription',
            width: '25%',
        }),
        tblPrepareColumns({
            title: 'Version',
            dataIndex: 'version',
            width: '2%',
        }),
        tblPrepareColumns({
            title: 'Effective From',
            dataIndex: 'effectivefrom',
            width: '13%',
            render: (text) => convertDate(text),
        }),
        tblPrepareColumns({
            title: 'Effective To',
            dataIndex: 'effectiveto',
            width: '13%',
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
