/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';

export const tableColumn = () => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('amcRegistration.label.vin'),
            dataIndex: 'vehicleIdentificationNumber',
            width: '180px',
        }),
        tblPrepareColumns({
            title: translateContent('amcRegistration.label.vehicleRegistrationNumber'),
            dataIndex: 'registrationNumber',
            width: '180px',
        }),
        tblPrepareColumns({
            title: translateContent('amcRegistration.label.modelDescription'),
            dataIndex: 'modelDescription',
            width: '170px',
        })
    );

    return tableColumn;
};
