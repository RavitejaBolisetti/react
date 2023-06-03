import React, { useEffect } from 'react';
import { Drawer } from 'antd';

import styles from './withDrawer.module.css';

export const withDrawer =
    (InputComponent, { title = 'default title', width = 520, footer }) =>
    (props) => {
        const { onCloseAction, isVisible, titleOverride, onOk = () => {} } = props;
        useEffect(() => {
            if (isVisible) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'overlay';
            }
        }, [isVisible]);
        return (
            <Drawer title={titleOverride || title} onOk={onOk} footer={footer} onClose={onCloseAction} width={width} open={isVisible} className={styles.myDrawerStyle} keyboard={false} maskClosable={false}>
                {isVisible && <InputComponent {...props} />}
            </Drawer>
        );
    };
