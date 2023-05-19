import React, { useEffect, useState } from 'react';

import { withDrawer } from 'components/withDrawer';

import  AddEditForm  from './AddEditForm';

const CustomerProfileBase = (props) => {
    return (
        <>
            <h2>Company Profile</h2>
            <AddEditForm {...props} />
        </>
    );
};

export const CustomerProfile = CustomerProfileBase;
