/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { Button, Result, Image } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ROBIN_LIGHT_THEME } from 'assets';
import * as routing from 'constants/routing';
import { LANGUAGE_EN } from 'language/en';

import styles from './PageNotFound.module.scss';

const mapStateToProps = (state) => ({
    isLoggedIn: state?.auth?.isLoggedIn,
});

const PageNotFoundMaster = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const [count, setCount] = useState(10);

    useEffect(() => {
        if (count === 0) {
            navigate(routing.ROUTING_DASHBOARD);
            return;
        }
        const TimeOut = setTimeout(() => {
            setCount(count - 1);
        }, 1000);
        return () => clearTimeout(TimeOut);
    }, [count, navigate]);

    let pageTitle = LANGUAGE_EN.GENERAL.PAGE_NOT_FOUND.TITLE;
    let pageDescription = LANGUAGE_EN.GENERAL.PAGE_NOT_FOUND.MESSAGE.replace('{COUNTER}', `${count} seconds`);

    return (
        isLoggedIn && (
            <div className={styles.pageNotFoundContainer}>
                <Result
                    title={pageTitle}
                    subTitle={parse(pageDescription)}
                    icon={<Image height={45} width={300} src={ROBIN_LIGHT_THEME} preview={false} />}
                    extra={
                        <Button danger onClick={() => navigate(routing.ROUTING_DASHBOARD)}>
                            Back Home
                        </Button>
                    }
                />
            </div>
        )
    );
};

export const PageNotFound = connect(mapStateToProps, null)(PageNotFoundMaster);
