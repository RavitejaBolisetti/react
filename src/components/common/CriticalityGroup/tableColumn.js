import { tblPrepareColumns, tblSerialNumberColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize }),

        tblPrepareColumns({
            title: 'Criticality Group ID',
            dataIndex: 'criticalityGroupCode',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Criticality Group Name',
            dataIndex: 'criticalityGroupName',
            width: '35%',
        }),
        tblPrepareColumns({
            title: 'Default Group',
            dataIndex: 'criticalityDefaultGroup',
            render: (text) => <>{text === true ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>}</>,
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'activeIndicator',
            render: (text) => <>{text === true ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>}</>,
            width: '10%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '15%' })
    );

    return tableColumn;
};
