/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('vehicleDetail.label.vin'),
            dataIndex: 'vehicleIdentificationNumber',
            width: '18%',
        }),

        tblPrepareColumns({
            title: translateContent('vehicleDetail.label.registrationNumber'),
            dataIndex: 'registrationNumber',
            width: '18%',
        }),

        tblPrepareColumns({
            title: translateContent('vehicleDetail.label.customerName'),
            dataIndex: 'customerName',
            width: '25%',
        }),

        // tblPrepareColumns({
        //     title: 'Mobile Number',
        //     dataIndex: 'mobileNumber',
        //     width: '14%',
        // }),

        tblPrepareColumns({
            title: translateContent('vehicleDetail.label.model'),
            dataIndex: 'model',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};
