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
            width: '16%',
            render: (modelGroup, record)=> (modelGroup +" "+ record?.modelVariant)
        }),

            tblPrepareColumns({
            title:<>  <p>{translateContent('ExchangeLoyaltyCappingMaster.label.zone')}</p> <p>{translateContent('ExchangeLoyaltyCappingMaster.label.areaOffice')}</p></>,     
            dataIndex: 'zone',
            width: '16%',
            render: (zone, record)=> (zone +" "+ (record?.areaOffice || ''))
        }),

            tblPrepareColumns({
            title:<>  <p>{translateContent('ExchangeLoyaltyCappingMaster.label.dealerCode')}</p> <p>{translateContent('ExchangeLoyaltyCappingMaster.label.dealerName')}</p></>,  
           dataIndex: 'dealerCode',
            width: '16%',
            render: (dealerCode, record)=> (dealerCode +" "+ (record?.dealerName || ''))
        }),

        tblStatusColumn({ styles }),
        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
