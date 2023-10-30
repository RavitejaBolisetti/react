/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import styles from 'utils/tableColumn.module.scss';

export const tableColumn = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Branch Name',
            dataIndex: 'dealerLocationName',
            width: '14%',
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'IRN Mapped/Unmapped',
            dataIndex: 'mapUnmap',
            width: '14%',
            sorter: false,
            render: (_, record) => <div className={styles.activeText}> {record?.mapUnmap}</div>,
        }),
    ];

    return tableColumn;
};
