import React from 'react';
import styles from 'components/common/Common.module.css';
import  AddEditForm  from './AddEditForm';

export const AddOnDetailsMaster = (props) => {
    return (
        <div className={styles.drawerCustomerMaster}>
            <AddEditForm {...props} />
        </div>
    );
};


