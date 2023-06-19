import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Customer ID',
            dataIndex: 'customerId',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Customer Type',
            dataIndex: 'customerType',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Mobile No.',
            dataIndex: 'mobileNumber',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Email Address',
            dataIndex: 'emailId',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Membership Type',
            dataIndex: 'membershipType',
            width: '14%',
        }),

        tblActionColumn({ styles, handleButtonClick, width: '10%' })
    );

    return tableColumn;
};
