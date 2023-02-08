import React from 'react';
import { connect } from 'react-redux';
// import { RL_LOGO } from 'assets';
import { withLayoutMaster } from 'components/withLayoutMaster';
import CMS from 'assets/images/comingsoon.svg';
import styles from './CMSPage.module.css';
import { PageHeader } from 'pages/common/PageHeader';
import { useLocation } from 'react-router-dom';
import * as routing from 'constants/routing';

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
    const location = useLocation();
    const pagePath = location.pathname;
    const pageTitle = pagePath === routing?.ROUTING_USER_CONTACT ? 'Contact Us' : pagePath === routing?.ROUTING_USER_TERM ? 'Terms Of Use' : pagePath === routing?.ROUTING_USER_DISCLAIMER ? 'Disclaimer' : pagePath === routing?.ROUTING_USER_ABOUT ? 'About Us' : '';
    const pageHeaderData = {
        pageTitle,
        showChangeHisoty: true,
        canMarkFavourite: false,
        visibleChangeHistory: false,
    };
    return (
        <>
            <PageHeader {...pageHeaderData} />
            <div className={styles.cmsContainer}>
                <h1>
                    <img src={CMS} alt="Coming Soon" />
                </h1>
                <p>This Page is Under Development</p>
            </div>
        </>
    );
};

export const CMSPage = connect(mapStateToProps, null)(withLayoutMaster(CMSPageMain));
