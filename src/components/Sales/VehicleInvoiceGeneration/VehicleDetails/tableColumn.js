/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';

export const tableColumn = (props) => {
    // const { handleButtonClick, formActionType, bindCodeValue } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: 'Description',
            dataIndex: 'description',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Rate ',
            dataIndex: 'rate',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Amount ',
            dataIndex: 'amount',
            width: '20%',
        }),
    ];
    // if (!formActionType?.viewMode) {
    //     tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '15%', EditIcon: true, EyeIcon: false, DeleteIcon: true }));
    // }
    return tableColumn;
};
