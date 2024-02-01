/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { FaFilePdf } from 'react-icons/fa';
import { Button } from 'antd';


export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Target Letter ID' || `${translateContent('city.title.districtName')}`,
            dataIndex: 'targetedLetterId',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Created Date'|| `${translateContent('city.title.cityCode')}`,
            dataIndex: 'createdDate ',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Month and Year ' ||`${translateContent('city.title.cityName')}`,
            dataIndex: 'financialMonth',
            width: '15%',
            render: (record, financialMonth) => `${financialMonth} - ${record?.financialYear}`,
        }),
        tblPrepareColumns({
            title: 'Scheme Type'|| `${translateContent('city.title.cityCode')}`,
            dataIndex: 'schemeType ',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'View PDF'|| `${translateContent('city.title.cityCode')}`,
            dataIndex: 'pdf ',
            width: '15%',
            render: () =><Button type='link'><FaFilePdf/></Button>
        }),
        tblPrepareColumns({
            title: 'Policy Copy'|| `${translateContent('city.title.cityCode')}`,
            dataIndex: 'pdf ',
            width: '15%',
            render: () =><Button type='link'><FaFilePdf/></Button>
        }),
        tblPrepareColumns({
            title: 'MST Target PDF'|| `${translateContent('city.title.cityCode')}`,
            dataIndex: 'pdf ',
            width: '15%',
            render: () =><Button type='link'><FaFilePdf/></Button>
        }),
        tblStatusColumn({ styles }),

    );

    return tableColumn;
};
