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
        title: translateContent('adminHierarchy.label.changedDate'),
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
        title: translateContent('adminHierarchy.label.changedBy'),
        width: '10%',
        dataIndex: 'changedBy',
    }),
    tblPrepareColumns({
        title: translateContent('adminHierarchy.label.attributeCode'),
        dataIndex: 'attributeCode',
        width: '14%',
    }),
    tblPrepareColumns({
        title: translateContent('adminHierarchy.label.shortDescription'),
        dataIndex: 'shortDescription',
        width: '14%',
    }),
    tblPrepareColumns({
        title: translateContent('adminHierarchy.label.longDescription'),
        dataIndex: 'longDescription',
        width: '16%',
    }),
    tblPrepareColumns({
        title: translateContent('adminHierarchy.label.hierarchyCode'),
        dataIndex: 'code',
        width: '14%',
    }),
    tblStatusColumn({ styles, width: '14%' }),
];

export const tableColumnAuthority = [
    tblPrepareColumns({
        title: translateContent('adminHierarchy.label.changedDate'),
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
        title: translateContent('adminHierarchy.label.createdBy'),
        dataIndex: 'createdBy',
        width: '10%',
    }),
    tblPrepareColumns({
        title: translateContent('adminHierarchy.label.authorityTypeCode'),
        dataIndex: 'authorityTypeCode',
        width: '14%',
    }),
    tblPrepareColumns({
        title: translateContent('adminHierarchy.label.employeeName'),
        dataIndex: 'employeeName',
        width: '10%',
    }),
    tblPrepareColumns({
        title: translateContent('adminHierarchy.label.employeeTokenNo'),
        dataIndex: 'authorityEmployeeTokenNo',
        width: '15%',
    }),
    tblPrepareColumns({
        title: translateContent('adminHierarchy.label.authorityId'),
        dataIndex: 'manufacturerAdminAuthorityId',
        width: '10%',
    }),
    tblPrepareColumns({
        title: translateContent('adminHierarchy.label.effectiveFrom'),
        dataIndex: 'effectiveFrom',
        width: '14%',
        render: (text) => convertDateTime(text),
    }),
    tblPrepareColumns({
        title: translateContent('adminHierarchy.label.effectiveTo'),
        dataIndex: 'effectiveTo',
        width: '14%',
        render: (text) => convertDateTime(text),
    }),
];
