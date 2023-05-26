import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize }),

        tblPrepareColumns({
            title: 'Location Type Code',
            dataIndex: 'locationCode',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Location Type Name',
            dataIndex: 'locationDescription',
            width: '30%',
        }),

        tblStatusColumn({ styles, width: '20%' }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
