/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'VIN',
            dataIndex: 'vehicleIdentificationNumber',
            width: '18%',
        }),

        tblPrepareColumns({
            title: 'Registration No.',
            dataIndex: 'registrationNumber',
            width: '18%',
        }),

        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '25%',
        }),

        // tblPrepareColumns({
        //     title: 'Mobile Number',
        //     dataIndex: 'mobileNumber',
        //     width: '14%',
        // }),

        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'model',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};
