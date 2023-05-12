import React from 'react';
import { Modal } from 'antd';

import styles from './withModal.module.css';

export const withModal =
    (InputComponent, { title = 'default title', width = 480, footer }) =>
    (props) => {
        const { onCloseAction, isVisible, titleOverride, onOpenAction } = props;
        return (
            <Modal className={styles.changePassword} centered open={isVisible} title={titleOverride} okText="Submit" footer={false} okType="primary" maskClosable={false} onCancel={onCloseAction} width={width} keyboard={false}>
                {isVisible && <InputComponent {...props} />}
            </Modal>
        );
    };
