import React from 'react';
import { connect } from 'react-redux';

import { withSpinner } from './withSpinner';
import { doLogoutAPI } from '../store/actions/auth';
import { bindActionCreators } from 'redux';

import { AuthenticatedUserPage } from 'pages/routing/AuthenticatedUserPage';
import { UnAuthenticatedUserPage } from 'pages/routing/UnAuthenticatedUserPage';

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
    const isLogged = false;
    return <div style={{ height: '100%' }}>{isLogged ? <AuthenticatedUserPage /> : <UnAuthenticatedUserPage />}</div>;
};

const MainPageWithSpinner = withSpinner(MainPageBase);

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageWithSpinner);
