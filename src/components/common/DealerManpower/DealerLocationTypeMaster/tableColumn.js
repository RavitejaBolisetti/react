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
        tblPrepareColumns({
            title: 'Applicable To',
            dataIndex: 'applicableTo',
            width: '20%',
        }),

        tblStatusColumn({ styles, width: '15%' }),

        tblActionColumn({ handleButtonClick, styles, width: '15%' })
    );

    return tableColumn;
};
