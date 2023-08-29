/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import CMS from 'assets/images/comingsoon.svg';

import styles from './CMSPage.module.scss';
//import styles from './CMSPage.module.css';
import { PageHeader } from 'pages/common/PageHeader';
import { useLocation } from 'react-router-dom';
import * as routing from 'constants/routing';

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

export const CMSPage = withLayoutMaster(CMSPageMain);
