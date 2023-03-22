import React from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { QualificationMaster } from 'components/common/QualificationMaster';

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
    };
    return returnValue;
};

export const QualificationMasterPageBase = (props) => {
    const pageTitle = 'Qualification Master';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <QualificationMaster />
        </>
    );
};

export const QualificationMasterPage = connect(mapStateToProps, null)(withLayoutMaster(QualificationMasterPageBase));
