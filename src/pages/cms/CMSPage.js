import React from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';

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

export const CMSPageMain = () => {
    return <div>Coming Soon</div>;
};

export const CMSPage = connect(mapStateToProps, null)(withLayoutMaster(CMSPageMain));
