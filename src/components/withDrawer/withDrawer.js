import React from 'react';
import { Drawer } from 'antd';

import styles from './withDrawer.module.css';

export const withDrawer =
    (InputComponent, { title = 'default title', width = 1000 }) =>
    (props) => {
        const { onCloseAction, isVisible, titleOverride, onOpenAction } = props;
        return (
            <Drawer title={title} width={width} open={onOpenAction} onClose={onCloseAction} visible={isVisible} className={styles.myDrawerStyle} keyboard={false} maskClosable={false}>
                {isVisible && <InputComponent {...props} />}
            </Drawer>
        );
    };
