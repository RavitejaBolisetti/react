import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize }),

        tblPrepareColumns({
            title: 'Department Code',
            dataIndex: 'departmentCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Department Description',
            dataIndex: 'departmentName',
            width: '25%',
        }),
        
        tblPrepareColumns({
            title: 'Division Name',
            dataIndex: 'divisionName',
            width: '25%',
        }),

        tblStatusColumn({ styles, width: '15%' }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
