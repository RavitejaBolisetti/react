/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { doRefreshToken, doLogoutAPI } from 'store/actions/auth';
import { useNavigate } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer';
import { SessionTimeoutModal } from './SessionTimeoutModal';
import { AiOutlineWarning } from 'react-icons/ai';

import { Modal } from 'antd';
import * as routing from 'constants/routing';
import { showGlobalNotification } from 'store/actions/notification';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId, isLoggedIn, refreshToken },

        data: {
            ConfigurableParameterEditing: { isLoaded, data: configData = [] },
        },
    } = state;

    return {
        userId,
        refreshToken,
        isLoggedIn,
        isLoaded,
        timeOutConfig: configData?.find((i) => i.controlId === 'STOUT'),
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            doLogout: doLogoutAPI,
            doRefreshToken,
            showGlobalNotification,
        },
        dispatch
    ),
});

const SessionTimeoutMain = ({ isLoggedIn, doLogout, doRefreshToken, showGlobalNotification, refreshToken, userId, timeOutConfig }) => {
    const navigate = useNavigate();
    const [timeOutSetting, setTimeOutSetting] = useState({ timeout: 180_000, promptBeforeIdle: 30_000 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [remaining, setRemaining] = useState(timeOutSetting?.timeout);

    useEffect(() => {
        if (timeOutConfig) {
            if (timeOutConfig?.toNumber > timeOutConfig?.fromNumber) {
                setTimeOutSetting({
                    timeout: timeOutConfig?.toNumber * 1000,
                    promptBeforeIdle: timeOutConfig?.fromNumber * 1000,
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeOutConfig]);

    const onIdle = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            doLogout({
                onSuccess,
                onError,
                userId,
            });
            Modal.destroyAll();
        });
    };

    const onActive = () => {
        setIsModalOpen(false);
    };

    const onPrompt = () => {
        setIsModalOpen(true);
    };

    const { getRemainingTime, activate } = useIdleTimer({
        onIdle,
        onActive,
        onPrompt,
        timeout: timeOutSetting?.timeout,
        promptBeforeIdle: timeOutSetting?.promptBeforeIdle,
        throttle: 500,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000));
        }, 500);

        return () => {
            clearInterval(interval);
        };
    });

    const handleSessionContinueAction = () => {
        activate();
        doRefreshToken({
            onSuccess: (res) => {
                Modal.destroyAll();
                setIsModalOpen(false);
            },
            data: { userId, token: refreshToken },
            onError,
        });
    };

    const onSuccess = (res) => {
        if (res?.data) {
            showGlobalNotification({ notificationType: 'successBeforeLogin', title: res?.title || translateContent('global.notificationSuccess.logoutSuccess'), message: Array.isArray(res?.responseMessage) ? res?.responseMessage[0] : res?.responseMessage });
            navigate(routing.ROUTING_LOGIN);
        }
    };

    const onError = (message) => {
        showGlobalNotification({ message: Array.isArray(message) ? message[0] : message });
    };

    const modalProps = {
        isVisible: isModalOpen,
        icon: <AiOutlineWarning />,
        titleOverride: translateContent('sessionTimeout.heading.title'),
        remaining,
        closable: false,
        handleLogoutAction: onIdle,
        handleSessionContinueAction,
    };
    return <SessionTimeoutModal {...modalProps} />;
};

export const SessionTimeout = connect(mapStateToProps, mapDispatchToProps)(SessionTimeoutMain);
