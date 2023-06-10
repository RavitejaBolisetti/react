import React from 'react';
import { Collapse, Select } from 'antd';
import { AddEditForm } from './AddEditForm';

const CompanyCustomerDetailsMaster = (props) => {
    return (
        <>
            <h2>Customer Details</h2>
            <AddEditForm {...props} />
        </>
    );
};

export default CompanyCustomerDetailsMaster;
