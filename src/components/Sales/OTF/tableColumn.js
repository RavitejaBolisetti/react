import { tblPrepareColumns, tblSerialNumberColumn, tblStatusColumn, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        // tblSerialNumberColumn({ page, pageSize, fixed: 'left' }),

        tblPrepareColumns({
            title: 'OTF No.',
            dataIndex: 'otfNumber',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'OTF Date',
            dataIndex: 'otfDate',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Mobile No.',
            dataIndex: 'mobileNumber',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Model',
            dataIndex: 'model',
            width: '15%',
        }),


        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', fixed: 'right' })
    );

    return tableColumn;
};
