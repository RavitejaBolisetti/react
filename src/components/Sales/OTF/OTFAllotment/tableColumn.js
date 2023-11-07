/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { vehicleAllotmentStatusTag } from 'components/Sales/OTF/utils/VehicleAllotmentStatusTag';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('commonModules.label.vehicleDetails.vin'),
            dataIndex: 'vehicleIdentificationNumber',
            width: '20%',
        }),
    ];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('commonModules.label.vehicleDetails.modelDescription'),
            dataIndex: 'modelCode',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent('orderDeliveryVehicleAllotment.label.ageInDays'),
            dataIndex: 'ageInDays',
            width: '10%',
        }),

        tblPrepareColumns({
            title: translateContent('bookingManagement.label.pdiDone'),
            dataIndex: 'pdiIndicator',
            width: '12%',
        }),

        tblPrepareColumns({
            title: translateContent('bookingManagement.label.mnmInvoice'),
            dataIndex: 'invoiceId',
            width: '15%',
            render: (text, record) => [
                <div>
                    {record?.invoiceId}
                    {record?.mnmInvoiceDate && (
                        <>
                            <br />
                            {translateContent('bookingManagement.label.invoiceDate')}: {convertDateTime(record?.mnmInvoiceDate, dateFormatView)}
                        </>
                    )}
                </div>,
            ],
        }),

        tblPrepareColumns({
            title: translateContent('orderDeliveryVehicleAllotment.label.vehicleStatus'),
            dataIndex: 'vehicleStatus',
            width: '15%',
            render: (_, record) => vehicleAllotmentStatusTag(record.vehicleStatus),
        })
    );

    return tableColumn;
};
