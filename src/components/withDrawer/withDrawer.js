import React from 'react';
import { Drawer } from 'antd';

import styles from './withDrawer.module.css';

export const withDrawer =
    (InputComponent, { title = 'default title', width = 520, footer }) =>
    (props) => {
        const { onCloseAction, isVisible, titleOverride, onOpenAction } = props;
        return (
            <Drawer title={titleOverride || title} open={onOpenAction} footer={footer} onClose={onCloseAction} width={width} visible={isVisible} className={styles.myDrawerStyle} keyboard={false} maskClosable={false}>
                {isVisible && <InputComponent {...props} />}
            </Drawer>
        );
    };
