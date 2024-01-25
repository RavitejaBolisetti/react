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
            title: translateContent('partMaster.heading.title'),
            dataIndex: 'partNo',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent('partMaster.heading.description'),
            dataIndex: 'description',
            width: '30%',
        }),
        tblPrepareColumns({
            title: translateContent('partMaster.heading.partNumberSource'),
            dataIndex: 'partNumberSource',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent('partMaster.heading.status'),
            dataIndex: 'status',
            width: '20%',
        }),

        tblActionColumn({ handleButtonClick, styles, canEdit: true })

       
    ];

    return tableColumn;
};
