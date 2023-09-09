/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import CMS from 'assets/images/comingsoon.svg';
import { PageHeader } from 'pages/common/PageHeader';

import styles from 'pages/cms/CMSPage.module.scss';

import { withLayoutMaster } from 'components/withLayoutMaster';

const SettingPageBase = () => {
    const pageHeaderData = {
        pageTitle: 'Account Settings',
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

export const SettingPage = withLayoutMaster(SettingPageBase);
