/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDate, dateFormatView } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('rsmApproval.label.fromDealer'),
            dataIndex: 'fromDealerName',
            width: '20%',
            render: (__, value) => {
                return (
                    <>
                        <div>{value?.fromDealerName}</div>
                        <div className={styles.tableTextColor85}>Code: {value?.fromDealerCode}</div>
                    </>
                );
            },
        }),
        tblPrepareColumns({
            title: translateContent('rsmApproval.label.toDealer'),
            dataIndex: 'toDealerName',
            width: '20%',
            render: (index, value) => {
                return (
                    <>
                        <div>{value?.toDealerName}</div>
                        <div className={styles.tableTextColor85}>
                            {translateContent('rsmApproval.label.code')}: {` ${value?.toDealerCode}`}
                        </div>
                    </>
                );
            },
        }),

        tblPrepareColumns({
            title: translateContent('rsmApproval.label.chassisNumber'),
            dataIndex: 'chassisNumber',
            width: '12%',
        }),

        tblPrepareColumns({
            title: translateContent('rsmApproval.label.modelDescription'),
            dataIndex: 'modelDescription',
            width: '16%',
            sorter: false,
        }),

        tblPrepareColumns({
            title: translateContent('rsmApproval.label.vehicleAge'),
            dataIndex: 'vehicleAge',
            width: '12%',
        }),
        tblPrepareColumns({
            title: translateContent('rsmApproval.label.requestedDate'),
            dataIndex: 'requestedDate',
            width: '12%',
            render: (value) => {
                return convertDate(value, dateFormatView);
            },
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
