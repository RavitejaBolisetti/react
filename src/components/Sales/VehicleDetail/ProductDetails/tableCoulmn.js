/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (props) => {
    const { handleButtonClick, formActionType, bindCodeValue, ITEM_TYPE } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: 'Item',
            dataIndex: 'item',
            width: '20%',
            render: (text, record, index) => bindCodeValue(text, ITEM_TYPE?.ITEM),
        }),
        tblPrepareColumns({
            title: 'Make ',
            dataIndex: 'make',
            width: '20%',
            render: (text, record, index) => bindCodeValue(text, ITEM_TYPE?.MAKE),
        }),

        tblPrepareColumns({
            title: 'Serial No. ',
            dataIndex: 'serialNo',
            width: '20%',
        }),
    ];
    if (!formActionType?.viewMode) {
        tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '15%', canEdit: true, canView: false, canDelete: true }));
    }
    return tableColumn;
};
