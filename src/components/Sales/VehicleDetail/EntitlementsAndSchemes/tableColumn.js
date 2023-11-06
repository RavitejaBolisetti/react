/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { tblPrepareColumns, tblStatusColumn } from 'utils/tableColumn';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('vehicleDetail.entitlementsSchemes.label.entitlement/SchemeType'),
            dataIndex: 'schemeType',
            width: '150px',
            sorter: true,
        }),

        tblPrepareColumns({
            title: translateContent('vehicleDetail.entitlementsSchemes.label.entitlement/SchemeDescription'),
            dataIndex: 'description',
            width: '200px',
            sorter: true,
        }),

        tblPrepareColumns({
            title: translateContent('vehicleDetail.entitlementsSchemes.label.entitlement/SchemeDocNo'),
            dataIndex: 'documentNumber',
            width: '150px',
            sorter: true,
        }),

        tblPrepareColumns({
            title: translateContent('vehicleDetail.entitlementsSchemes.label.entitlement/SchemeDocDate'),
            dataIndex: 'documentDate',
            width: '200px',
            sorter: true,
            render: (text) => convertDateTime(text, dateFormatView),
        }),

        tblPrepareColumns({
            title: translateContent('vehicleDetail.entitlementsSchemes.label.entitlement/SchemeBookletNo'),
            dataIndex: 'bookletNumber',
            width: '200px',
            sorter: true,
        }),

        tblPrepareColumns({
            title: translateContent('vehicleDetail.entitlementsSchemes.label.validityStartDate'),
            dataIndex: 'validityStartDate',
            width: '200px',
            sorter: true,
            render: (text) => convertDateTime(text, dateFormatView),
        }),

        tblPrepareColumns({
            title: translateContent('vehicleDetail.entitlementsSchemes.label.validityEndDate'),
            dataIndex: 'validityEndDate',
            width: '200px',
            sorter: true,
            render: (text) => convertDateTime(text, dateFormatView),
        }),

        tblPrepareColumns({
            title: translateContent('vehicleDetail.entitlementsSchemes.label.validityStartKM'),
            dataIndex: 'validityStartKm',
            width: '200px',
            sorter: true,
        }),

        tblPrepareColumns({
            title: translateContent('vehicleDetail.entitlementsSchemes.label.validityEndKM'),
            dataIndex: 'validityEndKm',
            width: '200px',
            sorter: true,
        }),

        tblStatusColumn({ styles, width: '150px' }),
    ];

    return tableColumn;
};
