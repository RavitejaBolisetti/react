/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Spin } from 'antd';
import * as IMAGES from 'assets';
import styles from './withSpinner.module.scss';

const spinIndicator = <img src={IMAGES.LOADING_IMG} alt="loading_images" />;

export const withSpinner = (InputComponent, wideSpiner = false) => {
    return (props) => {
        const { isLoading = false } = props;
        return (
            <div className={styles.spinner}>
                <Spin spinning={isLoading} indicator={spinIndicator} key={'spin'} wrapper className={wideSpiner ? styles.fullWidth : ''}>
                    <InputComponent {...props} />
                </Spin>
            </div>
        );
    };
};
