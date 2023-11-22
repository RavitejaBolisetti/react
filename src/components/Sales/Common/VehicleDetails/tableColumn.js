/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';
export const tableColumnHeading = {};
export const taxDetailsColumn = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('bookingManagement.tableColumn.description'),
            dataIndex: 'taxDescription',
            key: 'taxDescription',
            width: '35%',
        }),

        tblPrepareColumns({
            title: translateContent('bookingManagement.tableColumn.rate'),
            dataIndex: 'taxRate',
            key: 'taxRate',
            width: '25%',
        }),
        tblPrepareColumns({
            title: translateContent('bookingManagement.tableColumn.amount'),
            dataIndex: 'taxAmount',
            key: 'taxAmount',
            width: '15%',
        }),
    ];

    return tableColumn;
};

export const optionalServicesColumns = ({ formActionType, handleButtonClick, styles, record }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('vehicleInvoiceGeneration.label.vehicleDetails.optionalServices.serviceName'),
            dataIndex: 'serviceName',
            key: 'serviceName',
            width: '25%',
        }),

        tblPrepareColumns({
            title: translateContent('vehicleInvoiceGeneration.label.vehicleDetails.optionalServices.serviceName'),
            dataIndex: 'amount',
            key: 'amount',
            width: '25%',
        }),
    ];
    !formActionType?.viewMode && tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '15%', canEdit: true, canView: false, isDeletable: true }));

    return tableColumn;
};
