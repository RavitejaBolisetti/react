import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize }),

        tblPrepareColumns({
            title: 'Division Code',
            dataIndex: 'code',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Division Description',
            dataIndex: 'divisionName',
            width: '30%',
        }),

        tblStatusColumn({ styles, width: '20%' }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
