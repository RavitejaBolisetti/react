/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = ({ handleButtonClick, page, pageSize, typeData }) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('dealerParent.tableColHeading.groupCode'),
            dataIndex: 'code',
            width: '12%',
        }),
        tblPrepareColumns({
            title: translateContent('dealerParent.tableColHeading.groupName'),
            dataIndex: 'name',
            width: '16%',
        }),
        tblPrepareColumns({
            title: translateContent('dealerParent.tableColHeading.title'),
            dataIndex: 'title',
            width: '8%',
            render: (__, value) => {
                return checkAndSetDefaultValue(getCodeValue(typeData, value?.title));
            },
        }),
        tblPrepareColumns({
            title: translateContent('dealerParent.tableColHeading.ownerName'),
            dataIndex: 'ownerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('dealerParent.tableColHeading.contactNumber'),
            dataIndex: 'mobileNumber',
            width: '13%',
        }),
        tblPrepareColumns({
            title: translateContent('dealerParent.tableColHeading.emailId'),
            dataIndex: 'emailId',
            width: '16%',
        }),

        tblStatusColumn({ styles, width: '8%' }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false })
    );

    return tableColumn;
};
