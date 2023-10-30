/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { DELIVERY_TYPE } from 'constants/modules/vehicleDetailsNotes.js/deliveryType';

import styles from 'assets/sass/app.module.scss';

export const tableColumnDeliveryNoteMaster = ({ handleButtonClick, actionButtonVisiblity, deliveryType }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Model group',
            dataIndex: 'modelGroup',
            width: '14%',
        }),

        tblPrepareColumns({
            title: deliveryType === DELIVERY_TYPE?.NOTE?.key ? 'Delivery Note No. & Date' : 'Challan No. & Date' ,
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
    if (deliveryType === DELIVERY_TYPE?.NOTE?.key) {
        tableColumn.splice(
            2,
            0,
            tblPrepareColumns({
                title: 'Booking No.',
                dataIndex: 'otfNumber',
                width: '14%',
                render: (_, record) => record?.bookingNumber || record?.otfNumber,
            })
        );
    }
    return tableColumn;
};
