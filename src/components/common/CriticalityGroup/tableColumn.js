import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';
import { Tag } from 'antd';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Criticality Group ID',
            dataIndex: 'criticalityGroupCode',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Criticality Group Name',
            dataIndex: 'criticalityGroupName',
            width: '25%',
        }),
        tblPrepareColumns({
            title: 'Default Group',
            dataIndex: 'criticalityDefaultGroup',
            render: (text) => <>{text === true ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>}</>,
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'activeIndicator',
            render: (text) => <>{text === true ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>}</>,
            width: '15%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '12%' })
    );

    return tableColumn;
};
