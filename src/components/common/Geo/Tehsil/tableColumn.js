import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblSerialNumberColumn({ page, pageSize }),

        tblPrepareColumns({
            title: 'Tehsil Code',
            dataIndex: 'code',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Tehsil Name',
            dataIndex: 'name',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'District Name',
            dataIndex: 'districtName',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'State Name',
            dataIndex: 'stateName',
            width: '20%',
        }),

        tblStatusColumn({ styles, width: '12%' }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
