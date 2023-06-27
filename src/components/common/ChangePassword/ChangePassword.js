/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Modal, Row, Form } from 'antd';
import { FiLock } from 'react-icons/fi';

import { ChangePasswordForm } from './ChangePasswordForm';
import styles from './ChangePassword.module.css';

export const ChangePassword = ({ setModalOpen, isOpen = false, onOk = () => {}, title = '', discreption = '', doLogout, saveData, isDataLoaded, listShowLoading, userId }) => {
    const [form] = Form.useForm();
    const [password, setPassword] = useState('');
    const [fieldData, setFieldData] = useState();

    const onCancel = () => {
        form.resetFields();
        setFieldData();
        setPassword('');
        setTimeout(function () {
            setModalOpen(false);
        }, 1);
    };

    const modelTitle = (
        <>
            <FiLock size={18} color={'#ff3e5b'} />
            {' ' + title}
        </>
    );

    const formProps = {
        password,
        setPassword,
        fieldData,
        setFieldData,
    };
    return (
        <>
            <Modal className={styles.changePassword} centered open={isOpen} title={modelTitle} okText="Submit" footer={false} okType="primary" maskClosable={false} onCancel={onCancel} width={480}>
                {discreption && (
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <p>{discreption}</p>
                        </Col>
                    </Row>
                )}
                <ChangePasswordForm form={form} {...formProps} />
            </Modal>
        </>
    );
};
