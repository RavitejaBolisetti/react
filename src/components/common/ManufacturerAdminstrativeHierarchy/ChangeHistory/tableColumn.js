/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { convertDateTime, dateFormatView, timeFormatView } from 'utils/formatDateTime';
import { tblPrepareColumns, tblStatusColumn } from 'utils/tableColumn';

import styles from 'components/common/ChangeHistory/ChangeHistory.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumnAdmin = [
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.changedDate'),
        dataIndex: 'changedDate',
        width: '15%',
        render: (text) => (
            <div>
                {convertDateTime(text, dateFormatView)}
                <br />
                {convertDateTime(text, timeFormatView)}
            </div>
        ),
    }),
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.changedBy'),
        width: '10%',
        dataIndex: 'changedBy',
    }),
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.attributeCode'),
        dataIndex: 'attributeCode',
        width: '14%',
    }),
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.shortDescription'),
        dataIndex: 'shortDescription',
        width: '14%',
    }),
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.longDescription'),
        dataIndex: 'longDescription',
        width: '16%',
    }),
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.hierarchyCode'),
        dataIndex: 'code',
        width: '14%',
    }),
    tblStatusColumn({ styles, width: '14%' }),
];

export const tableColumnAuthority = [
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.changedDate'),
        dataIndex: 'createdDate',
        width: '15%',

        render: (text) => (
            <div>
                {convertDateTime(text, dateFormatView)}
                <br />
                {convertDateTime(text, timeFormatView)}
            </div>
        ),
    }),
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.createdBy'),
        dataIndex: 'createdBy',
        width: '10%',
    }),
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.authorityTypeCode'),
        dataIndex: 'authorityTypeCode',
        width: '14%',
    }),
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.employeeName'),
        dataIndex: 'employeeName',
        width: '10%',
    }),
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.employeeTokenNo'),
        dataIndex: 'authorityEmployeeTokenNo',
        width: '15%',
    }),
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.authorityId'),
        dataIndex: 'manufacturerAdminAuthorityId',
        width: '10%',
    }),
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.effectiveFrom'),
        dataIndex: 'effectiveFrom',
        width: '14%',
        render: (text) => convertDateTime(text),
    }),
    tblPrepareColumns({
        title: translateContent('manufacturerAdmin.label.effectiveTo'),
        dataIndex: 'effectiveTo',
        width: '14%',
        render: (text) => convertDateTime(text),
    }),
];
