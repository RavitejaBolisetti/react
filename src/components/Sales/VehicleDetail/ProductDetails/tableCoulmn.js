/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (props) => {
    const { handleButtonClick, formActionType, bindCodeValue } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('vehicleDetail.productDetails.label.item'),
            dataIndex: 'item',
            width: '20%',
            render: (text, record, index) => bindCodeValue(text, 'item'),
        }),
        tblPrepareColumns({
            title: translateContent('vehicleDetail.productDetails.label.make'),
            dataIndex: 'make',
            width: '20%',
            render: (text, record, index) => bindCodeValue(text, 'make'),
        }),

        tblPrepareColumns({
            title: translateContent('vehicleDetail.productDetails.label.serialNo'),
            dataIndex: 'serialNo',
            width: '20%',
        }),
    ];
    if (!formActionType?.viewMode) {
        tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '15%', canEdit: true, canView: false, canDelete: true }));
    }
    return tableColumn;
};
