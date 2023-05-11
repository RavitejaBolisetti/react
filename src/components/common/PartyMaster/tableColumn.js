import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize }),

        tblPrepareColumns({
            title: 'Party Code',
            dataIndex: 'partyCode',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Party Category',
            dataIndex: 'partyCategory',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Party Name',
            dataIndex: 'partyName',
            width: '20%',
        }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
