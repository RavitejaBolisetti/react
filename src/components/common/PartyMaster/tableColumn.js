import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Party Code',
            dataIndex: 'partyCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Party Name',
            dataIndex: 'partyName',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Party Category',
            dataIndex: 'partyCategory',
            width: '15%',
        }),
        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
