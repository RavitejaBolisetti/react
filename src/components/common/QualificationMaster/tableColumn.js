import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';
import { Tag } from 'antd';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize }),
        tblPrepareColumns({
            title: 'Qualification Code',
            dataIndex: 'qualificationCode',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Qualification Name',
            dataIndex: 'qualificationName',
            width: '40%',
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (text) => <>{text === 1 ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>}</>,
            width: '15%',
        }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
