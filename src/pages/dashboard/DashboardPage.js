import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';

import { Dashboard } from 'components/Dashboard/Dashboard';
import { DashboardSkelton } from 'components/Dashboard/DashboardSkelton';

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
            Header: { data: loginUserData = [], isLoading },
        },
    } = state;

    return {
        collapsed,
        firstName: loginUserData?.firstName,
        isLoading,
    };
};

const DashboardPageBase = ({ props }) => {
    const { isLoading } = props;
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 3000);
    // }, []);
    return isLoading ? <DashboardSkelton /> : <Dashboard {...props} />;
};

export const DashboardPage = connect(mapStateToProps, null)(withLayoutMaster(DashboardPageBase));
