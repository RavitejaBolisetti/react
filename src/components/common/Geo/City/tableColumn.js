/* eslint-disable react-hooks/rules-of-hooks */
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { useTranslation } from 'react-i18next';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    const { t: translate } = useTranslation();
    tableColumn.push(
        tblPrepareColumns({
            title: `${translate('city.title.city_code')}`,
            dataIndex: 'code',
            width: '15%',
        }),

        tblPrepareColumns({
            title: `${translate('city.title.city_name')}`,
            dataIndex: 'name',
            width: '15%',
        }),

        tblPrepareColumns({
            title: `${translate('city.title.district_name')}`,
            dataIndex: 'districtName',
            width: '15%',
        }),

        tblPrepareColumns({
            title: `${translate('city.title.district_name')}`,
            dataIndex: 'stateName',
            width: '15%',
        }),

        tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles, canEdit: false })
    );

    return tableColumn;
};
