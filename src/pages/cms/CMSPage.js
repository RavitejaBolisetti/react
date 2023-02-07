import React from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { RL_LOGO } from 'assets';

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
    return (
        <div class="wrapper">
            <img src={RL_LOGO} alt="" />
            <h1>
                <img src="asset/img/comingsoon.svg" alt="Coming Soon" />
            </h1>
            <p>This page is under construction</p>
        </div>
    );
};

export const CMSPage = connect(mapStateToProps, null)(withLayoutMaster(CMSPageMain));
