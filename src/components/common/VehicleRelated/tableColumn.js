/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';


export const tableColumn = ({ handleButtonClick, page, pageSize }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('vehicleRelated.heading.requesttype'),
            dataIndex: 'requesttype',
            width: '15%',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleRelated.heading.requestId'),
            dataIndex: 'requestId',
            width: '15%',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleRelated.heading.requestDate'),
            dataIndex: 'requestDate',
            width: '15%',
        }),
       tblPrepareColumns({
            title: translateContent('vehicleRelated.heading.registrationNo'),
            dataIndex: 'registrationNo',
            width: '18%',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleRelated.heading.customerId'),
            dataIndex: 'customerId',
            width: '15%',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleRelated.heading.customerName'),
            dataIndex: 'customerName',
            width: '22%',
        }),

        tblPrepareColumns({
            title: translateContent('vehicleRelated.heading.status'),
            dataIndex: 'status',
            width: '22%',
        }),
        tblActionColumn({ handleButtonClick, styles, canEdit: true })       
    ];

    return tableColumn;
};
