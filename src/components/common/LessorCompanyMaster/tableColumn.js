import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize }),

        tblPrepareColumns({
            title: 'Company Code',
            dataIndex: 'companyCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Company Description',
            dataIndex: 'companyDescription',
            width: '40%',
        }),

        tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
