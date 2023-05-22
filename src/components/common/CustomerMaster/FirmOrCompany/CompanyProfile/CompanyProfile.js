import React, { useEffect, useState } from 'react';

import { withDrawer } from 'components/withDrawer';

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
