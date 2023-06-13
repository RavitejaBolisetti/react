import React from 'react';
import  AddEditForm  from './AddEditForm';

const CompanyProfileBase = (props) => {
    return (
        <>
            <h2>Company Profile</h2>
            <AddEditForm {...props} />
        </>
    );
};

export const CompanyProfile = CompanyProfileBase;
