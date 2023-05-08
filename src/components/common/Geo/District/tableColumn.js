import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize }),

        tblPrepareColumns({
            title: 'District Code',
            dataIndex: 'code',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'District Name',
            dataIndex: 'name',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'State Name',
            dataIndex: 'stateName',
            width: '15%',
        }),

        tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
