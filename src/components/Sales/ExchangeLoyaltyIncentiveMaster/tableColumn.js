/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Scheme Type'|| `${translateContent('city.title.cityCode')}`,
            dataIndex: 'corporateCode',
            width: '15%',
        }),
            tblPrepareColumns({
            title: 'Scheme Name'|| `${translateContent('city.title.cityCode')}`,
            dataIndex: 'corporateCode',
            width: '15%',
        }),
            tblPrepareColumns({
            title: 'Validity For'|| `${translateContent('city.title.cityCode')}`,
            dataIndex: 'corporateCode',
            width: '15%',
        }),
            tblPrepareColumns({
            title: 'Modal Group'|| `${translateContent('city.title.cityCode')}`,
            dataIndex: 'corporateCode',
            width: '15%',
        }),
            tblPrepareColumns({
            title: 'Modal Varient'|| `${translateContent('city.title.cityCode')}`,
            dataIndex: 'corporateCode',
            width: '15%',
        }),


    //     tblPrepareColumns({
    //         title: 'Zone'|| `${translateContent('city.title.cityCode')}`,
    //         dataIndex: 'corporateCode',
    //         width: '15%',
    //     }),

    //     tblPrepareColumns({
    //         title: 'Area Office' ||`${translateContent('city.title.cityName')}`,
    //         dataIndex: 'corporateName',
    //         width: '15%',
    //     }),

    //     tblPrepareColumns({
    //         title: 'Dealer Code & Name' || `${translateContent('city.title.districtName')}`,
    //         dataIndex: 'corporateCategory',
    //         width: '15%',
    //     }),

    //     tblPrepareColumns({
    //         title: 'Scheme Name' || `${translateContent('city.title.districtName')}`,
    //         dataIndex: 'type',
    //         width: '15%',
    //     }),
    //     tblPrepareColumns({
    //         title: 'Dealer Amt' || `${translateContent('city.title.districtName')}`,
    //         dataIndex: 'stateName',
    //         width: '15%',
    //     }),
    //     tblPrepareColumns({
    //         title: 'OEM Amt' || `${translateContent('city.title.districtName')}`,
    //         dataIndex: 'stateName',
    //         width: '15%',
    //     }),
    //     tblPrepareColumns({
    //         title: 'Total Sch Amt' || `${translateContent('city.title.districtName')}`,
    //         dataIndex: 'stateName',
    //         width: '15%',
    //     }),
    //     tblPrepareColumns({
    //         title: 'Valid From' || `${translateContent('city.title.districtName')}`,
    //         dataIndex: 'stateName',
    //         width: '15%',
    //     }),
    //     tblPrepareColumns({
    //         title: 'Valid To' || `${translateContent('city.title.districtName')}`,
    //         dataIndex: 'stateName',
    //         width: '15%',
    //     }),

        tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles, canEdit: true,  })
    );

    return tableColumn;
};
