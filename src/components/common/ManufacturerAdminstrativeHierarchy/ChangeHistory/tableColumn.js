/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn } from 'utils/tableColumn';
import { convertDateTime } from 'utils/formatDateTime';
import styles from 'components/common/ChangeHistory/ChangeHistory.module.css';

export const tableColumnAdmin = [
    tblPrepareColumns({
        title: 'Changed/Modified Date',
        dataIndex: 'changedDate',
        width: '15%',
        render: (text) => (
            <div>
                {convertDateTime(text, 'DD MMM YYYY')}
                <br />
                {convertDateTime(text, 'HH:mm a')}
            </div>
        ),
    }),
    tblPrepareColumns({
        title: 'Changed By',
        width: '10%',
        dataIndex: 'changedBy',
    }),
    tblPrepareColumns({
        title: 'Attribute Code',
        dataIndex: 'attributeCode',
        width: '14%',
    }),
    tblPrepareColumns({
        title: 'Short Description',
        dataIndex: 'shortDescription',
        width: '14%',
    }),
    tblPrepareColumns({
        title: 'Long Description',
        dataIndex: 'longDescription',
        width: '16%',
    }),
    tblPrepareColumns({
        title: 'Hierarchy Code',
        dataIndex: 'code',
        width: '14%',
    }),
    tblStatusColumn({ styles, width: '14%' }),
];

export const tableColumnAuthority = [
    tblPrepareColumns({
        title: 'Changed/Modified Date',
        dataIndex: 'createdDate',
        width: '15%',

        render: (text) => (
            <div>
                {convertDateTime(text, 'DD MMM YYYY')}
                <br />
                {convertDateTime(text, 'HH:mm a')}
            </div>
        ),
    }),
    tblPrepareColumns({
        title: 'Created By',
        dataIndex: 'createdBy',
        width: '10%',
    }),
    tblPrepareColumns({
        title: 'Authority Type Code',
        dataIndex: 'authorityTypeCode',
        width: '14%',
    }),
    tblPrepareColumns({
        title: 'Employee Name',
        dataIndex: 'employeeName',
        width: '10%',
    }),
    tblPrepareColumns({
        title: 'Employee Token No.',
        dataIndex: 'authorityEmployeeTokenNo',
        width: '15%',
    }),
    tblPrepareColumns({
        title: 'Authority Id',
        dataIndex: 'manufacturerAdminAuthorityId',
        width: '10%',
    }),
    tblPrepareColumns({
        title: 'Effective From',
        dataIndex: 'effectiveFrom',
        width: '14%',
        render: (text) => convertDateTime(text),
    }),
    tblPrepareColumns({
        title: 'Effective To',
        dataIndex: 'effectiveTo',
        width: '14%',
        render: (text) => convertDateTime(text),
    }),
];
