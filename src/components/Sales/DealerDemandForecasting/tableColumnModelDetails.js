/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';




export const tableColumnModelDetails = ({ handleButtonClick, canEdit = true, canDelete = false, sorter = false, canView = false,  canAdd = true }) => {
    const tableColumn = [
        
        tblPrepareColumns({
            title:  translateContent('demandForecasting.label.product'),
            dataIndex: 'product',
            width: '34%',
            sorter,
        }),
  
        tblPrepareColumns({
            title: "April",
            dataIndex: 'currentMonth',
            name:'name',
          width: '6%',
            sorter,
        }),

        tblPrepareColumns({
            title: "May ",
            dataIndex: 'currentMonth1',
           width: '6%',
            sorter,
        }),

        tblPrepareColumns({
            title: "June",
            dataIndex: 'currentMonth2',
           width: '6%',
            sorter,
        }),

        tblPrepareColumns({
            title: "July",
            dataIndex: 'currentMonth3',
           width: '6%',
            sorter,
        }),

        // tblPrepareColumns({
        //     title: "Total",
        //     dataIndex: '',
        //    width: '8%',
        //     sorter,
        // }),


        tblActionColumn({ handleButtonClick, styles, canEdit, canDelete, canView, canAdd }),
    ];

    return tableColumn;
};


