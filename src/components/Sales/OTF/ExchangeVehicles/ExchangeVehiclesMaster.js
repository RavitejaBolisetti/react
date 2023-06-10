import React from 'react';
import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';

export const ExchangeVehiclesMaster = (props) => {
    return (
        <div className={styles.drawerCustomerMaster}>
            <h2>Exchange Vehicle</h2>
            <AddEditForm {...props} />
        </div>
    );
};