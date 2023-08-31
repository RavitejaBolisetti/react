/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Area Office',
            dataIndex: 'areaOffice',
            width: '12%',
        }),

        tblPrepareColumns({
            title: 'State',
            dataIndex: 'state',
            width: '12%',
        }),

        tblPrepareColumns({
            title: 'Pricing City Code',
            dataIndex: 'pricingCityCode',
            width: '12%',
        }),

        tblPrepareColumns({
            title: 'Dealer Name',
            dataIndex: 'dealerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Dealer Branch',
            dataIndex: 'dealerBranch',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Enable Date',
            dataIndex: 'enableDate',
            width: '12%',
            render: (text) => convertDateMonthYear(text),
        }),
        tblPrepareColumns({
            title: 'Enable By',
            dataIndex: 'enableBy',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: true }),
    ];

    return tableColumn;
};
