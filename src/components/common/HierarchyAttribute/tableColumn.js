import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';
import { Tag } from 'antd';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'hierarchyAttribueCode',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Name',
            dataIndex: 'hierarchyAttribueName',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Duplicate Allowed?',
            dataIndex: 'duplicateAllowedAtAttributerLevelInd',
            width: '14%',
            render: (text, record) => <>{text ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>}</>,
        }),

        tblPrepareColumns({
            title: 'Child Allowed?',
            dataIndex: 'isChildAllowed',
            width: '10%',
            render: (text, record) => <>{text ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>}</>,
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            width: '10%',
            render: (text, record) => <>{text ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>}</>,
        }),
        tblPrepareColumns({
            title: 'Duplicate Allowed under different Parent?',
            dataIndex: 'duplicateAllowedAtOtherParent',
            width: '20%',
            render: (text, record) => <>{text ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>}</>,
        }),

        tblActionColumn({ handleButtonClick, styles, width: '12%' })
    );

    return tableColumn;
};
