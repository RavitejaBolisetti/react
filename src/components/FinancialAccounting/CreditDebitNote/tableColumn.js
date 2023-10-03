/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = ({ handleButtonClick, typeData }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Voucher Number',
            dataIndex: 'voucherNumber',
            width: '18%',
        }),
        tblPrepareColumns({
            title: 'Voucher Type',
            dataIndex: 'voucherType',
            width: '18%',
            render: (value) => {
                return getCodeValue(typeData[PARAM_MASTER.VOUCHR_TYPE.id], value);
            },
        }),

        tblPrepareColumns({
            title: 'Party Segment',
            dataIndex: 'partySegment',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '18%',
        }),
        tblPrepareColumns({
            title: 'Paid Amount',
            dataIndex: 'paidAmount',
            width: '16%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '15%' }),
    ];

    return tableColumn;
};
