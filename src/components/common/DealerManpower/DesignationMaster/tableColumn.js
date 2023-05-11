import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize }),

        tblPrepareColumns({
            title: 'Designation Code',
            dataIndex: 'designationCode',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Designation Description',
            dataIndex: 'designationDescription',
            width: '22%',
        }),

        tblPrepareColumns({
            title: 'Role Description',
            dataIndex: 'roleDescription',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Department Name',
            dataIndex: 'departmentName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Division Description ',
            dataIndex: 'divisionName',
            width: '12%',
        }),

        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles, width: '16%' })
    );

    return tableColumn;
};
