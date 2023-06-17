import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';
import { OTFStatusTag } from './utils/OTFStatusTag';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
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

        tblPrepareColumns({
            title: 'Order Status',
            dataIndex: 'orderStatus',
            width: '10%',
            render: (_, record) => OTFStatusTag(record.status),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', fixed: 'right', EditIcon: false }),
    ];

    return tableColumn;
};
