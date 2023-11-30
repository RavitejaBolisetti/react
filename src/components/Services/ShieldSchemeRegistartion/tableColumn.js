/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { AMCStatusTags } from 'components/Sales/AMCRegistration/utils/AMCStatusTags';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { AMC_CONSTANTS } from './utils/AMCConstants';

export const tableColumn = (props) => {
    const { handleButtonClick, userType, locations } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('shieldSchemeRegistration.label.shieldRegistrationDate'),
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
            title: translateContent('shieldSchemeRegistration.label.dealerLocation'),
            dataIndex: 'dealerLocation',
            width: '26%',
            render: (value) => {
                return checkAndSetDefaultValue(getCodeValue(locations, value, 'dealerLocationName', true, 'locationId'));
            },
        }),

        tblPrepareColumns({
            title: translateContent('shieldSchemeRegistration.label.vin'),
            dataIndex: 'vin',
            width: '20%',
        }),

        userType === AMC_CONSTANTS?.MNM?.key
            ? tblPrepareColumns({
                  title: translateContent('shieldSchemeRegistration.label.mobileNo'),
                  dataIndex: 'mobileNumber',
                  width: '20%',
              })
            : tblPrepareColumns({
                  title: translateContent('shieldSchemeRegistration.label.status'),
                  dataIndex: 'status',
                  width: '20%',
                  render: (status) => {
                      return AMCStatusTags(status);
                  },
              }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
