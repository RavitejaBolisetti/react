/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Typography } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { convertDateMonthYear } from './formatDateTime';
import { DATA_TYPE } from 'constants/dataType';

const { Text } = Typography;

export const DEFAULT_COLOR = 'error';
export const DEFAULT_DESCRIPTION = 'NOT AVAILABLE';
export const NO_DATA_AVALAIBLE = '-';

export const ShowDataBox = (DATA_1 = null, DATA_2 = null, type = '') => {
    if (DATA_1 && DATA_2) {
        switch (type) {
            case DATA_TYPE?.DATE?.key:
                return (
                    <>
                        <Text strong>{DATA_1}</Text>
                        <div className={styles.tableTextColor85}>{DATA_2}</div>
                    </>
                );

            default: {
                return (
                    <>
                        <Text strong>{DATA_1}</Text>
                        <div className={styles.tableTextColor85}>{DATA_2}</div>
                    </>
                );
            }
        }
    }

    return NO_DATA_AVALAIBLE;
};
