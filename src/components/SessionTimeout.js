import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { doLogoutAPI } from 'store/actions/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer';
import { Modal } from 'antd';

import * as routing from 'constants/routing';

import { showGlobalNotification } from 'store/actions/notification';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
    } = state;

    return {
        userId,
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            doLogout: doLogoutAPI,
            showGlobalNotification,
        },
        dispatch
    ),
});

const SessionTimeoutMain = ({ doLogout, showGlobalNotification, userId }) => {
    const navigate = useNavigate();
    
    const timeout = process.env.IDLE_TIMEOUT;
    const promptBeforeIdle = process.env.PROMPT_BEFORE_IDLE_TIMEOUT;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [remaining, setRemaining] = useState(timeout);

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
        timeout,
        promptBeforeIdle,
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

    const handleStillHere = () => {
        activate();
        Modal.destroyAll();
        setIsModalOpen(false);
    };

    const onSuccess = (res) => {
        if (res?.data) {
            showGlobalNotification({ notificationType: 'success', title: res?.title || 'Logout Successful', message: Array.isArray(res?.responseMessage) ? res?.responseMessage[0] : res?.responseMessage });
            navigate(routing.ROUTING_LOGIN);
        }
    };

    const onError = (message) => {
        showGlobalNotification({ message: Array.isArray(message) ? message[0] : message });
    };

    const seconds = remaining > 1 ? 'seconds' : 'second';
    return (
        <Modal
            title="Session Timeout"
            open={isModalOpen}
            onOk={() =>
                doLogout({
                    onSuccess,
                    onError,
                    userId,
                })
            }
            onCancel={handleStillHere}
        >
            <p>
                Your session is about to expire. You will be logged out in {remaining} {seconds}. Click "Continue" if you want to continue and stay logged in.
            </p>
        </Modal>
    );
};

export const SessionTimeout = connect(mapStateToProps, mapDispatchToProps)(SessionTimeoutMain);
