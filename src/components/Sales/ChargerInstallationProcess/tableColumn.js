/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'assets/sass/app.module.scss';
import { ChargerSearchStatusTag } from './ChargerStatusTag';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick, typeData) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('chargerInstallationProcess.label.bookingNumber'),
            dataIndex: 'bookingNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationProcess.label.requestNumber'),
            dataIndex: 'requestNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('chargerInstallationProcess.label.requestStatus'),
            dataIndex: 'requestStatus',
            width: '25%',
            render: (_, record) => ChargerSearchStatusTag(record.requestStatus, typeData),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
