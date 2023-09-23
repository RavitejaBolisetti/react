/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import styles from './withDrawer.module.scss';

export const withDrawer =
    (InputComponent, { title = 'default title', width = 520, footer }) =>
    (props) => {
        const { onCloseAction, isVisible, isChangeHistoryContainer = false, titleOverride, onOk = () => {} } = props;
        useEffect(() => {
            if (isVisible) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'overlay';
            }
        }, [isVisible]);

        return (
            <Drawer zIndex={99} title={titleOverride || title} onOk={onOk} onClose={onCloseAction} width={width} open={isVisible} className={width === '90%' ? (isChangeHistoryContainer ? styles.changeHistoryWrapper : styles.bigDrawerStyle) : styles.myDrawerStyle} keyboard={false} maskClosable={false}>
                {isVisible && <InputComponent {...props} />}
            </Drawer>
        );
    };
