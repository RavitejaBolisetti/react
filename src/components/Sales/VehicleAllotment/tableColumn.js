/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { vehicleAllotmentStatusTag } from 'components/Sales/OTF/utils/VehicleAllotmentStatusTag';
import { convertDateTime } from 'utils/formatDateTime';
import { VEHICLE_TYPE } from 'constants/VehicleType';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, allotmentStatus, fixedWith) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'VIN/Chasis no.',
            dataIndex: 'vehicleIdentificationNumber',
            width: fixedWith ? '250px' : '20%',
        }),
    ];

    if (allotmentStatus === VEHICLE_TYPE.ALLOTED.key) {
        tableColumn.push(
            tblPrepareColumns({
                title: 'OTF no.',
                dataIndex: 'otfNumber',
                width: fixedWith ? '250px' : '20%',
            })
        );
    }
    tableColumn.push(
        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'modelCode',
            width: fixedWith ? '250px' : '20%',
        }),

        tblPrepareColumns({
            title: 'Age in Days',
            dataIndex: 'ageInDays',
            width: fixedWith ? '130px' : '15%',
        }),

        tblPrepareColumns({
            title: 'PDI Done',
            dataIndex: 'pdiIndicator',
            width: fixedWith ? '130px' : '12%',
        }),

        tblPrepareColumns({
            title: 'M&M Invoice',
            dataIndex: 'invoiceId',
            width: fixedWith ? '200px' : '18%',
            render: (text, record) => [
                <div>
                    {record?.invoiceId}
                    {record?.oemInvoiceDate && <div style={{ fontSize: '12px', lineHeight: '20px' }}>Invoice Date: {convertDateTime(record?.oemInvoiceDate, 'DD MMM YYYY')}</div>}
                </div>,
            ],
        }),

        tblPrepareColumns({
            title: 'Vehicle Status',
            dataIndex: 'vehicleStatus',
            width: fixedWith ? '200px' : '14%',
            render: (_, record) => vehicleAllotmentStatusTag(record.vehicleStatus),
        }),

        tblActionColumn({ handleButtonClick, styles, width: fixedWith ? '80px' : '8%', EyeIcon: true, canEdit: false, fixed: 'right' })
    );

    return tableColumn;
};
