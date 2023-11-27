/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = ({ handleButtonClick, schemeTypeData, encashTypeData }) => {
    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('vehicleSalesSchemeMaster.label.schemeCode'),
            dataIndex: 'schemeCode',
            width: '12%',
        }),

        tblPrepareColumns({
            title: translateContent('vehicleSalesSchemeMaster.label.schemeDescription'),
            dataIndex: 'schemeDescription',
            width: '20%',
        }),

        tblPrepareColumns({
            title: translateContent('vehicleSalesSchemeMaster.label.schemeType'),
            dataIndex: 'schemeType',
            width: '12%',
            render: (_, record) => schemeTypeData?.find((i) => i?.key === record?.schemeType)?.value,
        }),
        tblPrepareColumns({
            title: translateContent('vehicleSalesSchemeMaster.label.encash'),
            dataIndex: 'encash',
            width: '12%',
            render: (_, record) => encashTypeData?.find((i) => i?.key === record?.encash)?.value,
        }),

        tblPrepareColumns({
            title: translateContent('vehicleSalesSchemeMaster.label.validityFromDate'),
            dataIndex: 'validityFromDate',
            width: '14%',
            render: (_, record) => (record?.validityFromDate ? convertDateMonthYear(record?.validityFromDate) : ''),
        }),

        tblPrepareColumns({
            title: translateContent('vehicleSalesSchemeMaster.label.validityToDate'),
            dataIndex: 'validityToDate',
            width: '14%',
            render: (_, record) => (record?.validityToDate ? convertDateMonthYear(record?.validityToDate) : ''),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: true })
    );

    return tableColumn;
};
