/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { vehicleAllotmentStatusTag } from 'components/Sales/OTF/utils/VehicleAllotmentStatusTag';

import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { VEHICLE_TYPE } from 'constants/VehicleType';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick, allotmentStatus, fixedWith) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('orderDeliveryVehicleAllotment.tableColumn.vin'),
            dataIndex: 'vehicleIdentificationNumber',
            width: fixedWith ? '202px' : '20%',
        }),
    ];

    if (allotmentStatus === VEHICLE_TYPE.ALLOTED.key) {
        tableColumn.push(
            tblPrepareColumns({
                title:  translateContent('orderDeliveryVehicleAllotment.tableColumn.otfNumber'),
                dataIndex: 'otfNumber',
                width: fixedWith ? '202px' : '20%',
                render: (_, record) => record?.bookingNumber || record?.otfNumber,
            })
        );
    }
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('orderDeliveryVehicleAllotment.tableColumn.modelDescription'),
            dataIndex: 'modelCode',
            width: fixedWith ? '202px' : '20%',
        }),

        tblPrepareColumns({
            title: translateContent('orderDeliveryVehicleAllotment.tableColumn.ageInDays'),
            dataIndex: 'ageInDays',
            width: fixedWith ? '140px' : '15%',
        }),

        tblPrepareColumns({
            title: translateContent('orderDeliveryVehicleAllotment.tableColumn.pdi'),
            dataIndex: 'pdiIndicator',
            width: fixedWith ? '140px' : '12%',
        }),

        tblPrepareColumns({
            title: translateContent('orderDeliveryVehicleAllotment.tableColumn.supplierInvoice'),
            dataIndex: 'invoiceId',
            width: fixedWith ? '180px' : '18%',
            render: (text, record) => [
                <div>
                    {record?.invoiceId}
                    {record?.oemInvoiceDate && <div style={{ fontSize: '12px', lineHeight: '20px' }}>Invoice Date: {convertDateTime(record?.oemInvoiceDate, dateFormatView)}</div>}
                </div>,
            ],
        }),

        tblPrepareColumns({
            title: translateContent('orderDeliveryVehicleAllotment.tableColumn.vehicleStatus'),
            dataIndex: 'vehicleStatus',
            width: fixedWith ? '160px' : '15%',
            render: (_, record) => vehicleAllotmentStatusTag(record.vehicleStatus),
        }),

        tblActionColumn({ handleButtonClick, styles, width: fixedWith ? '90px' : '10%', EyeIcon: true, canEdit: false, fixed: 'right' })
    );

    return tableColumn;
};
