/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { getCodeValue } from 'utils/getCodeValue';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (props) => {
    const { handleButtonClick, typeData } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: 'Shield Registration No. & Date',
            dataIndex: 'shieldRegistrationNumber',
            width: '20%',
            render: (__, value) => {
                return (
                    <>
                        <div>{value?.shieldRegistrationNumber}</div>
                        <div className={styles.tableTextColor85}>{convertDateMonthYear(value?.date)}</div>
                    </>
                );
            },
        }),

        tblPrepareColumns({
            title: 'Dealer Location',
            dataIndex: 'dealerLocation',
            width: '26%',
        }),

        tblPrepareColumns({
            title: 'VIN',
            dataIndex: 'vin',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            width: '20%',
            render: (status) => {
                return <Tag color="warning">{checkAndSetDefaultValue(getCodeValue(typeData?.AMC_REG_APRVL_STAT, status))}</Tag>;
            },
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
