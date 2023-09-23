/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Spin } from 'antd';

import styles from './withSpinner.module.scss';

const antIcon = undefined;
export const withSpinner = (InputComponent, wideSpiner = false) => {
    return (props) => {
        const { isLoading = false } = props;
        return (
            <div className={styles.loader2}>
                <Spin spinning={isLoading} indicator={antIcon} key={'spin'} wrapperClassName={wideSpiner ? styles.fullWidth : ''}>
                    <InputComponent {...props} />
                </Spin>
            </div>
        );
    };
};
