import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Group Code',
            dataIndex: 'code',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Group Name',
            dataIndex: 'name',
            width: '12%',
        }),
        tblPrepareColumns({
            title: 'Title',
            dataIndex: 'title',
            width: '6%',
        }),
        tblPrepareColumns({
            title: 'Owner Name',
            dataIndex: 'ownerName',
            width: '12%',
        }),
        tblPrepareColumns({
            title: 'Contact Number',
            dataIndex: 'mobileNumber',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Email ID',
            dataIndex: 'emailId',
            width: '12%',
        }),

        tblStatusColumn({ styles, width: '6%' }),

        tblActionColumn({ handleButtonClick, styles, width: '5%', fixed: 'right' })
    );

    return tableColumn;
};
