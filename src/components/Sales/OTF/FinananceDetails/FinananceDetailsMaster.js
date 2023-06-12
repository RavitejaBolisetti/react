import React from 'react';
import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';

const FinananceDetailsMaster = (props) => {
    return (
        <div className={styles.drawerCustomerMaster}>
            <h2>Finance Details</h2>

            <AddEditForm {...props} />
        </div>
    );
};

export default FinananceDetailsMaster;
