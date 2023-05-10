import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize }),

        tblPrepareColumns({
            title: 'Role Code',
            dataIndex: 'roleCode',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Role Description',
            dataIndex: 'roleDescription',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Department Name',
            dataIndex: 'departmentName',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Division Name',
            dataIndex: 'divisionName',
            width: '20%',
        }),

        tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
