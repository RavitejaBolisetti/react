import React from 'react';
import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';

export const ReferralsMaster = (props) => {
    return (
        <div className={styles.drawerCustomerMaster}>
            <h2>Referrals</h2>
            <AddEditForm {...props} />
        </div>
    );
};

