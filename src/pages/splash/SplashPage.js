import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Splash } from 'components/Splash';
import { LoginPage } from 'pages/auth/Login';
import MetaTag from 'utils/MetaTag';
import { ROUTING_DASHBOARD, ROUTING_LOGIN } from 'constants/routing';

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    // isLoading: state.global.isLoading,
});

const SplashPageBase = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            navigate(isLoggedIn ? ROUTING_DASHBOARD : ROUTING_LOGIN);
        }, 1500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ? (
                <div>
                    <MetaTag metaTitle="Spash" metaDescription="splash" />
                    <Splash />
                </div>
            ) : (
                <LoginPage />
            )}
        </>
    );
};

export const SplashPage = connect(mapStateToProps, null)(SplashPageBase);
