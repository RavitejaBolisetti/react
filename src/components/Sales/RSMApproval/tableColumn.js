/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';
import styles from 'components/common/Common.module.css';
import { Tag } from 'antd';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'From Dealer',
            dataIndex: 'fromDealer',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'To Dealer',
            dataIndex: 'toDealer',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Chassis Number',
            dataIndex: 'chassisNumber',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'modelDescription',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Vehicle Age',
            dataIndex: 'vehicleAge',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Requested Date',
            dataIndex: 'requestedDate',
            width: '14%',
        }),
        // tblPrepareColumns({
        //     title: 'Status',
        //     dataIndex: 'Status',
        //     width: '14%',
        //     render: (_, record) => <Tag color="success">{`Booked`}</Tag>,
        // }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', EditIcon: false }),
    ];

    return tableColumn;
};
