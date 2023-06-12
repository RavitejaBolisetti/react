import React from 'react';
import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';
import { Row, Col, Form } from 'antd';

export const ExchangeVehiclesMaster = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {};
    const onFinishFailed = (values) => {
        form.validateFields()
            .then(() => {})
            .catch((err) => {
                console.log('err');
            });
    };
    const ExchangeVehiclesMasterProps = {
        ...props,
        form,
        onFinishFailed,
        onFinish,
    };
    return (
        <div className={styles.drawerCustomerMaster}>
            <AddEditForm {...ExchangeVehiclesMasterProps} />
        </div>
    );
};
