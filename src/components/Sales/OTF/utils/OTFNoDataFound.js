/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import { Empty, Card } from 'antd';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

export const NoDataFound = (props) => {
    const { errMsg } = props;
    return (
        <Card>
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{
                    height: 60,
                }}
                description={<span className={styles.descriptionText}> {errMsg}</span>}
            />
        </Card>
    );
};
