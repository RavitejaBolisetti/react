/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import { Empty, Card } from 'antd';

import styles from 'assets/sass/app.module.scss';

export const NoDataFound = (props) => {
    const { informtion = 'No Data Found' } = props;
    return (
        <Card>
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{
                    height: 60,
                }}
                description={<span className={styles.descriptionText}>{informtion}</span>}
            />
        </Card>
    );
};
