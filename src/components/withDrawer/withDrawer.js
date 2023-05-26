import React, { useEffect } from 'react';
import { Drawer } from 'antd';

import styles from './withDrawer.module.css';

export const withDrawer =
    (InputComponent, { title = 'default title', width = 520 }) =>
        (props) => {
            const { onCloseAction, isVisible, titleOverride, onOk = () => { } } = props;
            useEffect(() => {
                if (isVisible) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'overlay';
                }
            }, [isVisible]);

            // open={onOpenAction}
            return (
                <Drawer title={titleOverride || title} open={onOpenAction} onOk={onOk} onClose={onCloseAction} width={width} visible={isVisible} className={styles.myDrawerStyle} keyboard={false} maskClosable={false}>
                    {isVisible && <InputComponent {...props} />}
                </Drawer>
            );
        };
