import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize }),

        tblPrepareColumns({
            title: 'Designation Code',
            dataIndex: 'designationCode',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Designation Description',
            dataIndex: 'designationDescription',
            width: '20%',
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
            title: 'Division Description ',
            dataIndex: 'divisionName',
            width: '20%',
        }),

        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
