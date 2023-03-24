import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { withSpinner } from './withSpinner';
import { doLogoutAPI } from '../store/actions/auth';
import { bindActionCreators } from 'redux';

import { AuthenticatedUserPage } from 'pages/routing/AuthenticatedUserPage';
import { UnAuthenticatedUserPage } from 'pages/routing/UnAuthenticatedUserPage';
import { ROUTING_DASHBOARD, ROUTING_FORGOT_PASSWORD, ROUTING_LOGIN, ROUTING_SSO_LOGIN, ROUTING_UPDATE_PASSWORD } from 'constants/routing';
import { LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN, LOCAL_STORAGE_KEY_AUTH_USER_ID } from 'store/actions/auth';

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

const MainPageBase = ({ doLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pagePath = location.pathname;

    const isLoggedIn = !!(localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_ACCESS_TOKEN) && localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_USER_ID));
   
    useEffect(() => {
        if (!isLoggedIn && pagePath === ROUTING_SSO_LOGIN) {
            navigate(ROUTING_SSO_LOGIN);
        } else if (!isLoggedIn && pagePath === ROUTING_LOGIN) {
            navigate(ROUTING_LOGIN);
        } else if (isLoggedIn && (pagePath === ROUTING_LOGIN || pagePath === ROUTING_UPDATE_PASSWORD || pagePath === ROUTING_FORGOT_PASSWORD)) {
            navigate(ROUTING_DASHBOARD);
        } else if (!isLoggedIn) {
            navigate(ROUTING_LOGIN);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    return <div>{isLoggedIn ? <AuthenticatedUserPage /> : <UnAuthenticatedUserPage />}</div>;
};
const MainPageWithSpinner = withSpinner(MainPageBase);
export const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageWithSpinner);
