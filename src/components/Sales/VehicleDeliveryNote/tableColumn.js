/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = ({ handleButtonClick, page, pageSize, actionButtonVisiblity }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '14%',
            // render: (_, record) => (record?.otfDate ? convertDateMonthYear(record?.otfDate) : ''),
        }),
        tblPrepareColumns({
            title: 'Model group',
            dataIndex: 'modelGroup',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Booking No.',
            dataIndex: 'otfNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Delivery Note No. & Date',
            dataIndex: 'vehicleDeliveryNote',
            width: '20%',
            render: (_, value) => {
                return (
                    <>
                        <div>{value?.vehicleDeliveryNote}</div>
                        {value?.deliveryNoteDate ? <div className={styles.tableTextColor85}> {convertDateMonthYear(value?.deliveryNoteDate)}</div> : ''}
                    </>
                );
            },
        }),
        tblPrepareColumns({
            title: 'Invoice No. & Date',
            dataIndex: 'invoiceId',
            width: '24%',
            render: (__, value) => {
                return (
                    <>
                        <div>{value?.invoiceId}</div>
                        {value?.invoiceDate ? <div className={styles.tableTextColor85}> {convertDateMonthYear(value?.invoiceDate)}</div> : ''}
                    </>
                );
            },
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', ...actionButtonVisiblity }),
    ];

    return tableColumn;
};
