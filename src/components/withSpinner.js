import React from 'react';
import { Spin } from 'antd';
import styles from './withSpinner.module.css';

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
