import React from 'react';
import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';
import { Form } from 'antd';

export const ReferralsMaster = (props) => {
    const [form] = Form.useform();
    const onFinish = (values) => {};
    const onFinishFailed = (values) => {};
    const ReferralsMasterProps = {
        ...props,
        form,
        onFinish,
        onFinishFailed,
    };
    return (
        <div className={styles.drawerCustomerMaster}>
            <h2>Referrals</h2>
            <AddEditForm {...props} />
        </div>
    );
};
