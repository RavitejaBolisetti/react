/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDate, dateFormatView } from 'utils/formatDateTime';
import { AMC_CONSTANTS } from './utils/AMCConstants';
import { translateContent } from 'utils/translateContent';
import { AMCStatusTags } from './utils/AMCStatusTags';

import styles from 'assets/sass/app.module.scss';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

export const tableColumn = ({ handleButtonClick, userType, locations }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('amcRegistration.label.amcRegNoDate'),
            dataIndex: 'amcRegistrationNumber',
            width: '14%',

            render: (__, value) => {
                return (
                    <>
                        <div>{value?.amcRegistrationNumber}</div>
                        <div className={styles.tableTextColor85}>{convertDate(value?.amcRegistrationDate, dateFormatView)}</div>
                    </>
                );
            },
        }),
        tblPrepareColumns({
            title: translateContent('amcRegistration.label.dealerLocation'),
            dataIndex: 'dealerLocation',
            render: (value) => {
                return checkAndSetDefaultValue(getCodeValue(locations, value, 'dealerLocationName', true, 'locationId'));
            },
            width: '25%',
        }),
        tblPrepareColumns({
            title: translateContent('amcRegistration.label.vin'),
            dataIndex: 'vin',
            width: '14%',
        }),
        userType === AMC_CONSTANTS?.DEALER?.key
            ? tblPrepareColumns({
                  title: translateContent('amcRegistration.label.status'),
                  dataIndex: 'status',
                  width: '14%',
                  render: (status) => {
                      return AMCStatusTags(status);
                  },
              })
            : tblPrepareColumns({
                  title: translateContent('amcRegistration.label.mobileNumber'),
                  dataIndex: 'mobileNumber',
                  width: '14%',
              }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
