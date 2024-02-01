/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn, tblStatusColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = ({ handleButtonClick, page, pageSize }) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Financial Year' || `${translateContent('city.title.districtName')}`,
            dataIndex: 'financialYear',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'AO Code' || `${translateContent('city.title.cityCode')}`,
            dataIndex: 'aoCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Scheme Id' || `${translateContent('city.title.cityName')}`,
            dataIndex: 'schemeId',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Scheme Name' || `${translateContent('city.title.cityName')}`,
            dataIndex: 'schemeName',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Dealer Code' || `${translateContent('city.title.cityName')}`,
            dataIndex: 'dealerCode',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Sale Modal Group' || `${translateContent('city.title.cityName')}`,
            dataIndex: 'saleModalGroup',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Modal Group Description' || `${translateContent('city.title.cityName')}`,
            dataIndex: 'modalGroupDescription',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'From Date' || `${translateContent('city.title.cityName')}`,
            dataIndex: 'fromDate',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'To Date' || `${translateContent('city.title.cityName')}`,
            dataIndex: 'toDate',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Incentive Amount' || `${translateContent('city.title.cityName')}`,
            dataIndex: 'incentiveAmount',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Proposal ID',
            dataIndex: 'proposalId',
            width: '15%',
        }),
        tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles, canEdit: true })
    );

    return tableColumn;
};
