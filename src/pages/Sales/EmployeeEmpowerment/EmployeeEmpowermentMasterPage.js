/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { EmployeeEmpowermentMaster } from 'components/Sales/EmployeeEmpowerment';
// import { DealerCorporateClaimMaster } from 'components/Sales/DealerCorporateClaim';
const EmployeeEmpowermentMasterBase = (props) => {
    
    const pageTitle = 'Employee Empowerment';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <EmployeeEmpowermentMaster/>
        </>
    );
};

export const EmployeeEmpowermentMasterPage = withLayoutMaster(EmployeeEmpowermentMasterBase);
