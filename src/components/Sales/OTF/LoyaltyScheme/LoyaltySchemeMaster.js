import React from 'react';
import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';

export const LoyaltySchemeMaster = (props) => {
    return (
        <div className={styles.drawerCustomerMaster}>
            <h2>Loyalty Scheme</h2>
            <AddEditForm {...props} />
        </div>
    );
};

