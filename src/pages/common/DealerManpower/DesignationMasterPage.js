import React from 'react';
import { DesignationMaster } from 'components/common/DealerManpower/DesignationMaster/DesignationMaster';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const DesignationMasterPageBase = (props) => {
    const pageTitle = 'Designation Master';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <DesignationMaster />
        </>
    );
};

const DesignationMasterPage = withLayoutMaster(DesignationMasterPageBase);

export default DesignationMasterPage;
