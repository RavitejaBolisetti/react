import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Role Code',
            dataIndex: 'roleCode',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Role Name',
            dataIndex: 'roleDescription',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Department Name',
            dataIndex: 'departmentName',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Division Name',
            dataIndex: 'divisionName',
            width: '15%',
        }),

        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' })
    );

    return tableColumn;
};
