import React from 'react';
import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';

const InvoiceDetailsMaster = (props) => {
    return (
        <div className={styles.drawerCustomerMaster}>
            <h2>Invoice/Delivery Information</h2>

            <AddEditForm {...props} />
        </div>
    );
};

export default InvoiceDetailsMaster;
