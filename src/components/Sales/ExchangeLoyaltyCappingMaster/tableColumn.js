/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(

        tblPrepareColumns({
            title:<> <p>{translateContent('ExchangeLoyaltyCappingMaster.label.modelGroup')}</p> <p>{translateContent('ExchangeLoyaltyCappingMaster.label.modelVariant')}</p></>,
            dataIndex: 'modelGroup',
            width: '12%',
            render: (modelGroup, record)=> (modelGroup +" "+ record?.modelVariant)
        }),

        // tblPrepareColumns({
        //     title: translateContent('ExchangeLoyaltyCappingMaster.label.modelVariant'),
        //     dataIndex: 'modelVariant',
        //     width: '24%',
        // }),

        tblPrepareColumns({
            title:<>  <p>{translateContent('ExchangeLoyaltyCappingMaster.label.zone')}</p> <p>{translateContent('ExchangeLoyaltyCappingMaster.label.areaOffice')}</p></>,     
            dataIndex: 'zone',
            width: '12%',
            render: (zone, record)=> (zone +" "+ (record?.areaOffice || ''))
        }),

        // tblPrepareColumns({
        //     title: translateContent('ExchangeLoyaltyCappingMaster.label.areaOffice'),
        //     dataIndex: 'areaOffice',
        //     width: '12%',
        // }),
        tblPrepareColumns({
            title:<>  <p>{translateContent('ExchangeLoyaltyCappingMaster.label.dealerCode')}</p> <p>{translateContent('ExchangeLoyaltyCappingMaster.label.dealerName')}</p></>,  
           dataIndex: 'dealerCode',
            width: '12%',
            render: (dealerCode, record)=> (dealerCode +" "+ (record?.dealerName || ''))
        }),

        // tblPrepareColumns({
        //     title: translateContent('ExchangeLoyaltyCappingMaster.label.dealerName'),
        //     dataIndex: 'dealerName',
        //     width: '16%',
        // }),

        tblStatusColumn({ styles }),
        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
