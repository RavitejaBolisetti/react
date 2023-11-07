/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { Result } from 'antd';
import { LANGUAGE_EN } from 'language/en';
import { PageHeader } from 'pages/common/PageHeader';
import { withLayoutMaster } from 'components/withLayoutMaster';

import styles from './UnAuthozisedAccess.module.scss';
import { BiLock } from 'react-icons/bi';

const mapStateToProps = (state) => ({
    isLoggedIn: state?.auth?.isLoggedIn,
});

const UnAuthozisedAccessMain = ({ isLoggedIn }) => {
    const pageTitle = LANGUAGE_EN.GENERAL.UNAUTHORIZED_ACCESS.TITLE;
    const pageDescription = LANGUAGE_EN.GENERAL.UNAUTHORIZED_ACCESS.MESSAGE;

    const pageHeaderData = {
        pageTitle,
    };
    return (
        isLoggedIn && (
            <>
                <PageHeader {...pageHeaderData} />
                <div className={styles.unAuthozisedAccessContainer}>
                    <Result title={pageTitle} icon={<BiLock size={100} color={'#e31837'} />} subTitle={parse(pageDescription)} />
                </div>
            </>
        )
    );
};

export const UnAuthozisedAccess = withLayoutMaster(connect(mapStateToProps, null)(UnAuthozisedAccessMain));
