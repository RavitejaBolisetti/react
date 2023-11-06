/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { BindFormAndResult } from './CheckListUtils';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (props) => {
    const { handleButtonClick, formActionType, aggregateForm, checklistType } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('commonModules.checklistMaster.tableColumnHeading.column1'),
            dataIndex: 'group',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent('commonModules.checklistMaster.tableColumnHeading.column2'),
            dataIndex: 'subGroup',
            width: '20%',
        }),

        tblPrepareColumns({
            title: translateContent('commonModules.checklistMaster.tableColumnHeading.column3'),
            dataIndex: 'checkPoint',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent('commonModules.checklistMaster.tableColumnHeading.column4'),
            dataIndex: 'checkResult',
            width: '20%',
            render: (text, record, index) => BindFormAndResult({ data: record, aggregateForm, checklistType })?.checkResult,
        }),
        tblPrepareColumns({
            title: translateContent('commonModules.checklistMaster.tableColumnHeading.column5'),
            dataIndex: 'checklistDescription',
            width: '20%',
            render: (text) => text ?? 'NA',
        }),
    ];
    if (!formActionType?.viewMode) {
        tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '15%', canEdit: true, canView: false, canDelete: false }));
    }
    return tableColumn;
};
