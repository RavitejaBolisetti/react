import React from 'react';
import { ListLessorCompanyMaster } from 'components/common/LessorCompanyMaster';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';

export const LessorCompanyMasterBase = (props) => {
    const pageTitle = 'Lessor Company Master (M&M)';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ListLessorCompanyMaster />
        </>
    );
};

export const LessorCompanyMasterPage = withLayoutMaster(LessorCompanyMasterBase);
