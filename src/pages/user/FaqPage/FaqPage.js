import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import CMS from 'assets/images/comingsoon.svg';
import { PageHeader } from 'pages/common/PageHeader';

import styles from 'pages/cms/CMSPage.module.css';

const FaqPageBase = (props) => {
    const pageHeaderData = {
        pageTitle: 'FAQ',
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

export const FaqPage = withLayoutMaster(FaqPageBase);
