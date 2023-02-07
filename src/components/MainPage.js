import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { withSpinner } from './withSpinner';
import { doLogoutAPI } from '../store/actions/auth';
import { bindActionCreators } from 'redux';

import { AuthenticatedUserPage } from 'pages/routing/AuthenticatedUserPage';
import { UnAuthenticatedUserPage } from 'pages/routing/UnAuthenticatedUserPage';
import { ROUTING_DASHBOARD, ROUTING_LOGIN, ROUTING_LOGOUT } from 'constants/routing';
import { useLocation, useNavigate } from 'react-router-dom';

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    // isLoading: state.global.isLoading,
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
    console.log('🚀 ~ file: MainPage.js:32 ~ MainPageBase ~ pagePath', pagePath, pagePath === ROUTING_LOGOUT);

    useEffect(() => {
        // !isLoggedIn && pagePath === ROUTING_LOGOUT ? navigate(ROUTING_LOGOUT) : !isLoggedIn ? navigate(ROUTING_LOGIN) : navigate(ROUTING_DASHBOARD);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    return <div>{isLoggedIn ? <AuthenticatedUserPage /> : <UnAuthenticatedUserPage />}</div>;
};
const MainPageWithSpinner = withSpinner(MainPageBase);
export const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageWithSpinner);
