/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Button, Result, Image, Typography } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import IMG_LOGO from 'assets/images/RobinLightTheme.svg';

import * as routing from 'constants/routing';
import { connect } from 'react-redux';

const { Text } = Typography;

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    notification: state.notification,
});
const PageNotFoundMaster = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pagePath = location.pathname;
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

    const Counting = (
        <p>
            Sorry, the page you visited does not exist. Redirecting to dashboard in <Text strong>{count} seconds</Text>
        </p>
    );
    const handlePagePath = (pagePath) => {
        if (pagePath) {
            if (pagePath?.split('/')?.length && pagePath !== routing.ROUTING_LOGIN && pagePath !== routing.ROUTING_HOME) return true;
            return false;
        }
        return false;
    };
    const PageNotFoundStyles = {
        style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
        },
    };
    return (
        <>
            {props?.isLoggedIn && handlePagePath(pagePath) && (
                <div {...PageNotFoundStyles}>
                    <Result
                        title="404"
                        subTitle={Counting}
                        icon={<Image height={45} width={300} src={IMG_LOGO} preview={false} />}
                        extra={
                            <Button danger onClick={() => navigate(routing.ROUTING_DASHBOARD)}>
                                Back Home
                            </Button>
                        }
                    />
                </div>
            )}
            ;
        </>
    );
};
export const PageNotFound = connect(mapStateToProps, null)(PageNotFoundMaster);
