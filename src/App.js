import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ConfigProvider } from 'antd';
import { MainPage } from './components/MainPage';
import { readFromStorageAndValidateAuth } from 'store/actions/auth';
import { BrowserRouter as Router } from 'react-router-dom';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    readFromStorageAndValidateAuth,
    // globalSetIsLoading,
};

const AppBase = ({ readFromStorageAndValidateAuth }) => {
    useEffect(() => {
        readFromStorageAndValidateAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Router>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#ff3e5b',
                            colorBgContainer: '#ffffff',
                        },
                        components: {
                            Button: {
                                borderRadius: 5,
                                colorErrorActive: '#ff4d4f',
                                colorBg: '#ff4d4f',
                                colorBorder: '#ff3e5b',
                                colorBgTextActive: 'rgba(0, 0, 0, 0.15)',
                                colorText: 'red',
                                colorTextLightSolid: '#fff',
                            },
                        },
                    }}
                >
                    <MainPage />
                </ConfigProvider>
            </Router>
        </>
    );
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppBase);
