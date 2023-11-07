/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, createContext, useCallback } from 'react';
import { ConfigProvider, notification } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc';

import { MainPage } from './components/MainPage';

import { readFromStorageAndValidateAuth } from 'store/actions/auth';
import { hideGlobalNotification } from 'store/actions/notification';

import styles from './App.module.scss';

const mapStateToProps = (state) => ({
    notificationState: state.notification,
});

const mapDispatchToProps = {
    readFromStorageAndValidateAuth,
    hideGlobalNotification,
};

const NotificationContext = createContext();

const AppBase = ({ readFromStorageAndValidateAuth, hideGlobalNotification, notificationState }) => {
    const [informationNotification, contextInformationNotification] = notification.useNotification();

    useEffect(() => {
        readFromStorageAndValidateAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!notificationState?.visible) {
            informationNotification.destroy();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notificationState?.visible]);

    const informationModalBox = useCallback(
        ({ type = 'error', title = 'ERROR', message, duration = 3, placement = 'topRight', showTitle = true }) => {
            const checkIcon = {
                success: <AiOutlineCheckCircle />,
                warning: <AiOutlineInfoCircle />,
                error: <AiOutlineCloseCircle />,
                successBeforeLogin: <AiOutlineCheckCircle />,
                errorBeforeLogin: <FcCancel />,
            };

            const checkClassName = {
                success: styles.success,
                warning: styles.warning,
                error: styles.error,
                successBeforeLogin: styles.successBeforeLogin,
                errorBeforeLogin: styles.errorBeforeLogin,
            };

            informationNotification.open({
                icon: checkIcon?.[type],
                message: showTitle ? title : false,
                description: message,
                className: `${checkClassName?.[type]} ${styles?.[placement]}`,
                duration,
                placement,
                onClose: hideGlobalNotification,
            });
        },
        [hideGlobalNotification, informationNotification]
    );

    return (
        <Router>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#ff3e5b',
                        colorBgContainer: '#ffffff',
                        fontFamily: 'Lato',
                        borderRadius: 4,
                    },
                    components: {
                        Button: {
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
                    {/* <div className={styles.noInternetConnectivity}>You're Offline. Please check your internet connection and try again</div> */}
                    <MainPage />
                </NotificationContext.Provider>
            </ConfigProvider>
        </Router>
    );
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppBase);

export default NotificationContext;
