/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { StatusTag } from 'utils/StatusTag';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { NO_DATA_AVALAIBLE, CO_DEALER_QUERY_BUTTONS } from './constants';

import styles from 'assets/sass/app.module.scss';
import { Tag, Typography } from 'antd';
import { DATA_TYPE } from 'constants/dataType';
import { ShowDataBox } from 'utils/showDataBox';
const { Text } = Typography;

const handleTableColumn = (currentQuery) => {
    switch (currentQuery) {
        case CO_DEALER_QUERY_BUTTONS?.PENDING?.key: {
            return { invoiceNumber: false, dealerName: true, modelDescription: true, indentNumber: true, irnStatus: false, action: true };
        }
        default: {
            return { invoiceNumber: true, dealerName: true, modelDescription: true, indentNumber: true, irnStatus: true, action: true };
        }
    }
};

export const tableColumnDeliveryNoteMaster = ({ handleButtonClick, actionButtonVisiblity, currentQuery }) => {
    const tableColumn = [
        handleTableColumn(currentQuery)?.invoiceNumber &&
            tblPrepareColumns({
                title: 'Invoice No. & Date',
                dataIndex: 'invoiceNumber',
                width: '14%',
                render: (_, record) => ShowDataBox(record?.invoiceNumber, record?.invoiceDate, DATA_TYPE?.DATE?.key),
            }),
        handleTableColumn(currentQuery)?.dealerName &&
            tblPrepareColumns({
                title: 'Dealer Name',
                dataIndex: 'dealerName',
                width: '18%',
                render: (_, record) => ShowDataBox(record?.dealerName, record?.location),
            }),

        handleTableColumn(currentQuery)?.modelDescription &&
            tblPrepareColumns({
                title: 'Model Description',
                dataIndex: 'modelDescription',
                width: '20%',
            }),
        handleTableColumn(currentQuery)?.indentNumber &&
            tblPrepareColumns({
                title: 'Indent No. & Date',
                dataIndex: 'indentNumber',
                width: '14%',
                render: (_, record) => ShowDataBox(record?.indentNumber, record?.indentDate, DATA_TYPE?.DATE?.key),
            }),
        handleTableColumn(currentQuery)?.irnStatus &&
            tblPrepareColumns({
                title: 'IRN Status',
                dataIndex: 'irnStatus',
                width: '14%',
                render: (_, record) => <StatusTag>{record?.irnStatus}</StatusTag>,
            }),

        handleTableColumn(currentQuery)?.action && tblActionColumn({ handleButtonClick, styles, width: '8%', ...actionButtonVisiblity }),
    ];
    return tableColumn?.filter(Boolean);
};
