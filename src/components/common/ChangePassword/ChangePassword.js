import React from 'react';
import { Col, Modal, Row } from 'antd';
import { ChangePasswordForm } from './ChangePasswordForm';

export const ChangePassword = ({ isOpen = false, onOk = () => {}, onCancel = () => {}, title = '', discreption = '', doLogout, saveData, isDataLoaded, listShowLoading, userId }) => {
    return (
        <>
            <Modal open={isOpen} title={title} okText="Submit" footer={false} okType="primary" maskClosable={false} onCancel={onCancel}>
                {discreption && (
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <p>{discreption}</p>
                        </Col>
                    </Row>
                )}
                <ChangePasswordForm />
            </Modal>
        </>
    );
};
