/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { DELIVERY_TYPE } from 'constants/modules/vehicleDetailsNotes.js/deliveryType';
import { QUERY_BUTTONS_CONSTANTS } from './QueryButtons';
import { translateContent } from 'utils/translateContent';
import { Tag } from 'antd';
import styles from 'assets/sass/app.module.scss';

export const tableColumnDeliveryNoteMaster = ({ handleButtonClick, actionButtonVisiblity, deliveryType, deliveryStatus }) => {
    const handleDeliveryNoteColumn = (value, deliveryType, deliveryStatus, tagColor = 'warning') => {
        switch (deliveryType) {
            case DELIVERY_TYPE?.NOTE?.key: {
                if (deliveryStatus === QUERY_BUTTONS_CONSTANTS?.PENDING?.key) {
                    return { renderValue: <Tag color={tagColor}>NOT GENERATED</Tag>, sorting: false, DeliveryNoteColumn: translateContent('vehicleDeliveryNote.label.vehicleDeliveryNo') };
                } else
                    return {
                        renderValue: (
                            <>
                                <div>{value?.vehicleDeliveryNote}</div>
                                {value?.deliveryNoteDate ? <div className={styles.tableTextColor85}> {convertDateMonthYear(value?.deliveryNoteDate)}</div> : ''}
                            </>
                        ),
                        sorting: true,
                        DeliveryNoteColumn: translateContent('vehicleDeliveryNote.label.vehicleDeliveryNo'),
                    };
            }
            case DELIVERY_TYPE?.CHALLAN?.key: {
                if (deliveryStatus === QUERY_BUTTONS_CONSTANTS?.PENDING?.key) {
                    return { renderValue: <Tag color={tagColor}>{translateContent('vehicleDeliveryNote.label.notGenerated')}</Tag>, sorting: false, DeliveryNoteColumn: translateContent('vehicleDeliveryNote.label.challanNoDate') };
                }
                return {
                    renderValue: (
                        <>
                            <div>{value?.vehicleDeliveryNote}</div>
                            {value?.deliveryNoteDate ? <div className={styles.tableTextColor85}> {convertDateMonthYear(value?.deliveryNoteDate)}</div> : ''}
                        </>
                    ),
                    sorting: true,
                    DeliveryNoteColumn: translateContent('vehicleDeliveryNote.label.challanNoDate'),
                };
            }
            default: {
                return false;
            }
        }
    };
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('vehicleDeliveryNote.label.customerName'),
            dataIndex: 'customerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleDeliveryNote.label.modelGroup'),
            dataIndex: 'modelGroupDescription',
            width: '14%',
        }),

        tblPrepareColumns({
            title: handleDeliveryNoteColumn(undefined, deliveryType, deliveryStatus)?.DeliveryNoteColumn,
            sorter: handleDeliveryNoteColumn(undefined, deliveryType, deliveryStatus)?.sorting,
            dataIndex: 'vehicleDeliveryNote',
            width: '20%',
            render: (_, value) => handleDeliveryNoteColumn(value, deliveryType, deliveryStatus)?.renderValue,
        }),
        tblPrepareColumns({
            title: translateContent('vehicleDeliveryNote.label.invoiceNoDate'),
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
                title: translateContent('vehicleDeliveryNote.label.bookingNo'),
                dataIndex: 'otfNumber',
                width: '14%',
                render: (_, record) => record?.bookingNumber || record?.otfNumber,
            })
        );
    }
    return tableColumn;
};
