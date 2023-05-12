import React from 'react';
import { Modal } from 'antd';

import styles from './withModal.module.css';

export const withModal =
    (InputComponent, { title = 'default title', width = 480, footer = false }) =>
    (props) => {
        const { onCloseAction, isVisible, titleOverride, icon = '', closable = true, onOk = () => {} } = props;
        const titleWithIcon = (
            <>
                {icon}
                {titleOverride}
            </>
        );
        return (
            <Modal closable={closable} footer={footer} centered open={isVisible} title={titleWithIcon} okText="Submit" onOk={onOk} okType="primary" maskClosable={false} onCancel={onCloseAction} width={width} keyboard={false} className={styles.modalContainer}>
                <InputComponent {...props} />
            </Modal>
        );
    };
