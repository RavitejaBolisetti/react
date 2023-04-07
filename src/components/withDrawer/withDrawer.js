import React from 'react';
import { Drawer } from 'antd';

import styles from './withDrawer.module.css';

export const withDrawer =
    (InputComponent, { title = 'default title', width = 652 }) =>
    (props) => {
        const { onCloseAction, isVisible, titleOverride, onOpenAction, footer } = props;
        return (
            <Drawer title={titleOverride || title} width={width} open={onOpenAction} footer={footer} onClose={onCloseAction} visible={isVisible} className={styles.myDrawerStyle} keyboard={false} maskClosable={false}>
                {isVisible && <InputComponent {...props} />}
            </Drawer>
        );
    };
