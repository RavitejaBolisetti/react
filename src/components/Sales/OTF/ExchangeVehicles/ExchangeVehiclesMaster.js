/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';
import { Form } from 'antd';

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
