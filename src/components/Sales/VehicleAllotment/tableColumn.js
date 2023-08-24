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

export const tableColumn = (handleButtonClick, allotmentStatus) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'VIN/Chasis no.',
            dataIndex: 'vehicleIdentificationNumber',
        }),
    ];

    if (allotmentStatus === VEHICLE_TYPE.ALLOTED.key) {
        tableColumn.push(
            tblPrepareColumns({
                title: 'OTF no.',
                dataIndex: 'otfNumber',
                width: '10%',
            })
        );
    }
    tableColumn.push(
        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'modelCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Age in Days',
            dataIndex: 'ageInDays',
            width: '10%',
            render: (text) => <div className={styles.alignRight}>{text}</div>,
        }),

        tblPrepareColumns({
            title: 'PDI Done',
            dataIndex: 'pdiIndicator',
            width: '12%',
        }),

        tblPrepareColumns({
            title: 'M&M Invoice',
            dataIndex: 'invoiceId',
            width: '14%',
            render: (text, record) => [
                <div>
                    {record?.invoiceId}
                    {record?.oemInvoiceDate && (
                        <>
                            <br />
                            Invoice Date: {convertDateTime(record?.oemInvoiceDate, 'DD MMM YYYY')}
                        </>
                    )}
                </div>,
            ],
        }),

        tblPrepareColumns({
            title: 'Vehicle Status',
            dataIndex: 'vehicleStatus',
            width: '14%',
            render: (_, record) => vehicleAllotmentStatusTag(record.vehicleStatus),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', EyeIcon: true, canEdit: false })
    );

    return tableColumn;
};
