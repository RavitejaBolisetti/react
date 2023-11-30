/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { RSARegistrationStatusTag } from './utils/RSARegistrationStatusTag';
import { translateContent } from 'utils/translateContent';
import { RSA_CONSTANTS } from './utils/RSA_CONSTANT';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

export const tableColumn = ({ handleButtonClick, userType, locations }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('rsaTableColumn.label.rsaRegistration'),
            dataIndex: 'rsaRegistrationNumber',
            width: '22%',
            render: (text, record) => [
                <div>
                    {record?.rsaRegistrationNumber}
                    {record?.rsaRegistrationDate && <div style={{ fontSize: '12px', lineHeight: '20px' }}> {convertDateTime(record?.rsaRegistrationDate, dateFormatView)}</div>}
                </div>,
            ],
        }),

        tblPrepareColumns({
            title: translateContent('rsaTableColumn.label.dealerLocation'),
            dataIndex: 'dealerLocation',
            width: '22%',
            render: (value) => {
                return checkAndSetDefaultValue(getCodeValue(locations, value, 'dealerLocationName', true, 'locationId'));
            },
        }),

        tblPrepareColumns({
            title: translateContent('rsaTableColumn.label.vin'),
            dataIndex: 'vin',
            width: '22%',
        }),

        userType === RSA_CONSTANTS?.MNM?.key
            ? tblPrepareColumns({
                  title: translateContent('shieldSchemeRegistration.label.mobileNo'),
                  dataIndex: 'mobileNumber',
                  width: '22%',
              })
            : tblPrepareColumns({
                  title: translateContent('shieldSchemeRegistration.label.status'),
                  dataIndex: 'status',
                  width: '22%',
                  render: (status) => {
                      return RSARegistrationStatusTag(status);
                  },
              }),

        tblActionColumn({ handleButtonClick, styles, width: '12%', canEdit: false }),
    ];

    return tableColumn;
};
