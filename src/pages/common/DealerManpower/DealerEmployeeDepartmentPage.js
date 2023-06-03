import React from 'react';
import { ListEmployeeDepartmentMaster } from 'components/common/DealerManpower/DealerEmployeeDepartmentMaster/ListEmployeeDepartmentMaster';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const DealerEmployeeDepartmentPageBase = (props) => {
    const pageTitle = 'Empolyee Department';
    const pageHeaderData = {
        pageTitle,
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
