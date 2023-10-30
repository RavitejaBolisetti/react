/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'assets/sass/app.module.scss';
import { AMC_CONSTANTS } from './utils/AMCConstants';

export const tableColumn = ({ handleButtonClick, userType }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'AMC Registration No. & Date',
            dataIndex: 'amcRegistrationNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Dealer Location',
            dataIndex: 'dealerLocation',
            width: '25%',
        }),
        tblPrepareColumns({
            title: 'VIN',
            dataIndex: 'vin',
            width: '14%',
        }),
        userType === AMC_CONSTANTS?.DEALER?.key
            ? tblPrepareColumns({
                  title: 'Status',
                  dataIndex: 'status',
                  width: '14%',
                  render: (status) => {
                      return <Tag color="warning">{status}</Tag>;
                  },
              })
            : tblPrepareColumns({
                  title: 'Mobile No.',
                  dataIndex: 'mobileNumber',
                  width: '14%',
              }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
