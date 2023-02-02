import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { withSpinner } from './withSpinner';
import { doLogoutAPI } from '../store/actions/auth';
import { bindActionCreators } from 'redux';

import { AuthenticatedUserPage } from 'pages/routing/AuthenticatedUserPage';
import { UnAuthenticatedUserPage } from 'pages/routing/UnAuthenticatedUserPage';
import { useNavigate } from 'react-router-dom';
import { ROUTING_DASHBOARD, ROUTING_LOGIN } from 'constants/routing';

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

    console.log('isLoggedIn', isLoggedIn);
    useEffect(() => {
        console.log('im', isLoggedIn);
        isLoggedIn ? navigate(ROUTING_DASHBOARD) : navigate(ROUTING_LOGIN);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    return <div style={{ height: '100%' }}>{isLoggedIn ? <AuthenticatedUserPage /> : <UnAuthenticatedUserPage />}</div>;
};

const MainPageWithSpinner = withSpinner(MainPageBase);

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageWithSpinner);
