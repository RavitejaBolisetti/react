/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';
import { convertDate } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'From Dealer',
            dataIndex: 'fromDealerName',
            width: '20%',
            render: (__, value) => {
                return (
                    <>
                        <div>{value?.fromDealerName}</div>
                        <div className={styles.tableTextColor85}>Code:{' ' + `${value?.fromDealerCode}`}</div>
                    </>
                );
            },
        }),
        tblPrepareColumns({
            title: 'To Dealer',
            dataIndex: 'toDealerName',
            width: '20%',
            render: (index, value) => {
                return (
                    <>
                        <div>{value?.toDealerName}</div>
                        <div  className={styles.tableTextColor85}>Code: {' ' + `${value?.toDealerCode}`}</div>
                    </>
                );
            },
        }),

        tblPrepareColumns({
            title: 'Chassis Number',
            dataIndex: 'chassisNumber',
            width: '12%',
        }),

        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'modelDescription',
            width: '16%',
        }),

        tblPrepareColumns({
            title: 'Vehicle Age',
            dataIndex: 'vehicleAge',
            width: '12%',
        }),
        tblPrepareColumns({
            title: 'Requested Date',
            dataIndex: 'requestedDate',
            width: '12%',
            render: (value) => {
                return convertDate(value?.requestedDate, 'DD MMM YYYY');
            },
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', EditIcon: false }),
    ];

    return tableColumn;
};
