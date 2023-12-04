/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import { Space } from 'antd';
import { UploadBoxIcon } from 'Icons';

import styles from 'assets/sass/app.module.scss';

export const NoDataFound = (props) => {
    const { information = 'No Data Found' } = props;
    return (
        <Space direction="vertical" align="center">
            <UploadBoxIcon />
            <div className={styles.descriptionText}>{information}</div>
        </Space>
    );
};
