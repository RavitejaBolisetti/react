/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { ListEmployeeDepartmentMaster } from 'components/common/DealerManpower/DealerEmployeeDepartmentMaster/ListEmployeeDepartmentMaster';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { translateContent } from 'utils/translateContent';

export const DealerEmployeeDepartmentPageBase = (props) => {

    const pageHeaderData = {
        pageTitle: translateContent('employeeDepartment.heading.pageTitle'),
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ListEmployeeDepartmentMaster />
        </>
    );
};

const DealerEmployeeDepartmentPage = withLayoutMaster(DealerEmployeeDepartmentPageBase);

export default DealerEmployeeDepartmentPage;
