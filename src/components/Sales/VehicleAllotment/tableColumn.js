/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { vehicleAllotmentStatusTag } from 'components/Sales/OTF/utils/VehicleAllotmentStatusTag';
import { convertDateTime } from 'utils/formatDateTime';
import { VEHICLE_TYPE } from 'constants/VehicleType';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick, allotmentStatus, fixedWith) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'VIN/Chasis no.',
            dataIndex: 'vehicleIdentificationNumber',
            width: fixedWith ? '202px' : '20%',
        }),
    ];

    if (allotmentStatus === VEHICLE_TYPE.ALLOTED.key) {
        tableColumn.push(
            tblPrepareColumns({
                title: 'OTF no.',
                dataIndex: 'otfNumber',
                width: fixedWith ? '202px' : '20%',
            })
        );
    }
    tableColumn.push(
        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'modelCode',
            width: fixedWith ? '202px' : '20%',
        }),

        tblPrepareColumns({
            title: 'Age in Days',
            dataIndex: 'ageInDays',
            width: fixedWith ? '140px' : '15%',
        }),

        tblPrepareColumns({
            title: 'PDI Done',
            dataIndex: 'pdiIndicator',
            width: fixedWith ? '140px' : '12%',
        }),

        tblPrepareColumns({
            title: 'M&M Invoice',
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
            title: 'Vehicle Status',
            dataIndex: 'vehicleStatus',
            width: fixedWith ? '160px' : '15%',
            render: (_, record) => vehicleAllotmentStatusTag(record.vehicleStatus),
        }),

        tblActionColumn({ handleButtonClick, styles, width: fixedWith ? '90px' : '10%', EyeIcon: true, canEdit: false, fixed: 'right' })
    );

    return tableColumn;
};
