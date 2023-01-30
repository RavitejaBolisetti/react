import React from 'react';
import { connect } from 'react-redux';
import { ConfigProvider } from 'antd';
import { MainPage } from './components/MainPage';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    // readFromStorageAndValidateAuth,
    // globalSetIsLoading,
};

const AppBase = () => {
    return (
        <>
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
        </>
    );
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppBase);
