import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'State Code',
            dataIndex: 'code',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'State Name',
            dataIndex: 'name',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'GST State Code',
            dataIndex: 'gstStateCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Country',
            dataIndex: 'countryName',
            width: '15%',
        }),

        tblStatusColumn({ styles, width: '15%' }),

        tblActionColumn({ styles, handleButtonClick, width: '10%' })
    );

    return tableColumn;
};
