import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Parent Group Name',
            dataIndex: 'dealerParentName',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Company Code',
            dataIndex: 'companyCode',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Company Name',
            dataIndex: 'companyName',
            width: '20%',
        }),

        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', fixed: 'right' })
    );

    return tableColumn;
};
