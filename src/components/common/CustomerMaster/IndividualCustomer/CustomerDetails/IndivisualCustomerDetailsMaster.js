import React from 'react';
import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';

const IndivisualCustomerDetailsMaster = (props) => {
    return (
        <div className={styles.drawerCustomerMaster}>
            <h2>Customer Details</h2>
            <AddEditForm {...props} />
        </div>
    );
};

export default IndivisualCustomerDetailsMaster;
