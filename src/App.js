import React, { useEffect, createContext } from 'react';
import { connect } from 'react-redux';
import { ConfigProvider, notification } from 'antd';
import { MainPage } from './components/MainPage';
import { readFromStorageAndValidateAuth } from 'store/actions/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { hideGlobalNotification } from 'store/actions/notification';

import styles from './App.module.css';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    readFromStorageAndValidateAuth,
    hideGlobalNotification,
};

const NotificationContext = createContext();

const AppBase = ({ readFromStorageAndValidateAuth, hideGlobalNotification }) => {
    const [informationNotification, contextInformationNotification] = notification.useNotification();

    useEffect(() => {
        readFromStorageAndValidateAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkIcon = {
        success: <AiOutlineCheckCircle />,
        error: <AiOutlineCloseCircle />,
    };

    const checkClassName = {
        success: styles.success,
        warning: styles.warning,
        error: styles.error,
    };

    const informationModalBox = ({ type = 'error', title = 'Information', message, duration = 1400, placement = 'topRight', showTitle = true }) => {
        informationNotification.open({
            icon: checkIcon?.[type],
            message: showTitle ? title : false,
            description: message,
            className: `${checkClassName?.[type]} ${styles?.[placement]}`,
            duration,
            placement,
            onClose: hideGlobalNotification,
        });
    };

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
                    <NotificationContext.Provider value={informationModalBox}>
                        {contextInformationNotification}
                        <MainPage />
                    </NotificationContext.Provider>
                </ConfigProvider>
            </Router>
        </>
    );
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppBase);

export default NotificationContext;
