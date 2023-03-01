import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { withSpinner } from './withSpinner';
import { doLogoutAPI } from '../store/actions/auth';
import { bindActionCreators } from 'redux';

import { AuthenticatedUserPage } from 'pages/routing/AuthenticatedUserPage';
import { UnAuthenticatedUserPage } from 'pages/routing/UnAuthenticatedUserPage';
import { ROUTING_DASHBOARD, ROUTING_FORGOT_PASSWORD, ROUTING_LOGIN, ROUTING_LOGOUT } from 'constants/routing';

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            doLogout: doLogoutAPI,
        },
        dispatch
    ),
});

const MainPageBase = ({ isLoggedIn, doLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pagePath = location.pathname;

    useEffect(() => {
        // if (!isLoggedIn && pagePath === ROUTING_LOGIN) {
        //     navigate(ROUTING_LOGIN);
        // } else if (!isLoggedIn && pagePath === ROUTING_LOGOUT) {
        //     navigate(ROUTING_LOGOUT);
        // } else if (isLoggedIn && (pagePath === ROUTING_LOGIN || pagePath === ROUTING_FORGOT_PASSWORD || pagePath === ROUTING_LOGOUT)) {
        //     navigate(ROUTING_DASHBOARD);
        // } else if (!isLoggedIn) {
        //     navigate(ROUTING_LOGIN);
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    return <div>{isLoggedIn ? <AuthenticatedUserPage /> : <AuthenticatedUserPage />}</div>;
};
const MainPageWithSpinner = withSpinner(MainPageBase);
export const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageWithSpinner);
