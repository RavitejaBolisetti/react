import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';
import { Tag } from 'antd';
import { FaRegEye } from 'react-icons/fa';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Customer ID',
            dataIndex: 'customerId',
            width: '14%',
            sorter: false,
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
            dataIndex: 'mobileNo',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Email Address',
            dataIndex: 'emailAddress',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Membership Type',
            dataIndex: 'membershipType',
            width: '20%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', fixed: 'right', EditIcon: false })
    );

    return tableColumn;
};
