import React, { useEffect, useState } from 'react';

import { withDrawer } from 'components/withDrawer';

import { AddEditForm } from './AddEditForm';


const CustomerProfileBase = ({  }) => {
    

    return (
        <>
           <h2>Company Profile</h2>
           <AddEditForm />
        </>
    );
};

export const CustomerProfile = CustomerProfileBase;
